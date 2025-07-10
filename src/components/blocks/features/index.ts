import FeaturesBlock, { featuresBlockTemplate } from "./FeaturesBlock";
import FAQContentSection, { faqContentSectionTemplate } from './FAQContentSection';
import FeaturesGridMediaCards, { featuresGridMediaCardsTemplate } from './FeaturesGridMediaCards';
import FeaturesSplitCarousel, { featuresSplitCarouselTemplate } from './FeaturesSplitCarousel';
import FeaturesSplitLeftMedia, { featuresSplitLeftMediaTemplate } from './FeaturesSplitLeftMedia';
import FeaturesSplitMedia, { featuresSplitMediaTemplate } from './FeaturesSplitMedia';
import FeaturesThreeColumns, { featuresThreeColumnsTemplate } from './FeaturesThreeColumns';
import FeaturesThreeColumnsIcons, { featuresThreeColumnsIconsTemplate } from './FeaturesThreeColumnsIcons';

// Export individual components and templates
export { FeaturesBlock, featuresBlockTemplate };
export { FAQContentSection, faqContentSectionTemplate };
export { FeaturesGridMediaCards, featuresGridMediaCardsTemplate };
export { FeaturesSplitCarousel, featuresSplitCarouselTemplate };
export { FeaturesSplitLeftMedia, featuresSplitLeftMediaTemplate };
export { FeaturesSplitMedia, featuresSplitMediaTemplate };
export { FeaturesThreeColumns, featuresThreeColumnsTemplate };
export { FeaturesThreeColumnsIcons, featuresThreeColumnsIconsTemplate };

// Export all features templates as an array
export const featuresTemplates = [
  featuresBlockTemplate,
  featuresGridMediaCardsTemplate,
  featuresSplitCarouselTemplate,
  featuresSplitLeftMediaTemplate,
  featuresSplitMediaTemplate,
  featuresThreeColumnsTemplate,
  featuresThreeColumnsIconsTemplate,
  faqContentSectionTemplate
];

// Export all features components as an object
export const featuresComponents = {
  featuresFeaturesBlock: FeaturesBlock,
  featuresGridMediaCards: FeaturesGridMediaCards,
  featuresSplitCarousel: FeaturesSplitCarousel,
  featuresSplitLeftMedia: FeaturesSplitLeftMedia,
  featuresSplitMedia: FeaturesSplitMedia,
  featuresThreeColumns: FeaturesThreeColumns,
  featuresThreeColumnsIcons: FeaturesThreeColumnsIcons,
  featuresFAQContentSection: FAQContentSection
}; 