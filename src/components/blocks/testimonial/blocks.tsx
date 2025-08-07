// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitTestimonialTemplates, 
  gridTestimonialTemplates,
  GridTestimonial,
  SplitTestimonial 
} from "@ui8kit/blocks";

import { useTestimonialContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID TESTIMONIAL VARIANTS =====

const GridTestimonialGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialGrid" as any, blockId);
  return <GridTestimonial content={content} variant="grid" useContainer={true} />;
};

const GridTestimonialMasonryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialMasonry" as any, blockId);
  return <GridTestimonial content={content} variant="masonry" useContainer={true} />;
};

const GridTestimonialMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialMinimal" as any, blockId);
  return <GridTestimonial content={content} variant="minimal" useContainer={true} />;
};

const GridTestimonialCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialCards" as any, blockId);
  return <GridTestimonial content={content} variant="cards" useContainer={true} />;
};

const GridTestimonialCompactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialCompact" as any, blockId);
  return <GridTestimonial content={content} variant="compact" useContainer={true} />;
};

const GridTestimonialSliderCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialSlider" as any, blockId);
  return <GridTestimonial content={content} variant="slider" useContainer={true} />;
};

const GridTestimonialMagazineCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridTestimonialContent } = useTestimonialContent();
  const content = providedContent || getGridTestimonialContent("gridTestimonialMagazine" as any, blockId);
  return <GridTestimonial content={content} variant="magazine" useContainer={true} />;
};

// ===== SPLIT TESTIMONIAL VARIANTS =====

const SplitTestimonialFeaturedCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTestimonialContent } = useTestimonialContent();
  const content = providedContent || getSplitTestimonialContent("splitTestimonialFeatured" as any, blockId);
  return <SplitTestimonial content={content} variant="featured" mediaPosition="right" useContainer={true} />;
};

const SplitTestimonialCarouselCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTestimonialContent } = useTestimonialContent();
  const content = providedContent || getSplitTestimonialContent("splitTestimonialCarousel" as any, blockId);
  return <SplitTestimonial content={content} variant="carousel" mediaPosition="left" useContainer={true} />;
};

const SplitTestimonialStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitTestimonialContent } = useTestimonialContent();
  const content = providedContent || getSplitTestimonialContent("splitTestimonialStats" as any, blockId);
  return <SplitTestimonial content={content} variant="stats" mediaPosition="right" useContainer={true} />;
};

// Component mappings for custom templates
const gridTestimonialCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridTestimonialGrid: GridTestimonialGridCustom,
  gridTestimonialMasonry: GridTestimonialMasonryCustom,
  gridTestimonialMinimal: GridTestimonialMinimalCustom,
  gridTestimonialCards: GridTestimonialCardsCustom,
  gridTestimonialCompact: GridTestimonialCompactCustom,
  gridTestimonialSlider: GridTestimonialSliderCustom,
  gridTestimonialMagazine: GridTestimonialMagazineCustom
};

const splitTestimonialCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitTestimonialFeatured: SplitTestimonialFeaturedCustom,
  splitTestimonialCarousel: SplitTestimonialCarouselCustom,
  splitTestimonialStats: SplitTestimonialStatsCustom
};

// Export all Testimonial templates
export const allTestimonialTemplates = [
  ...Object.keys(gridTestimonialTemplates).map(key => {
    const template = gridTestimonialTemplates[key as keyof typeof gridTestimonialTemplates];
    const customComponent = gridTestimonialCustom[template.id as keyof typeof gridTestimonialCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitTestimonialTemplates).map(key => {
    const template = splitTestimonialTemplates[key as keyof typeof splitTestimonialTemplates];
    const customComponent = splitTestimonialCustom[template.id as keyof typeof splitTestimonialCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];
