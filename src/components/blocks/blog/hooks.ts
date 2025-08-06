// Blog-specific content management hooks
import { SplitBlogContent, GridBlogContent } from './content';

export interface BlogContentHooks {
  getSplitBlogContent: (templateId: keyof typeof SplitBlogContent) => any;
  getGridBlogContent: (templateId: keyof typeof GridBlogContent) => any;
}

// Content provider for blog blocks
export function getBlogContent(templateId: string): any {
  // Create mapping for different template naming patterns
  const splitBlogMapping: Record<string, keyof typeof SplitBlogContent> = {
    'splitBlogNews': 'news',
    'splitBlogSlider': 'slider',
    'splitBlogFeatured': 'featured', 
    'splitBlogNewsletter': 'newsletter',
    'splitBlogTimeline': 'timeline'
  };
  
  const gridBlogMapping: Record<string, keyof typeof GridBlogContent> = {
    'gridBlogCards': 'cards',
    'gridBlogPostsGrid': 'postsGrid',
    'gridBlogFiltered': 'filtered',
    'gridBlogCompact': 'compact',
    'gridBlogFeatured': 'featured'
  };

  // Check SplitBlog content
  if (templateId.includes('splitBlog') || templateId.includes('split')) {
    // Try direct mapping first
    const mappedKey = splitBlogMapping[templateId];
    if (mappedKey && SplitBlogContent[mappedKey]) {
      return SplitBlogContent[mappedKey];
    }
    
    // Fallback to simple key extraction
    const key = templateId.replace(/^splitBlog/i, '').toLowerCase();
    return SplitBlogContent[key as keyof typeof SplitBlogContent] || null;
  }
  
  // Check GridBlog content  
  if (templateId.includes('gridBlog') || templateId.includes('grid')) {
    // Try direct mapping first
    const mappedKey = gridBlogMapping[templateId];
    if (mappedKey && GridBlogContent[mappedKey]) {
      return GridBlogContent[mappedKey];
    }
    
    // Fallback to simple key extraction
    const key = templateId.replace(/^gridBlog/i, '').toLowerCase(); 
    return GridBlogContent[key as keyof typeof GridBlogContent] || null;
  }
  
  return null;
}

// Check if templateId is blog type
export function isBlogTemplate(templateId: string): boolean {
  return templateId.includes('Blog') || templateId.includes('blog');
}

// Clean content for serialization (remove React components/functions)
export function cleanBlogContent(content: any): any {
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
        cleaned[key] = value.map(item => cleanBlogContent(item));
      } else {
        cleaned[key] = cleanBlogContent(value);
      }
    }
  });
  
  return cleaned;
}