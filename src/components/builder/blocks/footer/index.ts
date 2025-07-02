import FooterBlock, { footerTemplate } from "./FooterBlock";
import FooterFourColumns, { footerFourColumnsTemplate } from './FooterFourColumns';
import FooterSocialButtons, { footerSocialButtonsTemplate } from './FooterSocialButtons';

// Export individual components and templates
export { FooterBlock, footerTemplate };
export { FooterFourColumns, footerFourColumnsTemplate };
export { FooterSocialButtons, footerSocialButtonsTemplate };

// Export all footer templates as an array
export const footerTemplates = [
  footerTemplate,
  footerFourColumnsTemplate,
  footerSocialButtonsTemplate
];

// Export all footer components as an object
export const footerComponents = {
  footer: FooterBlock,
  footerFourColumns: FooterFourColumns,
  footerSocialButtons: FooterSocialButtons
}; 