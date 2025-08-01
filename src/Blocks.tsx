import { splitHeroExamples, centeredHeroExamples } from "@ui8kit/blocks";

export const SplitHeroMediaExample = splitHeroExamples.media;
export const SplitHeroLeftMediaExample = splitHeroExamples.leftMedia;
export const SplitHeroGalleryExample = splitHeroExamples.gallery;
export const SplitHeroWithTopButtonExample = splitHeroExamples.withTopButton;
export const SplitHeroSecurityExample = splitHeroExamples.security;

export const CenteredHeroSimpleExample = centeredHeroExamples.simple;
export const CenteredHeroWithTopButtonExample = centeredHeroExamples.withTopButton;
export const CenteredHeroWithImageExample = centeredHeroExamples.withImage;
export const CenteredHeroWithStatsExample = centeredHeroExamples.withStats;
export const CenteredHeroMissionExample = centeredHeroExamples.mission;

export function HeroBlocks() {
    // Debugging: divide-y divide-border divide-amber-500
  return (
    <div className="flex flex-col">
      <SplitHeroMediaExample />
      <SplitHeroLeftMediaExample />
      <SplitHeroGalleryExample />
      <SplitHeroWithTopButtonExample />
      <SplitHeroSecurityExample />
      <CenteredHeroSimpleExample />
      <CenteredHeroWithTopButtonExample />
      <CenteredHeroWithImageExample />
      <CenteredHeroWithStatsExample />
      <CenteredHeroMissionExample />
    </div>
  );
}

export default HeroBlocks;