import CtaBlock, { ctaTemplate } from "./CtaBlock";
import CallToActionCenteredSection, { callToActionCenteredSectionTemplate } from './CallToActionCenteredSection';
import CallToActionSection, { callToActionSectionTemplate } from './CallToActionSection';
import NewsLetter, { newsLetterTemplate } from './NewsLetter';
import NewsLetterCopy, { newsLetterCopyTemplate } from './NewsLetterCopy';

// Export individual components and templates
export { CtaBlock, ctaTemplate };
export { CallToActionCenteredSection, callToActionCenteredSectionTemplate };
export { CallToActionSection, callToActionSectionTemplate };
export { NewsLetter, newsLetterTemplate };
export { NewsLetterCopy, newsLetterCopyTemplate };

// Export all CTA templates as an array
export const ctaTemplates = [
  ctaTemplate,
  callToActionCenteredSectionTemplate,
  callToActionSectionTemplate,
  newsLetterTemplate,
  newsLetterCopyTemplate
];

// Export all CTA components as an object
export const ctaComponents = {
  ctaCtaBlock: CtaBlock,
  ctaCallToActionCenteredSection: CallToActionCenteredSection,
  ctaCallToActionSection: CallToActionSection,
  ctaNewsLetter: NewsLetter,
  ctaNewsLetterCopy: NewsLetterCopy
}; 