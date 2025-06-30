import HeroBlock, { heroTemplate } from "./hero/HeroBlock";
import FeaturesBlock, { featuresTemplate } from "./FeaturesBlock";
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

// Export individual components and templates
export { HeroBlock, heroTemplate };
export { FeaturesBlock, featuresTemplate };
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

// Export all templates as an array for easy consumption
export const allTemplates = [
  heroTemplate,
  featuresTemplate,
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
  designSystemWebinarsTemplate
];

// Export all components as an object for easy lookup
export const allComponents = {
  hero: HeroBlock,
  heroCenteredSection: HeroCenteredSection,
  heroCenteredWithTopButton: HeroCenteredWithTopButton,
  features: FeaturesBlock,
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
  designSystemWebinars: DesignSystemWebinars
};
