// FAQ-specific content management hooks
import { CenteredFAQContent, SplitFAQContent } from './content';

export interface FAQContentHooks {
  getCenteredFAQContent: (templateId: keyof typeof CenteredFAQContent) => any;
  getSplitFAQContent: (templateId: keyof typeof SplitFAQContent) => any;
}

// Content provider for faq blocks
export function getFAQContent(templateId: string): any {
  // Check GridFAQ content
  if (templateId.startsWith('gridFAQ')) {
    const key = templateId as keyof typeof CenteredFAQContent;
    return CenteredFAQContent[key] || null;
  }
  
  // Check SplitFAQ content  
  if (templateId.startsWith('splitFAQ')) {
    const key = templateId as keyof typeof SplitFAQContent;
    return SplitFAQContent[key] || null;
  }
  
  return null;
}

// Check if templateId is faq type
export function isFAQTemplate(templateId: string): boolean {
  return templateId.includes('FAQ') || templateId.includes('faq');
}

// Clean content for serialization (remove React components/functions)
export function cleanFAQContent(content: any): any {
  if (!content || typeof content !== 'object') return content;
  
  const cleaned = { ...content };
  
  // Remove React components and functions that can't be serialized
  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];
    
    // Remove React components (icons) and functions
    if (typeof value === 'function' || 
        (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    }
    // Recursively clean nested objects
    else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanFAQContent(item));
      } else {
        cleaned[key] = cleanFAQContent(value);
      }
    }
  });
  
  return cleaned;
}