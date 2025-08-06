// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitBlogTemplates, 
  gridBlogTemplates,
  SplitBlog,
  GridBlog
} from "@ui8kit/blocks";

import { useBlogContent } from '@/hooks/useBlockContent';
import React from 'react';

interface ContentProps {
  content?: any;
  blockId?: string;
}

// Add custom functions for SplitBlog
const SplitBlogNewsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBlogContent } = useBlogContent();
  const content = providedContent || getSplitBlogContent('news', blockId);
  return <SplitBlog content={content} variant='news' leftMedia={false} useContainer={true} />;
};

const SplitBlogSliderCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBlogContent } = useBlogContent();
  const content = providedContent || getSplitBlogContent('slider', blockId);
  return <SplitBlog content={content} variant='slider' leftMedia={true} useContainer={true} />;
};

const SplitBlogFeaturedCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBlogContent } = useBlogContent();
  const content = providedContent || getSplitBlogContent('featured', blockId);
  return <SplitBlog content={content} variant='featured' leftMedia={true} useContainer={true} />;
};

const SplitBlogNewsletterCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBlogContent } = useBlogContent();
  const content = providedContent || getSplitBlogContent('newsletter', blockId);
  return <SplitBlog content={content} variant='newsletter' leftMedia={false} useContainer={true} />;
};

const SplitBlogTimelineCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBlogContent } = useBlogContent();
  const content = providedContent || getSplitBlogContent('timeline', blockId);
  return <SplitBlog content={content} variant='timeline' leftMedia={true} useContainer={true} />;
};

// Add custom functions for GridBlog
const GridBlogCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBlogContent } = useBlogContent();
  const content = providedContent || getGridBlogContent('cards', blockId);
  return <GridBlog content={content} variant='cards' cols='1-2-3' />;
};

const GridBlogPostsGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBlogContent } = useBlogContent();
  const content = providedContent || getGridBlogContent('postsGrid', blockId);
  return <GridBlog content={content} variant='postsGrid' cols='1-2-3' />;
};

const GridBlogFilteredCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBlogContent } = useBlogContent();
  const content = providedContent || getGridBlogContent('filtered', blockId);
  return <GridBlog content={content} variant='filtered' cols='1-2-3' _showFilters={true} />;
};

const GridBlogCompactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBlogContent } = useBlogContent();
  const content = providedContent || getGridBlogContent('compact', blockId);
  return <GridBlog content={content} variant='compact' cols='1' useContainer={true} />;
};

const GridBlogFeaturedCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBlogContent } = useBlogContent();
  const content = providedContent || getGridBlogContent('featured', blockId);
  return <GridBlog content={content} variant='featured' cols='1-2-3' className='bg-gradient-to-b from-secondary/30 to-background' />;
};

const splitBlogCustom: Record<string, React.ComponentType<ContentProps>> = {
  news: SplitBlogNewsCustom,
  slider: SplitBlogSliderCustom,
  featured: SplitBlogFeaturedCustom,
  newsletter: SplitBlogNewsletterCustom,
  timeline: SplitBlogTimelineCustom
};

const gridBlogCustom: Record<string, React.ComponentType<ContentProps>> = {
  cards: GridBlogCardsCustom,
  postsGrid: GridBlogPostsGridCustom,
  filtered: GridBlogFilteredCustom,
  compact: GridBlogCompactCustom,
  featured: GridBlogFeaturedCustom
};

// Map library template keys to custom components
const splitBlogKeyMapping: Record<string, string> = {
  'splitBlogNews': 'news',
  'splitBlogSlider': 'slider', 
  'splitBlogFeatured': 'featured',
  'splitBlogNewsletter': 'newsletter',
  'splitBlogTimeline': 'timeline'
};

const gridBlogKeyMapping: Record<string, string> = {
  'gridBlogCards': 'cards',
  'gridBlogPostsGrid': 'postsGrid',
  'gridBlogFiltered': 'filtered',
  'gridBlogCompact': 'compact',
  'gridBlogFeatured': 'featured'
};

// Update allBlogTemplates
export const allBlogTemplates = [
  ...Object.keys(splitBlogTemplates).map(key => {
    const blogTemplate = splitBlogTemplates[key as keyof typeof splitBlogTemplates];
    // Try multiple mapping strategies
    const customKey = splitBlogKeyMapping[blogTemplate.id] || splitBlogKeyMapping[key] || key;
    const blogComponent = splitBlogCustom[customKey];
    
    if (!blogComponent) {
      console.warn(`❌ No blog component found for template "${blogTemplate.id}" (key: "${key}", customKey: "${customKey}")`);
      console.log('Available splitBlogCustom keys:', Object.keys(splitBlogCustom));
    }
    
    return {
      ...blogTemplate,
      component: blogComponent || (() => <div>Missing Component: {blogTemplate.id} (key: {key})</div>)
    };
  }),
  ...Object.keys(gridBlogTemplates).map(key => {
    const template = gridBlogTemplates[key as keyof typeof gridBlogTemplates];
    // Try multiple mapping strategies
    const customKey = gridBlogKeyMapping[template.id] || gridBlogKeyMapping[key] || key;
    const customComponent = gridBlogCustom[customKey];
    
    if (!customComponent) {
      console.warn(`❌ No blog component found for template "${template.id}" (key: "${key}", customKey: "${customKey}")`);
      console.log('Available gridBlogCustom keys:', Object.keys(gridBlogCustom));
    }
    
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id} (key: {key})</div>)
    };
  })
];