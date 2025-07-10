// Import from category-specific index files
export * from "./hero";
export * from "./features";
export * from "./blog";
export * from "./business";
export * from "./cta";
export * from "./footer";
export * from "./defcon";

// Import category collections for combined exports
import { heroTemplates, heroComponents } from "./hero";
import { featuresTemplates, featuresComponents } from "./features";
import { blogTemplates, blogComponents } from "./blog";
import { businessTemplates, businessComponents } from "./business";
import { ctaTemplates, ctaComponents } from "./cta";
import { footerTemplates, footerComponents } from "./footer";
import { 
  defconTemplates, 
  defconComponents
} from "./defcon";


// Export all templates as an array for easy consumption
export const allTemplates = [
  ...heroTemplates,
  ...featuresTemplates,
  ...blogTemplates,
  ...businessTemplates,
  ...ctaTemplates,
  ...footerTemplates,
  ...defconTemplates
];

// Export all components as an object for easy lookup
export const allComponents = {
  ...heroComponents,
  ...featuresComponents,
  ...blogComponents,
  ...businessComponents,
  ...ctaComponents,
  ...footerComponents,
  ...defconComponents
};

// Export category-specific collections
export {
  heroTemplates,
  heroComponents,
  featuresTemplates,
  featuresComponents,
  blogTemplates,
  blogComponents,
  businessTemplates,
  businessComponents,
  ctaTemplates,
  ctaComponents,
  footerTemplates,
  footerComponents,
  defconTemplates,
  defconComponents
};
