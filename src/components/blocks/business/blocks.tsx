// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  GridBusiness,
  SplitBusiness
} from "@ui8kit/blocks";

import { useBusinessContent } from "@/hooks/useBlockContent";
import type { Template } from "@/types";

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

// Template definitions
const gridBusinessTemplates: Record<string, Template> = {
  gridBusinessCardsGallery: {
    id: "gridBusinessCardsGallery",
    name: "Business Cards Gallery",
    category: "business",
    description: "Grid layout showcasing business services and solutions",
    component: GridBusinessCardsGalleryCustom,
    tags: ["business", "grid", "services"],
    preview: "/previews/business/grid-cards-gallery.jpg"
  },
  gridBusinessSolutionsGrid: {
    id: "gridBusinessSolutionsGrid",
    name: "Business Solutions Grid",
    category: "business", 
    description: "Grid layout for business solutions with stats and images",
    component: GridBusinessSolutionsGridCustom,
    tags: ["business", "grid", "solutions"],
    preview: "/previews/business/grid-solutions.jpg"
  },
  gridBusinessPricing: {
    id: "gridBusinessPricing",
    name: "Business Pricing",
    category: "business",
    description: "Grid layout for pricing plans and packages",
    component: GridBusinessPricingCustom,
    tags: ["business", "grid", "pricing"],
    preview: "/previews/business/grid-pricing.jpg"
  },
  gridBusinessPricingYear: {
    id: "gridBusinessPricingYear",
    name: "Business Pricing with Yearly Toggle",
    category: "business",
    description: "Grid layout for pricing with monthly/yearly toggle",
    component: GridBusinessPricingYearCustom,
    tags: ["business", "grid", "pricing", "yearly"],
    preview: "/previews/business/grid-pricing-year.jpg"
  },
  gridBusinessCareer: {
    id: "gridBusinessCareer",
    name: "Business Career Openings",
    category: "business",
    description: "Grid layout for job openings and career opportunities",
    component: GridBusinessCareerCustom,
    tags: ["business", "grid", "career"],
    preview: "/previews/business/grid-career.jpg"
  }
};

const splitBusinessTemplates: Record<string, Template> = {
  splitBusinessSolutions: {
    id: "splitBusinessSolutions",
    name: "Business Solutions Split",
    category: "business",
    description: "Split layout for showcasing business solutions with metrics",
    component: SplitBusinessSolutionsCustom,
    tags: ["business", "split", "solutions"],
    preview: "/previews/business/split-solutions.jpg"
  },
  splitBusinessMetrics: {
    id: "splitBusinessMetrics",
    name: "Business Metrics Split",
    category: "business",
    description: "Split layout highlighting business metrics and stats", 
    component: SplitBusinessMetricsCustom,
    tags: ["business", "split", "metrics"],
    preview: "/previews/business/split-metrics.jpg"
  },
  splitBusinessTestimonial: {
    id: "splitBusinessTestimonial",
    name: "Business Testimonial Split",
    category: "business",
    description: "Split layout featuring customer testimonials",
    component: SplitBusinessTestimonialCustom,
    tags: ["business", "split", "testimonial"],
    preview: "/previews/business/split-testimonial.jpg"
  },
  splitBusinessFeatures: {
    id: "splitBusinessFeatures",
    name: "Business Features Split",
    category: "business",
    description: "Split layout showcasing platform features",
    component: SplitBusinessFeaturesCustom,
    tags: ["business", "split", "features"],
    preview: "/previews/business/split-features.jpg"
  },
  splitBusinessAbout: {
    id: "splitBusinessAbout",
    name: "Business About Split",
    category: "business",
    description: "Split layout for company story and values",
    component: SplitBusinessAboutCustom,
    tags: ["business", "split", "about"],
    preview: "/previews/business/split-about.jpg"
  }
};

// Component mappings
const gridBusinessCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridBusinessCardsGallery: GridBusinessCardsGalleryCustom,
  gridBusinessSolutionsGrid: GridBusinessSolutionsGridCustom,
  gridBusinessPricing: GridBusinessPricingCustom,
  gridBusinessPricingYear: GridBusinessPricingYearCustom,
  gridBusinessCareer: GridBusinessCareerCustom
};

const splitBusinessCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitBusinessSolutions: SplitBusinessSolutionsCustom,
  splitBusinessMetrics: SplitBusinessMetricsCustom,
  splitBusinessTestimonial: SplitBusinessTestimonialCustom,
  splitBusinessFeatures: SplitBusinessFeaturesCustom,
  splitBusinessAbout: SplitBusinessAboutCustom
};

// Export all business templates
export const allBusinessTemplates = [
  ...Object.keys(gridBusinessTemplates).map(key => {
    const template = gridBusinessTemplates[key as keyof typeof gridBusinessTemplates];
    const customComponent = gridBusinessCustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitBusinessTemplates).map(key => {
    const template = splitBusinessTemplates[key as keyof typeof splitBusinessTemplates];
    const customComponent = splitBusinessCustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];

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