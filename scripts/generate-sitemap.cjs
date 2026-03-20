/**
 * Post-build: append published blog URLs to sitemap.xml so new blogs are crawlable.
 * Reads dist/sitemap.xml (from public/sitemap.xml), fetches blogs from API, inserts
 * blog <url> entries before </urlset>, writes back to dist/sitemap.xml.
 *
 * Usage: node scripts/generate-sitemap.cjs  (run after vite build)
 * Env:   VITE_API_URL (e.g. https://backend.jashom.com) for fetching blogs
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const SITEMAP_PATH = path.join(DIST, 'sitemap.xml');
const SITE_ORIGIN = (process.env.SITE_ORIGIN || process.env.VITE_SITE_URL || 'https://www.jashom.com')
  .toString()
  .replace(/\/$/, '')
  // Normalize any old origin:
  // - If an env var is set to new.jashom.com, keep sitemap on the live www domain.
  .replace(/^https?:\/\/new\.jashom\.com$/i, 'https://www.jashom.com');
const API_BASE = (process.env.VITE_API_URL || 'https://backend.jashom.com').toString().replace(/\/$/, '');

function nowSitemapLastmod() {
  // Sitemap `lastmod` format with explicit timezone offset.
  return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

function extractRouteMetaKeys() {
  // Keep sitemap in sync with view-source SEO routes.
  const canonicalPath = path.join(__dirname, 'canonical-per-route.cjs');
  if (!fs.existsSync(canonicalPath)) return [];

  const src = fs.readFileSync(canonicalPath, 'utf8');
  const start = src.indexOf('const ROUTE_META = {');
  if (start === -1) return [];
  const end = src.indexOf('};', start);
  if (end === -1) return [];

  const block = src.slice(start, end + 2);
  const keyRe = /['"](?<route>\/[^'"]+)['"]\s*:\s*\{/g;
  const keys = [];
  for (const m of block.matchAll(keyRe)) {
    if (m.groups && m.groups.route) keys.push(m.groups.route);
  }
  return keys;
}

function escapeXml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toSitemapLastmod(dateStr) {
  if (!dateStr) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00');
  return d.toISOString().replace(/\.\d{3}Z$/, '+00:00');
}

async function fetchPublishedBlogs() {
  try {
    const res = await fetch(`${API_BASE}/v1/admin/blogs?status=published&limit=500`);
    const text = await res.text();
    if (!res.ok || !text.trim().startsWith('[')) return [];
    return JSON.parse(text);
  } catch (e) {
    console.warn('generate-sitemap: could not fetch blogs:', e.message);
    return [];
  }
}

function normalizeUrlLocToWww(loc) {
  if (typeof loc !== 'string') return loc;
  const raw = loc.trim();
  // Support:
  // - https://www.jashom.com/...
  // - https://jashom.com/...
  // - https://new.jashom.com/...
  const m = raw.match(/^https?:\/\/(?:(?:new)\.)?jashom\.com(\/.*)?$/i);
  if (!m) return raw;
  const path = m[1] || '/';
  return `https://www.jashom.com${path}`;
}

function normalizeSitemapLocsToWwwAndDedupe(xml) {
  const closingTag = '</urlset>';
  const closingIdx = xml.indexOf(closingTag);
  if (closingIdx === -1) return xml;

  const beforeClosing = xml.slice(0, closingIdx);
  const afterClosing = xml.slice(closingIdx); // includes </urlset>

  const firstUrlStart = beforeClosing.indexOf('<url>');
  if (firstUrlStart === -1) return xml;

  const prefix = beforeClosing.slice(0, firstUrlStart);
  const urlBlocks = beforeClosing.match(/<url>[\s\S]*?<\/url>/g) || [];

  const seen = new Set();
  const outBlocks = [];

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/i);
    const rawLoc = locMatch && locMatch[1] ? locMatch[1].trim() : null;
    const normalizedLoc = rawLoc ? normalizeUrlLocToWww(rawLoc) : rawLoc;

    if (!normalizedLoc) continue;
    if (seen.has(normalizedLoc)) continue;
    seen.add(normalizedLoc);

    const nextBlock = block.replace(
      /<loc>[^<]+<\/loc>/i,
      `<loc>${escapeXml(normalizedLoc)}</loc>`
    );
    outBlocks.push(nextBlock);
  }

  return prefix + outBlocks.join('\n') + afterClosing;
}

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('generate-sitemap: dist/sitemap.xml not found. Run vite build first. Skipping.');
    return;
  }

  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');

  // Normalize any existing sitemap URLs to `www.jashom.com` and dedupe.
  sitemap = normalizeSitemapLocsToWwwAndDedupe(sitemap);

  const closingTag = '</urlset>';
  const closingIdx = sitemap.indexOf(closingTag);
  if (closingIdx === -1) {
    console.warn('generate-sitemap: </urlset> not found; sitemap unchanged.');
    return;
  }

  // Collect existing <loc> so rerunning this script doesn't duplicate entries.
  const existingLocs = new Set(
    Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) => (m[1] || '').trim())
  );

  // 1) Ensure static ROUTE_META routes are present in sitemap.
  const routeMetaKeys = extractRouteMetaKeys();
  const staticEntriesXml = [];
  for (const routePath of routeMetaKeys) {
    const loc = routePath === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routePath}`;
    const escapedLoc = escapeXml(loc);
    if (existingLocs.has(loc)) continue;
    staticEntriesXml.push(`<url>
  <loc>${escapedLoc}</loc>
  <lastmod>${nowSitemapLastmod()}</lastmod>
  <priority>0.51</priority>
</url>`);
  }

  if (staticEntriesXml.length > 0) {
    sitemap =
      sitemap.slice(0, closingIdx) +
      '\n' +
      staticEntriesXml.join('\n') +
      '\n' +
      sitemap.slice(closingIdx);
  }
  for (const routePath of routeMetaKeys) {
    const loc = routePath === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routePath}`;
    existingLocs.add(loc);
  }

  const blogs = await fetchPublishedBlogs();
  const newBlogEntries = (blogs || [])
    .filter((b) => b && b.slug)
    .map((b) => {
      const loc = SITE_ORIGIN + '/blogs/' + encodeURIComponent(b.slug) + '/';
      if (existingLocs.has(loc)) return null;
      const lastmod = toSitemapLastmod(b.updated_at || b.published_at || b.created_at);
      existingLocs.add(loc);
      return `<url>
  <loc>${escapeXml(loc)}</loc>
  <lastmod>${escapeXml(lastmod)}</lastmod>
  <priority>0.51</priority>
</url>`;
    })
    .filter(Boolean)
    .join('\n');

  if (!newBlogEntries) {
    fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
    console.log('generate-sitemap: no new blog URLs to add.');
    return;
  }

  // Insert blog entries before </urlset>
  const idx = sitemap.indexOf(closingTag);
  if (idx === -1) {
    console.warn('generate-sitemap: </urlset> not found; sitemap unchanged.');
    return;
  }
  sitemap = sitemap.slice(0, idx) + '\n' + newBlogEntries + '\n' + sitemap.slice(idx);
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log('generate-sitemap: appended new blog URLs to sitemap.');
}

main().catch((err) => {
  console.error('generate-sitemap:', err);
  process.exit(1);
});
