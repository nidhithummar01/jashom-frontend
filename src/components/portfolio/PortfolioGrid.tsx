import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../GlassCard';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { CASE_STUDIES, PORTFOLIO_CATEGORIES, type CaseStudy } from './caseStudiesData';

const CASE_STUDY_LINK_CLASS = 'inline-flex items-center gap-2 text-[#d1d5db] hover:text-white transition-colors text-xs group/link';
const LIVE_LINK_CLASS = 'inline-flex items-center gap-2 text-[#ffffff] hover:text-[#d1d5db] transition-colors text-xs';

function CaseStudyLink({
  href,
  isInternal,
  children
}: Readonly<{ href: string; isInternal: boolean; children: React.ReactNode }>) {
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
    </>
  );
  return isInternal ? (
    <Link to={href} className={CASE_STUDY_LINK_CLASS}>
      {content}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CASE_STUDY_LINK_CLASS}>
      {content}
    </a>
  );
}

function getGridColsClass(count: number): string {
  if (count === 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2';
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
}

const LABEL_CLASS = 'text-[#d1d5db] text-xs font-medium';

function CardSectionLabel({ label, children, variant = 'default' }: Readonly<{ label: string; children: React.ReactNode; variant?: 'default' | 'compact' }>) {
  const isCompact = variant === 'compact';
  return (
    <div>
      <div className={`flex items-center gap-2 ${isCompact ? 'mb-1' : 'mb-1.5'}`}>
        <div className={`rounded-full bg-[#ffffff] ${isCompact ? 'w-1.5 h-1.5' : 'w-2 h-2'}`} />
        <span className={LABEL_CLASS}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function CardFooter({ study, className }: Readonly<{ study: CaseStudy; className?: string }>) {
  return (
    <div className={`border-t border-white/10 flex flex-row flex-wrap items-center justify-between ${className ?? 'mt-4 pt-4 gap-3'}`}>
      {study.link ? (
        <CaseStudyLink href={study.link} isInternal={study.link.startsWith('/')}>
          View Full Case Study
        </CaseStudyLink>
      ) : null}
      {study.liveUrl ? (
        <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" className={LIVE_LINK_CLASS}>
          <span>Visit Live Platform</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      ) : null}
    </div>
  );
}

const TAG_BASE_CLASS = 'inline-flex items-center bg-[#ffffff]/12 border border-[#ffffff]/25 text-[#e5e7eb] text-xs';

function TagsList({
  study,
  tagClassName,
  contentPl = 'pl-3.5',
  techLabelClass = 'mt-1.5 mb-1'
}: Readonly<{ study: CaseStudy; tagClassName: string; contentPl?: string; techLabelClass?: string }>) {
  return (
    <>
      <p className={`text-[#9ca3af] text-xs font-medium ${techLabelClass} ${contentPl}`}>Technologies used</p>
      <div className={`flex flex-wrap gap-1.5 ${contentPl}`}>
        {study.tags.map((tag) => (
          <span key={`${study.link}-${tag}`} className={`${TAG_BASE_CLASS} ${tagClassName}`}>
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}

function ImpactList({
  study,
  maxItems = 3,
  listClassName = 'space-y-1.5 pl-4',
  iconSize = 'w-4 h-4',
  listIconSize = 'w-3.5 h-3.5',
  itemClassName
}: Readonly<{
  study: CaseStudy;
  maxItems?: number;
  listClassName?: string;
  iconSize?: string;
  listIconSize?: string;
  itemClassName?: string;
}>) {
  const items = study.impact.slice(0, maxItems);
  return (
    <div>
      <div className={`flex items-center gap-2 ${maxItems === 2 ? 'mb-1' : 'mb-1.5'}`}>
        <TrendingUp className={`${iconSize} text-[#d1d5db]`} />
        <span className={LABEL_CLASS}>Impact & Results</span>
      </div>
      <ul className={listClassName}>
        {items.map((item, impactIndex) => (
          <motion.li
            key={`${study.link}-impact-${item}`}
            className="flex items-start gap-2 text-white text-xs"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: impactIndex * 0.05 }}
          >
            <CheckCircle2 className={`${listIconSize} text-[#ffffff] flex-shrink-0 mt-0.5`} />
            <span className={itemClassName}>{item}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const groupedProjects = PORTFOLIO_CATEGORIES.map((category) => ({
  category,
  projects: CASE_STUDIES.filter((study: CaseStudy) => study.category === category)
}));

const CONTENT_PL_COMPACT = 'pl-3.5';
const CONTENT_PL_DEFAULT = 'pl-4';

function CardWithImage({ study }: Readonly<{ study: CaseStudy }>) {
  return (
    <GlassCard>
      <div className="flex flex-col h-full">
        {study.image && (
          <div className="mb-3 rounded-lg overflow-hidden border border-white/10 aspect-video">
            <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/20 text-[#d1d5db] text-xs">{study.industry}</span>
        </div>
        <h3 className="mb-2 text-white text-base font-semibold">{study.title}</h3>
        <div className="space-y-2 flex-1">
          <CardSectionLabel label="Challenge" variant="compact">
            <p className={`text-white/70 text-xs leading-relaxed line-clamp-2 ${CONTENT_PL_COMPACT}`}>{study.challenge}</p>
          </CardSectionLabel>
          <CardSectionLabel label="Solution" variant="compact">
            <p className={`text-white/70 text-xs leading-relaxed line-clamp-2 ${CONTENT_PL_COMPACT}`}>{study.solution}</p>
            <TagsList study={study} tagClassName="px-2 py-0.5 rounded" contentPl={CONTENT_PL_COMPACT} />
          </CardSectionLabel>
          <ImpactList
            study={study}
            maxItems={2}
            listClassName="space-y-1 pl-3.5"
            iconSize="w-3.5 h-3.5"
            listIconSize="w-3 h-3"
            itemClassName="line-clamp-1"
          />
        </div>
        <CardFooter study={study} className="mt-3 pt-3 gap-x-6 gap-y-2" />
      </div>
    </GlassCard>
  );
}

function CardDefault({ study }: Readonly<{ study: CaseStudy }>) {
  return (
    <GlassCard>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 rounded-full bg-[#ffffff]/20 text-[#d1d5db] text-sm">{study.industry}</span>
          <span className="text-white/50 text-sm">{study.client}</span>
        </div>
        <h3 className="mb-3 text-white font-semibold">{study.title}</h3>
        <div className="space-y-3 flex-1">
          <CardSectionLabel label="Challenge">
            <p className={`text-white/70 text-xs leading-relaxed line-clamp-3 ${CONTENT_PL_DEFAULT}`}>{study.challenge}</p>
          </CardSectionLabel>
          <CardSectionLabel label="Solution">
            <p className={`text-white/70 text-xs leading-relaxed line-clamp-3 ${CONTENT_PL_DEFAULT}`}>{study.solution}</p>
            <TagsList study={study} tagClassName="px-2 py-1 rounded-md font-medium" contentPl={CONTENT_PL_DEFAULT} techLabelClass="mt-2 mb-1.5" />
          </CardSectionLabel>
          <ImpactList study={study} />
        </div>
        <CardFooter study={study} />
      </div>
    </GlassCard>
  );
}

type PortfolioGridProps = Readonly<{ variant?: 'default' | 'withImage' }>;

export function PortfolioGrid({ variant = 'default' }: PortfolioGridProps) {
  const Card = variant === 'withImage' ? CardWithImage : CardDefault;
  return (
    <div className="space-y-16 mt-16">
      {groupedProjects.map(({ category, projects }, categoryIndex) => (
        <div key={category} className={categoryIndex > 0 ? 'pt-12 sm:pt-16' : ''}>
          <motion.div
            className="text-center mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-1 mt-8 sm:mt-10 mb-8 sm:mb-10">
              <h2 className="text-3xl font-bold text-gradient">{category}</h2>
              <p className="text-white/60 text-sm">
                ({projects.length} {projects.length === 1 ? 'Project' : 'Projects'})
              </p>
            </div>
          </motion.div>
          <div className={`pt-10 sm:pt-12 grid gap-6 sm:gap-8 ${getGridColsClass(projects.length)}`}>
            {projects.map((study) => (
              <Card study={study} key={study.link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
