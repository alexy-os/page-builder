// Post-specific content management hooks
import { CenteredPostContent, SplitPostContent } from './content';

export interface PostContentHooks {
  getCenteredPostContent: (templateId: keyof typeof CenteredPostContent) => any;
  getSplitPostContent: (templateId: keyof typeof SplitPostContent) => any;
}

// Content provider for post blocks
export function getPostContent(templateId: string): any {
  if (templateId.startsWith('centeredPost')) {
    const key = templateId as keyof typeof CenteredPostContent;
    return CenteredPostContent[key] || null;
  }

  if (templateId.startsWith('splitPost')) {
    const key = templateId as keyof typeof SplitPostContent;
    return SplitPostContent[key] || null;
  }

  return null;
}

// Check if templateId is post type
export function isPostTemplate(templateId: string): boolean {
  return templateId.includes('Post') || templateId.includes('post');
}

// Clean content for serialization (remove React components/functions)
export function cleanPostContent(content: any): any {
  if (!content || typeof content !== 'object') return content;

  const cleaned = { ...content } as any;

  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];

    if (typeof value === 'function' || (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    } else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanPostContent(item));
      } else {
        cleaned[key] = cleanPostContent(value);
      }
    }
  });

  return cleaned;
}


