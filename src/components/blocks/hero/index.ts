// import HeroBlock, { heroTemplate } from "./HeroBlock";
import HeroCenteredSection, { heroCenteredSectionTemplate } from "./HeroCenteredSection";
import HeroCenteredWithTopButton, { heroCenteredWithTopButtonTemplate } from "./HeroCenteredWithTopButton";
import HeroSplitWithGallery, { heroSplitWithGalleryTemplate } from './HeroSplitWithGallery';
import HeroSplitWithMedia, { heroSplitWithMediaTemplate } from './HeroSplitWithMedia';

// Export individual components and templates
// export { HeroBlock, heroTemplate };
export { HeroCenteredSection, heroCenteredSectionTemplate };
export { HeroCenteredWithTopButton, heroCenteredWithTopButtonTemplate };
export { HeroSplitWithGallery, heroSplitWithGalleryTemplate };
export { HeroSplitWithMedia, heroSplitWithMediaTemplate };

// Export all hero templates as an array
export const heroTemplates = [
  // heroTemplate,
  heroCenteredSectionTemplate,
  heroCenteredWithTopButtonTemplate,
  heroSplitWithGalleryTemplate,
  heroSplitWithMediaTemplate
];

// Export all hero components as an object
export const heroComponents = {
  // hero: HeroBlock,
  heroCenteredSection: HeroCenteredSection,
  heroCenteredWithTopButton: HeroCenteredWithTopButton,
  heroSplitWithGallery: HeroSplitWithGallery,
  heroSplitWithMedia: HeroSplitWithMedia
}; 