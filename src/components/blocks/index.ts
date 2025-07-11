import { lazy } from 'react';

// Lazy load all block components
const HeroBlock = lazy(() => import('./hero/HeroBlock').then(m => ({ default: m.default })));
const HeroCenteredSection = lazy(() => import('./hero/HeroCenteredSection').then(m => ({ default: m.default })));
const HeroCenteredWithTopButton = lazy(() => import('./hero/HeroCenteredWithTopButton').then(m => ({ default: m.default })));
const HeroSplitWithGallery = lazy(() => import('./hero/HeroSplitWithGallery').then(m => ({ default: m.default })));
const HeroSplitWithMedia = lazy(() => import('./hero/HeroSplitWithMedia').then(m => ({ default: m.default })));

const FeaturesBlock = lazy(() => import('./features/FeaturesBlock').then(m => ({ default: m.default })));
const FeaturesGridMediaCards = lazy(() => import('./features/FeaturesGridMediaCards').then(m => ({ default: m.default })));
const FeaturesSplitCarousel = lazy(() => import('./features/FeaturesSplitCarousel').then(m => ({ default: m.default })));
const FeaturesSplitLeftMedia = lazy(() => import('./features/FeaturesSplitLeftMedia').then(m => ({ default: m.default })));
const FeaturesSplitMedia = lazy(() => import('./features/FeaturesSplitMedia').then(m => ({ default: m.default })));
const FeaturesThreeColumns = lazy(() => import('./features/FeaturesThreeColumns').then(m => ({ default: m.default })));
const FeaturesThreeColumnsIcons = lazy(() => import('./features/FeaturesThreeColumnsIcons').then(m => ({ default: m.default })));
const FAQContentSection = lazy(() => import('./features/FAQContentSection').then(m => ({ default: m.default })));

const BlogArticlesColumnsCards = lazy(() => import('./blog/BlogArticlesColumnsCards').then(m => ({ default: m.default })));
const BlogCardsSection = lazy(() => import('./blog/BlogCardsSection').then(m => ({ default: m.default })));
const BlogNewsBlock = lazy(() => import('./blog/BlogNewsBlock').then(m => ({ default: m.default })));
const BlogPostsGridSection = lazy(() => import('./blog/BlogPostsGridSection').then(m => ({ default: m.default })));

const BusinessCardsGallery = lazy(() => import('./business/BusinessCardsGallery').then(m => ({ default: m.default })));
const BusinessSolutionsGrid = lazy(() => import('./business/BusinessSolutionsGrid').then(m => ({ default: m.default })));
const CareerSection = lazy(() => import('./business/CareerSection').then(m => ({ default: m.default })));
const DesignSystemWebinars = lazy(() => import('./business/DesignSystemWebinars').then(m => ({ default: m.default })));
const PricingSection = lazy(() => import('./business/PricingSection').then(m => ({ default: m.default })));
const PricingYearSection = lazy(() => import('./business/PricingYearSection').then(m => ({ default: m.default })));

const CallToActionCenteredSection = lazy(() => import('./cta/CallToActionCenteredSection').then(m => ({ default: m.default })));
const CallToActionSection = lazy(() => import('./cta/CallToActionSection').then(m => ({ default: m.default })));
const CtaBlock = lazy(() => import('./cta/CtaBlock').then(m => ({ default: m.default })));
const NewsLetter = lazy(() => import('./cta/NewsLetter').then(m => ({ default: m.default })));
const NewsLetterCopy = lazy(() => import('./cta/NewsLetterCopy').then(m => ({ default: m.default })));

const FooterBlock = lazy(() => import('./footer/FooterBlock').then(m => ({ default: m.default })));
const FooterFourColumns = lazy(() => import('./footer/FooterFourColumns').then(m => ({ default: m.default })));
const FooterSocialButtons = lazy(() => import('./footer/FooterSocialButtons').then(m => ({ default: m.default })));

// Import templates directly (they're just data, no components)
import { heroTemplate } from './hero/HeroBlock';
import { heroCenteredSectionTemplate } from './hero/HeroCenteredSection';
import { heroCenteredWithTopButtonTemplate } from './hero/HeroCenteredWithTopButton';
import { heroSplitWithGalleryTemplate } from './hero/HeroSplitWithGallery';
import { heroSplitWithMediaTemplate } from './hero/HeroSplitWithMedia';

import { featuresBlockTemplate } from './features/FeaturesBlock';
import { featuresGridMediaCardsTemplate } from './features/FeaturesGridMediaCards';
import { featuresSplitCarouselTemplate } from './features/FeaturesSplitCarousel';
import { featuresSplitLeftMediaTemplate } from './features/FeaturesSplitLeftMedia';
import { featuresSplitMediaTemplate } from './features/FeaturesSplitMedia';
import { featuresThreeColumnsTemplate } from './features/FeaturesThreeColumns';
import { featuresThreeColumnsIconsTemplate } from './features/FeaturesThreeColumnsIcons';
import { faqContentSectionTemplate } from './features/FAQContentSection';

import { blogArticlesColumnsCardsTemplate } from './blog/BlogArticlesColumnsCards';
import { blogCardsSectionTemplate } from './blog/BlogCardsSection';
import { blogNewsBlockTemplate } from './blog/BlogNewsBlock';
import { blogPostsGridSectionTemplate } from './blog/BlogPostsGridSection';

import { businessCardsGalleryTemplate } from './business/BusinessCardsGallery';
import { businessSolutionsGridTemplate } from './business/BusinessSolutionsGrid';
import { careerSectionTemplate } from './business/CareerSection';
import { designSystemWebinarsTemplate } from './business/DesignSystemWebinars';
import { pricingSectionTemplate } from './business/PricingSection';
import { pricingYearSectionTemplate } from './business/PricingYearSection';

import { callToActionCenteredSectionTemplate } from './cta/CallToActionCenteredSection';
import { callToActionSectionTemplate } from './cta/CallToActionSection';
import { ctaTemplate } from './cta/CtaBlock';
import { newsLetterTemplate } from './cta/NewsLetter';
import { newsLetterCopyTemplate } from './cta/NewsLetterCopy';

import { footerTemplate } from './footer/FooterBlock';
import { footerFourColumnsTemplate } from './footer/FooterFourColumns';
import { footerSocialButtonsTemplate } from './footer/FooterSocialButtons';

// Create templates with lazy components
export const allTemplates = [
  // Hero templates
 { ...heroTemplate, component: HeroBlock },
  { ...heroCenteredSectionTemplate, component: HeroCenteredSection },
  { ...heroCenteredWithTopButtonTemplate, component: HeroCenteredWithTopButton },
 { ...heroSplitWithGalleryTemplate, component: HeroSplitWithGallery },
  { ...heroSplitWithMediaTemplate, component: HeroSplitWithMedia },

  // Features templates
  { ...featuresBlockTemplate, component: FeaturesBlock },
  { ...featuresGridMediaCardsTemplate, component: FeaturesGridMediaCards },
  { ...featuresSplitCarouselTemplate, component: FeaturesSplitCarousel },
  { ...featuresSplitLeftMediaTemplate, component: FeaturesSplitLeftMedia },
  { ...featuresSplitMediaTemplate, component: FeaturesSplitMedia },
  { ...featuresThreeColumnsTemplate, component: FeaturesThreeColumns },
  { ...featuresThreeColumnsIconsTemplate, component: FeaturesThreeColumnsIcons },
  { ...faqContentSectionTemplate, component: FAQContentSection },

  // Blog templates
  { ...blogArticlesColumnsCardsTemplate, component: BlogArticlesColumnsCards },
  { ...blogCardsSectionTemplate, component: BlogCardsSection },
  { ...blogNewsBlockTemplate, component: BlogNewsBlock },
  { ...blogPostsGridSectionTemplate, component: BlogPostsGridSection },

  // Business templates
  { ...businessCardsGalleryTemplate, component: BusinessCardsGallery },
  { ...businessSolutionsGridTemplate, component: BusinessSolutionsGrid },
  { ...careerSectionTemplate, component: CareerSection },
  { ...designSystemWebinarsTemplate, component: DesignSystemWebinars },
  { ...pricingSectionTemplate, component: PricingSection },
  { ...pricingYearSectionTemplate, component: PricingYearSection },

  // CTA templates
  { ...callToActionCenteredSectionTemplate, component: CallToActionCenteredSection },
  { ...callToActionSectionTemplate, component: CallToActionSection },
  { ...ctaTemplate, component: CtaBlock },
  { ...newsLetterTemplate, component: NewsLetter },
  { ...newsLetterCopyTemplate, component: NewsLetterCopy },

  // Footer templates
  { ...footerTemplate, component: FooterBlock },
  { ...footerFourColumnsTemplate, component: FooterFourColumns },
  { ...footerSocialButtonsTemplate, component: FooterSocialButtons },
];

// Export for backward compatibility
export const allComponents = allTemplates.reduce((acc, template) => {
  acc[template.id] = template.component;
  return acc;
}, {} as Record<string, any>);
