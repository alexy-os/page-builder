import DesignSystemWebinars, { designSystemWebinarsTemplate } from './DesignSystemWebinars';
import BusinessCardsGallery, { businessCardsGalleryTemplate } from './BusinessCardsGallery';
import CareerSection, { careerSectionTemplate } from './CareerSection';
import BusinessSolutionsGrid, { businessSolutionsGridTemplate } from './BusinessSolutionsGrid';
import PricingSection, { pricingSectionTemplate } from './PricingSection';
import PricingYearSection, { pricingYearSectionTemplate } from './PricingYearSection';

// Export individual components and templates
export { DesignSystemWebinars, designSystemWebinarsTemplate };
export { BusinessCardsGallery, businessCardsGalleryTemplate };
export { CareerSection, careerSectionTemplate };
export { BusinessSolutionsGrid, businessSolutionsGridTemplate };
export { PricingSection, pricingSectionTemplate };
export { PricingYearSection, pricingYearSectionTemplate };

// Export all business templates as an array
export const businessTemplates = [
  designSystemWebinarsTemplate,
  businessCardsGalleryTemplate,
  businessSolutionsGridTemplate,
  careerSectionTemplate,
  pricingSectionTemplate,
  pricingYearSectionTemplate
];

// Export all business components as an object
export const businessComponents = {
  businessDesignSystemWebinars: DesignSystemWebinars,
  businessCardsGallery: BusinessCardsGallery,
  businessSolutionsGrid: BusinessSolutionsGrid,
  businessCareerSection: CareerSection,
  businessPricingSection: PricingSection,
  businessPricingYearSection: PricingYearSection
}; 