import { rawStudies } from './caseStudiesRawData';
import type { CaseStudy } from './caseStudiesConfig';
import { toCaseStudy, CATEGORY } from './caseStudiesConfig';

export type { CaseStudy };

export const CASE_STUDIES: CaseStudy[] = rawStudies.map(toCaseStudy);
export const PORTFOLIO_CATEGORIES: string[] = Object.values(CATEGORY);
