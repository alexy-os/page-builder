// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  GridBusiness,
  SplitBusiness
} from "@ui8kit/blocks";

import { useBusinessContent } from "@/hooks/useBlockContent";

/**
 * Custom Data for Business
 */

// Interface for content props that can be passed to components
interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID BUSINESS EXAMPLES =====

// 1. Business cards gallery
const GridBusinessCardsGalleryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBusinessContent } = useBusinessContent();
  
  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content = providedContent || getGridBusinessContent('gridBusinessCardsGallery', blockId);

  return (
    <GridBusiness
      content={content}
      variant="cardsGallery"
      cols="1-2-3"
    />
  );
};

// 2. Solutions grid
const GridBusinessSolutionsGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBusinessContent } = useBusinessContent();
  
  const content = providedContent || getGridBusinessContent('gridBusinessSolutionsGrid', blockId);

  return (
    <GridBusiness
      content={content}
      variant="solutionsGrid"
      cols="1-2-3"
      className="bg-gradient-to-b from-primary/50 to-primary/10"
    />
  );
};

// 3. Pricing grid
const GridBusinessPricingCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBusinessContent } = useBusinessContent();
  
  const content = providedContent || getGridBusinessContent('gridBusinessPricing', blockId);

  return (
    <GridBusiness
      content={content}
      variant="pricing"
      cols="1-2-3"
    />
  );
};

// 4. Pricing with yearly toggle
const GridBusinessPricingYearCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBusinessContent } = useBusinessContent();
  
  const content = providedContent || getGridBusinessContent('gridBusinessPricingYear', blockId);

  return (
    <GridBusiness
      content={content}
      variant="pricingYear"
      cols="1-2-3"
      _showYearlyToggle={true}
      className="bg-gradient-to-br from-primary/5 to-secondary/5"
    />
  );
};

// 5. Career openings grid
const GridBusinessCareerCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridBusinessContent } = useBusinessContent();
  
  const content = providedContent || getGridBusinessContent('gridBusinessCareer', blockId);

  return (
    <GridBusiness
      content={content}
      variant="career"
      cols="1-2"
      useContainer={true}
    />
  );
};

// ===== SPLIT BUSINESS EXAMPLES =====

// 1. Business solutions split
const SplitBusinessSolutionsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBusinessContent } = useBusinessContent();
  
  const content = providedContent || getSplitBusinessContent('splitBusinessSolutions', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="solutions"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// 2. Business metrics split
const SplitBusinessMetricsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBusinessContent } = useBusinessContent();
  
  const content = providedContent || getSplitBusinessContent('splitBusinessMetrics', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="metrics"
      leftMedia={true}
      useContainer={true}
      className="bg-gradient-to-br from-primary/50 to-primary/10"
    />
  );
};

// 3. Business testimonial split
const SplitBusinessTestimonialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBusinessContent } = useBusinessContent();
  
  const content = providedContent || getSplitBusinessContent('splitBusinessTestimonial', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="testimonial"
      leftMedia={false}
      useContainer={true}
      className="bg-gradient-to-r from-primary/50 to-primary/10"
    />
  );
};

// 4. Business features split
const SplitBusinessFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBusinessContent } = useBusinessContent();
  
  const content = providedContent || getSplitBusinessContent('splitBusinessFeatures', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="features"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 5. About business split
const SplitBusinessAboutCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitBusinessContent } = useBusinessContent();
  
  const content = providedContent || getSplitBusinessContent('splitBusinessAbout', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="about"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// Export the base components
export { GridBusiness, SplitBusiness };

// Export functions that match the pattern from GitHub examples
export const GridBusinessCardsGalleryExample = GridBusinessCardsGalleryCustom;
export const GridBusinessSolutionsGridExample = GridBusinessSolutionsGridCustom;
export const GridBusinessPricingExample = GridBusinessPricingCustom;
export const GridBusinessPricingYearExample = GridBusinessPricingYearCustom;
export const GridBusinessCareerExample = GridBusinessCareerCustom;

export const SplitBusinessSolutionsExample = SplitBusinessSolutionsCustom;
export const SplitBusinessMetricsExample = SplitBusinessMetricsCustom;
export const SplitBusinessTestimonialExample = SplitBusinessTestimonialCustom;
export const SplitBusinessFeaturesExample = SplitBusinessFeaturesCustom;
export const SplitBusinessAboutExample = SplitBusinessAboutCustom;

// Export all examples
export const gridBusinessExamples = {
  cardsGallery: GridBusinessCardsGalleryExample,
  solutionsGrid: GridBusinessSolutionsGridExample,
  pricing: GridBusinessPricingExample,
  pricingYear: GridBusinessPricingYearExample,
  career: GridBusinessCareerExample
};

export const splitBusinessExamples = {
  solutions: SplitBusinessSolutionsExample,
  metrics: SplitBusinessMetricsExample,
  testimonial: SplitBusinessTestimonialExample,
  features: SplitBusinessFeaturesExample,
  about: SplitBusinessAboutExample
};