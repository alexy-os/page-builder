// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitHeroTemplates, 
  centeredHeroTemplates,
  CenteredHero,
  SplitHero
} from "@ui8kit/blocks";

import { skyOSTheme } from "@ui8kit/theme";

const currentTheme = skyOSTheme; // modernUITheme | skyOSTheme

const theme = {
  theme: currentTheme,
  rounded: currentTheme.rounded,
  buttonSize: currentTheme.buttonSize,
  py: "2xl" as const
}

import React from "react";
import { useHeroContent } from "@/hooks/useBlockContent";

/**
 * Custom Data for Hero
 */

// Interface for content props that can be passed to components
interface ContentProps {
  content?: any;
  blockId?: string;
}

// 1. Simple centered hero
const CenteredHeroSimpleCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredHeroContent } = useHeroContent();
  
  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content = providedContent || getCenteredHeroContent('centeredHeroSimple', blockId);

  return (
    <div className="w-full relative">
  {/* Radial Gradient Background */}
  <div
    className="absolute inset-0 z-0 bg-gradient-to-t from-primary/10 to-secondary/10"
  />
    <CenteredHero
      content={content}
      variant="simple"
      useContainer={true}
      data-class="hero-simple"
      className="relative z-10"
      py={theme.py}
    />
    </div>
  );
};

// 2. Centered hero with top button
const CenteredHeroWithTopButtonCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredHeroContent } = useHeroContent();
  
  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content = providedContent || getCenteredHeroContent('centeredHeroWithTopButton', blockId);

  return (
    <CenteredHero
      content={content}
      variant="withTopButton"
      useContainer={true}
      py={theme.py}
    />
  );
};

// 3. Centered hero with image
const CenteredHeroWithImageCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredHeroContent } = useHeroContent();
  
  const content = providedContent || getCenteredHeroContent('centeredHeroWithImage', blockId);

  return (
    <div className="w-full bg-background dark:bg-secondary/5 relative">
  {/* Bottom Fade Grid Background */}
  <div
    className="absolute inset-0 z-0 
               [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
               dark:[background-image:linear-gradient(to_right,rgba(71,85,105,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.4)_1px,transparent_1px)]"
    style={{
      backgroundSize: "20px 30px",
      WebkitMaskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      maskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)"
    }}
  />
    <CenteredHero
      content={content}
      variant="withImage"
      useContainer={true}
      data-class="hero-with-image"
      className="relative z-10"
      py={theme.py}
    />
</div>
  );
};

// 4. Centered hero with stats
const CenteredHeroWithStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredHeroContent } = useHeroContent();
  
  const content = providedContent || getCenteredHeroContent('centeredHeroWithStats', blockId);

  return (
    <CenteredHero
      content={content}
      variant="withStats"
      useContainer={true}
      py={theme.py}
    />
  );
};

// 5. Mission-focused centered hero
const CenteredHeroMissionCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredHeroContent } = useHeroContent();
  
  const content = providedContent || getCenteredHeroContent('centeredHeroMission', blockId);

  return (
    <CenteredHero
      content={content}
      variant="withStats"
      useContainer={true}
      data-class="hero-mission"
      className="bg-gradient-to-t from-indigo-50 to-teal-100 dark:from-indigo-950 dark:to-teal-950"
      py={theme.py}
    />
  );
};

// Add new custom functions for SplitHero
const SplitHeroMediaCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitHeroContent } = useHeroContent();
  
  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content = providedContent || getSplitHeroContent('splitHeroMedia', blockId);
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary/10 to-secondary/10" />
      <SplitHero content={content} variant="media" useContainer={true} className="relative z-10" py="xl" />
    </div>
  );
};

const SplitHeroLeftMediaCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitHeroContent } = useHeroContent();
  
  const content = providedContent || getSplitHeroContent('splitHeroLeftMedia', blockId);
  return (
    <SplitHero content={content} variant="media" leftMedia={true} useContainer={true} py="xl" />
  );
};

const SplitHeroGalleryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitHeroContent } = useHeroContent();
  
  const content = providedContent || getSplitHeroContent('splitHeroGallery', blockId);
  return (
    <SplitHero content={content} variant="gallery" leftMedia={true} useContainer={true} py="xl" />
  );
};

const SplitHeroWithTopButtonCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitHeroContent } = useHeroContent();
  
  const content = providedContent || getSplitHeroContent('splitHeroWithTopButton', blockId);
  return (
    <SplitHero content={content} variant="gallery" useContainer={true} className="bg-gradient-to-br from-primary/10 to-secondary/10" py="xl" />
  );
};

const SplitHeroSecurityCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitHeroContent } = useHeroContent();
  
  const content = providedContent || getSplitHeroContent('splitHeroSecurity', blockId);
  return (
    <SplitHero content={content} variant="media" leftMedia={true} useContainer={true} className="bg-gradient-to-r from-secondary to-primary/10" py="xl" />
  );
};

// Export all examples - MUST match library template IDs, not keys
const centeredHeroCustom: Record<string, React.ComponentType<ContentProps>> = {
  centeredHeroSimple: CenteredHeroSimpleCustom,
  centeredHeroWithTopButton: CenteredHeroWithTopButtonCustom,
  centeredHeroWithImage: CenteredHeroWithImageCustom,
  centeredHeroWithStats: CenteredHeroWithStatsCustom,
  centeredHeroMission: CenteredHeroMissionCustom
};

const splitHeroCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitHeroMedia: SplitHeroMediaCustom,
  splitHeroLeftMedia: SplitHeroLeftMediaCustom,
  splitHeroGallery: SplitHeroGalleryCustom,
  splitHeroWithTopButton: SplitHeroWithTopButtonCustom,
  splitHeroSecurity: SplitHeroSecurityCustom
};

// Update allHeroTemplates to fix syntax and mapping issues
export const allHeroTemplates = [
  ...Object.keys(splitHeroTemplates).map(key => {
    const heroTemplate = splitHeroTemplates[key as keyof typeof splitHeroTemplates];
    const heroComponent = splitHeroCustom[heroTemplate.id];
    return {
      ...heroTemplate,
      component: heroComponent || (() => <div>Missing Component: {key}</div>)
    };
  }),
  ...Object.keys(centeredHeroTemplates).map(key => {
    const template = centeredHeroTemplates[key as keyof typeof centeredHeroTemplates];
    const customComponent = centeredHeroCustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];