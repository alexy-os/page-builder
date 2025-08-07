// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitFooterTemplates, 
  gridFooterTemplates,
  GridFooter,
  SplitFooter
} from "@ui8kit/blocks";

import { useFooterContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID FOOTER VARIANTS =====

const GridFooterColumnsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFooterContent } = useFooterContent();
  const content = providedContent || getGridFooterContent("gridFooterColumns" as any, blockId);
  return (
    <GridFooter
      content={content}
      variant="columns"
      useContainer={true}
      py="xl"
    />
  );
};

const GridFooterMegaCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFooterContent } = useFooterContent();
  const content = providedContent || getGridFooterContent("gridFooterMega" as any, blockId);
  return (
    <GridFooter
      content={content}
      variant="mega"
      useContainer={true}
      py="xl"
    />
  );
};

const GridFooterCompactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFooterContent } = useFooterContent();
  const content = providedContent || getGridFooterContent("gridFooterCompact" as any, blockId);
  return (
    <GridFooter
      content={content}
      variant="compact"
      useContainer={true}
      py="lg"
    />
  );
};

const GridFooterNewsletterCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFooterContent } = useFooterContent();
  const content = providedContent || getGridFooterContent("gridFooterNewsletter" as any, blockId);
  return (
    <GridFooter
      content={content}
      variant="newsletter"
      useContainer={true}
      py="xl"
    />
  );
};

const GridFooterSitemapCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getGridFooterContent } = useFooterContent();
  const content = providedContent || getGridFooterContent("gridFooterSitemap" as any, blockId);
  return (
    <GridFooter
      content={content}
      variant="sitemap"
      useContainer={true}
      py="xl"
    />
  );
};

// ===== SPLIT FOOTER VARIANTS =====

const SplitFooterBrandCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFooterContent } = useFooterContent();
  const content = providedContent || getSplitFooterContent("splitFooterBrand" as any, blockId);
  return (
    <SplitFooter
      content={content}
      variant="brand"
      mediaPosition="right"
      useContainer={true}
      py="xl"
    />
  );
};

const SplitFooterNewsletterCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFooterContent } = useFooterContent();
  const content = providedContent || getSplitFooterContent("splitFooterNewsletter" as any, blockId);
  return (
    <SplitFooter
      content={content}
      variant="newsletter"
      mediaPosition="left"
      useContainer={true}
      py="xl"
    />
  );
};

const SplitFooterContactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFooterContent } = useFooterContent();
  const content = providedContent || getSplitFooterContent("splitFooterContact" as any, blockId);
  return (
    <SplitFooter
      content={content}
      variant="contact"
      mediaPosition="right"
      useContainer={true}
      py="xl"
    />
  );
};

const SplitFooterSocialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFooterContent } = useFooterContent();
  const content = providedContent || getSplitFooterContent("splitFooterSocial" as any, blockId);
  return (
    <SplitFooter
      content={content}
      variant="social"
      mediaPosition="left"
      useContainer={true}
      py="xl"
    />
  );
};

const SplitFooterMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFooterContent } = useFooterContent();
  const content = providedContent || getSplitFooterContent("splitFooterMinimal" as any, blockId);
  return (
    <SplitFooter
      content={content}
      variant="minimal"
      mediaPosition="right"
      useContainer={true}
      py="lg"
    />
  );
};

// Component mappings for custom templates
const gridFooterCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridFooterColumns: GridFooterColumnsCustom,
  gridFooterMega: GridFooterMegaCustom,
  gridFooterCompact: GridFooterCompactCustom,
  gridFooterNewsletter: GridFooterNewsletterCustom,
  gridFooterSitemap: GridFooterSitemapCustom
};

const splitFooterCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitFooterBrand: SplitFooterBrandCustom,
  splitFooterNewsletter: SplitFooterNewsletterCustom,
  splitFooterContact: SplitFooterContactCustom,
  splitFooterSocial: SplitFooterSocialCustom,
  splitFooterMinimal: SplitFooterMinimalCustom
};

// Export all Footer templates
export const allFooterTemplates = [
  ...Object.keys(gridFooterTemplates).map(key => {
    const template = gridFooterTemplates[key as keyof typeof gridFooterTemplates];
    const customComponent = gridFooterCustom[template.id as keyof typeof gridFooterCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitFooterTemplates).map(key => {
    const template = splitFooterTemplates[key as keyof typeof splitFooterTemplates];
    const customComponent = splitFooterCustom[template.id as keyof typeof splitFooterCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];


