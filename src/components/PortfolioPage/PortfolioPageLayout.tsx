import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SEO as Seo } from '../SEO';
import * as Theme from '../../constants/theme';
import type { PortfolioPageContent } from './content';
import { portfolioPageData } from './data';

type PortfolioPageData = typeof portfolioPageData;

type Props = { content: PortfolioPageContent; data: PortfolioPageData };

function SectionHeader({
  badge,
  title,
  subtitle,
  badgeHover,
}: Readonly<{
  badge: string;
  title: string;
  subtitle?: string;
  badgeHover?: boolean;
}>) {
  return (
    <motion.div
      className="text-center mb-8 md:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block mb-4 px-4 py-2 rounded-full text-xs uppercase tracking-wider"
        style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
        whileHover={
          badgeHover
            ? { boxShadow: '0 0 24px rgba(34, 211, 238, 0.7)', borderColor: 'rgba(34, 211, 238, 0.9)' }
            : undefined
        }
      >
        {badge}
      </motion.span>
      <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: Theme.TEXT_FAFAFA }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg mb-6 text-center mx-auto" style={{ color: Theme.TEXT_MUTED }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function CapabilityMatrixCard({
  item,
  index,
  styles,
  centered,
}: Readonly<{
  item: { capability: string; technicalDepth: string; businessImpact: string; Icon: LucideIcon };
  index: number;
  styles: { CARD_BORDER: string; ICON_BOX_BG: string };
  centered?: boolean;
}>) {
  const IconComponent = item.Icon;
  const card = (
    <motion.div
      className={`flex gap-4 border rounded-xl p-6 ${centered ? 'w-[400px] md:max-w-[calc(50%-1rem)]' : ''}`}
      style={{ borderColor: styles.CARD_BORDER }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: centered ? 0.7 : 0.1 * (index + 1) }}
    >
      <div className="flex-shrink-0">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ background: styles.ICON_BOX_BG }}
        >
          <IconComponent className="w-7 h-7" style={{ color: Theme.ACCENT_COLOR }} />
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <h3 className="text-lg font-bold" style={{ color: Theme.TEXT_FAFAFA }}>
          {item.capability}
        </h3>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: Theme.ACCENT_COLOR }}>
            Technical Depth
          </p>
          <p className="text-sm leading-relaxed" style={{ color: Theme.TEXT_GRAY }}>
            {item.technicalDepth}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: Theme.ACCENT_COLOR }}>
            Business Impact
          </p>
          <p className="text-sm leading-relaxed" style={{ color: Theme.TEXT_GRAY }}>
            {item.businessImpact}
          </p>
        </div>
      </div>
    </motion.div>
  );
  return centered ? <div className="flex justify-center mt-8">{card}</div> : card;
}

function CaseStudyCard({
  badge,
  title,
  summary,
  stats,
  to,
  borderColor,
}: Readonly<{
  badge: string;
  title: string;
  summary: string;
  stats: readonly string[];
  to: string;
  borderColor: string;
}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group border rounded-xl p-6 flex flex-col"
      style={{ borderColor }}
    >
      <p className="text-xs uppercase tracking-wider mb-3" style={{ color: Theme.ACCENT_COLOR }}>
        {badge}
      </p>
      <h3 className="text-lg font-bold mb-3 leading-tight" style={{ color: Theme.TEXT_FAFAFA }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: Theme.TEXT_GRAY }}>
        {summary}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {stats.map((s) => (
          <span key={s} className="text-xs px-3 py-2 rounded-md" style={{ ...Theme.KEY_STAT_BOX }}>
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

function IconCard({
  Icon,
  title,
  children,
  cardStyle,
  iconBoxStyle,
}: Readonly<{
  Icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  cardStyle: React.CSSProperties;
  iconBoxStyle: React.CSSProperties;
}>) {
  return (
    <motion.div
      variants={Theme.STAGGER_ITEM}
      whileHover={{ y: -8, scale: 1.02 }}
      className="rounded-2xl p-6 sm:p-8 border min-w-0 transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
      style={cardStyle}
    >
      <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={iconBoxStyle}>
        <Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
      </div>
      <h3 className="text-xl font-bold mb-4 break-words" style={{ color: Theme.TEXT_FAFAFA }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export function PortfolioPageLayout({ content, data }: Readonly<Props>) {
  const c = content;
  const d = data;

  return (
    <div className="min-h-screen" style={{ background: Theme.SECTION_BG }}>
      <Seo title={c.seo.title} description={c.seo.description} keywords={c.seo.keywords} />

      <section
        className="relative overflow-hidden w-full min-h-[70vh] flex items-center"
        style={{ backgroundImage: `url(${c.hero.backgroundImage})`, ...Theme.HERO_BG_CENTER }}
      >
        <div className="absolute inset-0" style={{ background: Theme.HERO_OVERLAY_GRADIENT }} />
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
              {c.hero.badge}
            </span>
            <h1 className="font-bold text-white leading-tight" style={Theme.HERO_H1_STYLE}>
              {c.hero.title}
            </h1>
            <p className="text-white/90" style={Theme.HERO_P_STYLE}>
              {c.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: d.CAPABILITY_MATRIX_BG }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: Theme.TEXT_FAFAFA }}>
              {c.capabilityMatrix.title}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {d.capabilityMatrixData.slice(0, 6).map((item, i) => (
              <CapabilityMatrixCard
                key={item.capability}
                item={item}
                index={i}
                styles={{ CARD_BORDER: d.CARD_BORDER, ICON_BOX_BG: d.ICON_BOX_BG }}
              />
            ))}
          </div>
          {d.capabilityMatrixData[6] && (
            <CapabilityMatrixCard
              item={d.capabilityMatrixData[6]}
              index={6}
              styles={{ CARD_BORDER: d.CARD_BORDER, ICON_BOX_BG: d.ICON_BOX_BG }}
              centered
            />
          )}
        </div>
      </section>

      <section
        className={`${Theme.SECTION_CLASS} relative overflow-hidden mt-20`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <SectionHeader badge={c.caseStudies.badge} title={c.caseStudies.title} subtitle={c.caseStudies.subtitle} badgeHover />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.caseStudies.items.map((study) => (
              <CaseStudyCard
                key={study.to}
                badge={study.badge}
                title={study.title}
                summary={study.summary}
                stats={study.stats}
                to={study.to}
                borderColor={d.CARD_BORDER}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${Theme.SECTION_CLASS} relative overflow-hidden`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10`}>
          <SectionHeader
            badge={c.portfolioSummary.badge}
            title={c.portfolioSummary.title}
            subtitle={c.portfolioSummary.subtitle}
            badgeHover
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {d.portfolioSummaryData.map((item) => (
              <motion.div
                key={item.capability}
                variants={Theme.STAGGER_ITEM}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-2xl p-8 border overflow-hidden transition-all duration-300 hover:border-[rgba(34,211,238,0.4)] hover:shadow-[0_8px_32px_rgba(34,211,238,0.15)]"
                style={d.SUMMARY_CARD_STYLE}
              >
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300"
                    style={d.SUMMARY_ICON_BOX}
                  >
                    <item.Icon className="w-8 h-8" style={{ color: Theme.ACCENT_COLOR }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: Theme.TEXT_FAFAFA }}>
                    {item.capability}
                  </h3>
                  <p className="leading-relaxed" style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}>
                    {item.evidence}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-14 relative overflow-x-hidden"
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10 w-full min-w-0 max-w-full`}>
          <SectionHeader badge={c.techStack.badge} title={c.techStack.title} badgeHover />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '20px' }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {d.techStackData.map((category) => (
              <IconCard
                key={category.title}
                Icon={category.Icon}
                title={category.title}
                cardStyle={d.SUMMARY_CARD_STYLE}
                iconBoxStyle={d.SUMMARY_ICON_BOX}
              >
                <div className="flex flex-wrap gap-2 min-w-0">
                  {category.items.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-lg border inline-block"
                      style={{
                        color: Theme.TEXT_QUOTE,
                        borderColor: 'rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.04)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </IconCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className={`${Theme.SECTION_CLASS} relative overflow-x-hidden`}
        style={{ background: Theme.SECTION_BG }}
      >
        <div className={`${Theme.SECTION_CONTAINER} relative z-10 w-full min-w-0 max-w-full`}>
          <SectionHeader badge={c.engagement.badge} title={c.engagement.title} badgeHover />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={Theme.STAGGER_CONTAINER}
          >
            {d.engagementModelData.map((item) => (
              <IconCard
                key={item.title}
                Icon={item.Icon}
                title={item.title}
                cardStyle={d.SUMMARY_CARD_STYLE}
                iconBoxStyle={d.SUMMARY_ICON_BOX}
              >
                <p
                  className="leading-relaxed text-sm sm:text-base"
                  style={{ color: Theme.TEXT_GRAY, lineHeight: 1.8 }}
                >
                  {item.description}
                </p>
              </IconCard>
            ))}
          </motion.div>
        </div>
      </section>

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
              {c.cta.heading}
            </p>
            <Link
              to={c.cta.buttonHref}
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={Theme.CTA_HERO_STYLE}
            >
              {c.cta.buttonLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
