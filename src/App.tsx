import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PageTransition } from './components/PageTransition';
import { ScrollProgress } from './components/ScrollProgress';
import { AnimatePresence } from 'motion/react';

// Lazy load heavy components for better performance
const SolutionsPage = lazy(() => import('./components/SolutionsPage').then(module => ({ default: module.SolutionsPage })));
const CapabilityMatrixPage = lazy(() => import('./components/CapabilityMatrixPage').then(module => ({ default: module.CapabilityMatrixPage })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(module => ({ default: module.PortfolioPage })));
const BlogsPage = lazy(() => import('./components/BlogsPage').then(module => ({ default: module.BlogsPage })));
const BlogDetailPage = lazy(() => import('./components/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then(module => ({ default: module.ContactPage })));
const BrochurePage = lazy(() => import('./components/BrochurePage').then(module => ({ default: module.BrochurePage })));

// Lazy load portfolio project pages
const RankzyAIPage = lazy(() => import('./components/portfolio/RankzyAIPage').then(module => ({ default: module.RankzyAIPage })));
const PodAIClipforgePage = lazy(() => import('./components/portfolio/PodAIClipforgePage').then(module => ({ default: module.PodAIClipforgePage })));
const NVTrustGPUAttestationPage = lazy(() => import('./components/portfolio/NVTrustGPUAttestationPage').then(module => ({ default: module.NVTrustGPUAttestationPage })));
const HTICUDAAccelerationPage = lazy(() => import('./components/portfolio/HTICUDAAccelerationPage').then(module => ({ default: module.HTICUDAAccelerationPage })));
const BoostReferralPage = lazy(() => import('./components/portfolio/BoostReferralPage').then(module => ({ default: module.BoostReferralPage })));
const ProjectSpherePage = lazy(() => import('./components/portfolio/ProjectSpherePage').then(module => ({ default: module.ProjectSpherePage })));
const EnviroPulsePage = lazy(() => import('./components/portfolio/EnviroPulsePage').then(module => ({ default: module.EnviroPulsePage })));
const GreenSpherePage = lazy(() => import('./components/portfolio/GreenSpherePage').then(module => ({ default: module.GreenSpherePage })));
const EcoBotAIPage = lazy(() => import('./components/portfolio/EcoBotAIPage').then(module => ({ default: module.EcoBotAIPage })));
const JashomHealthPage = lazy(() => import('./components/portfolio/JashomHealthPage').then(module => ({ default: module.JashomHealthPage })));
const JashomHealthcarePage = lazy(() => import('./components/portfolio/JashomHealthcarePage').then(module => ({ default: module.JashomHealthcarePage })));
const JashomICUConnectPage = lazy(() => import('./components/portfolio/JashomICUConnectPage').then(module => ({ default: module.JashomICUConnectPage })));
const RAGLUPage = lazy(() => import('./components/portfolio/RAGLUPage').then(module => ({ default: module.RAGLUPage })));

// Lazy load service pages (high priority for optimization)
const HireCudaDeveloperPage = lazy(() => import('./components/HireCudaDeveloperPage').then(module => ({ default: module.HireCudaDeveloperPage })));
const GPUOptimizationServicePage = lazy(() => import('./components/GPUOptimizationServicePage').then(module => ({ default: module.GPUOptimizationServicePage })));
const CUDADevelopmentServicePage = lazy(() => import('./components/CUDADevelopmentServicePage').then(module => ({ default: module.CUDADevelopmentServicePage })));
const ThankYouPage = lazy(() => import('./components/ThankYouPage').then(module => ({ default: module.ThankYouPage })));

// Lazy load policy pages
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const CookiePolicyPage = lazy(() => import('./components/CookiePolicyPage').then(module => ({ default: module.CookiePolicyPage })));
const SecurityPolicyPage = lazy(() => import('./components/SecurityPolicyPage').then(module => ({ default: module.SecurityPolicyPage })));

// Lazy load about pages
const TeamPage = lazy(() => import('./components/about/TeamPage').then(module => ({ default: module.TeamPage })));
const NewAboutUsPage = lazy(() => import('./components/NewAboutUsPage').then(module => ({ default: module.NewAboutUsPage })));

// Lazy load careers pages
const CareersPage = lazy(() => import('./components/CareersPage').then(module => ({ default: module.CareersPage })));
const CareerListingPage = lazy(() => import('./components/CareerListingPage').then(module => ({ default: module.CareerListingPage })));
const CareerApplicationPage = lazy(() => import('./components/CareerApplicationPage').then(module => ({ default: module.CareerApplicationPage })));

// Lazy load placeholder page
const PlaceholderPage = lazy(() => import('./components/PlaceholderPage').then(module => ({ default: module.PlaceholderPage })));

// Loading component for Suspense fallback
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-white/70 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/solutions/" element={<PageTransition><SolutionsPage /></PageTransition>} />
          <Route path="/capability/" element={<PageTransition><CapabilityMatrixPage /></PageTransition>} />
          <Route path="/portfolio/" element={<PageTransition><PortfolioPage /></PageTransition>} />
          <Route path="/blogs/" element={<PageTransition><BlogsPage /></PageTransition>} />
          <Route path="/blogs/:slug/" element={<PageTransition><BlogDetailPage /></PageTransition>} />
          <Route path="/portfolio/rankzy-ai/" element={<PageTransition><RankzyAIPage /></PageTransition>} />
          <Route path="/portfolio/pod-ai-clipforge/" element={<PageTransition><PodAIClipforgePage /></PageTransition>} />
          <Route path="/portfolio/nvtrust-gpu-attestation/" element={<PageTransition><NVTrustGPUAttestationPage /></PageTransition>} />
          <Route path="/portfolio/hti-cuda-acceleration/" element={<PageTransition><HTICUDAAccelerationPage /></PageTransition>} />
          
          {/* Project Detail Routes */}
          <Route path="/projects/boostreferral/" element={<PageTransition><BoostReferralPage /></PageTransition>} />
          <Route path="/projects/projectsphere/" element={<PageTransition><ProjectSpherePage /></PageTransition>} />
          <Route path="/projects/enviropulse/" element={<PageTransition><EnviroPulsePage /></PageTransition>} />
          <Route path="/projects/greensphere/" element={<PageTransition><GreenSpherePage /></PageTransition>} />
          <Route path="/projects/ecobot-ai/" element={<PageTransition><EcoBotAIPage /></PageTransition>} />
          <Route path="/projects/jashom-health/" element={<PageTransition><JashomHealthPage /></PageTransition>} />
          <Route path="/projects/jashom-healthcare/" element={<PageTransition><JashomHealthcarePage /></PageTransition>} />
          <Route path="/projects/jashom-icu-connect/" element={<PageTransition><JashomICUConnectPage /></PageTransition>} />
          <Route path="/projects/rag-lu/" element={<PageTransition><RAGLUPage /></PageTransition>} />
          <Route path="/contact/" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/brochure/" element={<PageTransition><BrochurePage /></PageTransition>} />

          {/* Service Routes - High Priority Pages */}
          <Route path="/hire-cuda-developer/" element={<PageTransition><HireCudaDeveloperPage /></PageTransition>} />
          <Route path="/thank-you/" element={<PageTransition><ThankYouPage /></PageTransition>} />
          <Route path="/gpu-optimization-service/" element={<PageTransition><GPUOptimizationServicePage /></PageTransition>} />
          <Route path="/cuda-development-service/" element={<PageTransition><CUDADevelopmentServicePage /></PageTransition>} />

          {/* About Us routes */}
          <Route path="/about-us/" element={<PageTransition><NewAboutUsPage /></PageTransition>} />
          <Route path="/about/team/" element={<PageTransition><TeamPage /></PageTransition>} />
          <Route path="/about/portfolio/" element={<PageTransition><PortfolioPage /></PageTransition>} />
          <Route path="/about/blog/" element={<PageTransition><PlaceholderPage title="Blog" description="Stay updated with the latest blog posts, trends, and best practices in AI, machine learning, and GPU optimization." /></PageTransition>} />
          <Route path="/about/career/" element={<PageTransition><CareersPage /></PageTransition>} />
          <Route path="/about/" element={<PageTransition><NewAboutUsPage /></PageTransition>} />
          
          {/* Placeholder routes */}
          <Route path="/careers/" element={<PageTransition><CareersPage /></PageTransition>} />
          <Route path="/careers/openings/" element={<PageTransition><CareerListingPage /></PageTransition>} />
          <Route path="/careers/apply/" element={<PageTransition><CareerApplicationPage /></PageTransition>} />
          <Route path="/news/" element={<PageTransition><PlaceholderPage title="News" description="Read the latest news, announcements, and press releases from Jashom." /></PageTransition>} />
          <Route path="/docs/" element={<PageTransition><PlaceholderPage title="Documentation" description="Technical documentation, API references, and implementation guides for Jashom's AI solutions." /></PageTransition>} />
          <Route path="/resources/" element={<PageTransition><PlaceholderPage title="Resources" description="Access whitepapers, research papers, and technical resources from Jashom's AI experts." /></PageTransition>} />
          <Route path="/api/" element={<PageTransition><PlaceholderPage title="API Reference" description="Complete API documentation and integration guides for Jashom's AI platform." /></PageTransition>} />
          
          {/* Policy Pages */}
          <Route path="/privacy/" element={<PageTransition><PrivacyPolicyPage /></PageTransition>} />
          <Route path="/terms/" element={<PageTransition><TermsOfServicePage /></PageTransition>} />
          <Route path="/cookies/" element={<PageTransition><CookiePolicyPage /></PageTransition>} />
          <Route path="/security/" element={<PageTransition><SecurityPolicyPage /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    // Load Tawk.to chat widget. SRI (integrity) is intentionally not used: the script is
    // hosted and updated by Tawk.to; a fixed hash would break when they deploy changes.
    const Tawk_API: any = (window as any).Tawk_API ?? {};
    const Tawk_LoadStart = new Date();
    (window as any).Tawk_API = Tawk_API;
    (window as any).Tawk_LoadStart = Tawk_LoadStart;

    (function () {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/699ecfbd8b10421c355a9f93/1jia5mv9u";
      s1.setAttribute("crossorigin", "anonymous");
      if (s0?.parentNode) {
        s0.parentNode.insertBefore(s1, s0);
      } else {
        document.head.appendChild(s1);
      }
    })();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-black text-white overflow-x-hidden max-w-full" style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
        <Navigation />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
