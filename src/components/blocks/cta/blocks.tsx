// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  CenteredCTA,
  SplitCTA
} from "@ui8kit/blocks";

import React from "react";
import { useCTAContent } from "@/hooks/useBlockContent";
import type { Template } from "@/types";

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
      variant="simple"
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
      variant="withStats"
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
      variant="withDevices"
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
      variant="withImage"
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
      variant="withBackground"
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

// Define our own templates since we can't import them from @ui8kit/blocks
const centeredCTATemplates: Record<string, Template> = {
  centeredCTANewsletter: {
    id: "centeredCTANewsletter",
    name: "Newsletter CTA",
    category: "cta",
    description: "Centered CTA for newsletter subscription",
    component: CenteredCTANewsletterCustom,
    tags: ["cta", "centered", "newsletter"],
    preview: "/previews/cta/centered-newsletter.jpg"
  },
  centeredCTASimple: {
    id: "centeredCTASimple",
    name: "Simple CTA",
    category: "cta",
    description: "Simple centered call-to-action",
    component: CenteredCTASimpleCustom,
    tags: ["cta", "centered", "simple"],
    preview: "/previews/cta/centered-simple.jpg"
  },
  centeredCTAWithFeatures: {
    id: "centeredCTAWithFeatures",
    name: "CTA with Features",
    category: "cta",
    description: "Centered CTA showcasing key features",
    component: CenteredCTAWithFeaturesCustom,
    tags: ["cta", "centered", "features"],
    preview: "/previews/cta/centered-features.jpg"
  },
  centeredCTATestimonial: {
    id: "centeredCTATestimonial",
    name: "CTA with Testimonial",
    category: "cta",
    description: "Centered CTA with customer testimonial",
    component: CenteredCTATestimonialCustom,
    tags: ["cta", "centered", "testimonial"],
    preview: "/previews/cta/centered-testimonial.jpg"
  }
};

const splitCTATemplates: Record<string, Template> = {
  splitCTAAppDownload: {
    id: "splitCTAAppDownload",
    name: "App Download CTA",
    category: "cta",
    description: "Split layout for mobile app download",
    component: SplitCTAAppDownloadCustom,
    tags: ["cta", "split", "app", "download"],
    preview: "/previews/cta/split-app-download.jpg"
  },
  splitCTAContact: {
    id: "splitCTAContact",
    name: "Contact CTA",
    category: "cta",
    description: "Split layout for contact information",
    component: SplitCTAContactCustom,
    tags: ["cta", "split", "contact"],
    preview: "/previews/cta/split-contact.jpg"
  },
  splitCTANewsletter: {
    id: "splitCTANewsletter",
    name: "Newsletter Split CTA",
    category: "cta",
    description: "Split layout for newsletter subscription",
    component: SplitCTANewsletterCustom,
    tags: ["cta", "split", "newsletter"],
    preview: "/previews/cta/split-newsletter.jpg"
  },
  splitCTAWithFeatures: {
    id: "splitCTAWithFeatures",
    name: "Split CTA with Features",
    category: "cta",
    description: "Split layout showcasing features",
    component: SplitCTAWithFeaturesCustom,
    tags: ["cta", "split", "features"],
    preview: "/previews/cta/split-features.jpg"
  }
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