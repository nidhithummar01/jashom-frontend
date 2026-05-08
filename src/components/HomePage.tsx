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
  ChevronRight,
  Sparkles,
  Cpu,
  Zap
} from 'lucide-react';
import * as Theme from '../constants/theme';
import { SHOW_BLOG_SECTION } from '../config/featureFlags';
import { QuoteIcon, renderServiceFormField, useHomeContactForm } from './ServicePageShared';
import { homePageData, formatBlogDate } from './HomePage/data';

export function HomePage() {
  const { formData, handleFormSubmit, handleFormChange, submitting: homeContactSubmitting, submitError: homeContactError } = useHomeContactForm();
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

  const HERO_BADGE_STYLE = {
    background: 'rgba(17, 24, 39, 0.4)',
    backdropFilter: 'blur(12px)',
    borderColor: 'rgba(34, 211, 238, 0.2)',
  } as const;
  const HERO_TITLE_STYLE = {
    color: Theme.TEXT_FAFAFA,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
  } as const;
  const HERO_DESC_STYLE = {
    color: Theme.TEXT_GRAY,
    lineHeight: 1.8,
    textShadow: '0 2px 10px rgba(0,0,0,0.9)',
  } as const;
  const HERO_DESCRIPTION =
    'We assist companies in unleashing the power of the current hardware, whether it is through high-level optimization of graphics cards or scalable parallel computing. Our developers have expertise in NVIDIA GPU optimization, CUDA acceleration, and production-ready AI systems that are used to deliver quantifiable improvements.';

  function renderHeroContent(animated: boolean) {
    const Badge = animated ? motion.div : 'div';
    const Title = animated ? motion.h1 : 'h1';
    const Desc = animated ? motion.p : 'p';
    const Ctas = animated ? motion.div : 'div';

    return (
      <div>
        <Badge
          className="inline-block mb-6 px-4 py-2 rounded-full border"
          style={HERO_BADGE_STYLE}
          {...(animated
            ? { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 } }
            : {})}
        >
          <span style={{ color: Theme.TEXT_GRAY }}>Next-Gen AI Solutions</span>
        </Badge>

        <Title
          className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-2 sm:px-0"
          style={HERO_TITLE_STYLE}
          {...(animated
            ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 } }
            : {})}
        >
          Powering High-Performance AI with Precision GPU Engineering
        </Title>

        <Desc
          className="mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0"
          style={HERO_DESC_STYLE}
          {...(animated ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 } } : {})}
        >
          {HERO_DESCRIPTION}
        </Desc>

        <Ctas
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0"
          {...(animated
            ? { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 } }
            : {})}
        >
          <Link
            to="/contact/"
            className="ui-btn ui-btn--lg w-auto max-w-xs border text-center cursor-pointer transition-all duration-240 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(34,211,238,0.6)]"
            style={homePageData.CTA_GRADIENT_STYLE}
          >
            Start Your AI Transformation
          </Link>
          <a
            href="https://cal.id/jashom-technologies/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="ui-btn ui-btn--lg w-auto max-w-xs border text-center cursor-pointer transition-all duration-240 hover:bg-white/10 hover:border-[rgba(34,211,238,0.4)] hover:-translate-y-px"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              color: Theme.TEXT_FAFAFA,
            }}
          >
            Schedule a Meeting
          </a>
        </Ctas>
      </div>
    );
  }

  const renderProjectSlide = (project: (typeof homePageData.portfolioProjects)[number]) => (
    <div
      key={project.link}
      className="flex-shrink-0"
      style={{
        width:
          cardsPerView === 1
            ? '100%'
            : `calc(${100 / cardsPerView}% - ${(24 * (cardsPerView - 1)) / cardsPerView}px)`,
      }}
    >
      <Link
        to={project.link}
        className="block rounded-2xl border h-full flex flex-col transition-all duration-300 group overflow-hidden hover:border-[#06B6D4] focus-visible:border-[#06B6D4] active:border-[#06B6D4] focus-visible:ring-2 focus-visible:ring-[#06B6D4]/40"
        style={{
          background: 'linear-gradient(180deg, rgba(8, 12, 22, 0.95) 0%, rgba(7, 10, 18, 0.98) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.16)',
        }}
      >
        <div className="px-4 sm:px-5 pt-4 sm:pt-5">
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
            {project.industry}
          </p>
        </div>
        {project.image && (
          <div className="relative overflow-hidden px-3 sm:px-4 pt-3 sm:pt-4">
            <img
              src={project.image}
              alt={project.title}
              width={400}
              height={180}
              className="w-full object-cover rounded-2xl"
              style={{ height: '210px' }}
            />
          </div>
        )}

        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <p className="text-sm mb-3" style={{ color: 'rgba(255, 255, 255, 0.72)' }}>
            {project.industry}
          </p>
          <h3
            className="font-bold text-white mb-4 leading-tight line-clamp-2 uppercase"
            style={{ fontSize: 'clamp(20px, 1.6vw, 28px)', letterSpacing: '-0.02em' }}
          >
            {project.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={`${project.title}-${tag}`}
                className="inline-flex items-center justify-center h-7 px-3 rounded-full border text-xs font-medium whitespace-nowrap"
                style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  borderColor: 'rgba(148, 163, 184, 0.24)',
                  color: '#CBD5E1',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-1">
            <span
              className="inline-flex items-center gap-2 font-semibold text-[#22D3EE] group-hover:text-[#06B6D4] group-active:text-[#06B6D4] transition-colors"
              style={{ fontSize: 'clamp(14px, 1vw, 16px)' }}
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );

  function renderCarouselTrack() {
    return (
      <div
        className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * (100 / cardsPerView + (cardsPerView === 1 ? 0 : 24 / cardsPerView))}%)`,
        }}
      >
        {homePageData.portfolioProjects.map(renderProjectSlide)}
      </div>
    );
  }

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
                renderHeroContent(false)
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {renderHeroContent(true)}
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
              background: 'transparent',
              position: 'relative'
            }}
          >
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: Theme.TEXT_FAFAFA, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.025em' }}>
                  What We <span style={{ color: Theme.ACCENT_COLOR }}>Do</span>
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base" style={{ color: Theme.TEXT_MUTED }}>
                  We engineer performance-first systems with measurable impact, from low-level GPU tuning to production-ready CUDA acceleration.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
                {homePageData.whatWeDoData.map((item) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '34, 211, 238' : '124, 58, 237';
                  const color = isEmerald ? Theme.ACCENT_COLOR : homePageData.VIOLET_COLOR;
                  const Icon = isEmerald ? Cpu : Zap;
                  return (
                    <div
                      key={item.title}
                      className="group relative max-w-xl overflow-hidden rounded-2xl p-8 sm:p-9 transition-all duration-300"
                      style={{
                        background: `linear-gradient(160deg, rgba(${rgb}, 0.16) 0%, rgba(7, 11, 18, 0.92) 42%, rgba(${rgb}, 0.08) 100%)`,
                        border: `1px solid rgba(${rgb}, 0.25)`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: `radial-gradient(circle at 100% 0%, rgba(${rgb}, 0.22), transparent 42%)` }}
                      />
                      <div className="relative z-10 mb-6 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-wide" style={{ color, background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.35)` }}>
                          <Sparkles className="h-3.5 w-3.5" />
                          High Performance
                        </div>
                        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.35)` }}>
                          <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                      </div>
                      <h3 className="relative z-10 text-xl sm:text-2xl font-bold" style={{ color, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>{item.title}</h3>
                      <p className="relative z-10 mt-4 text-base sm:text-lg leading-loose" style={{ color: '#C0C6D0', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }}>{item.description}</p>
                    </div>
                  );
                })}
              </div>
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
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
            </div>
            <div className="max-w-7xl mx-auto relative z-10">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: Theme.ACCENT_COLOR }}>
                  Which Services We Provide
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED }}>
                  Explore our specialized GPU and CUDA development services
                </p>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
                {homePageData.servicesProvideData.map((item) => {
                  const isEmerald = item.colorKey === 'emerald';
                  const rgb = isEmerald ? '34, 211, 238' : '124, 58, 237';
                  const color = isEmerald ? Theme.ACCENT_COLOR : homePageData.VIOLET_COLOR;
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl p-6 transition-all duration-300 group relative w-full flex flex-col overflow-hidden"
                      style={{ background: `linear-gradient(155deg, rgba(${rgb},0.14) 0%, rgba(15,23,42,0.85) 45%, rgba(${rgb},0.08) 100%)`, border: `1px solid rgba(${rgb}, 0.28)`, backdropFilter: 'blur(12px)', boxShadow: `0 16px 45px rgba(${rgb}, 0.16)` }}
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 100% 0%, rgba(${rgb},0.24), transparent 48%)` }} />
                      <div className="relative z-10 w-12 h-12 rounded-xl mb-6 flex items-center justify-center" style={{ background: `rgba(${rgb}, 0.15)`, border: `1px solid rgba(${rgb}, 0.3)` }}>
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                      <h3 className="relative z-10 text-xl font-bold mb-3" style={{ color }}>{item.title}</h3>
                      <p className="relative z-10 text-base mb-6 leading-relaxed" style={{ color: '#C3CBD8' }}>{item.description}</p>
                      <div className="relative z-10 w-full mt-auto text-right">
                        <a href={item.href} className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.35)]" style={item.buttonStyle}>
                          Explore Service →
                        </a>
                      </div>
                    </div>
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
                  className="w-full flex items-center justify-center md:justify-start"
                >
                  <div className="grid w-full max-w-[480px] grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-10 sm:gap-y-12 md:gap-x-12 md:gap-y-14">
                    {homePageData.trustedLogosData.map((logo) => (
                      <motion.div
                        key={logo.alt}
                        className="group flex min-h-[64px] sm:min-h-[72px] items-center justify-center px-3 py-2"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                      >
                        <img src={logo.src} alt={logo.alt} width={160} height={56} className={logo.className} loading="lazy" decoding="async" />
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
          <section className="pt-28 pb-10 sm:pt-32 px-4 sm:px-6 lg:px-8 bg-black relative overflow-visible">
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
              <div className="relative">
                {/* Mobile arrows (overlay; don't steal width) */}
                <button
                  onClick={goToPrev}
                  disabled={!canGoPrev}
                  className={`sm:hidden absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 shadow-xl ${canGoPrev
                    ? 'bg-black/70 text-white active:scale-95'
                    : 'bg-black/40 text-white/40 cursor-not-allowed opacity-60'
                    }`}
                  aria-label="Previous slide"
                  type="button"
                >
                  <ChevronLeft className="w-6 h-6" strokeWidth={3} />
                </button>
                <button
                  onClick={goToNext}
                  disabled={!canGoNext}
                  className={`sm:hidden absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 shadow-xl ${canGoNext
                    ? 'bg-black/70 text-white active:scale-95'
                    : 'bg-black/40 text-white/40 cursor-not-allowed opacity-60'
                    }`}
                  aria-label="Next slide"
                  type="button"
                >
                  <ChevronRight className="w-6 h-6" strokeWidth={3} />
                </button>

                {/* Desktop/tablet layout: arrows in flow */}
                <div className="hidden sm:flex items-center gap-2 sm:gap-4">
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
                    {renderCarouselTrack()}
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

                {/* Mobile carousel (full width, with side padding so overlay arrows don't cover content) */}
                <div className="sm:hidden w-full overflow-hidden px-12">
                  {renderCarouselTrack()}
                </div>
              </div>

              {/* View All Button */}
              <div className="text-center mt-5">
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
          <section className="pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: Theme.SECTION_BG }}>
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
                      <div className="mt-4 pt-8 border-t" style={{ borderColor: Theme.BORDER_SUBTLE }}>
                        <div className="font-semibold text-[15px]" style={{ color: Theme.TEXT_FAFAFA }}>{t.name}</div>
                        <div className="text-[13px] mt-1" style={{ color: Theme.TEXT_MUTED }}>{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Jashom - Benefits Section */}
          <section className="pt-24 pb-8 sm:pt-28 sm:pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${homePageData.BLOG_CARD_BG} 0%, ${Theme.SECTION_BG} 100%)` }}>
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
                  className="ui-btn ui-btn--lg transition-all duration-300 cursor-pointer border-0 hover:-translate-y-0.5 hover:shadow-[0_12px_48px_rgba(34,211,238,0.6)]"
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
          <section className="pt-8 pb-8 sm:pt-10 sm:pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0B0F14' }}>
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
                  className="ui-btn ui-btn--lg transition-all duration-240 hover:bg-[rgba(34,211,238,0.18)] hover:border-[rgba(34,211,238,0.5)] hover:-translate-y-0.5"
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
          <section className="pt-12 pb-20 sm:pt-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${Theme.SECTION_BG} 0%, ${homePageData.BLOG_CARD_BG} 100%)` }}>
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
                className="ui-form-shell relative"
                style={Theme.FORM_MAX_WIDTH}
              >
                <div className="absolute inset-0 pointer-events-none" style={Theme.FORM_GLOW_STYLE} />

                <div className="ui-form-card relative w-full" style={Theme.FORM_CONTAINER_STYLE}>
                  <form onSubmit={handleFormSubmit} style={Theme.FORM_LAYOUT}>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={Theme.FORM_GRID_GAP}>
                      {homePageData.homeContactFormFields.map((field) => (
                        <div key={field.name} className={field.type === 'select' || field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label htmlFor={`home-contact-${field.name}`} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                          {renderServiceFormField('home-contact', field, formData, handleFormChange)}
                        </div>
                      ))}
                    </div>

                    {homeContactError && (
                      <p className="text-sm mb-4" style={{ color: '#fca5a5' }} role="alert">
                        {homeContactError}
                      </p>
                    )}
                    {/* Submit Button */}
                    <div className="flex justify-center sm:justify-start">
                      <motion.button
                        type="submit"
                        disabled={homeContactSubmitting}
                        className="ui-btn ui-btn--lg transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        style={Theme.SUBMIT_BTN_STYLE}
                        whileHover={homeContactSubmitting ? undefined : { y: -2, ...Theme.SUBMIT_BTN_HOVER }}
                        whileTap={homeContactSubmitting ? undefined : { scale: 0.98 }}
                      >
                        {homeContactSubmitting ? 'Sending…' : 'Send Message'}
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
                className="rounded-2xl p-6 sm:p-8 md:p-12 border text-center relative overflow-hidden"
                style={{
                  background: homePageData.BLOG_CARD_BG,
                  borderColor: Theme.BORDER_SUBTLE
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(15, 23, 42, 0.35) 100%)'
                }} />

                <div className="relative z-10">
                  <h2 className="mb-3 sm:mb-4 text-gradient text-xl sm:text-2xl md:text-3xl px-2">Ready to Accelerate Your AI Journey?</h2>
                  <p className="text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base px-4 sm:px-0">
                    Join hundreds of forward-thinking companies leveraging Jashom's AI expertise
                    to drive innovation and achieve unprecedented business outcomes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                    <a
                      href="https://cal.id/jashom-technologies/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-btn ui-btn--lg w-full sm:w-auto bg-black border border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      Request a Demo
                    </a>
                    <Link
                      to="/portfolio/"
                      className="ui-btn ui-btn--lg w-full sm:w-auto bg-white/5 border border-[#ffffff]/30 text-white hover:bg-white/10 transition-all duration-300 cursor-pointer"
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

