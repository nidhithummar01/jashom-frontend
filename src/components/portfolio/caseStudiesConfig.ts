/** Shared config, types, and helpers for case studies. */

export type CaseStudy = {
  title: string;
  client: string;
  industry: string;
  category: string;
  challenge: string;
  solution: string;
  impact: string[];
  tags: string[];
  link: string;
  liveUrl?: string;
  image?: string;
};

export const CLIENT = { JAY_DAVE: 'Jay Dave', JASHOM: 'Jashom' } as const;
export const CATEGORY = {
  ENV_TECH: 'Environmental Tech',
  HEALTHCARE: 'Healthcare Technology',
  SAAS: 'SaaS Platforms',
  AI_ML: 'AI & Machine Learning',
} as const;

export const PORTFOLIO_IMG = '/images/portfolio';
export const img = (file: string): string => `${PORTFOLIO_IMG}/${file}`;

export type CaseStudyInput = Omit<CaseStudy, 'client'> & { client?: string };
export type StudyFields = Omit<CaseStudyInput, 'link'> & { link?: string };

export function slugFromLink(link: string): string {
  return link.replace(/^\//, '').split('/').pop() ?? '';
}

export function toCaseStudy(s: CaseStudyInput): CaseStudy {
  const slug = slugFromLink(s.link);
  const defaultImage = s.link.startsWith('/projects/') && slug ? img(`${slug}.jpg`) : undefined;
  const image = s.image ?? defaultImage;
  return { client: CLIENT.JAY_DAVE, ...s, image };
}

export function projectStudy(slug: string, fields: StudyFields): CaseStudyInput {
  return { ...fields, link: fields.link ?? `/projects/${slug}` };
}

export function portfolioStudy(slug: string, fields: Omit<StudyFields, 'client'>): CaseStudyInput {
  return { ...fields, client: CLIENT.JASHOM, link: `/portfolio/${slug}` };
}
