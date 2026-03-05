import { motion } from 'motion/react';
import { SEO as Seo } from '../SEO';
import * as Theme from '../../constants/theme';

/** Consistent spacing for all 4 case study pages */
const SPACING = {
  pagePaddingY: 'pt-24 pb-20',
  articlePaddingX: 'px-4 sm:px-6 lg:px-8',
  headerMarginBottom: 'mb-16',
  badgeMarginBottom: 'mb-4',
  titleMarginBottom: 'mb-4',
  hardwareMarginBottom: 'mb-6',
  summaryMarginBottom: 'mb-0',
  statsMarginTop: 'mt-8',
  statsGap: 'gap-4',
  sectionMarginBottom: 'mb-16',
  sectionHeadingMarginBottom: 'mb-6',
  sectionContentGap: 'space-y-6',
  tableMarginY: 'my-6',
} as const;

export type CaseStudyStat = { value: string; label: string };

export interface CaseStudyArticleLayoutProps {
  seo: { title: string; description: string; keywords: string };
  badge: string;
  title: string;
  hardware: string;
  executiveSummary: string;
  stats: CaseStudyStat[];
  children: React.ReactNode;
}

export function CaseStudyArticleLayout({
  seo,
  badge,
  title,
  hardware,
  executiveSummary,
  stats,
  children,
}: Readonly<CaseStudyArticleLayoutProps>) {
  return (
    <div className={`min-h-screen ${SPACING.pagePaddingY}`} style={{ background: Theme.SECTION_BG }}>
      <Seo title={seo.title} description={seo.description} keywords={seo.keywords} />

      <article className={`${Theme.SECTION_CONTAINER} ${SPACING.articlePaddingX}`}>
        <motion.header
          className={SPACING.headerMarginBottom}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className={`inline-block ${SPACING.badgeMarginBottom} px-3 py-1.5 rounded-full text-xs sm:text-sm uppercase tracking-wider`}
            style={{ ...Theme.OVERVIEW_BADGE, color: Theme.ACCENT_COLOR }}
          >
            {badge}
          </p>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${SPACING.titleMarginBottom}`}
            style={{ color: Theme.TEXT_FAFAFA }}
          >
            {title}
          </h1>
          <p
            className={`text-sm sm:text-base ${SPACING.hardwareMarginBottom}`}
            style={{ color: Theme.TEXT_MUTED }}
          >
            <strong>Hardware:</strong> {hardware}
          </p>
          <p
            className={`text-base sm:text-lg leading-relaxed max-w-4xl ${SPACING.summaryMarginBottom}`}
            style={{ color: Theme.TEXT_QUOTE }}
          >
            {executiveSummary}
          </p>

          <div className={`grid grid-cols-2 sm:grid-cols-4 ${SPACING.statsGap} ${SPACING.statsMarginTop}`}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-xl p-4 text-center"
                style={Theme.KEY_STAT_BOX}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
              >
                <div
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: Theme.ACCENT_COLOR }}
                >
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm" style={{ color: Theme.TEXT_GRAY }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.header>

        {children}
      </article>
    </div>
  );
}

export function CaseStudySection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <motion.section
      className={SPACING.sectionMarginBottom}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold ${SPACING.sectionHeadingMarginBottom}`}
        style={{ color: Theme.TEXT_FAFAFA, borderBottom: `2px solid rgba(${Theme.ACCENT_RGB}, 0.3)`, paddingBottom: 8 }}
      >
        {title}
      </h2>
      <div className={`prose prose-invert max-w-none ${SPACING.sectionContentGap}`} style={{ color: Theme.TEXT_QUOTE }}>
        {children}
      </div>
    </motion.section>
  );
}

export function CaseStudyTable({
  headers,
  rows,
}: Readonly<{
  headers: string[];
  rows: string[][];
}>) {
  return (
    <div className={`overflow-x-auto rounded-xl border ${SPACING.tableMarginY}`} style={{ borderColor: Theme.BORDER_SUBTLE }}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr style={{ background: `rgba(${Theme.ACCENT_RGB}, 0.08)` }}>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-semibold whitespace-nowrap"
                style={{ color: Theme.TEXT_FAFAFA }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const rowKey = row.join('|') || `row-${row.length}`;
            const cellsWithHeaders = headers.map((header, colIndex) => ({ header, cell: row[colIndex] ?? '' }));
            return (
              <tr
                key={rowKey}
                className="border-t"
                style={{ borderColor: Theme.BORDER_SUBTLE }}
              >
                {cellsWithHeaders.map(({ header, cell }) => (
                  <td key={`${header}-${cell}`} className="px-4 py-3" style={{ color: Theme.TEXT_QUOTE }}>
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
