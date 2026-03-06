/**
 * Post-build: generate per-route index.html with correct canonical for view-source/SEO.
 * Nginx try_files $uri $uri/ /index.html will serve path/index.html when present.
 * No Nginx or server changes required.
 *
 * Usage: node scripts/canonical-per-route.cjs
 * Env:   SITE_ORIGIN or VITE_SITE_URL (e.g. https://new.jashom.com)
 */

const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const CANONICAL_REGEX = /(<link\s+id="canonical-url"\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/i;

const SITE_ORIGIN = (process.env.SITE_ORIGIN || process.env.VITE_SITE_URL || 'https://new.jashom.com')
  .toString()
  .replace(/\/$/, '');

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
    console.error('scripts/canonical-per-route.cjs: canonical link not found in index.html');
    process.exit(1);
  }

  // 1) Update root index.html
  const rootHtml = indexHtml.replace(CANONICAL_REGEX, `$1${SITE_ORIGIN}/$2`);
  fs.writeFileSync(indexPath, rootHtml);

  // 2) For each non-root route, write path/index.html with correct canonical
  for (const routePath of STATIC_ROUTES) {
    if (routePath === '/') continue;
    const dirSegments = routePath.slice(1, -1); // e.g. 'gpu-optimization-service' or 'portfolio/case-study/...'
    const dir = path.join(DIST, dirSegments);
    fs.mkdirSync(dir, { recursive: true });
    const pathHtml = indexHtml.replace(CANONICAL_REGEX, `$1${SITE_ORIGIN}${routePath}$2`);
    fs.writeFileSync(path.join(dir, 'index.html'), pathHtml);
  }

  console.log('Canonical per-route: updated root +', STATIC_ROUTES.length - 1, 'paths');
}

main();
