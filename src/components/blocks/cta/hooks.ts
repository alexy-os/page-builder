// CTA-specific content management hooks
import { CenteredCTAContent, SplitCTAContent } from './content';

export interface CTAContentHooks {
  getCenteredCTAContent: (templateId: keyof typeof CenteredCTAContent) => any;
  getSplitCTAContent: (templateId: keyof typeof SplitCTAContent) => any;
}

// Content provider for CTA blocks
export function getCTAContent(templateId: string): any {
  // Check CenteredCTA content
  if (templateId.startsWith('centeredCTA')) {
    const key = templateId as keyof typeof CenteredCTAContent;
    return CenteredCTAContent[key] || null;
  }
  
  // Check SplitCTA content  
  if (templateId.startsWith('splitCTA')) {
    const key = templateId as keyof typeof SplitCTAContent;
    return SplitCTAContent[key] || null;
  }
  
  return null;
}

// Check if templateId is CTA type
export function isCTATemplate(templateId: string): boolean {
  return templateId.includes('CTA') || templateId.includes('cta');
}

// Clean content for serialization (remove React components/functions)
export function cleanCTAContent(content: any): any {
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
        cleaned[key] = value.map(item => cleanCTAContent(item));
      } else {
        cleaned[key] = cleanCTAContent(value);
      }
    }
  });
  
  return cleaned;
}