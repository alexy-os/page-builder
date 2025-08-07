// Gallery-specific content management hooks
import { GridGalleryContent, SplitGalleryContent } from './content';

export interface GalleryContentHooks {
  getGridGalleryContent: (templateId: keyof typeof GridGalleryContent) => any;
  getSplitGalleryContent: (templateId: keyof typeof SplitGalleryContent) => any;
}

// Content provider for gallery blocks
export function getGalleryContent(templateId: string): any {
  if (templateId.startsWith('gridGallery')) {
    const key = templateId as keyof typeof GridGalleryContent;
    return GridGalleryContent[key] || null;
  }

  if (templateId.startsWith('splitGallery')) {
    const key = templateId as keyof typeof SplitGalleryContent;
    return SplitGalleryContent[key] || null;
  }

  return null;
}

// Check if templateId is gallery type
export function isGalleryTemplate(templateId: string): boolean {
  return templateId.includes('Gallery') || templateId.includes('gallery');
}

// Clean content for serialization (remove React components/functions)
export function cleanGalleryContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanGalleryContent(item));
      } else {
        cleaned[key] = cleanGalleryContent(value);
      }
    }
  });

  return cleaned;
}


