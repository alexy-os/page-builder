import BlogNewsBlock, { blogNewsBlockTemplate } from "./BlogNewsBlock";
import BlogArticlesColumnsCards, { blogArticlesColumnsCardsTemplate } from './BlogArticlesColumnsCards';
import BlogCardsSection, { blogCardsSectionTemplate } from './BlogCardsSection';
import BlogPostsGridSection, { blogPostsGridSectionTemplate } from './BlogPostsGridSection';

// Export individual components and templates
export { BlogNewsBlock, blogNewsBlockTemplate };
export { BlogArticlesColumnsCards, blogArticlesColumnsCardsTemplate };
export { BlogCardsSection, blogCardsSectionTemplate };
export { BlogPostsGridSection, blogPostsGridSectionTemplate };

// Export all blog templates as an array
export const blogTemplates = [
  blogNewsBlockTemplate,
  blogArticlesColumnsCardsTemplate,
  blogCardsSectionTemplate,
  blogPostsGridSectionTemplate
];

// Export all blog components as an object
export const blogComponents = {
  blogNewsBlock: BlogNewsBlock,
  blogArticlesColumnsCards: BlogArticlesColumnsCards,
  blogCardsSection: BlogCardsSection,
  blogPostsGridSection: BlogPostsGridSection
}; 