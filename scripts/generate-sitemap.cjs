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
  .replace(/\/$/, '');
const API_BASE = (process.env.VITE_API_URL || 'https://backend.jashom.com').toString().replace(/\/$/, '');

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

async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.warn('generate-sitemap: dist/sitemap.xml not found. Run vite build first. Skipping.');
    return;
  }

  let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const blogs = await fetchPublishedBlogs();
  const blogEntries = (blogs || [])
    .filter((b) => b && b.slug)
    .map((b) => {
      const loc = SITE_ORIGIN + '/blogs/' + encodeURIComponent(b.slug) + '/';
      const lastmod = toSitemapLastmod(b.updated_at || b.published_at || b.created_at);
      return `<url>
  <loc>${escapeXml(loc)}</loc>
  <lastmod>${escapeXml(lastmod)}</lastmod>
  <priority>0.51</priority>
</url>`;
    })
    .join('\n');

  if (!blogEntries) {
    console.log('generate-sitemap: no published blogs; sitemap unchanged.');
    return;
  }

  // Insert blog entries before </urlset>
  const closingTag = '</urlset>';
  const idx = sitemap.indexOf(closingTag);
  if (idx === -1) {
    console.warn('generate-sitemap: </urlset> not found; sitemap unchanged.');
    return;
  }
  sitemap = sitemap.slice(0, idx) + '\n' + blogEntries + '\n' + sitemap.slice(idx);
  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');
  console.log('generate-sitemap: appended', blogs.filter((b) => b && b.slug).length, 'blog URLs to sitemap.');
}

main().catch((err) => {
  console.error('generate-sitemap:', err);
  process.exit(1);
});
