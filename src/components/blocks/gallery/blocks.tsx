// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitGalleryTemplates, 
  gridGalleryTemplates,
  GridGallery,
  SplitGallery 
} from "@ui8kit/blocks";

import { useGalleryContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID GALLERY VARIANTS =====

const GridGalleryGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryGrid" as any, blockId);
  return (
    <GridGallery content={content} variant="grid" />
  );
};

const GridGalleryMasonryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryMasonry" as any, blockId);
  return (
    <GridGallery content={content} variant="masonry" />
  );
};

const GridGalleryCarouselCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryCarousel" as any, blockId);
  return (
    <GridGallery content={content} variant="carousel" />
  );
};

const GridGalleryMosaicCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryMosaic" as any, blockId);
  return (
    <GridGallery content={content} variant="mosaic" />
  );
};

const GridGalleryMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryMinimal" as any, blockId);
  return (
    <GridGallery content={content} variant="minimal" />
  );
};

const GridGalleryCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryCards" as any, blockId);
  return (
    <GridGallery content={content} variant="cards" />
  );
};

const GridGalleryPolaroidCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryPolaroid" as any, blockId);
  return (
    <GridGallery content={content} variant="polaroid" className="bg-gradient-to-b from-primary/50 to-primary/10" />
  );
};

const GridGalleryMagazineCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridGalleryContent } = useGalleryContent();
  const content = providedContent || getGridGalleryContent("gridGalleryMagazine" as any, blockId);
  return (
    <GridGallery content={content} variant="magazine" />
  );
};

// ===== SPLIT GALLERY VARIANTS =====

const SplitGalleryShowcaseCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitGalleryContent } = useGalleryContent();
  const content = providedContent || getSplitGalleryContent("splitGalleryShowcase" as any, blockId);
  return (
    <SplitGallery content={content} variant="showcase" leftMedia={false} />
  );
};

const SplitGalleryPortfolioCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitGalleryContent } = useGalleryContent();
  const content = providedContent || getSplitGalleryContent("splitGalleryPortfolio" as any, blockId);
  return (
    <SplitGallery content={content} variant="portfolio" leftMedia={true} />
  );
};

// Component mappings for custom templates
const gridGalleryCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridGalleryGrid: GridGalleryGridCustom,
  gridGalleryMasonry: GridGalleryMasonryCustom,
  gridGalleryCarousel: GridGalleryCarouselCustom,
  gridGalleryMosaic: GridGalleryMosaicCustom,
  gridGalleryMinimal: GridGalleryMinimalCustom,
  gridGalleryCards: GridGalleryCardsCustom,
  gridGalleryPolaroid: GridGalleryPolaroidCustom,
  gridGalleryMagazine: GridGalleryMagazineCustom
};

const splitGalleryCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitGalleryShowcase: SplitGalleryShowcaseCustom,
  splitGalleryPortfolio: SplitGalleryPortfolioCustom
};

// Export all Gallery templates
export const allGalleryTemplates = [
  ...Object.keys(gridGalleryTemplates).map(key => {
    const template = gridGalleryTemplates[key as keyof typeof gridGalleryTemplates];
    const customComponent = gridGalleryCustom[template.id as keyof typeof gridGalleryCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitGalleryTemplates).map(key => {
    const template = splitGalleryTemplates[key as keyof typeof splitGalleryTemplates];
    const customComponent = splitGalleryCustom[template.id as keyof typeof splitGalleryCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];



