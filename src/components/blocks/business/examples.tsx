// Business blocks examples - для тестирования и демонстрации
import React from 'react';
import { GridBusiness, SplitBusiness } from './blocks';
import type { GridBusinessData, SplitBusinessData } from './blocks';

// ===== GRID BUSINESS EXAMPLES =====

export const GridBusinessCardsGalleryExample = () => (
  <GridBusiness
    variant="cardsGallery"
    templateId="gridBusinessCardsGallery"
    cols="1-2-3"
    useContainer={true}
  />
);

export const GridBusinessSolutionsGridExample = () => (
  <GridBusiness
    variant="solutionsGrid"
    templateId="gridBusinessSolutionsGrid"
    cols="1-2-3"
    useContainer={true}
    className="bg-gradient-to-b from-primary/50 to-primary/10"
  />
);

export const GridBusinessPricingExample = () => (
  <GridBusiness
    variant="pricing"
    templateId="gridBusinessPricing"
    cols="1-2-3"
    useContainer={true}
  />
);

export const GridBusinessPricingYearExample = () => (
  <GridBusiness
    variant="pricingYear"
    templateId="gridBusinessPricingYear"
    cols="1-2-3"
    useContainer={true}
    className="bg-gradient-to-br from-primary/5 to-secondary/5"
  />
);

export const GridBusinessCareerExample = () => (
  <GridBusiness
    variant="career"
    templateId="gridBusinessCareer"
    cols="1-2"
    useContainer={true}
  />
);

// ===== SPLIT BUSINESS EXAMPLES =====

export const SplitBusinessSolutionsExample = () => (
  <SplitBusiness
    variant="solutions"
    templateId="splitBusinessSolutions"
    leftMedia={false}
    useContainer={true}
  />
);

export const SplitBusinessMetricsExample = () => (
  <SplitBusiness
    variant="metrics"
    templateId="splitBusinessMetrics"
    leftMedia={true}
    useContainer={true}
    className="bg-gradient-to-br from-primary/50 to-primary/10"
  />
);

export const SplitBusinessTestimonialExample = () => (
  <SplitBusiness
    variant="testimonial"
    templateId="splitBusinessTestimonial"
    leftMedia={false}
    useContainer={true}
    className="bg-gradient-to-r from-primary/50 to-primary/10"
  />
);

export const SplitBusinessFeaturesExample = () => (
  <SplitBusiness
    variant="features"
    templateId="splitBusinessFeatures"
    leftMedia={true}
    useContainer={true}
  />
);

export const SplitBusinessAboutExample = () => (
  <SplitBusiness
    variant="about"
    templateId="splitBusinessAbout"
    leftMedia={false}
    useContainer={true}
  />
);

// Export all examples
export const businessExamples = {
  // Grid Business
  gridBusinessCardsGallery: GridBusinessCardsGalleryExample,
  gridBusinessSolutionsGrid: GridBusinessSolutionsGridExample,
  gridBusinessPricing: GridBusinessPricingExample,
  gridBusinessPricingYear: GridBusinessPricingYearExample,
  gridBusinessCareer: GridBusinessCareerExample,
  
  // Split Business
  splitBusinessSolutions: SplitBusinessSolutionsExample,
  splitBusinessMetrics: SplitBusinessMetricsExample,
  splitBusinessTestimonial: SplitBusinessTestimonialExample,
  splitBusinessFeatures: SplitBusinessFeaturesExample,
  splitBusinessAbout: SplitBusinessAboutExample
};

// Demo page component для тестирования всех блоков
export const BusinessBlocksDemo = () => (
  <div className="space-y-16">
    <h1 className="text-4xl font-bold text-center mb-16">Business Blocks Demo</h1>
    
    <section>
      <h2 className="text-2xl font-bold mb-8">Grid Business Blocks</h2>
      <div className="space-y-16">
        <GridBusinessCardsGalleryExample />
        <GridBusinessSolutionsGridExample />
        <GridBusinessPricingExample />
        <GridBusinessPricingYearExample />
        <GridBusinessCareerExample />
      </div>
    </section>
    
    <section>
      <h2 className="text-2xl font-bold mb-8">Split Business Blocks</h2>
      <div className="space-y-16">
        <SplitBusinessSolutionsExample />
        <SplitBusinessMetricsExample />
        <SplitBusinessTestimonialExample />
        <SplitBusinessFeaturesExample />
        <SplitBusinessAboutExample />
      </div>
    </section>
  </div>
);