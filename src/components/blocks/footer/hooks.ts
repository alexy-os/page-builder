// Footer-specific content management hooks
import { GridFooterContent, SplitFooterContent } from './content';

export interface FooterContentHooks {
  getGridFooterContent: (templateId: keyof typeof GridFooterContent) => any;
  getSplitFooterContent: (templateId: keyof typeof SplitFooterContent) => any;
}

// Content provider for footer blocks
export function getFooterContent(templateId: string): any {
  if (templateId.startsWith('gridFooter')) {
    const key = templateId as keyof typeof GridFooterContent;
    return GridFooterContent[key] || null;
  }

  if (templateId.startsWith('splitFooter')) {
    const key = templateId as keyof typeof SplitFooterContent;
    return SplitFooterContent[key] || null;
  }

  return null;
}

// Check if templateId is footer type
export function isFooterTemplate(templateId: string): boolean {
  return templateId.includes('Footer') || templateId.includes('footer');
}

// Clean content for serialization (remove React components/functions)
export function cleanFooterContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanFooterContent(item));
      } else {
        cleaned[key] = cleanFooterContent(value);
      }
    }
  });

  return cleaned;
}


