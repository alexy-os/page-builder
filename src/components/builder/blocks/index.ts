// Import from category-specific index files
export * from "./hero";
export * from "./telekom";
export * from "./features";
export * from "./blog";
export * from "./business";
export * from "./cta";
export * from "./footer";

// Import category collections for combined exports
import { heroTemplates, heroComponents } from "./hero";
import { telekomTemplates, telekomComponents } from "./telekom";
import { featuresTemplates, featuresComponents } from "./features";
import { blogTemplates, blogComponents } from "./blog";
import { businessTemplates, businessComponents } from "./business";
import { ctaTemplates, ctaComponents } from "./cta";
import { footerTemplates, footerComponents } from "./footer";

// Export all templates as an array for easy consumption
export const allTemplates = [
  ...heroTemplates,
  ...telekomTemplates,
  ...featuresTemplates,
  ...blogTemplates,
  ...businessTemplates,
  ...ctaTemplates,
  ...footerTemplates
];

// Export all components as an object for easy lookup
export const allComponents = {
  ...heroComponents,
  ...telekomComponents,
  ...featuresComponents,
  ...blogComponents,
  ...businessComponents,
  ...ctaComponents,
  ...footerComponents
};

// Export category-specific collections
export {
  heroTemplates,
  heroComponents,
  telekomTemplates,
  telekomComponents,
  featuresTemplates,
  featuresComponents,
  blogTemplates,
  blogComponents,
  businessTemplates,
  businessComponents,
  ctaTemplates,
  ctaComponents,
  footerTemplates,
  footerComponents
};
