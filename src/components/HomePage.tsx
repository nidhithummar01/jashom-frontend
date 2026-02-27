import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO as Seo } from './SEO';
import { AnimatedCounter } from './AnimatedCounter';
import { useEffect, useRef, useState } from 'react';
import { getBlogs } from '../api/blogs';
import type { Blog } from '../api/blogs';
// COMMENTED OUT - Services temporarily hidden from UI but preserved in codebase
// import { ServicesSlider } from './ServicesSlider';
import {
  Cpu,
  Zap,
  Shield,
  Brain,
  TrendingUp,
  Users,
  ArrowRight,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SECTION_BG = '#0B0F14';
const BORDER_SUBTLE = 'rgba(255, 255, 255, 0.08)';
const BADGE_STYLE = { background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.25)' } as const;
const BADGE_TESTIMONIAL = { background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' } as const;

const ACCENT_COLOR = '#10B981';
const VIOLET_COLOR = '#7C3AED';
const TEXT_WHITE = '#FFFFFF';
const TEXT_FAFAFA = '#FAFAFA';
const TEXT_MUTED = '#9CA3AF';
const TEXT_GRAY = '#9E9E9E';
const TEXT_QUOTE = '#D1D5DB';
const TEXT_SUBTLE = '#6B7280';
const PORTFOLIO_IMG = '/images/portfolio';
const img = (file: string) => `${PORTFOLIO_IMG}/${file}`;
const GRADIENT_EMERALD_CYAN = 'linear-gradient(135deg, #10B981, #06B6D4)';
const CTA_GRADIENT_STYLE = { background: GRADIENT_EMERALD_CYAN, borderColor: 'transparent', color: TEXT_WHITE, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)' } as const;
const HEADING_TITLE_STYLE = { color: TEXT_FAFAFA, letterSpacing: '-0.025em', lineHeight: 1.2 } as const;
const FORM_LAYOUT = { display: 'flex' as const, flexDirection: 'column' as const, gap: '28px' } as const;
const FORM_GRID_GAP = { gap: '24px' } as const;
const FORM_MAX_WIDTH = { maxWidth: '1100px', margin: '0 auto' } as const;
const SUBMIT_BTN_HOVER = { boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)' } as const;
const GRADIENT_TEXT_STYLE = { background: GRADIENT_EMERALD_CYAN, WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const };
const BENEFIT_CARD_STYLE = { background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 100%)', borderColor: 'rgba(16, 185, 129, 0.2)', backdropFilter: 'blur(8px)' } as const;
const BENEFIT_ICON_BOX = { background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)' } as const;
const BLOG_CARD_BG = '#111827';
const BLOG_CARD_BORDER = '1px solid rgba(255, 255, 255, 0.08)';
const BLOG_BADGE_STYLE = { background: 'rgba(16, 185, 129, 0.15)', color: ACCENT_COLOR, border: '1px solid rgba(16, 185, 129, 0.3)', backdropFilter: 'blur(8px)' } as const;
const VIEW_ALL_BTN_STYLE = { background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)', color: TEXT_FAFAFA } as const;
const formInputClass = 'w-full px-4 py-3 rounded-xl border text-white placeholder-white/40 focus:border-[#10B981]/50 focus:outline-none focus:ring-1 focus:ring-[#10B981]/30 transition-all';
const formInputStyle = { background: 'rgba(255, 255, 255, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' } as const;
const formContainerStyle = {
  background: 'rgba(17, 24, 39, 0.6)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(14px)',
  padding: '48px 32px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
} as const;
const formGlowStyle = {
  background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 60%)',
  filter: 'blur(60px)',
  opacity: 0.6
} as const;
const submitButtonStyle = {
  background: GRADIENT_EMERALD_CYAN,
  border: '1px solid transparent',
  color: '#FFFFFF',
  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.25)'
} as const;
const LOGO_BASE_CLASS = 'w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300';

const homeContactFormFields: {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
}[] = [
  { id: 'home-contact-name', name: 'name', label: 'Name *', type: 'text', placeholder: 'John Doe', required: true },
  { id: 'home-contact-email', name: 'email', label: 'Email *', type: 'email', placeholder: 'john@company.com', required: true },
  { id: 'home-contact-company', name: 'company', label: 'Company', type: 'text', placeholder: 'Your Company' },
  { id: 'home-contact-phone', name: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 000-0000' },
  {
    id: 'home-contact-service',
    name: 'service',
    label: 'Service Interest',
    type: 'select',
    options: [
      { value: '', label: 'Select a service' },
      { value: 'gpu-optimization', label: 'GPU Optimization Service' },
      { value: 'cuda-development', label: 'CUDA Development Service' },
      { value: 'ai-ml', label: 'AI/ML Development' },
      { value: 'consulting', label: 'AI Consulting' },
    ],
  },
  { id: 'home-contact-message', name: 'message', label: 'Message *', type: 'textarea', placeholder: 'Tell us about your project...', required: true, rows: 4 },
];

function renderFormField(field: (typeof homeContactFormFields)[number]) {
  if (field.type === 'select') {
    return (
      <select id={field.id} name={field.name} className={formInputClass} style={formInputStyle}>
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#1A1A1A]">{opt.label}</option>
        ))}
      </select>
    );
  }
  if (field.type === 'textarea') {
    return (
      <textarea
        id={field.id}
        name={field.name}
        required={field.required}
        rows={field.rows ?? 4}
        className={`${formInputClass} resize-none`}
        style={formInputStyle}
        placeholder={field.placeholder}
      />
    );
  }
  return (
    <input
      id={field.id}
      type={field.type}
      name={field.name}
      required={field.required}
      className={formInputClass}
      style={formInputStyle}
      placeholder={field.placeholder}
    />
  );
}

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M10 18C10 15.7909 11.7909 14 14 14V10C9.58172 10 6 13.5817 6 18C6 20.2091 7.79086 22 10 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
    <path d="M22 18C22 15.7909 23.7909 14 26 14V10C21.5817 10 18 13.5817 18 18C18 20.2091 19.7909 22 22 22V18Z" fill={ACCENT_COLOR} opacity="0.3" />
  </svg>
);

const whatWeDoData = [
  { title: 'GPU Optimization', description: 'We provide dedicated GPU Optimization Services aimed at the maximum use of the compute efficiency. Our model will guarantee optimization in the use of hardware, the reduction of operational expenses, and coherent high-performance scale.', colorKey: 'emerald' as const },
  { title: 'CUDA Development', description: 'Our CUDA Development Services assist companies in developing high-performance parallel applications to suit their workloads with high demand. Our built-in kernel development-based team of CUDA Developers provides your apps with complete utilization of NVIDIA architecture.', colorKey: 'violet' as const },
];

const servicesProvideData = [
  { title: 'GPU Optimization Service', description: 'We optimize AI and compute workloads with the help of advanced GPU optimization, performance, efficiency, and hardware usage.', href: '/gpu-optimization-service/', Icon: Cpu, colorKey: 'emerald' as const, buttonStyle: { background: ACCENT_COLOR, color: TEXT_WHITE } },
  { title: 'CUDA Development Service', description: 'Hire skilled CUDA developers to create and optimize parallel advanced applications that meet your requirements.', href: '/cuda-development-service/', Icon: Zap, colorKey: 'violet' as const, buttonStyle: { background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', color: TEXT_WHITE } },
];

const trustedLogosData = [
  { src: '/logos/nvidia.png', alt: 'NVIDIA', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
  { src: '/logos/aws.png', alt: 'AWS', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
  { src: '/logos/goggle cloud.png', alt: 'Google Cloud', className: `h-10 sm:h-12 ${LOGO_BASE_CLASS}` },
  { src: '/logos/microsoft-azure.png', alt: 'Microsoft Azure', className: `h-12 sm:h-14 ${LOGO_BASE_CLASS}` },
];

const trustedMetricsData = [
  { value: '$20bn', description: 'worth investment portfolios managed', from: 'from-blue-500/10', to: 'to-blue-600/5', border: 'border-blue-500/20', hoverBorder: 'hover:border-blue-400/40', valueGradient: 'from-blue-400 to-blue-200' },
  { value: '10x', description: 'faster pharmaceutical market analytics', from: 'from-purple-500/10', to: 'to-purple-600/5', border: 'border-purple-500/20', hoverBorder: 'hover:border-purple-400/40', valueGradient: 'from-purple-400 to-purple-200' },
  { value: '20M+', description: 'customers enjoying AI-powered shopping', from: 'from-blue-500/10', to: 'to-cyan-600/5', border: 'border-cyan-500/20', hoverBorder: 'hover:border-cyan-400/40', valueGradient: 'from-cyan-400 to-cyan-200' },
  { value: '$50K', description: 'saved annually with DevOps', from: 'from-green-500/10', to: 'to-green-600/5', border: 'border-green-500/20', hoverBorder: 'hover:border-green-400/40', valueGradient: 'from-green-400 to-green-200' },
];

const testimonialsData = [
  { quote: '"Jashom\'s GPU optimization reduced our inference latency by 73%. The team\'s expertise in CUDA programming is unmatched."', initials: 'DC', name: 'David Chen', role: 'VP Engineering, Apex AI', avatarGradient: GRADIENT_EMERALD_CYAN },
  { quote: '"The AI automation solutions delivered by Jashom transformed our workflow. We achieved 5x faster processing with their custom ML pipeline."', initials: 'MR', name: 'Maria Rodriguez', role: 'CTO, DataFlow Systems', avatarGradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
  { quote: '"Outstanding DevSecOps implementation. Jashom\'s team integrated security seamlessly into our CI/CD pipeline without compromising speed."', initials: 'EW', name: 'Emily Watson', role: 'Head of Security, TechCorp', avatarGradient: 'linear-gradient(135deg, #10B981, #34D399)' },
];

const benefitsData = [
  { title: '10x GPU Performance Improvement', description: 'Architecture-sensitive tuning methods are used by us to reap the best out of NVIDIA GPUs, providing physical acceleration to AI applications.', Icon: Cpu },
  { title: 'Production-Grade AI Systems', description: 'Develop scalable systems that are designed with a focus on reliability, monitoring, and long-term performance.', Icon: Brain },
  { title: 'Enterprise-Level Security', description: 'Our operations are enforced under stringent security measures, compliance, and data protection models in order to secure essential workloads.', Icon: Shield },
  { title: 'Rapid Implementation Cycles', description: 'We satisfy the timeline requirements of projects through organized processes, which allow us to roll out faster and maintain the quality of performance.', Icon: Zap },
  { title: 'Dedicated Technical Support', description: 'Our experts have continued optimization, surveillance, and expert services that ensure that the system operates continuously.', Icon: Users },
  { title: 'Cost-Efficient Scaling', description: 'Our frameworks for designing GPU systems consider the demand of performance with functional efficiency to ensure the highest ROI in the long-term.', Icon: TrendingUp },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 10
    }
  }
};

function formatBlogDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function HomePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState<string | null>(null);

  useEffect(() => {
    getBlogs({ status: 'published', limit: 3 })
      .then(setLatestBlogs)
      .catch((e) => setBlogsError(e.message))
      .finally(() => setBlogsLoading(false));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to thank you page
    navigate('/thank-you/');
  };

  const portfolioProjects = [
    {
      title: 'BoostReferral - SaaS Platform',
      industry: 'SaaS',
      challenge: 'Businesses needed an automated solution to manage referral programs',
      solution: 'Comprehensive referral management platform with analytics',
      impact: ['Automated referral management', '99.9% platform uptime', 'Scalable SaaS architecture'],
      tags: ['SaaS Platform', 'Analytics', 'Automation'],
      image: img('boostreferral.jpg'),
      link: '/projects/boostreferral',
      liveUrl: 'https://www.boostreferral.com'
    },
    {
      title: 'ProjectSphere - Project Management Platform',
      industry: 'SaaS',
      challenge: 'Organizations need comprehensive project management tools',
      solution: 'Complete project management platform with real-time collaboration',
      impact: ['45% team efficiency', '30% faster delivery', '85% user adoption'],
      tags: ['Project Management', 'Collaboration', 'Analytics'],
      image: img('projectsphere.jpg'),
      link: '/projects/projectsphere'
    },
    {
      title: 'EnviroPulse - Environmental Monitoring',
      industry: 'Environmental Tech',
      challenge: 'Real-time monitoring across multiple zones needed',
      solution: 'IoT sensors with advanced analytics for environmental monitoring',
      impact: ['35% reduction in incidents', 'Real-time monitoring', 'Multi-zone tracking'],
      tags: ['IoT', 'Real-time Data', 'Analytics'],
      image: img('enviropulse.jpg'),
      link: '/projects/enviropulse',
      liveUrl: 'https://enviropulse.jashom.com'
    },
    {
      title: 'GreenSphere - ESG Platform',
      industry: 'ESG Platform',
      challenge: 'ESG metrics tracking and reporting challenges',
      solution: 'Comprehensive ESG tracking and reporting platform',
      impact: ['23% carbon reduction', '65% reporting efficiency', 'Automated reporting'],
      tags: ['ESG', 'Sustainability', 'Reporting'],
      image: img('greensphere.jpg'),
      link: '/projects/greensphere',
      liveUrl: 'https://greenesg.jashom.com/'
    },
    {
      title: 'EcoBot AI - Sustainability Assistant',
      industry: 'AI Platform',
      challenge: 'Organizations struggle with environmental regulations',
      solution: 'AI-powered sustainability assistant with instant responses',
      impact: ['40% reduced compliance issues', '60% better decisions', 'Instant responses'],
      tags: ['AI', 'NLP', 'Sustainability'],
      image: img('ecobot-ai.jpg'),
      link: '/projects/ecobot-ai',
      liveUrl: 'https://ecoai.jashom.com/dashboard'
    },
    {
      title: 'Jashom Health - Hospital System',
      industry: 'Healthcare',
      challenge: 'Multi-location healthcare with HIPAA compliance needed',
      solution: 'Comprehensive hospital management with real-time monitoring',
      impact: ['99.9% uptime', '40% reduced overhead', '100% HIPAA compliance'],
      tags: ['HIPAA', 'Healthcare', 'Real-time'],
      image: img('jashom-health.jpg'),
      link: '/projects/jashom-health',
      liveUrl: 'https://jashomhealth.jashom.com'
    },
    {
      title: 'Jashom Healthcare - Interoperability',
      industry: 'Healthcare',
      challenge: 'Healthcare systems in silos needed integration',
      solution: 'Seamless interoperability with HL7/FHIR protocols',
      impact: ['99.9% uptime', '35% reduced duplicates', '50+ partners integrated'],
      tags: ['HL7', 'FHIR', 'Integration'],
      image: img('jashom-healthcare.jpg'),
      link: '/projects/jashom-healthcare',
      liveUrl: 'https://jashomhealthcare.jashom.com'
    },
    {
      title: 'Jashom ICU Connect - Remote Monitoring',
      industry: 'Remote ICU',
      challenge: 'Rural hospitals lack access to specialist care',
      solution: 'Remote monitoring platform bridging rural hospitals and specialists',
      impact: ['40% reduced transfers', '15+ hospitals connected', '<30s response time'],
      tags: ['Remote Monitoring', 'Vital Signs', 'Collaboration'],
      image: img('jashom-icu-connect.jpg'),
      link: '/projects/jashom-icu-connect',
      liveUrl: 'https://jashomhealthcareplus.jashom.com'
    },
    {
      title: 'RAG.LU - AI Knowledge Platform',
      industry: 'AI Platform',
      challenge: 'Intelligent knowledge management needed',
      solution: 'RAG technology for knowledge management',
      impact: ['93% accuracy', '10x faster processing', 'AI transformation'],
      tags: ['RAG', 'AI', 'Knowledge Management'],
      image: img('rag-lu.ai.png'),
      link: '/projects/rag-lu',
      liveUrl: 'https://rag.lu'
    }
  ];

  const totalSlides = portfolioProjects.length;
  const maxSlide = totalSlides - cardsPerView;

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error('Video autoplay failed:', error);
      });
    }

    // Handle responsive cards per view
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerView(3); // Desktop: 3 cards
      } else if (width >= 640) {
        setCardsPerView(2); // Tablet: 2 cards
      } else {
        setCardsPerView(1); // Mobile: 1 card
      }
      setCurrentSlide(0); // Reset to start on resize
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < maxSlide;

  return (
    <>
      <Seo
        title="GPU Optimization Services & CUDA Development Company | Jashom"
        description="Jashom provides advanced GPU optimization, CUDA development, and high-performance computing solutions to accelerate AI, simulation, and enterprise workloads efficiently"
        keywords="GPU optimization, CUDA development, high-performance computing, AI acceleration, GPU consulting, CUDA experts"
      />

      <div className="home">
        <div className="min-h-screen" style={{ width: '100%', overflow: 'hidden', background: SECTION_BG }}>
          {/* Hero Section - Full Screen Edge-to-Edge */}
          <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ margin: 0, padding: 0, background: SECTION_BG }}>
            {/* Video Background - Full Screen Coverage */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              style={{
                pointerEvents: 'none',
                width: '100vw',
                height: '100vh',
                objectFit: 'cover'
              }}
            >
              <source src="/videos/bg.mp4" type="video/mp4" />
            </video>

            {/* Subtle Premium Gradient Overlay */}
            <div className="absolute inset-0 z-[1]" style={{
              background: 'radial-gradient(ellipse at center, rgba(11, 15, 20, 0.3) 0%, rgba(11, 15, 20, 0.5) 50%, rgba(11, 15, 20, 0.7) 100%)'
            }} />

            <div className="relative z-[10] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="inline-block mb-6 px-4 py-2 rounded-full border"
                  style={{
                    background: 'rgba(17, 24, 39, 0.4)',
                    backdropFilter: 'blur(12px)',
                    borderColor: 'rgba(16, 185, 129, 0.2)'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span style={{ color: TEXT_GRAY }}>Next-Gen AI Solutions</span>
                </motion.div>

                <motion.h1
                  className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-2 sm:px-0"
                  style={{
                    color: TEXT_FAFAFA,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Powering High-Performance AI with <span style={{
                    background: `linear-gradient(135deg, ${ACCENT_COLOR} 0%, ${VIOLET_COLOR} 50%, #06B6D4 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: 800
                  }}>Precision GPU Engineering</span>
                </motion.h1>

                <motion.p
                  className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
                  style={{
                    color: TEXT_GRAY,
                    lineHeight: 1.8,
                    textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  We assist companies in unleashing the power of the current hardware, whether it is through high-level optimization of graphics cards or scalable parallel computing. Our developers have expertise in NVIDIA GPU optimization, CUDA acceleration, and production-ready AI systems that are used to deliver quantifiable improvements.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    to="/contact/"
                    className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)]"
                    style={CTA_GRADIENT_STYLE}
                  >
                    Start Your AI Transformation
                  </Link>
                  <a
                    href="https://calendly.com/jaydave-jashom/new-meeting"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 hover:bg-white/10 hover:border-[rgba(16,185,129,0.4)] hover:-translate-y-px"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: TEXT_FAFAFA
                    }}
                  >
                    Schedule a Meeting
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* COMMENTED OUT - Services temporarily hidden from UI but preserved in codebase */}
          {/* <ServicesSlider /> */}

          {/* What We Do Section - PREMIUM */}
          <section
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, rgba(11, 15, 20, 0.95) 50%, #0B0F14 100%)',
              position: 'relative'
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div
                className="text-center mb-12 sm:mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: TEXT_FAFAFA, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.025em' }}>
                  What We <span style={{ color: ACCENT_COLOR }}>Do</span>
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {whatWeDoData.map((item) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '16, 185, 129' : '124, 58, 237';
                  const color = isEmerald ? ACCENT_COLOR : VIOLET_COLOR;
                  return (
                    <motion.div
                      key={item.title}
                      className="space-y-4 max-w-xl p-8 rounded-2xl transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, rgba(${rgb}, 0.05) 0%, rgba(${rgb}, 0.02) 100%)`,
                        border: `1px solid rgba(${rgb}, 0.1)`,
                        backdropFilter: 'blur(10px)'
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: `0 20px 60px rgba(${rgb}, 0.2)`,
                        borderColor: `rgba(${rgb}, 0.3)`
                      }}
                    >
                      <h3 className="text-xl sm:text-2xl font-bold" style={{ color, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>{item.title}</h3>
                      <p className="text-base sm:text-lg leading-loose" style={{ color: '#B0B0B0', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>{item.description}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Which Services We Provide Section - MATCHING REFERENCE IMAGE */}
          <section
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(5, 46, 44, 0.8) 0%, rgba(11, 15, 20, 0.95) 100%)',
              position: 'relative'
            }}
          >
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: ACCENT_COLOR }}>
                  Which Services We Provide
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT_MUTED }}>
                  Explore our specialized GPU and CUDA development services
                </p>
              </motion.div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {servicesProvideData.map((item, i) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '16, 185, 129' : '124, 58, 237';
                  const color = isEmerald ? ACCENT_COLOR : VIOLET_COLOR;
                  const Icon = item.Icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                      className="rounded-2xl p-6 transition-all duration-300 group relative w-full flex flex-col"
                      style={{ background: 'rgba(30, 41, 59, 0.6)', border: `1px solid rgba(${rgb}, 0.2)`, backdropFilter: 'blur(10px)' }}
                    >
                      <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center" style={{ background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.3)` }}>
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color }}>{item.title}</h3>
                      <p className="text-base mb-6 leading-relaxed" style={{ color: TEXT_MUTED }}>{item.description}</p>
                      <div className="w-full mt-auto text-right">
                        <a href={item.href} className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5" style={item.buttonStyle}>
                          Explore Service →
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Premium Divider */}
          <div className="premium-divider" />

          {/* Section-5: Trusted by Innovative Teams Worldwide */}
          <section
            className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(11, 15, 20, 0.95) 0%, rgba(5, 46, 44, 0.6) 50%, rgba(11, 15, 20, 0.95) 100%)'
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-2xl sm:text-3xl font-bold mb-12 sm:mb-16"
              >
                Trusted by Innovative Teams Worldwide
              </motion.h2>

              {/* Main Grid Container: 50% | 50% split - Force side-by-side on medium screens and up */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

                {/* LEFT SIDE - LOGOS (50%) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full flex items-center justify-center"
                >
                  {/* 2x2 Logo Grid - Clean and transparent */}
                  <div className="grid grid-cols-2 gap-8 sm:gap-10 md:gap-12">
                    {trustedLogosData.map((logo) => (
                      <motion.div
                        key={logo.alt}
                        className="flex items-center justify-center p-4"
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img src={logo.src} alt={logo.alt} className={logo.className} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* RIGHT SIDE - CONTENT (50%) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="w-full"
                >
                  {/* Heading with gradient */}
                  <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight mb-8 md:mb-10">
                    500+ clients served
                  </h3>

                  {/* Metrics Grid - 2 columns on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {trustedMetricsData.map((m) => (
                      <motion.div
                        key={m.value}
                        className={`space-y-2 p-4 rounded-xl bg-gradient-to-br ${m.from} ${m.to} border ${m.border} ${m.hoverBorder} transition-all duration-300`}
                        whileHover={{ scale: 1.02, y: -3 }}
                      >
                        <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${m.valueGradient} bg-clip-text text-transparent`}>{m.value}</div>
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed">{m.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { value: '500+', label: 'Projects Delivered' },
                  { value: '98%', label: 'Client Satisfaction' },
                  { value: '10x', label: 'Performance Gain' },
                  { value: '24/7', label: 'Support Available' }
                ].map((stat, index) => (
                  <AnimatedCounter
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    duration={2 + index * 0.2}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Slider Section - Controlled Carousel */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30">
                  <span className="text-[#d1d5db] text-sm">OUR PORTFOLIO</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">
                  Our Portfolio
                </h2>
                <p className="text-white/70 max-w-3xl mx-auto">
                  See real-world applications in which advanced optimization of the GPU and tailored CUDA engineering improved performance standards and business speed.
                </p>
              </motion.div>

              {/* Controlled Carousel Container */}
              <div className="relative">
                {/* Left Arrow - Responsive positioning */}
                <button
                  onClick={goToPrev}
                  disabled={!canGoPrev}
                  className={`absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${canGoPrev
                    ? 'bg-blue-500 hover:bg-cyan-600 cursor-pointer shadow-2xl'
                    : 'bg-gray-700 cursor-not-allowed opacity-50'
                    }`}
                  aria-label="Previous slide"
                  type="button"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} />
                </button>

                {/* Right Arrow - Responsive positioning */}
                <button
                  onClick={goToNext}
                  disabled={!canGoNext}
                  className={`absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${canGoNext
                    ? 'bg-blue-500 hover:bg-cyan-600 cursor-pointer shadow-2xl'
                    : 'bg-gray-700 cursor-not-allowed opacity-50'
                    }`}
                  aria-label="Next slide"
                  type="button"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={3} />
                </button>

                {/* Carousel Wrapper - Overflow Hidden with responsive padding */}
                <div className="overflow-hidden px-12 sm:px-14 lg:px-16">
                  {/* Carousel Track - Transform Based */}
                  <div
                    className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / cardsPerView + (cardsPerView === 1 ? 0 : 24 / cardsPerView))}%)`
                    }}
                  >
                    {portfolioProjects.map((project) => (
                      <div
                        key={project.link}
                        className="flex-shrink-0"
                        style={{
                          width: cardsPerView === 1
                            ? '100%'
                            : `calc(${100 / cardsPerView}% - ${(24 * (cardsPerView - 1)) / cardsPerView}px)`
                        }}
                      >
                        <div className="glass-effect rounded-2xl border border-[#ffffff]/30 h-full flex flex-col hover:border-[#ffffff]/50 transition-all duration-300 group overflow-hidden">
                          {/* Image - Edge-to-edge at top with increased height */}
                          {project.image && (
                            <div className="relative w-full overflow-hidden" style={{ height: '200px' }}>
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {/* Subtle gradient overlay for depth */}
                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%)'
                                }}
                              />
                            </div>
                          )}

                          {/* Content section with padding */}
                          <div className="p-3 sm:p-4 flex flex-col flex-grow">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 rounded-md bg-white/10 text-white/70 text-xs">
                                {project.industry}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#d1d5db] transition-colors line-clamp-2">
                              {project.title}
                            </h3>

                            <div className="space-y-2 mb-3 flex-grow">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
                                  <span className="text-[#d1d5db] text-xs font-medium">Challenge</span>
                                </div>
                                <p className="text-white/60 text-xs leading-relaxed pl-3 line-clamp-2">{project.challenge}</p>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffffff]" />
                                  <span className="text-[#d1d5db] text-xs font-medium">Solution</span>
                                </div>
                                <p className="text-white/60 text-xs leading-relaxed pl-3 line-clamp-2">{project.solution}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={`${project.title}-${tag}`}
                                  className="px-2 py-0.5 rounded-md bg-white/5 border border-[#ffffff]/10 text-white/50 text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Action Links */}
                            <div className="flex flex-row flex-wrap items-center justify-between gap-3 mt-3 pt-4 border-t border-white/10">
                              <Link
                                to={project.link}
                                className="inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors text-xs group/link"
                              >
                                <span>View Case Study</span>
                                <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-[#ffffff] hover:text-[#d1d5db] transition-colors text-xs"
                                >
                                  <span>Visit Live Platform</span>
                                  <ArrowRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* View All Button */}
              <div className="text-center mt-8">
                <Link
                  to="/portfolio/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  View All Projects
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Premium Minimal Testimonials Section */}
          <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: SECTION_BG }}>
            <div className="max-w-7xl mx-auto">

              {/* Section Header - Centered */}
              <motion.div
                className="text-center mb-16 sm:mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="inline-block mb-4 px-4 py-2 rounded-full border"
                  style={BADGE_TESTIMONIAL}
                >
                  <span style={{ color: ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Client Testimonials</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={HEADING_TITLE_STYLE}>
                  What Our Clients Say
                </h2>

                <p className="text-lg max-w-2xl mx-auto" style={{ color: TEXT_MUTED, lineHeight: 1.7 }}>
                  The industry leaders are banking on our CUDA and GPU engineering skills to get the compute workloads on high throughput, enhance AI responsiveness, and implement stable high-performance units with results that can be measured.
                </p>
              </motion.div>

              {/* Testimonials Grid - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {testimonialsData.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-2xl border transition-all duration-300" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: BORDER_SUBTLE, backdropFilter: 'blur(10px)' }}>
                      <div className="mb-4"><QuoteIcon /></div>
                      <p className="text-base mb-8" style={{ color: TEXT_QUOTE, lineHeight: 1.8 }}>{t.quote}</p>
                      <div className="flex items-center gap-4 mt-4 pt-8 border-t" style={{ borderColor: BORDER_SUBTLE }}>
                        <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: t.avatarGradient }}>{t.initials}</div>
                        <div>
                          <div className="font-semibold text-[15px]" style={{ color: TEXT_FAFAFA }}>{t.name}</div>
                          <div className="text-[13px]" style={{ color: TEXT_MUTED }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Jashom - Benefits Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${BLOG_CARD_BG} 0%, ${SECTION_BG} 100%)` }}>
            {/* Subtle background glow */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block mb-4 px-6 py-2 rounded-full border" style={BADGE_STYLE}>
                  <span style={{ color: ACCENT_COLOR, fontWeight: 600 }}>Why Choose Jashom?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                  Why Choose <span style={{ color: ACCENT_COLOR }}>Jashom</span>?
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg" style={{ color: TEXT_GRAY, lineHeight: 1.8 }}>
                  Experience the Jashom advantage with cutting-edge GPU optimization and CUDA development solutions
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {benefitsData.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={staggerItem}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:border-[rgba(16,185,129,0.4)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                      style={BENEFIT_CARD_STYLE}
                    >
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={BENEFIT_ICON_BOX}>
                          <Icon className="w-8 h-8" style={{ color: ACCENT_COLOR }} />
                        </div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: TEXT_FAFAFA }}>{item.title}</h3>
                        <p className="leading-relaxed" style={{ color: TEXT_GRAY, lineHeight: 1.8 }}>{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Bottom CTA */}
              <motion.div
                className="text-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-0 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(16,185,129,0.6)]"
                  style={CTA_GRADIENT_STYLE}
                >
                  <span>Start Your AI Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Premium Divider */}
          <div className="premium-divider" />

          {/* Latest Blogs Section */}
          <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0B0F14' }}>
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
              <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="inline-block mb-4 px-4 py-2 rounded-full border"
                    style={BADGE_STYLE}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span style={{ color: ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Resources</span>
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                    Our Latest <span style={{ color: ACCENT_COLOR }}>Blogs</span>
                  </h2>
                </div>
              </motion.div>

              {/* Blog Cards Grid - from API */}
              {blogsLoading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-full rounded-2xl overflow-hidden animate-pulse"
                      style={{ background: BLOG_CARD_BG, border: BLOG_CARD_BORDER }}
                    >
                      <div className="h-48 bg-[#1E293B]" />
                      <div className="p-6 space-y-3">
                        <div className="h-5 bg-[#1E293B] rounded w-3/4" />
                        <div className="h-4 bg-[#1E293B] rounded w-full" />
                        <div className="h-4 bg-[#1E293B] rounded w-2/3" />
                        <div className="flex gap-4 mt-4">
                          <div className="h-3 bg-[#1E293B] rounded w-20" />
                          <div className="h-3 bg-[#1E293B] rounded w-16" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {blogsError && (
                <div className="text-center py-12 mb-8" style={{ color: TEXT_MUTED }}>
                  Unable to load latest blogs. Try again later.
                </div>
              )}
              {!blogsLoading && !blogsError && latestBlogs.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {latestBlogs.map((blog, index) => (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      className="group"
                    >
                      <Link to={`/blogs/${blog.slug}/`} className="block h-full" style={{ ['--accent' as string]: ACCENT_COLOR } as React.CSSProperties}>
                        <div
                          className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                          style={{ background: BLOG_CARD_BG, border: BLOG_CARD_BORDER }}
                        >
                          {/* Image Section */}
                          <div className="relative h-48 overflow-hidden" style={{ background: '#1E293B' }}>
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                              style={{
                                backgroundImage: blog.featured_image_url ? `url(${blog.featured_image_url})` : 'none',
                                opacity: blog.featured_image_url ? 0.4 : 0
                              }}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0" style={{
                              background: 'linear-gradient(180deg, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 1) 100%)'
                            }} />

                            {/* Category Badge */}
                            <div className="absolute top-4 left-4">
                              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={BLOG_BADGE_STYLE}>
                                Blog
                              </div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-6">
                            <h3 className="text-lg font-bold mb-3 line-clamp-2 transition-colors duration-240 group-hover:text-[var(--accent)]" style={{
                              color: TEXT_FAFAFA,
                              lineHeight: 1.4
                            }}>
                              {blog.title}
                            </h3>

                            <p className="text-sm mb-4 line-clamp-2" style={{
                              color: TEXT_MUTED,
                              lineHeight: 1.6
                            }}>
                              {blog.excerpt ?? ''}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: TEXT_SUBTLE }}>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formatBlogDate(blog.published_at)}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>— min read</span>
                              </div>
                            </div>

                            {/* Read More Link */}
                            <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-240" style={{ color: ACCENT_COLOR }}>
                              <span>Read More</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-240 group-hover:translate-x-1" />
                            </div>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                            background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.02) 100%)'
                          }} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
              {!blogsLoading && !blogsError && latestBlogs.length === 0 && (
                <div className="text-center py-12 mb-8" style={{ color: TEXT_MUTED }}>
                  No blogs yet.
                </div>
              )}

              {/* View All Button - below cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link
                  to="/blogs/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-240 hover:bg-[rgba(16,185,129,0.18)] hover:border-[rgba(16,185,129,0.5)] hover:-translate-y-0.5"
                  style={VIEW_ALL_BTN_STYLE}
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Premium Divider */}
          <div className="premium-divider" />

          {/* Contact Form Section - Premium Layout */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${SECTION_BG} 0%, ${BLOG_CARD_BG} 100%)` }}>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-block mb-6 px-4 py-2 rounded-full border"
                  style={BADGE_STYLE}
                >
                  <span style={{ color: ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Get In Touch</span>
                </motion.div>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                  style={{ color: TEXT_FAFAFA, letterSpacing: '-0.025em' }}
                >
                  Let's Build High-Performance{' '}
                  <span style={GRADIENT_TEXT_STYLE}>
                    AI Systems
                  </span>
                </h2>

                <p
                  className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
                  style={{ color: TEXT_MUTED }}
                >
                  Hire CUDA Developers today to experience highly accurate solutions to suit your goals.
                </p>
              </motion.div>

              {/* Form Container - Centered with max-width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
                style={FORM_MAX_WIDTH}
              >
                <div className="absolute inset-0 pointer-events-none" style={formGlowStyle} />

                <div className="relative w-full" style={formContainerStyle}>
                  <form onSubmit={handleFormSubmit} style={FORM_LAYOUT}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={FORM_GRID_GAP}>
                      {homeContactFormFields.map((field) => (
                        <div key={field.id} className={field.type === 'select' || field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label htmlFor={field.id} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                          {renderFormField(field)}
                        </div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center sm:justify-start">
                      <motion.button
                        type="submit"
                        className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                        style={submitButtonStyle}
                        whileHover={{ y: -2, ...SUBMIT_BTN_HOVER }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="glass-effect rounded-2xl p-6 sm:p-8 md:p-12 border border-[#ffffff]/30 text-center relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/10 to-[#d1d5db]/10 pointer-events-none" />

                <div className="relative z-10">
                  <h2 className="mb-3 sm:mb-4 text-gradient text-xl sm:text-2xl md:text-3xl px-2">Ready to Accelerate Your AI Journey?</h2>
                  <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
                    Join hundreds of forward-thinking companies leveraging Jashom's AI expertise
                    to drive innovation and achieve unprecedented business outcomes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                    <Link
                      to="/contact/"
                      className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-black border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm sm:text-base cursor-pointer"
                    >
                      Request a Demo
                    </Link>
                    <Link
                      to="/portfolio/"
                      className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/5 border border-[#ffffff]/30 text-white hover:bg-white/10 transition-all duration-300 text-sm sm:text-base cursor-pointer"
                    >
                      View Case Studies
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

