// Simplified imports using @ui8kit/blocks library
import { splitHeroExamples, centeredHeroExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allHeroTemplates = [
  // Split Hero templates from @ui8kit/blocks
  {
    id: "heroSplitMedia",
    name: "Hero Split with Media",
    description: "Split layout hero with media content",
    component: splitHeroExamples.media,
    defaultContent: {}
  },
  {
    id: "heroSplitLeftMedia", 
    name: "Hero Split with Left Media",
    description: "Split layout hero with left-aligned media",
    component: splitHeroExamples.leftMedia,
    defaultContent: {}
  },
  {
    id: "heroSplitGallery",
    name: "Hero Split with Gallery", 
    description: "Split layout hero with image gallery",
    component: splitHeroExamples.gallery,
    defaultContent: {}
  },
  {
    id: "heroSplitWithTopButton",
    name: "Hero Split with Top Button",
    description: "Split layout hero with top action button",
    component: splitHeroExamples.withTopButton,
    defaultContent: {}
  },
  {
    id: "heroSplitSecurity",
    name: "Hero Split Security",
    description: "Split layout hero focused on security",
    component: splitHeroExamples.security,
    defaultContent: {}
  },
  
  // Centered Hero templates from @ui8kit/blocks
  {
    id: "heroCenteredSimple",
    name: "Hero Centered Simple",
    description: "Simple centered hero layout",
    component: centeredHeroExamples.simple,
    defaultContent: {}
  },
  {
    id: "heroCenteredWithTopButton",
    name: "Hero Centered with Top Button", 
    description: "Centered hero with top action button",
    component: centeredHeroExamples.withTopButton,
    defaultContent: {}
  },
  {
    id: "heroCenteredWithImage",
    name: "Hero Centered with Image",
    description: "Centered hero with featured image",
    component: centeredHeroExamples.withImage,
    defaultContent: {}
  },
  {
    id: "heroCenteredWithStats",
    name: "Hero Centered with Stats",
    description: "Centered hero with statistics display",
    component: centeredHeroExamples.withStats,
    defaultContent: {}
  },
  {
    id: "heroCenteredMission",
    name: "Hero Centered Mission",
    description: "Centered hero for mission/vision statements",
    component: centeredHeroExamples.mission,
    defaultContent: {}
  }
];


