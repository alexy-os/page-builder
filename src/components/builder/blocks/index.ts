import HeroBlock, { heroTemplate } from "./HeroBlock";
import FeaturesBlock, { featuresTemplate } from "./FeaturesBlock";
import NewsBlock, { newsTemplate } from "./NewsBlock";
import CtaBlock, { ctaTemplate } from "./CtaBlock";
import FooterBlock, { footerTemplate } from "./FooterBlock";
import HeroCenterBlock, { heroCenterTemplate } from "./HeroCenter";

// Export individual components and templates
export { HeroBlock, heroTemplate };
export { FeaturesBlock, featuresTemplate };
export { NewsBlock, newsTemplate };
export { CtaBlock, ctaTemplate };
export { FooterBlock, footerTemplate };
export { HeroCenterBlock, heroCenterTemplate };

// Export all templates as an array for easy consumption
export const allTemplates = [
  heroTemplate,
  featuresTemplate,
  newsTemplate,
  ctaTemplate,
  footerTemplate,
  heroCenterTemplate
];

// Export all components as an object for easy lookup
export const allComponents = {
  hero: HeroBlock,
  heroCenter: HeroCenterBlock,
  features: FeaturesBlock,
  news: NewsBlock,
  cta: CtaBlock,
  footer: FooterBlock
};
