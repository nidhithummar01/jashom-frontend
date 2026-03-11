import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SEO as Seo } from './SEO';
import { AnimatedCounter } from './AnimatedCounter';
import { useEffect, useRef, useState } from 'react';
import { getBlogs } from '../api/blogs';
import type { Blog } from '../api/blogs';
// COMMENTED OUT - Services temporarily hidden from UI but preserved in codebase
// import { ServicesSlider } from './ServicesSlider';
import {
  ArrowRight,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import * as Theme from '../constants/theme';
import { SHOW_BLOG_SECTION } from '../config/featureFlags';
import { QuoteIcon, renderServiceFormField, useHomeContactForm } from './ServicePageShared';
import { homePageData, formatBlogDate } from './HomePage/data';

export function HomePage() {
  const { formData, handleFormSubmit, handleFormChange } = useHomeContactForm();
  const videoRef = useRef<HTMLVideoElement>(null);
  /* Read from HTML script so desktop has video from first paint; mobile stays no-video */
  const [isMobile, setIsMobile] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.mobile === '1'
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [blogsError, setBlogsError] = useState<string | null>(null);

  useEffect(() => {
    if (!SHOW_BLOG_SECTION) {
      setBlogsLoading(false);
      return;
    }
    getBlogs({ status: 'published', limit: 3 })
      .then(setLatestBlogs)
      .catch((e) => setBlogsError(e.message))
      .finally(() => setBlogsLoading(false));
  }, []);

  const totalSlides = homePageData.portfolioProjects.length;
  const maxSlide = totalSlides - cardsPerView;

  useEffect(() => {
    // Handle responsive cards per view and mobile detection
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 640;
      if (document.documentElement) document.documentElement.dataset.mobile = mobile ? '1' : '';
      if (width >= 1024) {
        setCardsPerView(3);
        setIsMobile(false);
      } else if (width >= 640) {
        setCardsPerView(2);
        setIsMobile(false);
      } else {
        setCardsPerView(1);
        setIsMobile(true);
      }
      setCurrentSlide(0);
    };

    handleResize();

    // Only attempt to autoplay video on non-mobile devices
    const video = videoRef.current;
    if (video && !isMobile) {
      video.play().catch((error) => {
        console.error('Video autoplay failed:', error);
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const goToNext = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < maxSlide;

  const corporationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Jashom Technologies',
    alternateName: 'Jashom',
    url: 'https://www.jashom.com/',
    logo: 'https://www.jashom.com/jashom-logo-header-70px.png',
    sameAs: [
      'https://www.instagram.com/jashomtechnologies_',
      'https://www.linkedin.com/company/jashom/',
      'https://www.jashom.com/',
      'https://youtube.com/@infojashom',
      'https://reddit.com/r/jashom'
    ]
  };

  const webSiteSchema = {
    '@context': 'https://schema.org/',
    '@type': 'WebSite',
    name: 'jashom',
    url: 'https://www.jashom.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.jashom.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(corporationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webSiteSchema)}</script>
      </Helmet>
      <Seo
        title="GPU Optimization Services & CUDA Development Company | Jashom"
        description="Jashom provides advanced GPU optimization, CUDA development, and high-performance computing solutions to accelerate AI, simulation, and enterprise workloads efficiently."
        keywords="GPU optimization, CUDA development, high-performance computing, AI acceleration, GPU consulting, CUDA experts"
      />

      <div className="home">
        <div className="min-h-screen" style={{ width: '100%', overflow: 'hidden', background: Theme.SECTION_BG }}>
          {/* Hero Section - Full Screen Edge-to-Edge */}
          <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ margin: 0, padding: 0, background: Theme.SECTION_BG }}>
          {/* Video Background - desktop/tablet only to improve mobile performance */}
          {!isMobile && (
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
          )}

            {/* Subtle Premium Gradient Overlay */}
            <div className="absolute inset-0 z-[1]" style={{
              background: 'radial-gradient(ellipse at center, rgba(11, 15, 20, 0.3) 0%, rgba(11, 15, 20, 0.5) 50%, rgba(11, 15, 20, 0.7) 100%)'
            }} />

            <div className="relative z-[10] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              {isMobile ? (
                /* Mobile: static hero for faster LCP and lower TBT (no motion) */
                <div>
                  <div
                    className="inline-block mb-6 px-4 py-2 rounded-full border"
                    style={{
                      background: 'rgba(17, 24, 39, 0.4)',
                      backdropFilter: 'blur(12px)',
                      borderColor: 'rgba(34, 211, 238, 0.2)'
                    }}
                  >
                    <span style={{ color: Theme.TEXT_GRAY }}>Next-Gen AI Solutions</span>
                  </div>
                  <h1
                    className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-2 sm:px-0"
                    style={{
                      color: Theme.TEXT_FAFAFA,
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.15
                    }}
                  >
                    GPU Optimization Services
                  </h1>
                  <p
                    className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
                    style={{
                      color: Theme.TEXT_GRAY,
                      lineHeight: 1.8,
                      textShadow: '0 2px 10px rgba(0,0,0,0.9)'
                    }}
                  >
                    We assist companies in unleashing the power of the current hardware, whether it is through high-level optimization of graphics cards or scalable parallel computing. Our developers have expertise in NVIDIA GPU optimization, CUDA acceleration, and production-ready AI systems that are used to deliver quantifiable improvements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0">
                    <Link
                      to="/contact/"
                      className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(34,211,238,0.6)]"
                      style={homePageData.CTA_GRADIENT_STYLE}
                    >
                      Start Your AI Transformation
                    </Link>
                    <a
                      href="https://calendly.com/jaydave-jashom/new-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 hover:bg-white/10 hover:border-[rgba(34,211,238,0.4)] hover:-translate-y-px"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        color: Theme.TEXT_FAFAFA
                      }}
                    >
                      Schedule a Meeting
                    </a>
                  </div>
                </div>
              ) : (
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
                      borderColor: 'rgba(34, 211, 238, 0.2)'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span style={{ color: Theme.TEXT_GRAY }}>Next-Gen AI Solutions</span>
                  </motion.div>

                  <motion.h1
                    className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-2 sm:px-0"
                    style={{
                      color: Theme.TEXT_FAFAFA,
                      fontWeight: 700,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.15
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    GPU Optimization Services
                  </motion.h1>

                  <motion.p
                    className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
                    style={{
                      color: Theme.TEXT_GRAY,
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
                      className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 font-semibold hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(34,211,238,0.6)]"
                      style={homePageData.CTA_GRADIENT_STYLE}
                    >
                      Start Your AI Transformation
                    </Link>
                    <a
                      href="https://calendly.com/jaydave-jashom/new-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-auto max-w-xs px-6 sm:px-8 py-3 sm:py-4 rounded-xl border text-center text-sm sm:text-base cursor-pointer transition-all duration-240 hover:bg-white/10 hover:border-[rgba(34,211,238,0.4)] hover:-translate-y-px"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'rgba(255, 255, 255, 0.12)',
                        color: Theme.TEXT_FAFAFA
                      }}
                    >
                      Schedule a Meeting
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </section>

          {/* COMMENTED OUT - Services temporarily hidden from UI but preserved in codebase */}
          {/* <ServicesSlider /> */}

          {/* What We Do Section - PREMIUM */}
          <section
            className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(34, 211, 238, 0.15) 0%, rgba(11, 15, 20, 0.95) 50%, #0B0F14 100%)',
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: Theme.TEXT_FAFAFA, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.025em' }}>
                  What We <span style={{ color: Theme.ACCENT_COLOR }}>Do</span>
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {homePageData.whatWeDoData.map((item) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '34, 211, 238' : '124, 58, 237';
                  const color = isEmerald ? Theme.ACCENT_COLOR : homePageData.VIOLET_COLOR;
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: Theme.ACCENT_COLOR }}>
                  Which Services We Provide
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED }}>
                  Explore our specialized GPU and CUDA development services
                </p>
              </motion.div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {homePageData.servicesProvideData.map((item, i) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '34, 211, 238' : '124, 58, 237';
                  const color = isEmerald ? Theme.ACCENT_COLOR : homePageData.VIOLET_COLOR;
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
                      <p className="text-base mb-6 leading-relaxed" style={{ color: Theme.TEXT_MUTED }}>{item.description}</p>
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
                    {homePageData.trustedLogosData.map((logo) => (
                      <motion.div
                        key={logo.alt}
                        className="flex items-center justify-center p-4"
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <img src={logo.src} alt={logo.alt} width={128} height={48} className={logo.className} />
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
                    25+ clients, 50+ Projects delivered
                  </h3>

                  {/* Metrics Grid - 2 columns on larger screens */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {homePageData.trustedMetricsData.map((m) => (
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
                {homePageData.statsData.map((stat, index) => (
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

          {/* Case Studies Slider Section - Controlled Carousel */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-visible">
            <div className="max-w-7xl mx-auto relative">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block mb-4 px-4 py-2 rounded-full glass-effect border border-[#ffffff]/30">
                  <span className="text-[#d1d5db] text-sm">CASE STUDIES</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gradient mb-4">
                  Case Studies
                </h2>
                <p className="text-white/70 max-w-3xl mx-auto">
                  See real-world applications in which advanced optimization of the GPU and tailored CUDA engineering improved performance standards and business speed.
                </p>
              </motion.div>

              {/* Controlled Carousel: arrows in flow so they are always visible */}
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Left Arrow - in document flow, always visible */}
                <button
                  onClick={goToPrev}
                  disabled={!canGoPrev}
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/30 shadow-xl ${canGoPrev
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white cursor-pointer hover:scale-110 active:scale-95'
                    : 'bg-gray-700 text-white/50 cursor-not-allowed opacity-60'
                    }`}
                  aria-label="Previous slide"
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                </button>

                {/* Carousel Wrapper */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  {/* Carousel Track - Transform Based */}
                  <div
                    className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentSlide * (100 / cardsPerView + (cardsPerView === 1 ? 0 : 24 / cardsPerView))}%)`
                    }}
                  >
                    {homePageData.portfolioProjects.map((project) => (
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
                                width={400}
                                height={200}
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

                {/* Right Arrow - in document flow, always visible */}
                <button
                  onClick={goToNext}
                  disabled={!canGoNext}
                  className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white/30 shadow-xl ${canGoNext
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-white cursor-pointer hover:scale-110 active:scale-95'
                    : 'bg-gray-700 text-white/50 cursor-not-allowed opacity-60'
                  }`}
                  aria-label="Next slide"
                  type="button"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
                </button>
              </div>

              {/* View All Button */}
              <div className="text-center mt-8">
                <Link
                  to="/portfolio/"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  View All Case Studies
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Premium Minimal Testimonials Section */}
          <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: Theme.SECTION_BG }}>
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
                  style={Theme.BADGE_TESTIMONIAL}
                >
                  <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Client Testimonials</span>
                </motion.div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={Theme.HEADING_TITLE_STYLE}>
                  What Our Clients Say
                </h2>

                <p className="text-lg max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.7 }}>
                  The industry leaders are banking on our CUDA and GPU engineering skills to get the compute workloads on high throughput, enhance AI responsiveness, and implement stable high-performance units with results that can be measured.
                </p>
              </motion.div>

              {/* Testimonials Grid - 3 Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {homePageData.testimonialsData.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                    className="group"
                  >
                    <div className="h-full p-8 rounded-2xl border transition-all duration-300" style={{ background: 'rgba(255, 255, 255, 0.02)', borderColor: Theme.BORDER_SUBTLE, backdropFilter: 'blur(10px)' }}>
                      <div className="mb-4"><QuoteIcon /></div>
                      <p className="text-base mb-8" style={{ color: Theme.TEXT_QUOTE, lineHeight: 1.8 }}>{t.quote}</p>
                      <div className="flex items-center gap-4 mt-4 pt-8 border-t" style={{ borderColor: Theme.BORDER_SUBTLE }}>
                        <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white" style={{ background: t.avatarGradient }}>{t.initials}</div>
                        <div>
                          <div className="font-semibold text-[15px]" style={{ color: Theme.TEXT_FAFAFA }}>{t.name}</div>
                          <div className="text-[13px]" style={{ color: Theme.TEXT_MUTED }}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Jashom - Benefits Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${homePageData.BLOG_CARD_BG} 0%, ${Theme.SECTION_BG} 100%)` }}>
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
                <div className="inline-block mb-4 px-6 py-2 rounded-full border" style={Theme.BADGE_STYLE}>
                  <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600 }}>Why Choose Jashom?</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                  Why Choose <span style={{ color: Theme.ACCENT_COLOR }}>Jashom</span>?
                </h2>
                <p className="max-w-2xl mx-auto text-base sm:text-lg" style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}>
                  Experience the Jashom advantage with cutting-edge GPU optimization and CUDA development solutions
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={Theme.STAGGER_CONTAINER}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {homePageData.benefitsData.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <motion.div
                      key={item.title}
                      variants={Theme.STAGGER_ITEM}
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="group relative rounded-2xl p-8 border cursor-pointer overflow-hidden transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                      style={homePageData.BENEFIT_CARD_STYLE}
                    >
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300" style={homePageData.BENEFIT_ICON_BOX}>
                          <Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
                        </div>
                        <h3 className="text-xl font-bold mb-3" style={{ color: Theme.TEXT_FAFAFA }}>{item.title}</h3>
                        <p className="leading-relaxed" style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}>{item.description}</p>
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
                  to="/contact/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer border-0 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(34,211,238,0.6)]"
                  style={homePageData.CTA_GRADIENT_STYLE}
                >
                  <span>Start Your AI Transformation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Premium Divider */}
          <div className="premium-divider" />

          {/* Latest Blogs Section - hidden when SHOW_BLOG_SECTION is false; enable in src/config/featureFlags.ts when you have blogs */}
          {SHOW_BLOG_SECTION && (
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
                    style={Theme.BADGE_STYLE}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Resources</span>
                  </motion.div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                    Our Latest <span style={{ color: Theme.ACCENT_COLOR }}>Blogs</span>
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
                      style={{ background: homePageData.BLOG_CARD_BG, border: homePageData.BLOG_CARD_BORDER }}
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
                <div className="text-center py-12 mb-8" style={{ color: Theme.TEXT_MUTED }}>
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
                      <Link to={`/blogs/${blog.slug}/`} className="block h-full" style={{ ['--accent' as string]: Theme.ACCENT_COLOR } as React.CSSProperties}>
                        <div
                          className="relative h-full min-h-[320px] rounded-2xl overflow-hidden transition-all duration-500 group-hover:scale-[1.02] flex flex-col"
                          style={{
                            background: blog.featured_image_url ? undefined : homePageData.BLOG_CARD_BG,
                            border: homePageData.BLOG_CARD_BORDER,
                            ...(blog.featured_image_url ? {
                              backgroundImage: `url(${blog.featured_image_url})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            } : {})
                          }}
                        >
                          {/* Dark overlay so text is readable (hero/detail image as full card BG) */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background: blog.featured_image_url
                                ? 'linear-gradient(180deg, rgba(11, 15, 20, 0.7) 0%, rgba(11, 15, 20, 0.88) 50%, rgba(11, 15, 20, 0.96) 100%)'
                                : 'none'
                            }}
                          />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold" style={homePageData.BLOG_BADGE_STYLE}>
                              Blog
                            </div>
                          </div>

                          {/* Content Section - on top of overlay */}
                          <div className="relative z-10 flex flex-col flex-1 p-6 pt-14">
                            <h3 className="text-lg font-bold mb-3 line-clamp-2 transition-colors duration-240 group-hover:text-[var(--accent)]" style={{
                              color: Theme.TEXT_FAFAFA,
                              lineHeight: 1.4
                            }}>
                              {blog.title}
                            </h3>

                            <p className="text-sm mb-4 line-clamp-2" style={{
                              color: Theme.TEXT_MUTED,
                              lineHeight: 1.6
                            }}>
                              {blog.excerpt ?? ''}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: Theme.TEXT_SUBTLE }}>
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
                            <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-240" style={{ color: Theme.ACCENT_COLOR }}>
                              <span>Read More</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-240 group-hover:translate-x-1" />
                            </div>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                            background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.05) 0%, rgba(34, 211, 238, 0.02) 100%)'
                          }} />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
              {!blogsLoading && !blogsError && latestBlogs.length === 0 && (
                <div className="text-center py-12 mb-8" style={{ color: Theme.TEXT_MUTED }}>
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-240 hover:bg-[rgba(34,211,238,0.18)] hover:border-[rgba(34,211,238,0.5)] hover:-translate-y-0.5"
                  style={homePageData.VIEW_ALL_BTN_STYLE}
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </section>
          )}

          {/* Premium Divider - only when blog section was shown, avoid double divider; keep one for next section */}
          {SHOW_BLOG_SECTION && <div className="premium-divider" />}

          {/* Contact Form Section - Premium Layout */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${Theme.SECTION_BG} 0%, ${homePageData.BLOG_CARD_BG} 100%)` }}>
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
                  style={Theme.BADGE_STYLE}
                >
                  <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Get In Touch</span>
                </motion.div>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                  style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}
                >
                  Let's Build High-Performance{' '}
                  <span style={Theme.GRADIENT_TEXT_STYLE}>
                    AI Systems
                  </span>
                </h2>

                <p
                  className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto"
                  style={{ color: Theme.TEXT_MUTED }}
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
                style={Theme.FORM_MAX_WIDTH}
              >
                <div className="absolute inset-0 pointer-events-none" style={Theme.FORM_GLOW_STYLE} />

                <div className="relative w-full" style={Theme.FORM_CONTAINER_STYLE}>
                  <form onSubmit={handleFormSubmit} style={Theme.FORM_LAYOUT}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={Theme.FORM_GRID_GAP}>
                      {homePageData.homeContactFormFields.map((field) => (
                        <div key={field.name} className={field.type === 'select' || field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label htmlFor={`home-contact-${field.name}`} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                          {renderServiceFormField('home-contact', field, formData, handleFormChange)}
                        </div>
                      ))}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center sm:justify-start">
                      <motion.button
                        type="submit"
                        className="px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
                        style={Theme.SUBMIT_BTN_STYLE}
                        whileHover={{ y: -2, ...Theme.SUBMIT_BTN_HOVER }}
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
                    <a
                      href="https://calendly.com/jaydave-jashom/new-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-black border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-sm sm:text-base cursor-pointer"
                    >
                      Request a Demo
                    </a>
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

