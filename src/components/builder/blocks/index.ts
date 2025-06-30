import HeroBlock, { heroTemplate } from "./hero/HeroBlock";
import FeaturesBlock, { featuresBlockTemplate } from "./features/FeaturesBlock";
import NewsBlock, { newsTemplate } from "./blog/NewsBlock";
import CtaBlock, { ctaTemplate } from "./cta/CtaBlock";
import FooterBlock, { footerTemplate } from "./footer/FooterBlock";
import HeroCenteredSection, { heroCenteredSectionTemplate } from "./hero/HeroCenteredSection";
import HeroCenteredWithTopButton, { heroCenteredWithTopButtonTemplate } from "./hero/HeroCenteredWithTopButton";
import HeroSplitWithGallery, { heroSplitWithGalleryTemplate } from './hero/HeroSplitWithGallery';
import HeroSplitWithMedia, { heroSplitWithMediaTemplate } from './hero/HeroSplitWithMedia';
import CallToActionCenteredSection, { callToActionCenteredSectionTemplate } from './cta/CallToActionCenteredSection';
import CallToActionSection, { callToActionSectionTemplate } from './cta/CallToActionSection';
import NewsLetter, { newsLetterTemplate } from './cta/NewsLetter';
import NewsLetterCopy, { newsLetterCopyTemplate } from './cta/NewsLetterCopy';
import FooterFourColumns, { footerFourColumnsTemplate } from './footer/FooterFourColumns';
import FooterSocialButtons, { footerSocialButtonsTemplate } from './footer/FooterSocialButtons';
import BlogArticlesColumnsCards, { blogArticlesColumnsCardsTemplate } from './blog/BlogArticlesColumnsCards';
import DesignSystemWebinars, { designSystemWebinarsTemplate } from './blog/DesignSystemWebinars';
import BusinessCardsGallery, { businessCardsGalleryTemplate } from './business/BusinessCardsGallery';
import CareerSection, { careerSectionTemplate } from './business/CareerSection';
import BusinessSolutionsGrid, { businessSolutionsGridTemplate } from './business/BusinessSolutionsGrid';
import PricingSection, { pricingSectionTemplate } from './business/PricingSection';
import PricingYearSection, { pricingYearSectionTemplate } from './business/PricingYearSection';
import FAQContentSection, { faqContentSectionTemplate } from './features/FAQContentSection';
import FeaturesGridMediaCards, { featuresGridMediaCardsTemplate } from './features/FeaturesGridMediaCards';
import FeaturesSplitCarousel, { featuresSplitCarouselTemplate } from './features/FeaturesSplitCarousel';
import { featuresSplitLeftMediaTemplate } from './features/FeaturesSplitLeftMedia';
import { featuresSplitMediaTemplate } from './features/FeaturesSplitMedia';
import FeaturesThreeColumns, { featuresThreeColumnsTemplate } from './features/FeaturesThreeColumns';
import FeaturesThreeColumnsIcons, { featuresThreeColumnsIconsTemplate } from './features/FeaturesThreeColumnsIcons';

// Export individual components and templates
export { HeroBlock, heroTemplate };
export { FeaturesBlock, featuresBlockTemplate };
export { NewsBlock, newsTemplate };
export { CtaBlock, ctaTemplate };
export { FooterBlock, footerTemplate };
export { HeroCenteredSection, heroCenteredSectionTemplate };
export { HeroCenteredWithTopButton, heroCenteredWithTopButtonTemplate };
export { HeroSplitWithGallery, heroSplitWithGalleryTemplate };
export { HeroSplitWithMedia, heroSplitWithMediaTemplate };
export { CallToActionCenteredSection, callToActionCenteredSectionTemplate };
export { CallToActionSection, callToActionSectionTemplate };
export { NewsLetter, newsLetterTemplate };
export { NewsLetterCopy, newsLetterCopyTemplate };
export { FooterFourColumns, footerFourColumnsTemplate };
export { FooterSocialButtons, footerSocialButtonsTemplate };
export { BlogArticlesColumnsCards, blogArticlesColumnsCardsTemplate };
export { DesignSystemWebinars, designSystemWebinarsTemplate };
export { BusinessCardsGallery, businessCardsGalleryTemplate };
export { CareerSection, careerSectionTemplate };
export { BusinessSolutionsGrid, businessSolutionsGridTemplate };
export { PricingSection, pricingSectionTemplate };
export { PricingYearSection, pricingYearSectionTemplate };
export { FAQContentSection, faqContentSectionTemplate };
export { FeaturesGridMediaCards, featuresGridMediaCardsTemplate };
export { FeaturesSplitCarousel, featuresSplitCarouselTemplate };
export { FeaturesThreeColumns, featuresThreeColumnsTemplate };
export { FeaturesThreeColumnsIcons, featuresThreeColumnsIconsTemplate };

// Export all templates as an array for easy consumption
export const allTemplates = [
  heroTemplate,
  featuresBlockTemplate,
  newsTemplate,
  ctaTemplate,
  footerTemplate,
  heroCenteredSectionTemplate,
  heroCenteredWithTopButtonTemplate,
  heroSplitWithGalleryTemplate,
  heroSplitWithMediaTemplate,
  callToActionCenteredSectionTemplate,
  callToActionSectionTemplate,
  newsLetterTemplate,
  newsLetterCopyTemplate,
  footerFourColumnsTemplate,
  footerSocialButtonsTemplate,
  blogArticlesColumnsCardsTemplate,
  designSystemWebinarsTemplate,
  businessCardsGalleryTemplate,
  careerSectionTemplate,
  businessSolutionsGridTemplate,
  pricingSectionTemplate,
  pricingYearSectionTemplate,
  faqContentSectionTemplate,
  featuresGridMediaCardsTemplate,
  featuresSplitCarouselTemplate,
  featuresSplitLeftMediaTemplate,
  featuresSplitMediaTemplate,
  featuresThreeColumnsTemplate,
  featuresThreeColumnsIconsTemplate
];

// Export all components as an object for easy lookup
export const allComponents = {
  hero: HeroBlock,
  heroCenteredSection: HeroCenteredSection,
  heroCenteredWithTopButton: HeroCenteredWithTopButton,
  featuresBlock: FeaturesBlock,
  news: NewsBlock,
  cta: CtaBlock,
  footer: FooterBlock,
  heroSplitWithGallery: HeroSplitWithGallery,
  heroSplitWithMedia: HeroSplitWithMedia,
  callToActionCenteredSection: CallToActionCenteredSection,
  callToActionSection: CallToActionSection,
  newsLetter: NewsLetter,
  newsLetterCopy: NewsLetterCopy,
  footerFourColumns: FooterFourColumns,
  footerSocialButtons: FooterSocialButtons,
  blogArticlesColumnsCards: BlogArticlesColumnsCards,
  designSystemWebinars: DesignSystemWebinars,
  businessCardsGallery: BusinessCardsGallery,
  careerSection: CareerSection,
  businessSolutionsGrid: BusinessSolutionsGrid,
  pricingSection: PricingSection,
  pricingYearSection: PricingYearSection,
  faqContentSection: FAQContentSection,
  featuresGridMediaCards: FeaturesGridMediaCards,
  featuresSplitCarousel: FeaturesSplitCarousel,
  featuresThreeColumns: FeaturesThreeColumns,
  featuresThreeColumnsIcons: FeaturesThreeColumnsIcons
};
