import HeroBlock, { heroTemplate } from "./hero/HeroBlock";
import FeaturesBlock, { featuresBlockTemplate } from "./features/FeaturesBlock";
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
import BlogNewsBlock, { blogNewsBlockTemplate } from "./blog/BlogNewsBlock";
import BlogArticlesColumnsCards, { blogArticlesColumnsCardsTemplate } from './blog/BlogArticlesColumnsCards';
import BlogCardsSection, { blogCardsSectionTemplate } from './blog/BlogCardsSection';
import BlogPostsGridSection, { blogPostsGridSectionTemplate } from './blog/BlogPostsGridSection';
import DesignSystemWebinars, { designSystemWebinarsTemplate } from './business/DesignSystemWebinars';
import BusinessCardsGallery, { businessCardsGalleryTemplate } from './business/BusinessCardsGallery';
import CareerSection, { careerSectionTemplate } from './business/CareerSection';
import BusinessSolutionsGrid, { businessSolutionsGridTemplate } from './business/BusinessSolutionsGrid';
import PricingSection, { pricingSectionTemplate } from './business/PricingSection';
import PricingYearSection, { pricingYearSectionTemplate } from './business/PricingYearSection';
import FAQContentSection, { faqContentSectionTemplate } from './features/FAQContentSection';
import FeaturesGridMediaCards, { featuresGridMediaCardsTemplate } from './features/FeaturesGridMediaCards';
import FeaturesSplitCarousel, { featuresSplitCarouselTemplate } from './features/FeaturesSplitCarousel';
import FeaturesSplitLeftMedia, { featuresSplitLeftMediaTemplate } from './features/FeaturesSplitLeftMedia';
import FeaturesSplitMedia, { featuresSplitMediaTemplate } from './features/FeaturesSplitMedia';
import FeaturesThreeColumns, { featuresThreeColumnsTemplate } from './features/FeaturesThreeColumns';
import FeaturesThreeColumnsIcons, { featuresThreeColumnsIconsTemplate } from './features/FeaturesThreeColumnsIcons';

// Export individual components and templates
export { HeroBlock, heroTemplate };
export { FeaturesBlock, featuresBlockTemplate };
export { BlogNewsBlock, blogNewsBlockTemplate };
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
export { BlogCardsSection, blogCardsSectionTemplate };
export { BlogPostsGridSection, blogPostsGridSectionTemplate };
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
  heroCenteredSectionTemplate,
  heroCenteredWithTopButtonTemplate,
  heroSplitWithGalleryTemplate,
  heroSplitWithMediaTemplate,
  featuresBlockTemplate,
  featuresGridMediaCardsTemplate,
  featuresSplitCarouselTemplate,
  featuresSplitLeftMediaTemplate,
  featuresSplitMediaTemplate,
  featuresThreeColumnsTemplate,
  featuresThreeColumnsIconsTemplate,
  faqContentSectionTemplate,
  blogNewsBlockTemplate,
  blogArticlesColumnsCardsTemplate,
  blogCardsSectionTemplate,
  blogPostsGridSectionTemplate,
  designSystemWebinarsTemplate,
  businessCardsGalleryTemplate,
  businessSolutionsGridTemplate,
  careerSectionTemplate,
  pricingSectionTemplate,
  pricingYearSectionTemplate,
  ctaTemplate,
  callToActionCenteredSectionTemplate,
  callToActionSectionTemplate,
  newsLetterTemplate,
  newsLetterCopyTemplate,
  footerTemplate,
  footerFourColumnsTemplate,
  footerSocialButtonsTemplate
];

// Export all components as an object for easy lookup
export const allComponents = {
  hero: HeroBlock,
  heroCenteredSection: HeroCenteredSection,
  heroCenteredWithTopButton: HeroCenteredWithTopButton,
  heroSplitWithGallery: HeroSplitWithGallery,
  heroSplitWithMedia: HeroSplitWithMedia,
  featuresBlock: FeaturesBlock,
  featuresGridMediaCards: FeaturesGridMediaCards,
  featuresSplitCarousel: FeaturesSplitCarousel,
  featuresSplitLeftMedia: FeaturesSplitLeftMedia,
  featuresSplitMedia: FeaturesSplitMedia,
  featuresThreeColumns: FeaturesThreeColumns,
  featuresThreeColumnsIcons: FeaturesThreeColumnsIcons,
  faqContentSection: FAQContentSection,
  blogNewsBlock: BlogNewsBlock,
  blogArticlesColumnsCards: BlogArticlesColumnsCards,
  blogCardsSection: BlogCardsSection,
  blogPostsGridSection: BlogPostsGridSection,
  designSystemWebinars: DesignSystemWebinars,
  businessCardsGallery: BusinessCardsGallery,
  businessSolutionsGrid: BusinessSolutionsGrid,
  careerSection: CareerSection,
  pricingSection: PricingSection,
  pricingYearSection: PricingYearSection,
  cta: CtaBlock,
  callToActionCenteredSection: CallToActionCenteredSection,
  callToActionSection: CallToActionSection,
  newsLetter: NewsLetter,
  newsLetterCopy: NewsLetterCopy,
  footer: FooterBlock,
  footerFourColumns: FooterFourColumns,
  footerSocialButtons: FooterSocialButtons
};
