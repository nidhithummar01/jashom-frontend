import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from './SEO';
import * as Theme from '../constants/theme';
import {
  CAPABILITY_MATRIX_BG,
  CARD_BORDER,
  ICON_BOX_BG,
  SUMMARY_CARD_STYLE,
  SUMMARY_ICON_BOX,
  capabilityMatrixData,
  engagementModelData,
  portfolioSummaryData,
  techStackData,
} from './PortfolioPage/data';

export function PortfolioPage() {
  return (
    <div className="min-h-screen" style={{ background: Theme.SECTION_BG }}>
      <SEO
        title="Portfolio | AI, GPU & Healthcare Solutions | Jashom"
        description="Explore Jashom's portfolio of applied AI, GPU optimization, and healthcare AI systems. Powering AI and redefining efficiency."
        keywords="portfolio, AI solutions, GPU optimization, healthcare AI, model deployment"
      />

      {/* Hero Section with Background Image */}
      <section
        className="relative overflow-hidden w-full min-h-[70vh] flex items-center"
        style={{
          backgroundImage: "url('/images/portfolio.jpg')",
          ...Theme.HERO_BG_CENTER,
        }}
      >
        {/* Dark gradient overlay for readability */}
        <div
          className="absolute inset-0"
          style={{ background: Theme.HERO_OVERLAY_GRADIENT }}
        />

        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          style={Theme.HERO_CONTENT_PADDING}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span
              className="inline-block mb-4 px-4 py-2 rounded-full uppercase tracking-wider"
              style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
            >
              Portfolio
            </span>
            <h1
              className="font-bold text-white leading-tight"
              style={Theme.HERO_H1_STYLE}
            >
              Powering AI. Redefining Efficiency.
            </h1>
            <p
              className="text-white/90"
              style={Theme.HERO_P_STYLE}
            >
              Jashom is an applied AI company advancing artificial intelligence
              while optimizing performance and reducing energy consumption across
              GPU infrastructure, model deployment, and healthcare AI systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Jashom Technologies - Left content, Right image (GPU page style) */}
      <section
        className={`${Theme.SECTION_CLASS} relative overflow-hidden`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                {...Theme.MOTION_FADE_UP_20}
                className="space-y-6"
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  About Jashom Technologies
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  Jashom Technologies is a deep-technology AI company that operates at the
                  intersection of GPU engineering and applied artificial intelligence. We
                  don&apos;t build surface-level AI solutions — we engineer them from the
                  hardware up, building custom kernels, optimizing inference paths, designing
                  workload orchestration systems, and deploying production-grade AI into
                  environments where performance and reliability are non-negotiable.
                </p>
                <p className="text-white/70 text-base leading-relaxed">
                  Our work spans four interconnected domains: GPU and systems optimization, AI
                  model fine-tuning and deployment, GPU workload orchestration, and healthcare
                  AI infrastructure. In every domain, the thread is the same — applied
                  engineering that produces measurable results on real hardware.
                </p>
              </motion.div>
            </div>
            <div>
              <motion.div
                {...Theme.MOTION_FADE_SCALE}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src="/images/contact.hero.jpg"
                  alt="GPU Optimization and Applied AI"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  style={Theme.IMAGE_SHADOW_ACCENT}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capability Matrix - Hire CUDA Technical Expertise style */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: CAPABILITY_MATRIX_BG }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Core Capability Matrix
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilityMatrixData.slice(0, 6).map((item, i) => {
              const IconComponent = item.Icon;
              return (
                <motion.div
                  key={item.capability}
                  className="flex gap-4 border rounded-xl p-6"
                  style={{ borderColor: CARD_BORDER }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ background: ICON_BOX_BG }}
                    >
                      <IconComponent
                        className="w-7 h-7"
                        style={{ color: Theme.ACCENT_COLOR }}
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: Theme.TEXT_FAFAFA }}
                    >
                      {item.capability}
                    </h3>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: Theme.ACCENT_COLOR }}
                      >
                        Technical Depth
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: Theme.TEXT_GRAY }}
                      >
                        {item.technicalDepth}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: Theme.ACCENT_COLOR }}
                      >
                        Business Impact
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: Theme.TEXT_GRAY }}
                      >
                        {item.businessImpact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Last card (Healthcare AI) centered on the page */}
          {capabilityMatrixData[6] && (() => {
            const item = capabilityMatrixData[6];
            const IconComponent = item.Icon;
            return (
              <div className="flex justify-center mt-8">
                <motion.div
                  className="flex gap-4 border rounded-xl p-6 w-[400px] md:max-w-[calc(50%-1rem)]"
                  style={{ borderColor: CARD_BORDER }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ background: ICON_BOX_BG }}
                    >
                      <IconComponent
                        className="w-7 h-7"
                        style={{ color: Theme.ACCENT_COLOR }}
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-3">
                    <h3
                      className="text-lg font-bold"
                      style={{ color: Theme.TEXT_FAFAFA }}
                    >
                      {item.capability}
                    </h3>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: Theme.ACCENT_COLOR }}
                      >
                        Technical Depth
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: Theme.TEXT_GRAY }}
                      >
                        {item.technicalDepth}
                      </p>
                    </div>
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-1"
                        style={{ color: Theme.ACCENT_COLOR }}
                      >
                        Business Impact
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: Theme.TEXT_GRAY }}
                      >
                        {item.businessImpact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* GPU Portfolio & Case Studies */}
      <section
        className={`${Theme.SECTION_CLASS} relative overflow-hidden mt-20`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block mb-4 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
              style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
              whileHover={{
                boxShadow: '0 0 24px rgba(34, 211, 238, 0.7)',
                borderColor: 'rgba(34, 211, 238, 0.9)',
              }}
            >
              GPU Portfolio & Case Studies
            </motion.span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Case Studies
            </h2>
            <p
              className="max-w-2xl mx-auto text-base"
              style={{ color: Theme.TEXT_MUTED }}
            >
              Real engagements: LLM inference optimization, GPU orchestration, cloud fine-tuning, and hardware telemetry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaseStudyCard
              badge="Case Study 1 · Enterprise AI · LLM Deployment"
              title="LLM Inference Optimization on Constrained GPU Infrastructure"
              summary="42% higher throughput, 37% lower power, 12 distributed nodes. Full inference path re-engineering with CUDA kernels, TensorRT, and adaptive batching."
              stats={['42% Throughput', '37% Power ↓', '12 Nodes'] }
              to="/portfolio/case-study/llm-inference-optimization/"
            />
            <CaseStudyCard
              badge="Case Study 2 · Infrastructure · GPU Operations"
              title="GPU Workload Orchestration Framework on Rocky Linux 9.7"
              summary="Demo-ready in 5 days: REST API, VRAM-aware scheduling, Docker isolation, full audit trail. RTX 3090 + Rocky Linux 9.7."
              stats={['5 Days', '4 Endpoints', '100% Isolation']}
              to="/portfolio/case-study/gpu-workload-orchestration/"
            />
            <CaseStudyCard
              badge="Case Study 3 · AI Engineering · Cloud Infrastructure"
              title="Cloud GPU Fine-Tuning Strategy for Production LLM Deployment"
              summary="Tiered strategy 7B–70B+ models: LoRA/QLoRA, Axolotl, DeepSpeed. Provider-agnostic cloud GPU; dataset to production in days."
              stats={['7B–70B+', '3 Tiers', 'Days to Deploy'] }
              to="/portfolio/case-study/cloud-gpu-fine-tuning/"
            />
            <CaseStudyCard
              badge="Case Study 4 · Infrastructure Monitoring · GPU Data Centers"
              title="Real-Time GPU Server Hardware Telemetry via Redfish BMC"
              summary="Live dashboard every 30s: power, temperature, fan RPM from Lambda Scalar BMCs. HTTPS, Basic Auth, scoped SSL bypass."
              stats={['30s Refresh', '4 Servers', 'Out-of-band']}
              to="/portfolio/case-study/redfish-bmc-telemetry/"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Summary – Capabilities, Technologies & Evidence (home-page card style) */}
      <section
        className={`${Theme.SECTION_CLASS} relative overflow-hidden`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block mb-4 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
              style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
              whileHover={{
                boxShadow: '0 0 24px rgba(34, 211, 238, 0.7)',
                borderColor: 'rgba(34, 211, 238, 0.9)',
              }}
            >
              Portfolio Summary
            </motion.span>
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Capabilities, Technologies & Engagement Model
            </h2>
            <p
              className="text-lg mb-6 text-center mx-auto "
              style={{ color: Theme.TEXT_MUTED }}
            >
              What Jashom Has Demonstrated
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {portfolioSummaryData.map((item) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.capability}
                  variants={Theme.STAGGER_ITEM}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative rounded-2xl p-8 border overflow-hidden transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                  style={SUMMARY_CARD_STYLE}
                >
                  <div className="relative z-10">
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300"
                      style={SUMMARY_ICON_BOX}
                    >
                      <Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
                    </div>
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: Theme.TEXT_FAFAFA }}
                    >
                      {item.capability}
                    </h3>
                    <p
                      className="leading-relaxed"
                      style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}
                    >
                      {item.evidence}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Full Technology Stack – category cards with tech pills */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 relative overflow-x-hidden"
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10 w-full min-w-0 max-w-full`}>
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '40px' }}
          >
            <motion.span
              className="inline-block mb-4 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
              style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
              whileHover={{
                boxShadow: '0 0 24px rgba(34, 211, 238, 0.7)',
                borderColor: 'rgba(34, 211, 238, 0.9)',
              }}
            >
              Technology Stack
            </motion.span>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Full Technology Stack
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '20px' }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {techStackData.map((category) => {
              const Icon = category.Icon;
              return (
                <motion.div
                  key={category.title}
                  variants={Theme.STAGGER_ITEM}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-2xl p-6 sm:p-8 border min-w-0 transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                  style={SUMMARY_CARD_STYLE}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={SUMMARY_ICON_BOX}>
                    <Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-4 break-words"
                    style={{ color: Theme.TEXT_FAFAFA }}
                  >
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {category.items.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-lg border inline-block"
                        style={{ color: Theme.TEXT_QUOTE, borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Engagement Model – 2x2 cards */}
      <section
        className={`${Theme.SECTION_CLASS} relative overflow-x-hidden`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10 w-full min-w-0 max-w-full`}>
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block mb-4 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
              style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
              whileHover={{
                boxShadow: '0 0 24px rgba(34, 211, 238, 0.7)',
                borderColor: 'rgba(34, 211, 238, 0.9)',
              }}
            >
              How We Work
            </motion.span>
            <h2
              className="text-3xl sm:text-4xl mb-8 font-bold"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Engagement Model
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {engagementModelData.map((item) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  variants={Theme.STAGGER_ITEM}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="rounded-2xl p-6 sm:p-8 border min-w-0 transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                  style={SUMMARY_CARD_STYLE}
                >
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={SUMMARY_ICON_BOX}>
                    <Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
                  </div>
                  <h3
                    className="text-xl font-bold mb-4 break-words"
                    style={{ color: Theme.TEXT_FAFAFA }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="leading-relaxed text-sm sm:text-base"
                    style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA – after all sections */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-10 sm:py-12 relative overflow-x-hidden"
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight max-w-3xl mx-auto"
              style={{ color: Theme.TEXT_FAFAFA }}
            >
              Ready to make your GPU infrastructure work harder?
            </p>
            <Link
              to="/contact/"
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={Theme.CTA_HERO_STYLE}
            >
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function CaseStudyCard({
  badge,
  title,
  summary,
  stats,
  to,
}: Readonly<{
  badge: string;
  title: string;
  summary: string;
  stats: string[];
  to: string;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border rounded-xl p-6 flex flex-col"
      style={{ borderColor: CARD_BORDER }}
    >
      <p
        className="text-xs uppercase tracking-wider mb-3"
        style={{ color: Theme.ACCENT_COLOR }}
      >
        {badge}
      </p>
      <h3
        className="text-lg font-bold mb-3 leading-tight"
        style={{ color: Theme.TEXT_FAFAFA }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4 flex-1"
        style={{ color: Theme.TEXT_GRAY }}
      >
        {summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {stats.map((s) => (
          <span
            key={s}
            className="text-xs px-3 py-2 rounded-md"
            style={{ ...Theme.KEY_STAT_BOX }}
          >
            {s}
          </span>
        ))}
      </div>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-90"
        style={{ color: Theme.ACCENT_COLOR }}
      >
        View full case study
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
