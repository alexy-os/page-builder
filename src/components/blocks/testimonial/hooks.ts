// Testimonial-specific content management hooks
import { GridTestimonialContent, SplitTestimonialContent } from './content';

export interface TestimonialContentHooks {
  getGridTestimonialContent: (templateId: keyof typeof GridTestimonialContent) => any;
  getSplitTestimonialContent: (templateId: keyof typeof SplitTestimonialContent) => any;
}

// Content provider for testimonial blocks
export function getTestimonialContent(templateId: string): any {
  if (templateId.startsWith('gridTestimonial')) {
    const key = templateId as keyof typeof GridTestimonialContent;
    return GridTestimonialContent[key] || null;
  }

  if (templateId.startsWith('splitTestimonial')) {
    const key = templateId as keyof typeof SplitTestimonialContent;
    return SplitTestimonialContent[key] || null;
  }

  return null;
}

// Check if templateId is testimonial type
export function isTestimonialTemplate(templateId: string): boolean {
  return templateId.includes('Testimonial') || templateId.includes('testimonial');
}

// Clean content for serialization (remove React components/functions)
export function cleanTestimonialContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanTestimonialContent(item));
      } else {
        cleaned[key] = cleanTestimonialContent(value);
      }
    }
  });

  return cleaned;
}


