// Import built-in template objects from @ui8kit/blocks library
import {
  splitFAQTemplates,
  gridFAQTemplates,
  GridFAQ,
  SplitFAQ
} from "@ui8kit/blocks";

import { useFAQContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== GRID FAQ VARIANTS =====

const GridFAQCardsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredFAQContent } = useFAQContent();
  const content = providedContent || getCenteredFAQContent("gridFAQCards" as any, blockId);
  return (
    <GridFAQ
      content={content}
      variant="cards"
      cols="1-2-3"
    />
  );
};

const GridFAQAccordionCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredFAQContent } = useFAQContent();
  const content = providedContent || getCenteredFAQContent("gridFAQAccordion" as any, blockId);
  return (
    <GridFAQ
      content={content}
      variant="accordion"
      cols="1"
    />
  );
};

const GridFAQCategoriesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredFAQContent } = useFAQContent();
  const content = providedContent || getCenteredFAQContent("gridFAQCategories" as any, blockId);
  return (
    <GridFAQ
      content={content}
      variant="categories"
      cols="1-2-4"
    />
  );
};

const GridFAQCompactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredFAQContent } = useFAQContent();
  const content = providedContent || getCenteredFAQContent("gridFAQCompact" as any, blockId);
  return (
    <GridFAQ
      content={content}
      variant="compact"
      cols="1"
      useContainer={true}
    />
  );
};

const GridFAQSupportCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredFAQContent } = useFAQContent();
  const content = providedContent || getCenteredFAQContent("gridFAQSupport" as any, blockId);
  return (
    <GridFAQ
      content={content}
      variant="support"
      cols="1-2-3"
      className="bg-gradient-to-b from-primary/50 to-primary/10"
    />
  );
};

// ===== SPLIT FAQ VARIANTS =====

const SplitFAQContactCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFAQContent } = useFAQContent();
  const content = providedContent || getSplitFAQContent("splitFAQContact" as any, blockId);
  return (
    <SplitFAQ
      content={content}
      variant="contact"
      leftMedia={false}
    />
  );
};

const SplitFAQSearchCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFAQContent } = useFAQContent();
  const content = providedContent || getSplitFAQContent("splitFAQSearch" as any, blockId);
  return (
    <SplitFAQ
      content={content}
      variant="search"
      leftMedia={true}
    />
  );
};

const SplitFAQCategoriesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFAQContent } = useFAQContent();
  const content = providedContent || getSplitFAQContent("splitFAQCategories" as any, blockId);
  return (
    <SplitFAQ
      content={content}
      variant="categories"
      leftMedia={false}
    />
  );
};

const SplitFAQSupportCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFAQContent } = useFAQContent();
  const content = providedContent || getSplitFAQContent("splitFAQSupport" as any, blockId);
  return (
    <SplitFAQ
      content={content}
      variant="support"
      leftMedia={true}
    />
  );
};

const SplitFAQAccordionCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitFAQContent } = useFAQContent();
  const content = providedContent || getSplitFAQContent("splitFAQAccordion" as any, blockId);
  return (
    <SplitFAQ
      content={content}
      variant="accordion"
      leftMedia={false}
    />
  );
};

// Component mappings for custom templates
const gridFAQCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridFAQCards: GridFAQCardsCustom,
  gridFAQAccordion: GridFAQAccordionCustom,
  gridFAQCategories: GridFAQCategoriesCustom,
  gridFAQCompact: GridFAQCompactCustom,
  gridFAQSupport: GridFAQSupportCustom
};

const splitFAQCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitFAQContact: SplitFAQContactCustom,
  splitFAQSearch: SplitFAQSearchCustom,
  splitFAQCategories: SplitFAQCategoriesCustom,
  splitFAQSupport: SplitFAQSupportCustom,
  splitFAQAccordion: SplitFAQAccordionCustom
};

// Export all FAQ templates following the CTA pattern
export const allFAQTemplates = [
  ...Object.keys(gridFAQTemplates).map(key => {
    const template = gridFAQTemplates[key as keyof typeof gridFAQTemplates];
    const customComponent = gridFAQCustom[template.id as keyof typeof gridFAQCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitFAQTemplates).map(key => {
    const template = splitFAQTemplates[key as keyof typeof splitFAQTemplates];
    const customComponent = splitFAQCustom[template.id as keyof typeof splitFAQCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];
