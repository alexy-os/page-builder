// Business-specific content management hooks
import { GridBusinessContent, SplitBusinessContent } from './content';

export interface BusinessContentHooks {
  getGridBusinessContent: (templateId: keyof typeof GridBusinessContent) => any;
  getSplitBusinessContent: (templateId: keyof typeof SplitBusinessContent) => any;
}

// Content provider for business blocks
export function getBusinessContent(templateId: string): any {
  // Check GridBusiness content
  if (templateId.includes('gridBusiness') || templateId.includes('GridBusiness')) {
    const key = templateId as keyof typeof GridBusinessContent;
    return GridBusinessContent[key] || null;
  }
  
  // Check SplitBusiness content  
  if (templateId.includes('splitBusiness') || templateId.includes('SplitBusiness')) {
    const key = templateId as keyof typeof SplitBusinessContent;
    return SplitBusinessContent[key] || null;
  }
  
  return null;
}

// Check if templateId is business type
export function isBusinessTemplate(templateId: string): boolean {
  return templateId.includes('Business') || templateId.includes('business');
}

// Helper to get specific business content by variant
export function getBusinessContentByVariant(variant: string, type: 'grid' | 'split'): any {
  if (type === 'grid') {
    const templateId = `gridBusiness${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    return getBusinessContent(templateId);
  }
  
  if (type === 'split') {
    const templateId = `splitBusiness${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    return getBusinessContent(templateId);
  }
  
  return null;
}

// Export individual content getters for convenience
export const getGridBusinessContent = (templateId: keyof typeof GridBusinessContent) => {
  return GridBusinessContent[templateId] || null;
};

export const getSplitBusinessContent = (templateId: keyof typeof SplitBusinessContent) => {
  return SplitBusinessContent[templateId] || null;
};

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