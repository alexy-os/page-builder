// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  CenteredCTA,
  SplitCTA,
  centeredCTATemplates,
  splitCTATemplates
} from "@ui8kit/blocks";

import React from "react";
import { useCTAContent } from "@/hooks/useBlockContent";

/**
 * Custom Data for CTA
 */

// Interface for content props that can be passed to components
interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== CENTERED CTA EXAMPLES =====

// 1. Newsletter CTA
const CenteredCTANewsletterCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTANewsletter', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="newsletter"
      useContainer={true}
    />
  );
};

// 2. Simple CTA
const CenteredCTASimpleCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTASimple', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="simple"
      useContainer={true}
    />
  );
};

// 3. CTA with features
const CenteredCTAWithFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithFeatures', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withFeatures"
      useContainer={true}
      className="bg-gradient-to-br from-primary/5 to-secondary/5"
    />
  );
};

// 4. CTA with testimonial
const CenteredCTATestimonialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTATestimonial', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="testimonial"
      useContainer={true}
    />
  );
};

// ===== SPLIT CTA EXAMPLES =====

// 1. App download split CTA
const SplitCTAAppDownloadCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAAppDownload', blockId);

  return (
    <SplitCTA
      content={content}
      variant="appDownload"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// 2. Contact split CTA
const SplitCTAContactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAContact', blockId);

  return (
    <SplitCTA
      content={content}
      variant="contact"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 3. Newsletter split CTA
const SplitCTANewsletterCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTANewsletter', blockId);

  return (
    <SplitCTA
      content={content}
      variant="newsletter"
      leftMedia={false}
      useContainer={true}
      className="bg-gradient-to-r from-primary/50 to-primary/10"
    />
  );
};

// 4. Split CTA with features
const SplitCTAWithFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithFeatures', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withFeatures"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// Component mappings for custom templates
const centeredCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  centeredCTANewsletter: CenteredCTANewsletterCustom,
  centeredCTASimple: CenteredCTASimpleCustom,
  centeredCTAWithFeatures: CenteredCTAWithFeaturesCustom,
  centeredCTATestimonial: CenteredCTATestimonialCustom
};

const splitCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  splitCTAAppDownload: SplitCTAAppDownloadCustom,
  splitCTAContact: SplitCTAContactCustom,
  splitCTANewsletter: SplitCTANewsletterCustom,
  splitCTAWithFeatures: SplitCTAWithFeaturesCustom
};

// Export all CTA templates following hero pattern
export const allCTATemplates = [
  ...Object.keys(centeredCTATemplates).map(key => {
    const template = centeredCTATemplates[key as keyof typeof centeredCTATemplates];
    const customComponent = centeredCTACustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitCTATemplates).map(key => {
    const template = splitCTATemplates[key as keyof typeof splitCTATemplates];
    const customComponent = splitCTACustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];

// Export the base components
export { CenteredCTA, SplitCTA };

// Export functions that match the pattern from GitHub examples
export const CenteredCTANewsletterExample = CenteredCTANewsletterCustom;
export const CenteredCTASimpleExample = CenteredCTASimpleCustom;
export const CenteredCTAWithFeaturesExample = CenteredCTAWithFeaturesCustom;
export const CenteredCTATestimonialExample = CenteredCTATestimonialCustom;

export const SplitCTAAppDownloadExample = SplitCTAAppDownloadCustom;
export const SplitCTAContactExample = SplitCTAContactCustom;
export const SplitCTANewsletterExample = SplitCTANewsletterCustom;
export const SplitCTAWithFeaturesExample = SplitCTAWithFeaturesCustom;

// Export all examples
export const centeredCTAExamples = {
  newsletter: CenteredCTANewsletterExample,
  simple: CenteredCTASimpleExample,
  withFeatures: CenteredCTAWithFeaturesExample,
  testimonial: CenteredCTATestimonialExample
};

export const splitCTAExamples = {
  appDownload: SplitCTAAppDownloadExample,
  contact: SplitCTAContactExample,
  newsletter: SplitCTANewsletterExample,
  withFeatures: SplitCTAWithFeaturesExample
};