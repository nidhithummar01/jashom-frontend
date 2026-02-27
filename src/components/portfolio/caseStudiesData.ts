import { RAW_STUDIES } from './caseStudiesRawData';
import type { CaseStudy } from './caseStudiesConfig';
import { toCaseStudy, CATEGORY } from './caseStudiesConfig';

export type { CaseStudy };

export const CASE_STUDIES: CaseStudy[] = RAW_STUDIES.map(toCaseStudy);
export const PORTFOLIO_CATEGORIES: string[] = Object.values(CATEGORY);
