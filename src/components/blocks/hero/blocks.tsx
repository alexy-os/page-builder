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
import { CenteredHeroContent, SplitHeroContent } from "./saas-content"; // ./content

/**
 * Custom Data for Hero
 */

// 1. Simple centered hero
const CenteredHeroSimpleCustom = () => {
  const content = CenteredHeroContent.centeredHeroSimple;

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
const CenteredHeroWithTopButtonCustom = () => {
  const content = CenteredHeroContent.centeredHeroWithTopButton;

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
const CenteredHeroWithImageCustom = () => {
  const content = CenteredHeroContent.centeredHeroWithImage;

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
const CenteredHeroWithStatsCustom = () => {
  const content = CenteredHeroContent.centeredHeroWithStats;

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
const CenteredHeroMissionCustom = () => {
  const content = CenteredHeroContent.centeredHeroMission;

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
const SplitHeroMediaCustom = () => {
  const content = SplitHeroContent.splitHeroMedia;
  return (
    <div className="w-full relative">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary/10 to-secondary/10" />
      <SplitHero content={content} variant="media" useContainer={true} className="relative z-10" py="2xl" />
    </div>
  );
};

const SplitHeroLeftMediaCustom = () => {
  const content = SplitHeroContent.splitHeroLeftMedia;
  return (
    <SplitHero content={content} variant="media" leftMedia={true} useContainer={true} py="2xl" />
  );
};

const SplitHeroGalleryCustom = () => {
  const content = SplitHeroContent.splitHeroGallery;
  return (
    <SplitHero content={content} variant="gallery" leftMedia={true} useContainer={true} py="2xl" />
  );
};

const SplitHeroWithTopButtonCustom = () => {
  const content = SplitHeroContent.splitHeroWithTopButton;
  return (
    <SplitHero content={content} variant="gallery" useContainer={true} className="bg-gradient-to-br from-primary/10 to-secondary/10" py="2xl" />
  );
};

const SplitHeroSecurityCustom = () => {
  const content = SplitHeroContent.splitHeroSecurity;
  return (
    <SplitHero content={content} variant="media" leftMedia={true} useContainer={true} className="bg-gradient-to-r from-secondary to-primary/10" py="2xl" />
  );
};

// Export all examples - MUST match library template IDs, not keys
const centeredHeroCustom: Record<string, React.ComponentType> = {
  centeredHeroSimple: CenteredHeroSimpleCustom,
  centeredHeroWithTopButton: CenteredHeroWithTopButtonCustom,
  centeredHeroWithImage: CenteredHeroWithImageCustom,
  centeredHeroWithStats: CenteredHeroWithStatsCustom,
  centeredHeroMission: CenteredHeroMissionCustom
};

const splitHeroCustom: Record<string, React.ComponentType> = {
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