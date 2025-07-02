import TelekomCenteredWithTopButton, { telekomCenteredWithTopButtonTemplate } from "./TelekomCenteredWithTopButton";
import TelekomSplitWithGallery, { telekomSplitWithGalleryTemplate } from "./TelekomSplitWithGallery";

// Export individual components and templates
export { TelekomCenteredWithTopButton, telekomCenteredWithTopButtonTemplate };
export { TelekomSplitWithGallery, telekomSplitWithGalleryTemplate };

// Export all telekom templates as an array
export const telekomTemplates = [
  telekomCenteredWithTopButtonTemplate,
  telekomSplitWithGalleryTemplate
];

// Export all telekom components as an object
export const telekomComponents = {
  telekomCenteredWithTopButton: TelekomCenteredWithTopButton,
  telekomSplitWithGallery: TelekomSplitWithGallery
}; 