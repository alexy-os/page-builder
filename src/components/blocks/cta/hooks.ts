// CTA-specific content management hooks
import {
  sampleCTASimpleData,
  sampleCTAWithStatsData,
  sampleCTAWithLogosData,
  sampleCTAWithBackgroundData,
  sampleCTAWithFeaturesData,
  sampleSplitCTAWithImageData,
  sampleSplitCTAWithStatsData,
  sampleSplitCTAWithBackgroundData,
  sampleSplitCTAWithFeaturesData,
  sampleSplitCTAWithDevicesData
} from './content';

// CTA content mapping
export const CenteredCTAContent = {
  centeredCTASimple: sampleCTASimpleData,
  centeredCTAWithStats: sampleCTAWithStatsData,
  centeredCTAWithLogos: sampleCTAWithLogosData,
  centeredCTAWithBackground: sampleCTAWithBackgroundData,
  centeredCTAWithFeatures: sampleCTAWithFeaturesData
};

export const SplitCTAContent = {
  splitCTAWithImage: sampleSplitCTAWithImageData,
  splitCTAWithStats: sampleSplitCTAWithStatsData,
  splitCTAWithBackground: sampleSplitCTAWithBackgroundData,
  splitCTAWithFeatures: sampleSplitCTAWithFeaturesData,
  splitCTAWithDevices: sampleSplitCTAWithDevicesData
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