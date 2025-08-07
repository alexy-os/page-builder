// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitPortfolioTemplates, 
  gridPortfolioTemplates,
  GridPortfolio,
  SplitPortfolio 
} from "@ui8kit/blocks";

import { usePortfolioContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID PORTFOLIO VARIANTS =====

const GridPortfolioCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridPortfolioContent } = usePortfolioContent();
  const content = providedContent || getGridPortfolioContent("gridPortfolioCards" as any, blockId);
  return (
    <GridPortfolio content={content} variant="cards" cols="1-2-3" />
  );
};

const GridPortfolioMasonryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridPortfolioContent } = usePortfolioContent();
  const content = providedContent || getGridPortfolioContent("gridPortfolioMasonry" as any, blockId);
  return (
    <GridPortfolio content={content} variant="masonry" cols="1-2-3" className="bg-gradient-to-b from-muted/30 to-background" />
  );
};

const GridPortfolioMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridPortfolioContent } = usePortfolioContent();
  const content = providedContent || getGridPortfolioContent("gridPortfolioMinimal" as any, blockId);
  return (
    <GridPortfolio content={content} variant="minimal" cols="1-2-4" />
  );
};

const GridPortfolioDetailedCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridPortfolioContent } = usePortfolioContent();
  const content = providedContent || getGridPortfolioContent("gridPortfolioDetailed" as any, blockId);
  return (
    <GridPortfolio content={content} variant="detailed" cols="1-2-3" />
  );
};

const GridPortfolioShowcaseCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridPortfolioContent } = usePortfolioContent();
  const content = providedContent || getGridPortfolioContent("gridPortfolioShowcase" as any, blockId);
  return (
    <GridPortfolio content={content} variant="showcase" cols="1-2-4" className="bg-gradient-to-r from-primary/5 to-secondary/5" />
  );
};

// ===== SPLIT PORTFOLIO VARIANTS =====

const SplitPortfolioShowcaseCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPortfolioContent } = usePortfolioContent();
  const content = providedContent || getSplitPortfolioContent("splitPortfolioShowcase" as any, blockId);
  return (
    <SplitPortfolio content={content} variant="showcase" leftMedia={false} />
  );
};

const SplitPortfolioAboutCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPortfolioContent } = usePortfolioContent();
  const content = providedContent || getSplitPortfolioContent("splitPortfolioAbout" as any, blockId);
  return (
    <SplitPortfolio content={content} variant="about" leftMedia={true} />
  );
};

const SplitPortfolioSkillsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPortfolioContent } = usePortfolioContent();
  const content = providedContent || getSplitPortfolioContent("splitPortfolioSkills" as any, blockId);
  return (
    <SplitPortfolio content={content} variant="skills" leftMedia={false} />
  );
};

const SplitPortfolioTestimonialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPortfolioContent } = usePortfolioContent();
  const content = providedContent || getSplitPortfolioContent("splitPortfolioTestimonial" as any, blockId);
  return (
    <SplitPortfolio content={content} variant="testimonial" leftMedia={true} />
  );
};

const SplitPortfolioProcessCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPortfolioContent } = usePortfolioContent();
  const content = providedContent || getSplitPortfolioContent("splitPortfolioProcess" as any, blockId);
  return (
    <SplitPortfolio content={content} variant="process" leftMedia={false} />
  );
};

// Component mappings for custom templates
const gridPortfolioCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridPortfolioCards: GridPortfolioCardsCustom,
  gridPortfolioMasonry: GridPortfolioMasonryCustom,
  gridPortfolioMinimal: GridPortfolioMinimalCustom,
  gridPortfolioDetailed: GridPortfolioDetailedCustom,
  gridPortfolioShowcase: GridPortfolioShowcaseCustom
};

const splitPortfolioCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitPortfolioShowcase: SplitPortfolioShowcaseCustom,
  splitPortfolioAbout: SplitPortfolioAboutCustom,
  splitPortfolioSkills: SplitPortfolioSkillsCustom,
  splitPortfolioTestimonial: SplitPortfolioTestimonialCustom,
  splitPortfolioProcess: SplitPortfolioProcessCustom
};

// Export all Portfolio templates
export const allPortfolioTemplates = [
  ...Object.keys(gridPortfolioTemplates).map(key => {
    const template = gridPortfolioTemplates[key as keyof typeof gridPortfolioTemplates];
    const customComponent = gridPortfolioCustom[template.id as keyof typeof gridPortfolioCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitPortfolioTemplates).map(key => {
    const template = splitPortfolioTemplates[key as keyof typeof splitPortfolioTemplates];
    const customComponent = splitPortfolioCustom[template.id as keyof typeof splitPortfolioCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];

