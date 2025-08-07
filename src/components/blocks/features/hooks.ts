// Features-specific content management hooks
import { GridFeaturesContent, SplitFeaturesContent } from './content';

export interface FeaturesContentHooks {
  getGridFeaturesContent: (templateId: keyof typeof GridFeaturesContent) => any;
  getSplitFeaturesContent: (templateId: keyof typeof SplitFeaturesContent) => any;
}

// Content provider for features blocks
export function getFeaturesContent(templateId: string): any {
  if (templateId.startsWith('gridFeatures')) {
    const key = templateId as keyof typeof GridFeaturesContent;
    return GridFeaturesContent[key] || null;
  }

  if (templateId.startsWith('splitFeatures')) {
    const key = templateId as keyof typeof SplitFeaturesContent;
    return SplitFeaturesContent[key] || null;
  }

  return null;
}

// Check if templateId is features type
export function isFeaturesTemplate(templateId: string): boolean {
  return templateId.includes('Features') || templateId.includes('features');
}

// Clean content for serialization (remove React components/functions)
export function cleanFeaturesContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanFeaturesContent(item));
      } else {
        cleaned[key] = cleanFeaturesContent(value);
      }
    }
  });

  return cleaned;
}


