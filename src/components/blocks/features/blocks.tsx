// Import built-in template objects and examples from @ui8kit/blocks library
import {
  splitFeaturesTemplates,
  gridFeaturesTemplates,
  GridFeatures,
  SplitFeatures
} from "@ui8kit/blocks";

import { useFeaturesContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID FEATURES VARIANTS =====

const GridFeaturesThreeColumnsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFeaturesContent } = useFeaturesContent();
  const content = providedContent || getGridFeaturesContent("gridFeaturesThreeColumns" as any, blockId);
  return (
    <GridFeatures
      content={content}
      variant="threeColumns"
      cols="1-2-3"
    />
  );
};

const GridFeaturesThreeColumnsIconsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFeaturesContent } = useFeaturesContent();
  const content = providedContent || getGridFeaturesContent("gridFeaturesThreeColumnsIcons" as any, blockId);
  return (
    <GridFeatures
      content={content}
      variant="threeColumnsIcons"
      cols="1-2-3"
    />
  );
};

const GridFeaturesMediaCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFeaturesContent } = useFeaturesContent();
  const content = providedContent || getGridFeaturesContent("gridFeaturesMediaCards" as any, blockId);
  return (
    <GridFeatures
      content={content}
      variant="gridMediaCards"
      cols="1-2-3"
    />
  );
};

const GridFeaturesCareerPositionsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFeaturesContent } = useFeaturesContent();
  const content = providedContent || getGridFeaturesContent("gridFeaturesCareerPositions" as any, blockId);
  return (
    <GridFeatures
      content={content}
      variant="careerPositions"
      cols="1-2"
    />
  );
};

const GridFeaturesCareerStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFeaturesContent } = useFeaturesContent();
  const content = providedContent || getGridFeaturesContent("gridFeaturesCareerStats" as any, blockId);
  return (
    <GridFeatures
      content={content}
      variant="careerStats"
      cols="1-2-3"
    />
  );
};

// ===== SPLIT FEATURES VARIANTS =====

const SplitFeaturesMediaCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFeaturesContent } = useFeaturesContent();
  const content = providedContent || getSplitFeaturesContent("splitFeaturesMedia" as any, blockId);
  return (
    <SplitFeatures
      content={content}
      variant="media"
      useContainer={true}
    />
  );
};

const SplitFeaturesFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFeaturesContent } = useFeaturesContent();
  const content = providedContent || getSplitFeaturesContent("splitFeaturesFeatures" as any, blockId);
  return (
    <SplitFeatures
      content={content}
      variant="features"
      leftMedia={true}
      useContainer={true}
    />
  );
};

const SplitFeaturesAnalyticsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFeaturesContent } = useFeaturesContent();
  const content = providedContent || getSplitFeaturesContent("splitFeaturesAnalytics" as any, blockId);
  return (
    <SplitFeatures
      content={content}
      variant="analytics"
      leftMedia={true}
      useContainer={false}
      py="none"
      gap="none"
      className="min-h-[calc(100vh-64px)] overflow-hidden"
    />
  );
};

const SplitFeaturesSecurityCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFeaturesContent } = useFeaturesContent();
  const content = providedContent || getSplitFeaturesContent("splitFeaturesSecurity" as any, blockId);
  return (
    <SplitFeatures
      content={content}
      variant="features"
      leftMedia={false}
      useContainer={false}
      gap="none"
      className="bg-gradient-to-br from-primary/50 to-primary/10"
    />
  );
};

const SplitFeaturesPerformanceCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFeaturesContent } = useFeaturesContent();
  const content = providedContent || getSplitFeaturesContent("splitFeaturesPerformance" as any, blockId);
  return (
    <SplitFeatures
      content={content}
      variant="media"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// Component mappings for custom templates
const gridFeaturesCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridFeaturesThreeColumns: GridFeaturesThreeColumnsCustom,
  gridFeaturesThreeColumnsIcons: GridFeaturesThreeColumnsIconsCustom,
  gridFeaturesMediaCards: GridFeaturesMediaCardsCustom,
  gridFeaturesCareerPositions: GridFeaturesCareerPositionsCustom,
  gridFeaturesCareerStats: GridFeaturesCareerStatsCustom
};

const splitFeaturesCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitFeaturesMedia: SplitFeaturesMediaCustom,
  splitFeaturesFeatures: SplitFeaturesFeaturesCustom,
  splitFeaturesAnalytics: SplitFeaturesAnalyticsCustom,
  splitFeaturesSecurity: SplitFeaturesSecurityCustom,
  splitFeaturesPerformance: SplitFeaturesPerformanceCustom
};

// Export all Features templates following the known pattern
export const allFeaturesTemplates = [
  ...Object.keys(gridFeaturesTemplates).map(key => {
    const template = gridFeaturesTemplates[key as keyof typeof gridFeaturesTemplates];
    const customComponent = gridFeaturesCustom[template.id as keyof typeof gridFeaturesCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitFeaturesTemplates).map(key => {
    const template = splitFeaturesTemplates[key as keyof typeof splitFeaturesTemplates];
    const customComponent = splitFeaturesCustom[template.id as keyof typeof splitFeaturesCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];