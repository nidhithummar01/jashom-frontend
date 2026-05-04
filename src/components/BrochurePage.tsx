import { motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  Brain,
  CheckCircle2,
  Cloud,
  Code,
  Cpu,
  Download,
  GitBranch,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Shield,
  TrendingUp,
  Workflow,
  Zap
} from 'lucide-react';
import { SEO } from './SEO';

type Stat = { value: string; label: string };
type Feature = { title: string; description: string };

const BROCHURE_THEME = {
  bg: '#0A0A0A',
  panel: 'rgba(255,255,255,0.04)',
  panelStrong: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.18)',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.70)',
  mutedStrong: 'rgba(255,255,255,0.82)',
  accent: '#22D3EE',
} as const;

const BROCHURE_DECOR = {
  glow: `0 18px 60px rgba(34,211,238,0.10)`,
  glowStrong: `0 24px 90px rgba(34,211,238,0.14)`,
  heroGradient: `radial-gradient(900px 340px at 22% 10%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.00) 60%),
                 radial-gradient(800px 320px at 88% 18%, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0.00) 55%),
                 linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 55%, rgba(255,255,255,0.00) 100%)`,
  gridPattern: {
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: '56px 56px',
    opacity: 0.06,
  } as const,
} as const;

const CARD_STYLE = {
  surface: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
  surfaceSoft: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
  shadow: '0 18px 60px rgba(0,0,0,0.35)',
} as const;

const SERVICE_ICONS = {
  'AI GPU Optimization': Cpu,
  'CUDA Development': Code,
  'RAG Applications': MessageSquare,
  'SaaS Development': Package,
  'CI/CD Automation': RefreshCw,
  'Security & VAPT': Shield,
} as const;

const SECTION_SPACING = {
  paddingTop: 56,
  paddingBottom: 52,
} as const;

export function BrochurePage() {
  const brochureRef = useRef<HTMLDivElement | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfMode, setPdfMode] = useState(false);

  const brochure = useMemo(() => {
    const stats: Stat[] = [
      { value: '25+', label: 'Clients' },
      { value: '50+', label: 'Projects Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Support' },
    ];

    const services: Feature[] = [
      { title: 'AI GPU Optimization', description: 'Kernel-level tuning, profiling, batching, and performance engineering for real-world AI workloads.' },
      { title: 'CUDA Development', description: 'Custom CUDA kernels, TensorRT pipelines, Triton optimization, and deployment hardening.' },
      { title: 'RAG Applications', description: 'Grounded assistants and agents using your private data with secure retrieval and evaluation.' },
      { title: 'SaaS Development', description: 'Design, build, and ship production-grade SaaS products with scalability and reliability.' },
      { title: 'CI/CD Automation', description: 'Fast, repeatable releases with quality gates, observability, and infrastructure automation.' },
      { title: 'Security & VAPT', description: 'Security-first delivery with vulnerability assessment, penetration testing, and best practices.' },
    ];

    const industrySolutions = [
      {
        title: 'HealthTech Solutions',
        subtitle: 'Connected healthcare intelligence',
        bullets: ['Hospital workflow automation', 'Real-time monitoring', 'Predictive analytics', 'Compliance-ready architecture'],
        tech: 'HIPAA-ready patterns • IoT • Computer Vision',
      },
      {
        title: 'FoodTech Solutions',
        subtitle: 'Smart supply chain ecosystem',
        bullets: ['Demand forecasting', 'Traceability', 'Quality monitoring', 'Predictive logistics'],
        tech: 'IoT • Blockchain • NLP • Predictive Analytics',
      },
      {
        title: 'EnvironmentTech Solutions',
        subtitle: 'Sustainable technology',
        bullets: ['Emission optimization', 'ESG automation', 'Sensor analytics', 'Compliance reporting'],
        tech: 'IoT • Satellite Data • Real-time Dashboards',
      },
      {
        title: 'RetailTech for Garments',
        subtitle: 'Fashion innovation',
        bullets: ['Visual search', 'Inventory prediction', 'Vision QC', 'Customer intelligence'],
        tech: 'Computer Vision • Edge AI • Analytics',
      },
    ] as const;

    const capabilities = [
      { icon: Brain, name: 'AI & LLM Platforms', items: ['GPT integration', 'Custom LLMs', 'RAG systems', 'Fine-tuning & evaluation'] },
      { icon: Cpu, name: 'GPU Optimization', items: ['CUDA development', 'Tensor optimization', 'Performance profiling', 'Hardware acceleration'] },
      { icon: Code, name: 'Web & App Engineering', items: ['React apps', 'Mobile-friendly UI', 'APIs & integrations', 'Performance & SEO'] },
      { icon: Cloud, name: 'Cloud & Edge', items: ['AWS/Azure/GCP', 'Kubernetes', 'Serverless', 'Edge deployments'] },
      { icon: Package, name: 'Product Engineering', items: ['Agile delivery', 'MVP to scale', 'DevOps', 'CI/CD'] },
    ] as const;

    const processSteps = [
      {
        icon: RefreshCw,
        title: 'Agile & Iterative Delivery',
        points: [
          'Sprint-based delivery for faster time-to-market',
          'Continuous feedback loops with stakeholders',
          'Adaptive planning and flexible response to change',
          'Incremental delivery of business value',
        ],
      },
      {
        icon: Workflow,
        title: 'Enterprise Collaboration',
        points: [
          'Clear documentation and shared visibility',
          'Code review and automated quality checks',
          'Release pipelines with traceability',
          'Monitoring and long-term performance tuning',
        ],
      },
    ] as const;

    const tools = [
      { icon: GitBranch, name: 'JIRA', desc: 'Project tracking' },
      { icon: Code, name: 'Confluence', desc: 'Documentation' },
      { icon: Package, name: 'Bitbucket', desc: 'Version control & code review' },
      { icon: RefreshCw, name: 'Jenkins', desc: 'CI/CD automation' },
      { icon: Cloud, name: 'Kubernetes', desc: 'Container orchestration' },
      { icon: Workflow, name: 'DevOps', desc: 'End-to-end automation' },
    ] as const;

    const reasons = [
      { icon: Zap, title: 'Fast Execution', desc: 'Move from idea to production quickly with an optimization-first mindset.' },
      { icon: Shield, title: 'Security Mindset', desc: 'Security and best practices baked into delivery and operations.' },
      { icon: TrendingUp, title: 'Measurable Outcomes', desc: 'Performance, cost, and reliability improvements you can validate.' },
      { icon: Cpu, title: 'Deep GPU Expertise', desc: 'Hands-on tuning from kernels to inference pipelines and tooling.' },
      { icon: Globe, title: 'Global Collaboration', desc: 'Remote-friendly delivery with transparent communication and reporting.' },
      { icon: MessageSquare, title: 'Clear Communication', desc: 'Simple explanations, practical trade-offs, and tight feedback loops.' },
    ] as const;

    const successStories = [
      { title: 'TechVision Inc', impact: 'Significant reduction in AI inference time', byline: 'CTO testimonial', industry: 'Technology' },
      { title: 'RetailPro', impact: 'ROI achieved quickly with optimization-led delivery', byline: 'VP Engineering testimonial', industry: 'Retail' },
      { title: 'HealthTech Solutions', impact: 'Model deployment cycle accelerated dramatically', byline: 'Head of AI testimonial', industry: 'Healthcare' },
    ] as const;

    const contact = {
      email: 'info@jashom.com',
      phone: '+91 90239 06363',
      address: 'SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat',
    };

    return {
      hero: {
        title: 'Company Brochure',
        subtitle: 'AI. Optimized. Everywhere.',
        tagline: 'GPU optimization, CUDA development, and applied AI engineering for modern teams.',
      },
      stats,
      services,
      industrySolutions,
      capabilities,
      processSteps,
      tools,
      reasons,
      successStories,
      about: {
        mission: 'Pioneering AI and GPU optimization solutions that transform business outcomes with speed, reliability, and measurable performance.',
        vision: 'To help teams adopt advanced AI efficiently—making performance and scale accessible without compromising security or quality.',
      },
      contact,
    };
  }, []);

  const handleDownloadPdf = async () => {
    if (!brochureRef.current || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    setPdfMode(true);
    try {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const canvas = await html2canvas(brochureRef.current, {
        scale: 2,
        backgroundColor: BROCHURE_THEME.bg,
        useCORS: true,
        windowWidth: brochureRef.current.scrollWidth,
      });

      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Slice the captured canvas into page-sized images.
      // This avoids "seam lines" / shadow bars that can appear when using a single
      // huge image shifted by negative positions across pages.
      const marginTopPt = 18;
      const marginBottomPt = 18;
      const contentHeightPt = pdfHeight - marginTopPt - marginBottomPt;

      const pageHeightPx = Math.round((contentHeightPt * canvas.width) / pdfWidth);
      const overlapPx = 2;

      let renderedHeightPx = 0;
      let pageIndex = 0;

      while (renderedHeightPx < canvas.height) {
        const sliceTop = pageIndex === 0 ? 0 : Math.max(0, renderedHeightPx - overlapPx);
        const sliceHeight = Math.min(pageHeightPx + (pageIndex === 0 ? 0 : overlapPx), canvas.height - sliceTop);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) break;

        ctx.fillStyle = BROCHURE_THEME.bg;
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.imageSmoothingEnabled = true;

        ctx.drawImage(
          canvas,
          0,
          sliceTop,
          canvas.width,
          sliceHeight,
          0,
          0,
          canvas.width,
          sliceHeight
        );

        const imgData = pageCanvas.toDataURL('image/png');
        const sliceHeightPt = (sliceHeight * pdfWidth) / canvas.width;

        if (pageIndex > 0) pdf.addPage();

        // Fill the whole PDF page background (prevents white area).
        pdf.setFillColor(10, 10, 10);
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');

        pdf.addImage(imgData, 'PNG', 0, marginTopPt, pdfWidth, sliceHeightPt);

        renderedHeightPx += pageHeightPx;
        pageIndex += 1;
      }

      pdf.save('Jashom-Company-Brochure.pdf');
    } finally {
      setPdfMode(false);
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      <SEO
        title="Company Brochure | Jashom"
        description="Explore Jashom's company brochure and download a PDF with our services, capabilities, and contact details."
        keywords="Jashom brochure, GPU optimization, CUDA development, RAG applications, AI engineering"
      />

      {/* Brochure page */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
        style={{ paddingTop: '24px' }}
      >
        {/* Page actions (non-sticky) */}
        <div className="flex justify-center mb-4" style={{ marginTop: '12px' }}>
          <div
            className="w-full max-w-4xl"
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <motion.button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: BROCHURE_THEME.accent,
                color: '#001014',
                boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
                border: `1px solid ${BROCHURE_THEME.borderStrong}`,
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isGeneratingPdf}
              aria-label="Download brochure as PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isGeneratingPdf ? 'Generating…' : 'Download PDF'}</span>
            </motion.button>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            ref={brochureRef}
            className="w-full max-w-4xl rounded-2xl overflow-hidden"
            data-brochure-root="true"
            style={{
              position: 'relative',
              backgroundColor: BROCHURE_THEME.bg,
              color: BROCHURE_THEME.text,
              boxShadow: '0 30px 120px rgba(0,0,0,0.55)',
              border: `1px solid ${BROCHURE_THEME.border}`,
            }}
          >
            {pdfMode && (
              <style>{`
                [data-brochure-root],
                [data-brochure-root] *,
                [data-brochure-root] *::before,
                [data-brochure-root] *::after {
                  box-shadow: none !important;
                  filter: none !important;
                  backdrop-filter: none !important;
                  background-image: none !important;
                  border: none !important;
                  border-width: 0 !important;
                  outline: none !important;
                }
                [data-brochure-root] [data-brochure-section="true"] {
                  border-bottom-width: 0 !important;
                  border-top-width: 0 !important;
                }
                [data-brochure-root] [data-pdf-surface="card"] {
                  background: #0F0F10 !important;
                }
                [data-brochure-root] [data-pdf-surface="panel"] {
                  background: rgba(255,255,255,0.04) !important;
                }
              `}</style>
            )}
            {/* Cover */}
            <div style={{ position: 'relative' }}>
              {!pdfMode && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: BROCHURE_DECOR.heroGradient,
                  }}
                />
              )}
              {!pdfMode && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    ...BROCHURE_DECOR.gridPattern,
                  }}
                />
              )}
              <div
                className="px-8 sm:px-10 py-10 border-b"
                data-brochure-section="true"
                style={{
                  position: 'relative',
                  backgroundColor: 'transparent',
                  borderBottomColor: BROCHURE_THEME.border,
                }}
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="min-w-0" style={{ maxWidth: 760 }}>
                    <div className="inline-flex items-center gap-3 mb-6">
                      <img src="/jashom-logo-header-70px.png" alt="Jashom" className="h-10 w-auto object-contain" />
                      <div className="text-sm" style={{ color: BROCHURE_THEME.muted }}>
                        Jashom Technologies
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: BROCHURE_THEME.mutedStrong,
                          border: `1px solid ${BROCHURE_THEME.border}`,
                          padding: '6px 10px',
                          borderRadius: 999,
                          background: 'rgba(255,255,255,0.03)',
                        }}
                      >
                        Company Brochure
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ lineHeight: 1.15 }}>
                      {brochure.hero.title}
                    </h1>
                    <p className="text-lg sm:text-xl mt-2" style={{ color: BROCHURE_THEME.mutedStrong }}>
                      {brochure.hero.subtitle}
                    </p>
                    <div
                      className="mt-5"
                      style={{
                        height: 3,
                        width: 120,
                        borderRadius: 999,
                        background: `linear-gradient(90deg, ${BROCHURE_THEME.accent}, rgba(34,211,238,0.0))`,
                      }}
                    />
                    <p className="mt-4 max-w-2xl leading-relaxed" style={{ color: BROCHURE_THEME.muted }}>
                      {brochure.hero.tagline}
                    </p>
                  </div>

                  {/* Quick contact card */}
                  <div
                    className="w-full sm:w-auto rounded-2xl border p-5"
                    data-pdf-surface="panel"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: 'rgba(0,0,0,0.25)',
                      backdropFilter: pdfMode ? undefined : 'blur(10px)',
                      boxShadow: BROCHURE_DECOR.glow,
                      minWidth: 280,
                      marginTop: 10,
                      paddingTop: 20,
                      paddingRight: 20,
                      paddingBottom: 18,
                      paddingLeft: 20,
                    }}
                  >
                    <div className="text-xs" style={{ color: BROCHURE_THEME.muted }}>
                      Contact
                    </div>
                    <div
                      className="text-sm"
                      style={{
                        color: BROCHURE_THEME.mutedStrong,
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" style={{ color: BROCHURE_THEME.accent }} />
                        <span>{brochure.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" style={{ color: BROCHURE_THEME.accent }} />
                        <span>{brochure.contact.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5" style={{ color: BROCHURE_THEME.accent }} />
                        <span className="leading-relaxed">{brochure.contact.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {brochure.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border p-4"
                      data-pdf-surface="card"
                      style={{
                        borderColor: BROCHURE_THEME.border,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
                        boxShadow: BROCHURE_DECOR.glow,
                      }}
                    >
                      <div
                        className="text-2xl font-bold"
                        style={
                          pdfMode
                            ? {
                              color: BROCHURE_THEME.text,
                              textShadow: '0 10px 26px rgba(0,0,0,0.45)',
                            }
                            : {
                              background: `linear-gradient(90deg, ${BROCHURE_THEME.text}, ${BROCHURE_THEME.accent})`,
                              WebkitBackgroundClip: 'text',
                              backgroundClip: 'text',
                              color: 'transparent',
                            }
                        }
                      >
                        {s.value}
                      </div>
                      <div className="text-xs mt-1" style={{ color: BROCHURE_THEME.muted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-xl font-bold">About Jashom</h2>
                  <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                    Who we are and how we help teams ship faster.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  className="rounded-2xl border p-6"
                  data-pdf-surface="card"
                  style={{
                    borderColor: BROCHURE_THEME.border,
                    background: CARD_STYLE.surfaceSoft,
                    boxShadow: CARD_STYLE.shadow,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="text-sm font-semibold">Mission</div>
                  <div
                    className="mt-3"
                    style={{
                      height: 2,
                      width: 64,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${BROCHURE_THEME.accent}, rgba(34,211,238,0))`,
                    }}
                  />
                  <p className="mt-2 leading-relaxed" style={{ color: BROCHURE_THEME.mutedStrong }}>
                    {brochure.about.mission}
                  </p>
                </motion.div>
                <motion.div
                  className="rounded-2xl border p-6"
                  data-pdf-surface="card"
                  style={{
                    borderColor: BROCHURE_THEME.border,
                    background: CARD_STYLE.surfaceSoft,
                    boxShadow: CARD_STYLE.shadow,
                  }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="text-sm font-semibold">Vision</div>
                  <div
                    className="mt-3"
                    style={{
                      height: 2,
                      width: 64,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, ${BROCHURE_THEME.accent}, rgba(34,211,238,0))`,
                    }}
                  />
                  <p className="mt-2 leading-relaxed" style={{ color: BROCHURE_THEME.mutedStrong }}>
                    {brochure.about.vision}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Services */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{
                borderBottomColor: BROCHURE_THEME.border,
                ...SECTION_SPACING,
              }}
            >
              <div className="flex items-center justify-between gap-6 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold">Services</h2>
                  <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                    A practical toolkit for applied AI and performance engineering.
                  </p>
                </div>
                <div
                  className="text-xs"
                  style={{
                    marginLeft: 'auto',
                    alignSelf: 'center',
                    color: BROCHURE_THEME.accent,
                    border: `1px solid rgba(34,211,238,0.38)`,
                    padding: '10px 14px',
                    borderRadius: 999,
                    background: 'linear-gradient(135deg, rgba(34,211,238,0.14), rgba(255,255,255,0.03))',
                    boxShadow: BROCHURE_DECOR.glow,
                    letterSpacing: 0.4,
                  }}
                >
                  GPU • CUDA • Applied AI
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brochure.services.map((svc) => (
                  <motion.div
                    key={svc.title}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: CARD_STYLE.surface,
                      boxShadow: CARD_STYLE.shadow,
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: BROCHURE_THEME.borderStrong,
                            background: 'rgba(0,0,0,0.25)',
                            boxShadow: BROCHURE_DECOR.glow,
                          }}
                        >
                          {(() => {
                            const Icon = (SERVICE_ICONS as any)[svc.title] ?? CheckCircle2;
                            return <Icon className="w-5 h-5" style={{ color: BROCHURE_THEME.accent }} />;
                          })()}
                        </div>
                        <div>
                          <div className="font-semibold">{svc.title}</div>
                          <p className="mt-2 text-sm leading-relaxed" style={{ color: BROCHURE_THEME.muted }}>
                            {svc.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Industry solutions */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <h2 className="text-xl font-bold">Industry Solutions</h2>
              <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                Built for real-world operations, compliance, and scale.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brochure.industrySolutions.map((s) => (
                  <motion.div
                    key={s.title}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: CARD_STYLE.surface,
                      boxShadow: CARD_STYLE.shadow,
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-sm mt-1" style={{ color: BROCHURE_THEME.muted }}>
                          {s.subtitle}
                        </div>
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl bg-[#ffffff] border flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: BROCHURE_THEME.borderStrong,
                          backgroundColor: 'rgba(255,255,255,0.06)',
                        }}
                      >
                        <Zap className="w-5 h-5" />
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {s.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: BROCHURE_THEME.mutedStrong }}
                        >
                          <span
                            className="mt-1 inline-block w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: BROCHURE_THEME.accent }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 text-xs" style={{ color: BROCHURE_THEME.muted }}>
                      {s.tech}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Capabilities */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <h2 className="text-xl font-bold">Capability Matrix</h2>
              <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                Technical expertise across AI, GPU performance, and product delivery.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brochure.capabilities.map((cap) => (
                  <motion.div
                    key={cap.name}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: CARD_STYLE.surfaceSoft,
                      boxShadow: CARD_STYLE.shadow,
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{
                          borderColor: BROCHURE_THEME.borderStrong,
                          background: 'rgba(0,0,0,0.25)',
                          boxShadow: BROCHURE_DECOR.glow,
                        }}
                      >
                        <cap.icon className="w-5 h-5" style={{ color: BROCHURE_THEME.accent }} />
                      </div>
                      <div className="font-semibold">{cap.name}</div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-2">
                      {cap.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: BROCHURE_THEME.mutedStrong }}
                        >
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: BROCHURE_THEME.accent }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Process */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <h2 className="text-xl font-bold">Development Process</h2>
              <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                Agile, measurable, and aligned to production outcomes.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brochure.processSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{ borderColor: BROCHURE_THEME.border, backgroundColor: BROCHURE_THEME.panel }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-[#ffffff] border flex items-center justify-center"
                        style={{
                          borderColor: BROCHURE_THEME.borderStrong,
                          backgroundColor: 'rgba(255,255,255,0.06)',
                        }}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="font-semibold">{step.title}</div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {step.points.map((p) => (
                        <div
                          key={p}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: BROCHURE_THEME.mutedStrong }}
                        >
                          <span
                            className="mt-1 inline-block w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: BROCHURE_THEME.accent }}
                          />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-2xl border p-6"
                data-pdf-surface="card"
                style={{ borderColor: BROCHURE_THEME.border, backgroundColor: BROCHURE_THEME.panel }}
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-semibold">Tools we use</div>
                    <div className="text-sm mt-1" style={{ color: BROCHURE_THEME.muted }}>
                      Visibility, documentation, and automated delivery.
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full sm:w-auto">
                    {brochure.tools.map((t) => (
                      <div
                        key={t.name}
                        className="rounded-xl border p-3"
                        style={{ borderColor: BROCHURE_THEME.border, backgroundColor: 'rgba(255,255,255,0.03)' }}
                      >
                        <div className="flex items-center gap-2">
                          <t.icon className="w-4 h-4" />
                          <div className="text-sm font-semibold">{t.name}</div>
                        </div>
                        <div className="text-xs mt-1" style={{ color: BROCHURE_THEME.muted }}>
                          {t.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Why choose */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <h2 className="text-xl font-bold">Why Choose Jashom</h2>
              <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                A delivery partner focused on outcomes and maintainability.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brochure.reasons.map((r) => (
                  <motion.div
                    key={r.title}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: CARD_STYLE.surface,
                      boxShadow: CARD_STYLE.shadow,
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                        style={{
                          borderColor: BROCHURE_THEME.borderStrong,
                          background: 'rgba(0,0,0,0.25)',
                          boxShadow: BROCHURE_DECOR.glow,
                        }}
                      >
                        <r.icon className="w-5 h-5" style={{ color: BROCHURE_THEME.accent }} />
                      </div>
                      <div>
                        <div className="font-semibold">{r.title}</div>
                        <div className="text-sm mt-1" style={{ color: BROCHURE_THEME.muted }}>
                          {r.desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Success stories */}
            <section
              className="px-8 sm:px-10 py-10 border-b"
              data-brochure-section="true"
              style={{ borderBottomColor: BROCHURE_THEME.border, ...SECTION_SPACING }}
            >
              <h2 className="text-xl font-bold">Success Stories</h2>
              <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                Representative outcomes from real delivery engagements.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {brochure.successStories.map((s) => (
                  <motion.div
                    key={s.title}
                    className="rounded-2xl border p-6"
                    data-pdf-surface="card"
                    style={{
                      borderColor: BROCHURE_THEME.border,
                      background: CARD_STYLE.surfaceSoft,
                      boxShadow: CARD_STYLE.shadow,
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm mt-2 leading-relaxed" style={{ color: BROCHURE_THEME.mutedStrong }}>
                      {s.impact}
                    </div>
                    <div className="text-xs mt-3" style={{ color: BROCHURE_THEME.muted }}>
                      {s.byline} • {s.industry}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section
              className="px-8 sm:px-10 py-10"
              data-brochure-section="true"
              style={{ ...SECTION_SPACING, paddingBottom: 64 }}
            >
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <h2 className="text-xl font-bold">Let’s Connect</h2>
                  <p className="mt-1" style={{ color: BROCHURE_THEME.muted }}>
                    Ready to optimize performance or ship an AI product?
                  </p>
                  <div className="mt-5 space-y-2 text-sm" style={{ color: BROCHURE_THEME.mutedStrong }}>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{brochure.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{brochure.contact.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span className="leading-relaxed">{brochure.contact.address}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  {!pdfMode && (
                    <div className="text-xs mt-3" style={{ color: BROCHURE_THEME.muted }}>
                      Tip: Use “Download PDF” above to save this brochure as a PDF.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
