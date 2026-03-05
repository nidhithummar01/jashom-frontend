import { PortfolioPageLayout } from './PortfolioPage/PortfolioPageLayout';
import { PORTFOLIO_PAGE_CONTENT } from './PortfolioPage/content';
import { portfolioPageData } from './PortfolioPage/data';

/** Portfolio page: data + content rendered via shared layout (same pattern as GPU/CUDA service pages). */
export function PortfolioPage() {
  return <PortfolioPageLayout content={PORTFOLIO_PAGE_CONTENT} data={portfolioPageData} />;
}
