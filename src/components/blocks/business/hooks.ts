// Business-specific content management hooks
import { 
  GridBusinessContent,
  SplitBusinessContent
} from './content';

export interface BusinessContentHooks {
  getGridBusinessContent: (templateId: keyof typeof GridBusinessContent) => any;
  getSplitBusinessContent: (templateId: keyof typeof SplitBusinessContent) => any;
}

// Content provider for business blocks
export function getBusinessContent(templateId: string): any {
  // Check GridBusiness content
  if (templateId.startsWith('gridBusiness')) {
    const key = templateId as keyof typeof GridBusinessContent;
    return GridBusinessContent[key] || null;
  }
  
  // Check SplitBusiness content  
  if (templateId.startsWith('splitBusiness')) {
    const key = templateId as keyof typeof SplitBusinessContent;
    return SplitBusinessContent[key] || null;
  }
  
  return null;
}

// Check if templateId is business type
export function isBusinessTemplate(templateId: string): boolean {
  return templateId.includes('Business') || templateId.includes('business');
}

// Clean content for serialization (remove React components/functions)
export function cleanBusinessContent(content: any): any {
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
        cleaned[key] = value.map(item => cleanBusinessContent(item));
      } else {
        cleaned[key] = cleanBusinessContent(value);
      }
    }
  });
  
  return cleaned;
}