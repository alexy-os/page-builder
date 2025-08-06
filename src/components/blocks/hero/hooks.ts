// Hero-specific content management hooks
import { CenteredHeroContent, SplitHeroContent } from './content';

export interface HeroContentHooks {
  getCenteredHeroContent: (templateId: keyof typeof CenteredHeroContent) => any;
  getSplitHeroContent: (templateId: keyof typeof SplitHeroContent) => any;
}

// Content provider for hero blocks
export function getHeroContent(templateId: string): any {
  // Check CenteredHero content
  if (templateId.startsWith('centered')) {
    const key = templateId as keyof typeof CenteredHeroContent;
    return CenteredHeroContent[key] || null;
  }
  
  // Check SplitHero content  
  if (templateId.startsWith('split')) {
    const key = templateId as keyof typeof SplitHeroContent;
    return SplitHeroContent[key] || null;
  }
  
  return null;
}

// Check if templateId is hero type
export function isHeroTemplate(templateId: string): boolean {
  return templateId.includes('Hero') || templateId.includes('hero');
}

// Clean content for serialization (remove React components/functions)
export function cleanHeroContent(content: any): any {
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
        cleaned[key] = value.map(item => cleanHeroContent(item));
      } else {
        cleaned[key] = cleanHeroContent(value);
      }
    }
  });
  
  return cleaned;
}