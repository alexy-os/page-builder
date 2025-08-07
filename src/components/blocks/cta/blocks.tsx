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

// 1. Simple CTA
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

// 2. CTA with stats
const CenteredCTAWithStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithStats', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withStats"
      useContainer={true}
    />
  );
};

// 3. CTA with logos
const CenteredCTAWithLogosCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithLogos', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withLogos"
      useContainer={true}
    />
  );
};

// 4. CTA with background
const CenteredCTAWithBackgroundCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithBackground', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withBackground"
      useContainer={true}
      className="bg-gradient-to-br from-primary/50 to-secondary/50"
    />
  );
};

// 5. CTA with features
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

// ===== SPLIT CTA EXAMPLES =====

// 1. Split CTA with image
const SplitCTAWithImageCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithImage', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withImage"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// 2. Split CTA with stats
const SplitCTAWithStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithStats', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withStats"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 3. Split CTA with background
const SplitCTAWithBackgroundCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithBackground', blockId);

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

// 5. Split CTA with devices
const SplitCTAWithDevicesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithDevices', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withDevices"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// Component mappings for custom templates
const centeredCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  centeredCTASimple: CenteredCTASimpleCustom,
  centeredCTAWithStats: CenteredCTAWithStatsCustom,
  centeredCTAWithLogos: CenteredCTAWithLogosCustom,
  centeredCTAWithBackground: CenteredCTAWithBackgroundCustom,
  centeredCTAWithFeatures: CenteredCTAWithFeaturesCustom
};

const splitCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  splitCTAWithImage: SplitCTAWithImageCustom,
  splitCTAWithStats: SplitCTAWithStatsCustom,
  splitCTAWithBackground: SplitCTAWithBackgroundCustom,
  splitCTAWithFeatures: SplitCTAWithFeaturesCustom,
  splitCTAWithDevices: SplitCTAWithDevicesCustom
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