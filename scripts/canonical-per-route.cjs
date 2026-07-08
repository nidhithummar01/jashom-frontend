/**
 * Post-build: generate per-route index.html with correct canonical for view-source/SEO.
 * Nginx try_files $uri $uri/ /index.html will serve path/index.html when present.
 * No Nginx or server changes required.
 * Fetches published blogs from API and injects blog links into prerender-links + generates blogs/slug/index.html.
 *
 * Usage: node scripts/canonical-per-route.cjs
 * Env:   SITE_ORIGIN or VITE_SITE_URL (e.g. https://www.jashom.com)
 *        VITE_API_URL (e.g. https://backend.jashom.com) for blogs
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const API_BASE = (process.env.VITE_API_URL || 'https://backend.jashom.com').toString().replace(/\/$/, '');
// Match canonical link by id and replace href (attribute order may vary after build)
const CANONICAL_REGEX = /<link\s+id="canonical-url"[^>]*\shref="[^"]*"[^>]*\/?>/i;
function replaceCanonicalHref(html, newHref) {
  return html.replace(CANONICAL_REGEX, (tag) =>
    tag.replace(/\shref="[^"]*"/, ` href="${newHref}"`)
  );
}

/**
 * Sonar/ReDoS hardening:
 * Avoid backtracking-heavy regexes like /[\s\S]*?/ which can be super-linear on crafted input.
 * Use simple index-based scanning (linear time) for title/meta/noscript replacement.
 */

function replaceBetween(html, startIdx, endIdx, replacement) {
  if (startIdx < 0 || endIdx < 0 || endIdx < startIdx) return html;
  return html.slice(0, startIdx) + replacement + html.slice(endIdx);
}

function findTagRange(html, openTagStart, closeTag) {
  const start = html.toLowerCase().indexOf(openTagStart.toLowerCase());
  if (start === -1) return null;
  const end = html.toLowerCase().indexOf(closeTag.toLowerCase(), start);
  if (end === -1) return null;
  return { start, end: end + closeTag.length };
}

function findHeadCloseIndex(html) {
  return html.toLowerCase().indexOf('</head>');
}

/** Remove all <script type="application/ld+json">...</script> from html (so per-route can inject its own). */
function removeLdJsonScripts(html) {
  const re = /<script\s+type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi;
  return html.replace(re, '');
}

/** Inject one or more JSON-LD script(s) before </head>. scripts = array of plain objects (will be JSON.stringified). */
function injectSchemaScripts(html, scripts) {
  if (!Array.isArray(scripts) || scripts.length === 0) return html;
  const headClose = findHeadCloseIndex(html);
  if (headClose === -1) return html;
  const blocks = scripts.map((obj) => {
    const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
    return `<script type="application/ld+json">${json}</script>`;
  });
  const insertion = '\n  ' + blocks.join('\n  ') + '\n  ';
  return replaceBetween(html, headClose, headClose, insertion);
}

/** Schema for Contact page only (ProfessionalService). */
const CONTACT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Jashom Technologies',
  image: 'https://www.jashom.com/jashom-logo-header-70px.png',
  '@id': 'https://www.jashom.com/contact/',
  url: 'https://www.jashom.com/',
  telephone: '90239 06363',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '414, Shivam 2, AMBA BUSINESS PARK',
    addressLocality: 'Adalaj',
    postalCode: '382421',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 23.1872755,
    longitude: 72.573118
  }
};

function replaceTitle(html, newTitle) {
  const range = findTagRange(html, '<title', '</title>');
  const titleTag = `<title>${newTitle}</title>`;
  if (range) return replaceBetween(html, range.start, range.end, titleTag);
  const headClose = findHeadCloseIndex(html);
  if (headClose === -1) return html;
  return replaceBetween(html, headClose, headClose, `  ${titleTag}\n`);
}

function replaceMetaDescription(html, newDescription) {
  const safeDesc = newDescription.replace(/"/g, '&quot;');
  const tag = `<meta name="description" content="${safeDesc}" />`;

  const lower = html.toLowerCase();
  // Find first <meta ...> containing name="description" or name='description'
  let idx = lower.indexOf('<meta');
  while (idx !== -1) {
    const end = lower.indexOf('>', idx);
    if (end === -1) break;
    const metaTag = lower.slice(idx, end + 1);
    if (metaTag.includes('name="description"') || metaTag.includes("name='description'")) {
      return replaceBetween(html, idx, end + 1, tag);
    }
    idx = lower.indexOf('<meta', end + 1);
  }

  const headClose = findHeadCloseIndex(html);
  if (headClose === -1) return html;
  return replaceBetween(html, headClose, headClose, `  ${tag}\n`);
}

function replacePrerenderH1(html, h1Text) {
  const safe = String(h1Text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const block = `<noscript id="prerender-h1"><h1>${safe}</h1></noscript>`;
  const lower = html.toLowerCase();
  const openIdx = lower.indexOf('<noscript');
  if (openIdx !== -1) {
    // specifically target noscript id="prerender-h1"
    const target = 'id="prerender-h1"';
    const target2 = "id='prerender-h1'";
    const idIdx = lower.indexOf(target, openIdx);
    const idIdx2 = lower.indexOf(target2, openIdx);
    const chosen = idIdx !== -1 ? idIdx : idIdx2;
    if (chosen !== -1) {
      const nsStart = lower.lastIndexOf('<noscript', chosen);
      const nsEnd = lower.indexOf('</noscript>', chosen);
      if (nsStart !== -1 && nsEnd !== -1) {
        return replaceBetween(html, nsStart, nsEnd + '</noscript>'.length, block);
      }
    }
  }

  // Fallback: insert after root container if present
  const rootMarker = '<div id="root"></div>';
  const rootIdx = html.indexOf(rootMarker);
  if (rootIdx !== -1) {
    return replaceBetween(html, rootIdx + rootMarker.length, rootIdx + rootMarker.length, `\n  ${block}`);
  }
  return html;
}

/** Find index of </nav> inside <noscript id="prerender-links"> for injecting blog links. */
function findPrerenderLinksNavClose(html) {
  const lower = html.toLowerCase();
  const idMatch = lower.indexOf('id="prerender-links"');
  const idMatch2 = lower.indexOf("id='prerender-links'");
  const start = idMatch !== -1 ? idMatch : idMatch2;
  if (start === -1) return -1;
  const navClose = lower.indexOf('</nav>', start);
  return navClose !== -1 ? navClose : -1;
}

function escapeHtml(s) {
  if (typeof s !== 'string') return '';
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Inject blog links before </nav> inside prerender-links so crawlers discover blog URLs. */
function injectBlogPrerenderLinks(html, blogs) {
  const idx = findPrerenderLinksNavClose(html);
  if (idx === -1) return html;
  const links = (blogs || [])
    .filter((b) => b && b.slug)
    .map((b) => `      <a href="/blogs/${escapeHtml(b.slug)}/">${escapeHtml(b.title || b.slug)}</a>`)
    .join('\n');
  if (!links) return html;
  return replaceBetween(html, idx, idx, '\n' + links + '\n    ');
}

/**
 * Apply per-route meta (title/description/prerender h1) if configured.
 * Keeping this in one place avoids Sonar "duplicated lines" on root + route generation.
 */
function applyRouteMeta(html, routePath) {
  const meta = ROUTE_META && ROUTE_META[routePath];
  if (!meta) return html;
  let out = html;
  if (meta.title) out = replaceTitle(out, meta.title);
  if (meta.description) out = replaceMetaDescription(out, meta.description);
  if (meta.h1) out = replacePrerenderH1(out, meta.h1);
  return out;
}

function applyRouteSchemas(html, routePath) {
  // Contact page: replace home schemas with ProfessionalService only (so view-source shows correct schema)
  if (routePath !== '/contact/') return html;
  return injectSchemaScripts(removeLdJsonScripts(html), [CONTACT_SCHEMA]);
}

function buildRouteHtml(baseHtml, routePath) {
  const canonical = routePath === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${routePath}`;
  let html = replaceCanonicalHref(baseHtml, canonical);
  html = applyRouteMeta(html, routePath);
  html = applyRouteSchemas(html, routePath);
  return html;
}

function writeRouteIndexHtml(routePath, html) {
  const outFile =
    routePath === '/'
      ? path.join(DIST, 'index.html')
      : path.join(DIST, routePath.slice(1, -1), 'index.html'); // strip leading/trailing slash
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
}

function verifyCanonicals(checks) {
  for (const [dirSegments, expectedHref] of checks) {
    const filePath = path.join(DIST, dirSegments, 'index.html');
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(`href="${expectedHref}"`)) {
      console.error('scripts/canonical-per-route.cjs: verification failed for', dirSegments, '- expected href', expectedHref);
      process.exit(1);
    }
  }
}

// Use www.jashom.com; normalize any old new.jashom.com from env to live domain
const SITE_ORIGIN = (process.env.SITE_ORIGIN || process.env.VITE_SITE_URL || 'https://www.jashom.com')
  .toString()
  .replace(/\/$/, '')
  .replace(/^https:\/\/new\.jashom\.com$/i, 'https://www.jashom.com');

// Per-route Title/Description for view-source (static HTML) on key SEO pages.
// Other pages fall back to whatever is in dist/index.html (runtime SEO still applies).
const routeMeta = (title, description, h1) => ({ title, description, h1 });

const ROUTE_META = {
  '/': routeMeta('GPU Optimization Services | CUDA Development Company | Jashom', 'Jashom provides advanced GPU optimization, CUDA development, and high-performance computing solutions to accelerate AI, simulation, and enterprise workloads efficiently.', 'GPU Optimization Services'),
  '/gpu-optimization-service/': routeMeta('NVIDIA GPU Optimization Services | Optimize NVIDIA GPU Performance', 'Improve speed and efficiency with expert NVIDIA GPU optimization services. We help businesses optimize NVIDIA GPU performance for AI, HPC, and data-intensive applications.', 'NVIDIA GPU Optimization Services'),
  '/cuda-development-service/': routeMeta('CUDA Development Services | Expert CUDA Developers for GPU Computing', 'Hire experienced CUDA developers to build high-performance GPU applications. Jashom delivers scalable CUDA development solutions for AI, deep learning, and parallel computing.', 'CUDA Development Services'),
  '/hire-cuda-developer/': routeMeta('Hire CUDA Developers | Dedicated CUDA Programmers & GPU Experts', 'Looking to hire CUDA developers? Get skilled GPU programmers for NVIDIA CUDA projects, performance optimization, and custom parallel computing solutions.', 'Hire CUDA Developers'),
  '/hire-rust-developers/': routeMeta('Hire Rust Developers - Hire Best Expert Rust Developer - Jashom', 'Hire dedicated Rust developers from Jashom to accelerate your project. Our experienced Rust engineers deliver reliable, secure, and efficient applications tailored to your business needs.', 'Hire Rust Developers'),
  '/about-us/': routeMeta('About Jashom | GPU Optimization & CUDA Development Experts', 'Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications.', 'About Jashom'),
  '/contact/': routeMeta('Contact Jashom | GPU & CUDA Development Consultation', 'Get in touch with Jashom for expert GPU optimization and CUDA development services. Contact our team to discuss your performance challenges and project requirements.', 'Contact Jashom'),
  '/about/team/': routeMeta('Meet the Jashom Team | Experts in AI, Cloud & Digital Innovation', 'Get to know the Jashom team experts in AI, cloud computing, and digital transformation driving innovation and scalable business solutions.', 'Meet the Jashom Team'),
  '/brochure/': routeMeta('Jashom Brochure | AI, Cloud & Digital Transformation Solutions', 'Download the Jashom brochure to explore our AI driven solutions, cloud expertise, and digital transformation services for modern enterprises.', 'Jashom Brochure'),
  '/careers/': routeMeta('Careers at Jashom | Join Our AI & Technology Team', 'Explore careers at Jashom and work on cutting edge AI, cloud, and automation solutions. Build your future with a fast growing tech team.', 'Careers at Jashom'),
  '/careers/openings/': routeMeta('Current Job Openings at Jashom | AI & Tech Careers', 'Browse current job openings at Jashom. Join our team to work on AI, cloud infrastructure, and next gen digital solutions.', 'Current Job Openings at Jashom'),
  '/cookies/': routeMeta('Cookies Policy | Jashom Technologies', 'Learn how Jashom uses cookies to enhance user experience, analyze traffic, and improve website performance.', 'Cookies Policy'),
  '/portfolio/': routeMeta('Jashom Portfolio | AI, Cloud & Digital Transformation Projects', "Explore Jashom's portfolio showcasing AI, cloud, and digital transformation projects delivering scalable and high performance solutions.", 'Jashom Portfolio'),
  '/portfolio/case-study/cloud-gpu-fine-tuning/': routeMeta('Cloud GPU Fine Tuning Case Study | Jashom AI Solutions', 'Discover how Jashom optimized cloud GPU fine tuning for AI models, improving performance, scalability, and cost efficiency.', 'Cloud GPU Fine Tuning Case Study'),
  '/portfolio/case-study/gpu-workload-orchestration/': routeMeta('GPU Workload Orchestration Case Study | Jashom Technologies', 'Learn how Jashom streamlined GPU workload orchestration to maximize efficiency, reduce costs, and enhance performance.', 'GPU Workload Orchestration Case Study'),
  '/portfolio/case-study/llm-inference-optimization/': routeMeta('LLM Inference Optimization Case Study | Jashom Technologies', 'See how Jashom optimized LLM inference to achieve faster response times, reduced costs, and improved AI performance at scale.', 'LLM Inference Optimization Case Study'),
  '/portfolio/case-study/redfish-bmc-telemetry/': routeMeta('Redfish BMC Telemetry Case Study | Jashom Technologies', 'Explore how Jashom implemented Redfish BMC telemetry to enhance system monitoring, reliability, and infrastructure visibility.', 'Redfish BMC Telemetry Case Study'),
  '/privacy/': routeMeta('Privacy Policy | Jashom Data Protection & Compliance', "Read Jashom's privacy policy to understand how we collect, use, and protect your personal data in compliance with global standards.", 'Privacy Policy'),
  '/security/': routeMeta('Security at Jashom | Data Protection & Infrastructure Security', "Learn about Jashom's security practices, ensuring data protection, system integrity, and enterprise grade infrastructure security.", 'Security at Jashom'),
  '/terms/': routeMeta('Terms & Conditions | Jashom Website Usage Policy', "Review Jashom's terms and conditions outlining website usage, legal policies, and user responsibilities.", 'Terms & Conditions'),
};

// Static routes only (no :slug or params). Must have leading and trailing slash.
const STATIC_ROUTES = [
  '/',
  '/capability/',
  '/portfolio/',
  '/blogs/',
  '/portfolio/rankzy-ai/',
  '/portfolio/pod-ai-clipforge/',
  '/portfolio/nvtrust-gpu-attestation/',
  '/portfolio/hti-cuda-acceleration/',
  '/portfolio/case-study/llm-inference-optimization/',
  '/portfolio/case-study/gpu-workload-orchestration/',
  '/portfolio/case-study/cloud-gpu-fine-tuning/',
  '/portfolio/case-study/redfish-bmc-telemetry/',
  '/projects/boostreferral/',
  '/projects/projectsphere/',
  '/projects/enviropulse/',
  '/projects/greensphere/',
  '/projects/ecobot-ai/',
  '/projects/jashom-health/',
  '/projects/jashom-healthcare/',
  '/projects/jashom-icu-connect/',
  '/projects/rag-lu/',
  '/contact/',
  '/brochure/',
  '/hire-cuda-developer/',
  '/hire-rust-developers/',
  '/thank-you/',
  '/gpu-optimization-service/',
  '/cuda-development-service/',
  '/about/team/',
  '/about/blog/',
  '/about-us/',
  '/careers/',
  '/careers/openings/',
  '/careers/apply/',
  '/news/',
  '/docs/',
  '/resources/',
  '/api/',
  '/privacy/',
  '/terms/',
  '/cookies/',
  '/security/',
  // Navigation/Services/Solutions paths that may be linked
  '/services/ai-gpu-optimization/',
  '/services/rag-applications/',
  '/services/ai-agentic-systems/',
  '/services/ai-automation/',
  '/services/cyber-security/',
  '/services/vapt/',
  '/services/compliance-risk/',
  '/services/devops-devsecops/',
  '/services/devops-cloud/',
  '/services/edge-computing/',
  '/services/cicd-automation/',
  '/services/product-engineering/',
  '/services/custom-development/',
  '/services/micro-saas/',
  '/ai-for-industry/sales/',
  '/ai-for-industry/legal/',
  '/ai-for-industry/accounting/',
  '/ai-for-industry/healthcare/',
  '/ai-for-industry/marketing/',
  '/ai-for-industry/rnd/',
];

async function fetchPublishedBlogs() {
  try {
    const res = await fetch(`${API_BASE}/v1/admin/blogs?status=published&limit=500`);
    const text = await res.text();
    if (!res.ok || !text.trim().startsWith('[')) return [];
    return JSON.parse(text);
  } catch (e) {
    console.warn('canonical-per-route: could not fetch blogs:', e.message);
    return [];
  }
}

async function main() {
  const indexPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('scripts/canonical-per-route.cjs: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  if (!CANONICAL_REGEX.test(indexHtml)) {
    console.error('scripts/canonical-per-route.cjs: canonical link (id="canonical-url") not found in index.html');
    process.exit(1);
  }

  const blogs = await fetchPublishedBlogs();
  const blogRoutes = (blogs || []).filter((b) => b && b.slug).map((b) => '/blogs/' + b.slug + '/');
  indexHtml = injectBlogPrerenderLinks(indexHtml, blogs);

  const allRoutes = Array.from(new Set([...STATIC_ROUTES, ...blogRoutes]));

  // 1) Update root index.html
  writeRouteIndexHtml('/', buildRouteHtml(indexHtml, '/'));

  // 2) For each non-root route (static + blogs), write path/index.html with correct canonical
  for (const routePath of allRoutes) {
    if (routePath === '/') continue;
    writeRouteIndexHtml(routePath, buildRouteHtml(indexHtml, routePath));
  }

  // 3) Verify key routes so build fails if something is wrong (e.g. deploy with stale dist)
  const checkPaths = [
    ['gpu-optimization-service', `${SITE_ORIGIN}/gpu-optimization-service/`],
    ['cuda-development-service', `${SITE_ORIGIN}/cuda-development-service/`],
    ['contact', `${SITE_ORIGIN}/contact/`],
  ];
  verifyCanonicals(checkPaths);

  console.log('Canonical per-route: updated root +', allRoutes.length - 1, 'paths (' + blogRoutes.length + ' blogs, verified)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
