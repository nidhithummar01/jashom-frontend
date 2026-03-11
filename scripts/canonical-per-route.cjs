/**
 * Post-build: generate per-route index.html with correct canonical for view-source/SEO.
 * Nginx try_files $uri $uri/ /index.html will serve path/index.html when present.
 * No Nginx or server changes required.
 *
 * Usage: node scripts/canonical-per-route.cjs
 * Env:   SITE_ORIGIN or VITE_SITE_URL (e.g. https://www.jashom.com)
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
// Match canonical link by id and replace href (attribute order may vary after build)
const CANONICAL_REGEX = /<link\s+id="canonical-url"[^>]*\shref="[^"]*"[^>]*\/?>/i;
function replaceCanonicalHref(html, newHref) {
  return html.replace(CANONICAL_REGEX, (tag) =>
    tag.replace(/\shref="[^"]*"/, ` href="${newHref}"`)
  );
}

const TITLE_REGEX = /<title>[\s\S]*?<\/title>/i;
// Match <meta name="description" ...> even if attributes are reordered
const META_DESC_REGEX = /<meta\s+[^>]*name=["']description["'][^>]*>/i;
const PRERENDER_H1_REGEX = /<noscript\s+id=["']prerender-h1["'][^>]*>[\s\S]*?<\/noscript>/i;

function replaceTitle(html, newTitle) {
  if (TITLE_REGEX.test(html)) return html.replace(TITLE_REGEX, `<title>${newTitle}</title>`);
  return html.replace(/<\/head>/i, `  <title>${newTitle}</title>\n</head>`);
}

function replaceMetaDescription(html, newDescription) {
  const tag = `<meta name="description" content="${newDescription.replace(/"/g, '&quot;')}" />`;
  if (META_DESC_REGEX.test(html)) {
    return html.replace(META_DESC_REGEX, tag);
  }
  return html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}

function replacePrerenderH1(html, h1Text) {
  const safe = String(h1Text).replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const block = `<noscript id="prerender-h1"><h1>${safe}</h1></noscript>`;
  if (PRERENDER_H1_REGEX.test(html)) return html.replace(PRERENDER_H1_REGEX, block);
  // Fallback: insert after root container if present
  if (html.includes('<div id="root"></div>')) {
    return html.replace('<div id="root"></div>', `<div id="root"></div>\n  ${block}`);
  }
  return html;
}

// Use www.jashom.com; normalize any old new.jashom.com from env to live domain
const SITE_ORIGIN = (process.env.SITE_ORIGIN || process.env.VITE_SITE_URL || 'https://www.jashom.com')
  .toString()
  .replace(/\/$/, '')
  .replace(/^https:\/\/new\.jashom\.com$/i, 'https://www.jashom.com');

// Per-route Title/Description for view-source (static HTML) on key SEO pages.
// Other pages fall back to whatever is in dist/index.html (runtime SEO still applies).
const ROUTE_META = {
  '/': {
    title: 'GPU Optimization Services | CUDA Development Company | Jashom',
    description:
      'Jashom provides advanced GPU optimization, CUDA development, and high-performance computing solutions to accelerate AI, simulation, and enterprise workloads efficiently.',
    h1: 'GPU Optimization Services',
  },
  '/gpu-optimization-service/': {
    title: 'NVIDIA GPU Optimization Services | Optimize NVIDIA GPU Performance',
    description:
      'Improve speed and efficiency with expert NVIDIA GPU optimization services. We help businesses optimize NVIDIA GPU performance for AI, HPC, and data-intensive applications.',
    h1: 'NVIDIA GPU Optimization Services',
  },
  '/cuda-development-service/': {
    title: 'CUDA Development Services | Expert CUDA Developers for GPU Computing',
    description:
      'Hire experienced CUDA developers to build high-performance GPU applications. Jashom delivers scalable CUDA development solutions for AI, deep learning, and parallel computing.',
    h1: 'CUDA Development Services',
  },
  '/hire-cuda-developer/': {
    title: 'Hire CUDA Developers | Dedicated CUDA Programmers & GPU Experts',
    description:
      'Looking to hire CUDA developers? Get skilled GPU programmers for NVIDIA CUDA projects, performance optimization, and custom parallel computing solutions.',
    h1: 'Hire CUDA Developers',
  },
  '/about/': {
    title: 'About Jashom | GPU Optimization & CUDA Development Experts',
    description:
      'Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications.',
    h1: 'About Jashom',
  },
  '/about-us/': {
    title: 'About Jashom | GPU Optimization & CUDA Development Experts',
    description:
      'Learn about Jashom, a technology-driven company specializing in GPU optimization, NVIDIA CUDA development, and high-performance computing solutions for modern AI and enterprise applications.',
    h1: 'About Jashom',
  },
  '/contact/': {
    title: 'Contact Jashom | GPU & CUDA Development Consultation',
    description:
      'Get in touch with Jashom for expert GPU optimization and CUDA development services. Contact our team to discuss your performance challenges and project requirements.',
    h1: 'Contact Jashom',
  },
};

// Static routes only (no :slug or params). Must have leading and trailing slash.
const STATIC_ROUTES = [
  '/',
  '/solutions/',
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
  '/thank-you/',
  '/gpu-optimization-service/',
  '/cuda-development-service/',
  '/about-us/',
  '/about/team/',
  '/about/portfolio/',
  '/about/blog/',
  '/about/career/',
  '/about/',
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
  '/solutions/healthtech/',
  '/solutions/supply-chain/',
  '/solutions/fintech/',
  '/solutions/environmenttech/',
  '/solutions/legal-and-tax/',
  '/solutions/retail-tech/',
  '/solutions/foodtech/',
  '/ai-for-industry/sales/',
  '/ai-for-industry/legal/',
  '/ai-for-industry/accounting/',
  '/ai-for-industry/healthcare/',
  '/ai-for-industry/marketing/',
  '/ai-for-industry/rnd/',
];

function main() {
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

  const rootCanonical = `${SITE_ORIGIN}/`;

  // 1) Update root index.html
  let rootHtml = replaceCanonicalHref(indexHtml, rootCanonical);
  if (ROUTE_META['/']) {
    rootHtml = replaceTitle(rootHtml, ROUTE_META['/'].title);
    rootHtml = replaceMetaDescription(rootHtml, ROUTE_META['/'].description);
    rootHtml = replacePrerenderH1(rootHtml, ROUTE_META['/'].h1);
  }
  fs.writeFileSync(indexPath, rootHtml);

  // 2) For each non-root route, write path/index.html with correct canonical
  for (const routePath of STATIC_ROUTES) {
    if (routePath === '/') continue;
    const dirSegments = routePath.slice(1, -1); // e.g. 'gpu-optimization-service' or 'portfolio/case-study/...'
    const dir = path.join(DIST, dirSegments);
    fs.mkdirSync(dir, { recursive: true });
    const pathCanonical = `${SITE_ORIGIN}${routePath}`;
    let pathHtml = replaceCanonicalHref(indexHtml, pathCanonical);
    if (ROUTE_META[routePath]) {
      pathHtml = replaceTitle(pathHtml, ROUTE_META[routePath].title);
      pathHtml = replaceMetaDescription(pathHtml, ROUTE_META[routePath].description);
      pathHtml = replacePrerenderH1(pathHtml, ROUTE_META[routePath].h1);
    }
    const outPath = path.join(dir, 'index.html');
    fs.writeFileSync(outPath, pathHtml);
  }

  // 3) Verify key routes so build fails if something is wrong (e.g. deploy with stale dist)
  const checkPaths = [
    ['gpu-optimization-service', `${SITE_ORIGIN}/gpu-optimization-service/`],
    ['cuda-development-service', `${SITE_ORIGIN}/cuda-development-service/`],
    ['contact', `${SITE_ORIGIN}/contact/`],
  ];
  for (const [dirSegments, expectedHref] of checkPaths) {
    const filePath = path.join(DIST, dirSegments, 'index.html');
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes(`href="${expectedHref}"`)) {
      console.error('scripts/canonical-per-route.cjs: verification failed for', dirSegments, '- expected href', expectedHref);
      process.exit(1);
    }
  }

  console.log('Canonical per-route: updated root +', STATIC_ROUTES.length - 1, 'paths (verified)');
}

main();
