// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitTeamTemplates, 
  gridTeamTemplates,
  GridTeam,
  SplitTeam 
} from "@ui8kit/blocks";

import { useTeamContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID TEAM VARIANTS =====

const GridTeamGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTeamContent } = useTeamContent();
  const content = providedContent || getGridTeamContent("gridTeamGrid" as any, blockId);
  return (
    <GridTeam content={content} variant="grid" useContainer={true} />
  );
};

const GridTeamCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTeamContent } = useTeamContent();
  const content = providedContent || getGridTeamContent("gridTeamCards" as any, blockId);
  return (
    <GridTeam content={content} variant="cards" useContainer={true} />
  );
};

const GridTeamMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTeamContent } = useTeamContent();
  const content = providedContent || getGridTeamContent("gridTeamMinimal" as any, blockId);
  return (
    <GridTeam content={content} variant="minimal" useContainer={true} />
  );
};

const GridTeamShowcaseCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTeamContent } = useTeamContent();
  const content = providedContent || getGridTeamContent("gridTeamShowcase" as any, blockId);
  return (
    <GridTeam content={content} variant="showcase" useContainer={true} />
  );
};

const GridTeamDirectoryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTeamContent } = useTeamContent();
  const content = providedContent || getGridTeamContent("gridTeamDirectory" as any, blockId);
  return (
    <GridTeam content={content} variant="directory" useContainer={true} />
  );
};

// ===== SPLIT TEAM VARIANTS =====

const SplitTeamLeadershipCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTeamContent } = useTeamContent();
  const content = providedContent || getSplitTeamContent("splitTeamLeadership" as any, blockId);
  return (
    <SplitTeam content={content} variant="leadership" mediaPosition="right" useContainer={true} />
  );
};

const SplitTeamShowcaseCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTeamContent } = useTeamContent();
  const content = providedContent || getSplitTeamContent("splitTeamShowcase" as any, blockId);
  return (
    <SplitTeam content={content} variant="showcase" mediaPosition="left" useContainer={true} />
  );
};

const SplitTeamHiringCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTeamContent } = useTeamContent();
  const content = providedContent || getSplitTeamContent("splitTeamHiring" as any, blockId);
  return (
    <SplitTeam content={content} variant="hiring" mediaPosition="right" useContainer={true} />
  );
};

const SplitTeamCultureCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTeamContent } = useTeamContent();
  const content = providedContent || getSplitTeamContent("splitTeamCulture" as any, blockId);
  return (
    <SplitTeam content={content} variant="culture" mediaPosition="left" useContainer={true} />
  );
};

const SplitTeamDepartmentsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTeamContent } = useTeamContent();
  const content = providedContent || getSplitTeamContent("splitTeamDepartments" as any, blockId);
  return (
    <SplitTeam content={content} variant="departments" mediaPosition="right" useContainer={true} />
  );
};

// Component mappings for custom templates
const gridTeamCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridTeamGrid: GridTeamGridCustom,
  gridTeamCards: GridTeamCardsCustom,
  gridTeamMinimal: GridTeamMinimalCustom,
  gridTeamShowcase: GridTeamShowcaseCustom,
  gridTeamDirectory: GridTeamDirectoryCustom
};

const splitTeamCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitTeamLeadership: SplitTeamLeadershipCustom,
  splitTeamShowcase: SplitTeamShowcaseCustom,
  splitTeamHiring: SplitTeamHiringCustom,
  splitTeamCulture: SplitTeamCultureCustom,
  splitTeamDepartments: SplitTeamDepartmentsCustom
};

// Export all Team templates
export const allTeamTemplates = [
  ...Object.keys(gridTeamTemplates).map(key => {
    const template = gridTeamTemplates[key as keyof typeof gridTeamTemplates];
    const customComponent = gridTeamCustom[template.id as keyof typeof gridTeamCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitTeamTemplates).map(key => {
    const template = splitTeamTemplates[key as keyof typeof splitTeamTemplates];
    const customComponent = splitTeamCustom[template.id as keyof typeof splitTeamCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];