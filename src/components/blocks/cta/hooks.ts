// CTA-specific content management hooks
import {
  sampleCTANewsletterData,
  sampleCTASimpleData,
  sampleCTAWithFeaturesData,
  sampleCTATestimonialData,
  sampleCTAAppDownloadData,
  sampleCTAContactData
} from './content';

// CTA content mapping
export const CenteredCTAContent = {
  centeredCTANewsletter: sampleCTANewsletterData,
  centeredCTASimple: sampleCTASimpleData,
  centeredCTAWithFeatures: sampleCTAWithFeaturesData,
  centeredCTATestimonial: sampleCTATestimonialData
};

export const SplitCTAContent = {
  splitCTAAppDownload: sampleCTAAppDownloadData,
  splitCTAContact: sampleCTAContactData,
  splitCTANewsletter: sampleCTANewsletterData,
  splitCTAWithFeatures: sampleCTAWithFeaturesData
};

export interface CTAContentHooks {
  getCenteredCTAContent: (templateId: string, blockId?: string) => any;
  getSplitCTAContent: (templateId: string, blockId?: string) => any;
  isContentFromSession: (templateId: string) => boolean;
}

export function getCTAContent(templateId: string): any {
  // Check both centered and split CTA content
  if (templateId in CenteredCTAContent) {
    return CenteredCTAContent[templateId as keyof typeof CenteredCTAContent];
  }
  
  if (templateId in SplitCTAContent) {
    return SplitCTAContent[templateId as keyof typeof SplitCTAContent];
  }
  
  return null;
}

export function isCTATemplate(templateId: string): boolean {
  return templateId in CenteredCTAContent || templateId in SplitCTAContent;
}

export function cleanCTAContent(content: any): any {
  if (!content) return content;
  
  // Clean up any dev-specific properties
  const cleaned = { ...content };
  delete cleaned._dev;
  delete cleaned._debug;
  
  return cleaned;
}