// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  CenteredCTA,
  SplitCTA
} from "@ui8kit/blocks";


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



// Create templates manually based on library structure
const centeredCTATemplates: Record<string, Template> = {
  simple: {
    id: "centeredCTASimple",
    name: "Simple Centered CTA",
    description: "Clean centered call-to-action with title, description and buttons",
    component: CenteredCTASimpleCustom,
    defaultProps: { variant: "simple" as const }
  },
  
  withLogos: {
    id: "centeredCTAWithLogos",
    name: "CTA with Brand Logos",
    description: "Centered CTA featuring trusted brand logos",
    component: CenteredCTAWithLogosCustom,
    defaultProps: { variant: "withLogos" as const }
  },

  withBackground: {
    id: "centeredCTAWithBackground",
    name: "CTA with Background",
    description: "Eye-catching CTA with background image or gradient",
    component: CenteredCTAWithBackgroundCustom,
    defaultProps: { variant: "withBackground" as const }
  },

  withFeatures: {
    id: "centeredCTAWithFeatures",
    name: "CTA with Features",
    description: "CTA highlighting key features with icons",
    component: CenteredCTAWithFeaturesCustom,
    defaultProps: { variant: "withFeatures" as const }
  },

  withStats: {
    id: "centeredCTAWithStats",
    name: "CTA with Statistics",
    description: "Data-driven CTA showcasing impressive statistics",
    component: CenteredCTAWithStatsCustom,
    defaultProps: { variant: "withStats" as const }
  }
};

const splitCTATemplates: Record<string, Template> = {
  withImage: {
    id: "splitCTAWithImage",
    name: "Split CTA with Image",
    description: "Split layout CTA with image and content",
    component: SplitCTAWithImageCustom,
    defaultProps: { variant: "withImage" as const }
  },
  
  withBackground: {
    id: "splitCTAWithBackground",
    name: "Split CTA with Background",
    description: "Split layout CTA with background image or gradient",
    component: SplitCTAWithBackgroundCustom,
    defaultProps: { variant: "withBackground" as const }
  },

  withStats: {
    id: "splitCTAWithStats",
    name: "Split CTA with Statistics",
    description: "Split layout CTA showcasing key statistics",
    component: SplitCTAWithStatsCustom,
    defaultProps: { variant: "withStats" as const }
  },

  withDevices: {
    id: "splitCTAWithDevices",
    name: "Split CTA with Device Stats",
    description: "Split layout CTA highlighting multi-device support",
    component: SplitCTAWithDevicesCustom,
    defaultProps: { variant: "withDevices" as const }
  },

  withFeatures: {
    id: "splitCTAWithFeatures",
    name: "Split CTA with Features",
    description: "Split layout CTA highlighting key features",
    component: SplitCTAWithFeaturesCustom,
    defaultProps: { variant: "withFeatures" as const }
  }
};

// Export all CTA templates following hero pattern
export const allCTATemplates = [
  ...Object.keys(centeredCTATemplates).map(key => {
    const template = centeredCTATemplates[key as keyof typeof centeredCTATemplates];
    return template;
  }),
  ...Object.keys(splitCTATemplates).map(key => {
    const template = splitCTATemplates[key as keyof typeof splitCTATemplates];
    return template;
  })
];