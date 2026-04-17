import { motion } from 'motion/react';
import { SEO as Seo } from './SEO';
import * as Theme from '../constants/theme';
import { CheckIcon, DividerLine, QuoteIcon, renderOfficeCardIcon, renderServiceFormField, useServicePageForm } from './ServicePageShared';
import { SERVICE_PAGE_CONTENT, type ServicePageVariant } from './servicePageContent';

type ServicePageData = {
  servicesData: readonly { title: string; description: string }[];
  industryItems: readonly string[];
  processSteps: readonly { title: string; description: string; gradient: string; shadow: string; pathD: string }[];
  benefitsData: readonly { title: string; description: string; borderColor: string }[];
  whyChooseItems: readonly { title: string; description: string }[];
  testimonialsData: readonly { quote: string; initials: string; role: string; company?: string; name?: string; avatarGradient: string }[];
  faqData: readonly { q: string; a: string }[];
  formFieldsConfig: readonly { name: string; label: string; type: string; placeholder: string; required?: boolean; rows?: number }[];
  officeCardsData: { title: string; type: string; content: React.ReactNode; href?: string; subtitle?: string }[];
  aiModelsData?: readonly { name: string; src: string; alt: string }[];
};

type Props = { data: ServicePageData; variant: ServicePageVariant };

/** Factory so page components don't duplicate the same return/SEO pattern; use for CUDA and GPU pages. */
export function createServicePage(data: ServicePageData, variant: ServicePageVariant) {
  return function ServicePage() {
    return <ServicePageLayout data={data} variant={variant} />;
  };
}

export function ServicePageLayout({ data, variant }: Readonly<Props>) {
  const c = SERVICE_PAGE_CONTENT[variant];
  const { formData, handleChange, handleSubmit, submitting, submitError } = useServicePageForm();
  const heroBgStyle = c.heroImageStyle === 'top' ? Theme.HERO_BG_TOP : Theme.HERO_BG_CENTER;
  const heroFilter = variant === 'cuda' ? 'brightness(1.2)' : 'brightness(1.3)';
  const serviceCardStyle =
    variant === 'gpu' || variant === 'cuda'
      ? {
          background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
          border: '1px solid rgba(34, 211, 238, 0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 28px rgba(0, 0, 0, 0.25)',
        }
      : { background: Theme.CARD_BG_LIGHT };
  const serviceCardTitleColor = variant === 'gpu' || variant === 'cuda' ? Theme.TEXT_FAFAFA : '#000000';
  const serviceCardDescColor = variant === 'gpu' || variant === 'cuda' ? Theme.TEXT_MUTED : Theme.CARD_DESC_GRAY;
  const benefitCardStyle =
    variant === 'gpu' || variant === 'cuda'
      ? {
          background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 28px rgba(0, 0, 0, 0.25)',
        }
      : { background: Theme.BENEFIT_CARD_BG };

  return (
    <div className="min-h-screen" style={{ background: Theme.SECTION_BG }}>
      <Seo title={c.seo.title} description={c.seo.description} keywords={c.seo.keywords} />

      <section
        className="relative overflow-hidden"
        style={{ minHeight: '100vh', backgroundImage: `url(${c.heroImage})`, ...heroBgStyle }}
      >
        <div className="absolute inset-0" style={{ backgroundImage: `url(${c.heroImage})`, ...heroBgStyle, filter: heroFilter }} />
        <div className="absolute inset-0" style={{ background: Theme.HERO_OVERLAY_GRADIENT }} />
        <div className="relative z-10 min-h-screen flex items-center">
          <div className={`${Theme.SECTION_CONTAINER} px-6 sm:px-8 lg:px-12 w-full`} style={Theme.HERO_CONTENT_PADDING}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left" style={{ maxWidth: '620px' }}>
              <h1 className="font-bold text-white leading-tight" style={Theme.HERO_H1_STYLE}>{c.heroTitle}</h1>
              <p className="text-white/90" style={Theme.HERO_P_STYLE}>{c.heroSubtitle}</p>
              <a href="/contact/" className="ui-btn ui-btn--lg transition-all duration-300 hover:opacity-90 hover:scale-105" style={Theme.CTA_HERO_STYLE}>
                Get Free Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`${Theme.SECTION_CLASS} relative overflow-hidden`} style={{ background: Theme.SECTION_BG }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl" />
        </div>
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-2 rounded-full" style={Theme.OVERVIEW_BADGE}>
              <p className="text-sm uppercase tracking-wider" style={{ color: Theme.ACCENT_COLOR }}>Overview</p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight whitespace-pre-line">{c.overviewTitle}</h2>
            {c.overviewSubtitle && <p className="text-white/70 text-lg mt-4">{c.overviewSubtitle}</p>}
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div {...Theme.MOTION_FADE_UP_20} className="space-y-6">
                {c.overviewParagraphs.map((p) => (
                  <p key={p} className="text-white/70 text-base leading-relaxed">{p}</p>
                ))}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-lg p-4" style={Theme.KEY_STAT_BOX}>
                    <div className="text-3xl font-bold mb-1" style={{ color: Theme.ACCENT_COLOR }}>{c.overviewStat1.value}</div>
                    <div className="text-sm" style={{ color: Theme.TEXT_GRAY }}>{c.overviewStat1.label}</div>
                  </div>
                  <div className="rounded-lg p-4" style={Theme.KEY_STAT_BOX}>
                    <div className="text-3xl font-bold mb-1" style={{ color: Theme.ACCENT_COLOR }}>{c.overviewStat2.value}</div>
                    <div className="text-sm" style={{ color: Theme.TEXT_GRAY }}>{c.overviewStat2.label}</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div>
              <motion.div {...Theme.MOTION_FADE_SCALE} transition={{ duration: 0.6, delay: 0.4 }} className="relative">
                <img src={c.overviewImage.src} alt={c.overviewImage.alt} className="w-full h-auto rounded-2xl shadow-2xl" style={Theme.IMAGE_SHADOW_ACCENT} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <div className="premium-divider" />

      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={Theme.SECTION_CONTAINER}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight whitespace-pre-line">{c.servicesTitle}</h2>
          </motion.div>
          <motion.div {...Theme.MOTION_FADE_UP_20} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-white/70 text-base leading-relaxed">{c.servicesIntro}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.servicesData.map((item, i) => (
              <motion.div key={item.title} {...Theme.MOTION_FADE_UP_30} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="ui-card" style={serviceCardStyle}>
                <h3 className="text-2xl font-bold mb-4 whitespace-pre-line" style={{ color: serviceCardTitleColor }}>{item.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: serviceCardDescColor }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...Theme.MOTION_FADE_UP_20} transition={{ duration: 0.6, delay: 0.4 }} className="flex justify-center mt-16 pt-8">
            <a href="/contact/" className="ui-btn ui-btn--lg transition-all duration-300 hover:opacity-90" style={Theme.CTA_SIMPLE}>
              Get in Touch With Us
            </a>
          </motion.div>
        </div>
      </section>

      {c.industryTitle && c.industryIntro && (
        <section
          className={`py-20 px-3 sm:px-5 lg:px-8 relative overflow-hidden`}
          style={{ background: Theme.SECTION_BG }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-500 mix-blend-multiply blur-3xl filter" />
            <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-purple-500 mix-blend-multiply blur-3xl filter" />
          </div>
          <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
            {variant === 'cuda' ? (
              <>
                <motion.div {...Theme.MOTION_FADE_UP_20} className="mb-10 text-center sm:mb-12">
                  <div className="mb-4 inline-block rounded-full px-4 py-2" style={Theme.OVERVIEW_BADGE}>
                    <p className="text-sm uppercase tracking-wider" style={{ color: Theme.ACCENT_COLOR }}>
                      Industries
                    </p>
                  </div>
                  <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl whitespace-pre-line">{c.industryTitle}</h2>
                  <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">{c.industryIntro}</p>
                </motion.div>
                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
                  <motion.div {...Theme.MOTION_FADE_UP_20} className="min-w-0">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
                      {data.industryItems.map((label) => (
                        <div
                          key={label}
                          className="flex items-start gap-3.5 rounded-xl border border-cyan-500/15 bg-gradient-to-br from-slate-900/85 to-slate-950/70 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/35 sm:px-5 sm:py-4"
                        >
                          <div
                            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                            style={Theme.CHECK_ICON_BG}
                          >
                            <CheckIcon />
                          </div>
                          <span className="text-base font-medium leading-snug text-white sm:text-[17px] sm:leading-relaxed">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div
                    {...Theme.MOTION_FADE_SCALE}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex w-full shrink-0 justify-center pt-2 md:justify-end md:pt-0"
                  >
                    <div
                      className="relative aspect-square h-[148px] w-[148px] overflow-hidden rounded-2xl border border-cyan-500/20 sm:h-[160px] sm:w-[160px]"
                      style={{
                        background: 'linear-gradient(155deg, rgba(15, 23, 42, 0.95) 0%, rgba(8, 15, 30, 0.98) 100%)',
                        ...Theme.IMAGE_SHADOW_ACCENT,
                        boxShadow: `${Theme.IMAGE_SHADOW_ACCENT.boxShadow}, inset 0 1px 0 rgba(34, 211, 238, 0.08)`,
                      }}
                    >
                      <img
                        src="/images/cuda-industries-visual.svg"
                        alt=""
                        className="h-full w-full object-contain object-center p-2 sm:p-2.5"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              <div
                className={
                  c.industryImage
                    ? 'grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20'
                    : 'mx-auto max-w-4xl text-center'
                }
              >
                <motion.div
                  {...Theme.MOTION_FADE_UP_20}
                  className={c.industryImage ? 'text-center lg:text-left' : ''}
                >
                  <div
                    className={`mb-4 h-1 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 ${
                      c.industryImage ? 'mx-auto lg:mx-0' : 'mx-auto'
                    }`}
                  />
                  <h2 className="mb-4 text-4xl font-bold leading-tight text-white sm:text-5xl whitespace-pre-line">{c.industryTitle}</h2>
                  <p
                    className={`mb-8 text-base leading-relaxed text-white/75 sm:text-lg sm:leading-relaxed ${
                      c.industryImage ? 'mx-auto max-w-2xl lg:mx-0' : 'mx-auto max-w-2xl'
                    }`}
                  >
                    {c.industryIntro}
                  </p>
                  <div
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 ${
                      c.industryImage ? 'w-full' : 'mx-auto max-w-3xl text-left'
                    }`}
                  >
                    {data.industryItems.map((label) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-xl border border-cyan-500/15 bg-gradient-to-br from-slate-900/85 to-slate-950/70 px-4 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/35 hover:shadow-[0_16px_48px_rgba(34,211,238,0.06)]"
                      >
                        <div
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={Theme.CHECK_ICON_BG}
                        >
                          <CheckIcon />
                        </div>
                        <span className="text-sm leading-snug text-white/95 sm:text-base">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                {c.industryImage ? (
                  <motion.div {...Theme.MOTION_FADE_SCALE} transition={{ duration: 0.6, delay: 0.2 }} className="relative w-full">
                    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/15 shadow-2xl">
                      <img
                        src={c.industryImage.src}
                        alt={c.industryImage.alt}
                        className="h-auto w-full object-cover"
                        style={Theme.IMAGE_SHADOW_ACCENT_ALT}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </motion.div>
                ) : null}
              </div>
            )}
          </div>
        </section>
      )}

      <DividerLine />

      <section className={`${Theme.SECTION_CLASS} relative overflow-hidden`} style={{ background: Theme.PROCESS_GRADIENT_BG }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-32">
            <div className="inline-block mb-4 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <span className="text-blue-400 font-semibold text-sm">OUR PROCESS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              {c.processTitleMain}<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{c.processTitleGradient}</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4">{c.processSubtitle}</p>
            <p className="text-white/60 text-base max-w-2xl mx-auto mb-16">{c.processIntro}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {data.processSteps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 * (i + 1) }} className="text-center group">
                <div
                  className="h-full flex flex-col items-center rounded-2xl pt-10 pb-7 px-7 border transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.65) 0%, rgba(10, 20, 34, 0.78) 100%)',
                    borderColor: 'rgba(34, 211, 238, 0.22)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 30px rgba(0, 0, 0, 0.22)',
                  }}
                >
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.pathD} />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-6">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...Theme.MOTION_FADE_UP_20} transition={{ duration: 0.6, delay: 0.7 }} className="text-center mt-16">
            <a
              href="/contact/"
              className="inline-flex items-center gap-2.5 rounded-xl px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{
                color: Theme.TEXT_WHITE,
                background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                border: '1px solid rgba(34, 211, 238, 0.55)',
                boxShadow: '0 10px 26px rgba(34, 211, 238, 0.35)',
              }}
            >
              <span>{c.processCta}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </a>
          </motion.div>
        </div>
      </section>

      {c.showCtaBanner && (
        <section className={Theme.SECTION_CLASS} style={{ background: Theme.CTA_SECTION_BG }}>
          <div className={Theme.SECTION_CONTAINER}>
            <motion.div
              {...Theme.MOTION_FADE_UP_20}
              className="relative rounded-2xl overflow-hidden group border"
              style={{
                minHeight: '380px',
                borderRadius: '24px',
                borderColor: 'rgba(34, 211, 238, 0.2)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="/images/cta-gpu-innovation-bg.svg"
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: '72% center' }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(8, 14, 24, 0.9) 0%, rgba(8, 14, 24, 0.72) 45%, rgba(8, 14, 24, 0.5) 100%)',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.06) 0%, rgba(0, 0, 0, 0.15) 100%)',
                  }}
                />
              </div>
              <div className="relative z-10 py-12 px-6 sm:py-14 sm:px-10 lg:py-16 lg:px-14">
                <div
                  className="max-w-2xl rounded-2xl p-6 sm:p-7 border"
                  style={{
                    background: 'rgba(8, 14, 24, 0.48)',
                    borderColor: 'rgba(34, 211, 238, 0.22)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight" style={{ color: Theme.TEXT_WHITE }}>
                    Need a Custom AI Development Partner?
                  </h2>
                  <p className="text-sm sm:text-base mb-7 leading-relaxed" style={{ color: '#E5E5E5' }}>
                    We develop high-performing AI systems based on optimized GPU architecture. Whether you need to hire CUDA Developers for specialized projects or require end-to-end CUDA Development Services, our team delivers scalable solutions engineered for production-grade performance.
                  </p>
                  <a
                    href="/contact/"
                    className="inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm sm:text-base font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      color: Theme.TEXT_WHITE,
                      background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                      boxShadow: '0 10px 26px rgba(34, 211, 238, 0.35)',
                    }}
                  >
                    <span>Let's talk about Your Project</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <DividerLine />

      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={Theme.SECTION_CONTAINER}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4 whitespace-pre-line">{c.benefitsTitle}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.benefitsData.map((item, i) => (
              <motion.div key={item.title} {...Theme.MOTION_FADE_UP_30} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="ui-card border transition-all duration-300" style={benefitCardStyle}>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight whitespace-pre-line">{item.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DividerLine />

      {c.showAiModels && 'aiModelsData' in data && data.aiModelsData && (
        <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
          <div className={Theme.SECTION_CONTAINER}>
            <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: Theme.TEXT_FAFAFA }}>AI Models We Have Expertise In</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {data.aiModelsData.map((model, i) => (
                <motion.div key={model.name} {...Theme.MOTION_FADE_UP_30} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="rounded-2xl p-6 flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 hover:scale-105 hover:border-[rgba(16,185,129,0.4)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.2)]" style={Theme.AI_MODEL_CARD_STYLE}>
                  <div className="mb-4 flex items-center justify-center" style={{ height: '72px' }}>
                    <img src={model.src} alt={model.alt} className="object-contain transition-transform duration-300" style={{ maxHeight: '72px', maxWidth: '100%' }} />
                  </div>
                  <h3 className="text-base font-semibold" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '0.02em' }}>{model.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 sm:px-6 lg:px-8" style={{ background: Theme.SECTION_BG, paddingTop: '100px', paddingBottom: '100px' }}>
        <div className={Theme.SECTION_CONTAINER}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center" style={{ marginBottom: '64px' }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight whitespace-pre-line">{c.whyChooseTitle}</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.whyChooseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="h-full rounded-2xl border p-8 md:p-9 transition-all duration-300 hover:-translate-y-1"
                style={{
                  ...Theme.WHY_CHOOSE_BORDER,
                  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.72) 0%, rgba(10, 20, 34, 0.82) 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 10px 28px rgba(0, 0, 0, 0.25)',
                }}
              >
                <h3 className="text-[32px] sm:text-3xl font-bold text-white mb-5 leading-tight">{item.title}</h3>
                <p className="text-white/70 text-base sm:text-[17px] leading-8">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={Theme.SECTION_CONTAINER}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-16">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block px-6 py-2 rounded-full border mb-6" style={Theme.BADGE_TESTIMONIAL}>
              <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Client Testimonials</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={Theme.HEADING_TITLE_STYLE}>{c.testimonialsHeading}</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.7 }}>{c.testimonialsIntro}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.testimonialsData.map((t, i) => (
              <motion.div key={t.initials} {...Theme.MOTION_FADE_UP_30} transition={{ duration: 0.5, delay: 0.1 * (i + 1) }} className="group">
                <div className="h-full p-8 rounded-2xl border transition-all duration-300" style={Theme.TESTIMONIAL_CARD_STYLE}>
                  <div className="mb-4"><QuoteIcon /></div>
                  <p className="text-base mb-8" style={{ color: Theme.TEXT_QUOTE, lineHeight: 1.8 }}>{t.quote}</p>
                  <div className="mt-4 pt-8 border-t" style={{ borderColor: Theme.BORDER_SUBTLE }}>
                    <div className="font-semibold text-[15px]" style={{ color: Theme.TEXT_FAFAFA }}>{c.testimonialDisplay === 'nameRole' ? t.name : t.role}</div>
                    <div className="text-[13px] mt-1" style={{ color: Theme.TEXT_MUTED }}>{c.testimonialDisplay === 'nameRole' ? t.role : t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={Theme.SECTION_CLASS} style={{ background: Theme.SECTION_BG }}>
        <div className={Theme.SECTION_CONTAINER}>
          <motion.div {...Theme.MOTION_FADE_UP_20} className="text-center mb-16 sm:mb-20">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="inline-block mb-4 px-4 py-2 rounded-full border" style={Theme.BADGE_STYLE}>
              <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>FAQs</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
              Frequently Asked Questions
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED, lineHeight: 1.7 }}>
              {variant === 'cuda'
                ? 'Common questions about hiring CUDA developers from Jashom'
                : 'Common questions about GPU optimization services from Jashom'}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {data.faqData.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, rgba(20, 36, 56, 0.62) 0%, rgba(10, 20, 34, 0.8) 100%)',
                  borderColor: 'rgba(34, 211, 238, 0.2)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-semibold pr-4" style={{ color: Theme.TEXT_FAFAFA }}>{item.q}</h3>
                    <svg className="w-6 h-6 transition-transform group-open:rotate-180" style={{ color: Theme.TEXT_GRAY }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={Theme.CHEVRON_DOWN_D} />
                    </svg>
                  </summary>
                  <div className="px-6 pt-2 pb-8">
                    <p className="text-base leading-relaxed" style={{ color: Theme.TEXT_GRAY }}>{item.a}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className={`${Theme.SECTION_CONTAINER} px-4 sm:px-6 lg:px-8 pb-20`}>
        <section className="py-20 relative overflow-hidden" style={{ background: Theme.FORM_GRADIENT_BG }}>
          <div className={Theme.SECTION_CONTAINER}>
            <motion.div className="text-center mb-12" {...Theme.MOTION_FADE_UP_20}>
              <motion.div className="inline-block mb-6 px-4 py-2 rounded-full border" style={Theme.BADGE_STYLE}>
                <span style={{ color: Theme.ACCENT_COLOR, fontWeight: 600, fontSize: '0.875rem' }}>Get In Touch</span>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight" style={{ color: Theme.TEXT_FAFAFA, letterSpacing: '-0.025em' }}>
                Get Started with <span style={Theme.GRADIENT_TEXT_STYLE}>{variant === 'cuda' ? 'CUDA Development' : 'GPU Optimization'}</span>
              </h2>
              <p className="text-base sm:text-lg mb-4 leading-relaxed max-w-2xl mx-auto" style={{ color: Theme.TEXT_MUTED }}>Fill out the form and our team will get back to you within 24 hours.</p>
            </motion.div>
            <motion.div {...Theme.MOTION_FADE_UP_20} className="ui-form-shell relative" style={Theme.FORM_MAX_WIDTH}>
              <div className="absolute inset-0 pointer-events-none" style={Theme.FORM_GLOW_STYLE} />
              <div className="ui-form-card relative w-full" style={Theme.FORM_CONTAINER_STYLE}>
                <form style={Theme.FORM_LAYOUT} onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2" style={Theme.FORM_GRID_GAP}>
                    {data.formFieldsConfig.map((field) => (
                      <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <label htmlFor={`${c.formIdPrefix}-${field.name}`} className="block text-white/90 mb-2 font-medium text-sm">{field.label}</label>
                        {renderServiceFormField(c.formIdPrefix, field as Parameters<typeof renderServiceFormField>[1], formData, handleChange)}
                      </div>
                    ))}
                  </div>
                  {submitError && (
                    <p className="text-sm mb-4 px-1" style={{ color: '#fca5a5' }} role="alert">
                      {submitError}
                    </p>
                  )}
                  <div className="flex justify-center sm:justify-start">
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="ui-btn ui-btn--lg transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      style={Theme.SUBMIT_BTN_STYLE}
                      whileHover={submitting ? undefined : { y: -2, ...Theme.SUBMIT_BTN_HOVER }}
                      whileTap={submitting ? undefined : { scale: 0.98 }}
                    >
                      {submitting ? 'Sending…' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
            <motion.div {...Theme.MOTION_FADE_UP_20} transition={{ duration: 0.6, delay: 0.2 }} className="mt-16 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: Theme.TEXT_FAFAFA }}>Our Office</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.officeCardsData.map((card) => (
                  <div key={card.title} className="ui-card text-center transition-all duration-300 hover:scale-105" style={Theme.officeCardStyle}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden" style={Theme.OFFICE_ICON_BG}>
                      {renderOfficeCardIcon(card.type as 'address' | 'email' | 'phone')}
                    </div>
                    <h4 className="text-lg font-semibold mb-3" style={{ color: Theme.TEXT_FAFAFA }}>{card.title}</h4>
                    {card.href ? (
                      <a href={card.href} className="text-sm inline-block hover:text-[#06B6D4] transition-colors" style={{ color: Theme.ACCENT_COLOR }}>{card.content}</a>
                    ) : (
                      <p className="text-sm leading-relaxed" style={{ color: Theme.TEXT_MUTED, whiteSpace: 'pre-line' }}>{card.content}</p>
                    )}
                    {card.subtitle && <p className="text-xs mt-3" style={{ color: Theme.TEXT_SUBTLE }}>{card.subtitle}</p>}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
