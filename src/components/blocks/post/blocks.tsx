// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitPostTemplates, 
  centeredPostTemplates,
  CenteredPost,
  SplitPost 
} from "@ui8kit/blocks";

import { usePostContent } from "@/hooks/useBlockContent";

interface ContentProps {
  content?: any;
  blockId?: string;
}

// ===== CENTERED POST VARIANTS =====

const CenteredPostClassicCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredPostContent } = usePostContent();
  const content = providedContent || getCenteredPostContent("centeredPostClassic" as any, blockId);
  return <CenteredPost content={content} variant="classic" />;
};

const CenteredPostMinimalCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredPostContent } = usePostContent();
  const content = providedContent || getCenteredPostContent("centeredPostMinimal" as any, blockId);
  return <CenteredPost content={content} variant="minimal" />;
};

const CenteredPostMagazineCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredPostContent } = usePostContent();
  const content = providedContent || getCenteredPostContent("centeredPostMagazine" as any, blockId);
  return <CenteredPost content={content} variant="magazine" />;
};

const CenteredPostFeaturedCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredPostContent } = usePostContent();
  const content = providedContent || getCenteredPostContent("centeredPostFeatured" as any, blockId);
  return <CenteredPost content={content} variant="featured" className="bg-gradient-to-b from-muted/30 to-background" />;
};

const CenteredPostEditorialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredPostContent } = usePostContent();
  const content = providedContent || getCenteredPostContent("centeredPostEditorial" as any, blockId);
  return <CenteredPost content={content} variant="editorial" />;
};

// ===== SPLIT POST VARIANTS =====

const SplitPostStandardCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPostContent } = usePostContent();
  const content = providedContent || getSplitPostContent("splitPostStandard" as any, blockId);
  return <SplitPost content={content} variant="standard" leftMedia={false} />;
};

const SplitPostAuthorCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPostContent } = usePostContent();
  const content = providedContent || getSplitPostContent("splitPostAuthor" as any, blockId);
  return <SplitPost content={content} variant="author" leftMedia={true} />;
};

const SplitPostMediaCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPostContent } = usePostContent();
  const content = providedContent || getSplitPostContent("splitPostMedia" as any, blockId);
  return <SplitPost content={content} variant="media" leftMedia={false} />;
};

const SplitPostSidebarCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPostContent } = usePostContent();
  const content = providedContent || getSplitPostContent("splitPostSidebar" as any, blockId);
  return <SplitPost content={content} variant="sidebar" leftMedia={true} />;
};

const SplitPostHeroCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitPostContent } = usePostContent();
  const content = providedContent || getSplitPostContent("splitPostHero" as any, blockId);
  return <SplitPost content={content} variant="hero" leftMedia={false} className="bg-gradient-to-r from-primary/5 to-secondary/5" />;
};

// Component mappings for custom templates
const centeredPostCustom: Record<string, React.ComponentType<ContentProps>> = {
  centeredPostClassic: CenteredPostClassicCustom,
  centeredPostMinimal: CenteredPostMinimalCustom,
  centeredPostMagazine: CenteredPostMagazineCustom,
  centeredPostFeatured: CenteredPostFeaturedCustom,
  centeredPostEditorial: CenteredPostEditorialCustom
};

const splitPostCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitPostStandard: SplitPostStandardCustom,
  splitPostAuthor: SplitPostAuthorCustom,
  splitPostMedia: SplitPostMediaCustom,
  splitPostSidebar: SplitPostSidebarCustom,
  splitPostHero: SplitPostHeroCustom
};

// Export all Post templates
export const allPostTemplates = [
  ...Object.keys(centeredPostTemplates).map(key => {
    const template = centeredPostTemplates[key as keyof typeof centeredPostTemplates];
    const customComponent = centeredPostCustom[template.id as keyof typeof centeredPostCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitPostTemplates).map(key => {
    const template = splitPostTemplates[key as keyof typeof splitPostTemplates];
    const customComponent = splitPostCustom[template.id as keyof typeof splitPostCustom];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];
