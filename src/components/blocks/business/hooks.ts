// Business-specific content management hooks
import { GridBusinessContent, SplitBusinessContent } from './content';

export interface BusinessContentHooks {
  getGridBusinessContent: (templateId: keyof typeof GridBusinessContent) => any;
  getSplitBusinessContent: (templateId: keyof typeof SplitBusinessContent) => any;
}

// Content provider for business blocks
export function getBusinessContent(templateId: string): any {
  // Create mapping for different template naming patterns
  const gridBusinessMapping: Record<string, keyof typeof GridBusinessContent> = {
    'gridBusinessCardsGallery': 'cardsGallery',
    'gridBusinessSolutionsGrid': 'solutionsGrid',
    'gridBusinessPricing': 'pricing',
    'gridBusinessPricingYear': 'pricingYear',
    'gridBusinessCareer': 'career',
    // Alternative naming patterns
    'businessCardsGallery': 'cardsGallery',
    'businessSolutionsGrid': 'solutionsGrid',
    'businessPricing': 'pricing',
    'businessPricingYear': 'pricingYear',
    'businessCareer': 'career'
  };
  
  const splitBusinessMapping: Record<string, keyof typeof SplitBusinessContent> = {
    'splitBusinessSolutions': 'solutions',
    'splitBusinessMetrics': 'metrics',
    'splitBusinessTestimonial': 'testimonial',
    'splitBusinessFeatures': 'features',
    'splitBusinessAbout': 'about',
    // Alternative naming patterns
    'businessSolutions': 'solutions',
    'businessMetrics': 'metrics',
    'businessTestimonial': 'testimonial',
    'businessFeatures': 'features',
    'businessAbout': 'about'
  };

  // Check GridBusiness content
  if (templateId.includes('gridBusiness') || templateId.includes('grid')) {
    // Try direct mapping first
    const mappedKey = gridBusinessMapping[templateId];
    if (mappedKey && GridBusinessContent[mappedKey]) {
      return GridBusinessContent[mappedKey];
    }
    
    // Fallback to simple key extraction
    const key = templateId.replace(/^gridBusiness/i, '').toLowerCase();
    return GridBusinessContent[key as keyof typeof GridBusinessContent] || null;
  }
  
  // Check SplitBusiness content  
  if (templateId.includes('splitBusiness') || templateId.includes('split')) {
    // Try direct mapping first
    const mappedKey = splitBusinessMapping[templateId];
    if (mappedKey && SplitBusinessContent[mappedKey]) {
      return SplitBusinessContent[mappedKey];
    }
    
    // Fallback to simple key extraction
    const key = templateId.replace(/^splitBusiness/i, '').toLowerCase(); 
    return SplitBusinessContent[key as keyof typeof SplitBusinessContent] || null;
  }
  
  // Direct content access for business blocks
  if (templateId.includes('Business') || templateId.includes('business')) {
    // Try grid content first
    const gridMappedKey = gridBusinessMapping[templateId];
    if (gridMappedKey && GridBusinessContent[gridMappedKey]) {
      return GridBusinessContent[gridMappedKey];
    }
    
    // Then try split content
    const splitMappedKey = splitBusinessMapping[templateId];
    if (splitMappedKey && SplitBusinessContent[splitMappedKey]) {
      return SplitBusinessContent[splitMappedKey];
    }
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