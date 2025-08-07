// Portfolio-specific content management hooks
import { GridPortfolioContent, SplitPortfolioContent } from './content';

export interface PortfolioContentHooks {
  getGridPortfolioContent: (templateId: keyof typeof GridPortfolioContent) => any;
  getSplitPortfolioContent: (templateId: keyof typeof SplitPortfolioContent) => any;
}

// Content provider for portfolio blocks
export function getPortfolioContent(templateId: string): any {
  if (templateId.startsWith('gridPortfolio')) {
    const key = templateId as keyof typeof GridPortfolioContent;
    return GridPortfolioContent[key] || null;
  }

  if (templateId.startsWith('splitPortfolio')) {
    const key = templateId as keyof typeof SplitPortfolioContent;
    return SplitPortfolioContent[key] || null;
  }

  return null;
}

// Check if templateId is portfolio type
export function isPortfolioTemplate(templateId: string): boolean {
  return templateId.includes('Portfolio') || templateId.includes('portfolio');
}

// Clean content for serialization (remove React components/functions)
export function cleanPortfolioContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanPortfolioContent(item));
      } else {
        cleaned[key] = cleanPortfolioContent(value);
      }
    }
  });

  return cleaned;
}


