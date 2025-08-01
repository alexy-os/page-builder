// Simplified imports using @ui8kit/blocks library
import { centeredCTAExamples, splitCTAExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allCTATemplates = [
  // Centered CTA templates
  {
    id: "ctaCenteredSimple",
    name: "CTA Centered Simple",
    description: "Simple centered call-to-action",
    component: centeredCTAExamples.simple,
    defaultContent: {}
  },
  {
    id: "ctaCenteredWithLogos",
    name: "CTA Centered with Logos",
    description: "Centered CTA with company logos",
    component: centeredCTAExamples.withLogos,
    defaultContent: {}
  },
  {
    id: "ctaCenteredWithBackground",
    name: "CTA Centered with Background",
    description: "Centered CTA with background image",
    component: centeredCTAExamples.withBackground,
    defaultContent: {}
  },
  {
    id: "ctaCenteredWithFeatures",
    name: "CTA Centered with Features",
    description: "Centered CTA with feature highlights",
    component: centeredCTAExamples.withFeatures,
    defaultContent: {}
  },
  {
    id: "ctaCenteredWithStats",
    name: "CTA Centered with Stats",
    description: "Centered CTA with statistics",
    component: centeredCTAExamples.withStats,
    defaultContent: {}
  },
  
  // Split CTA templates
  {
    id: "ctaSplitWithImage",
    name: "CTA Split with Image",
    description: "Split layout CTA with image",
    component: splitCTAExamples.withImage,
    defaultContent: {}
  },
  {
    id: "ctaSplitWithBackground",
    name: "CTA Split with Background",
    description: "Split layout CTA with background",
    component: splitCTAExamples.withBackground,
    defaultContent: {}
  },
  {
    id: "ctaSplitWithStats",
    name: "CTA Split with Stats",
    description: "Split layout CTA with statistics",
    component: splitCTAExamples.withStats,
    defaultContent: {}
  },
  {
    id: "ctaSplitWithDevices",
    name: "CTA Split with Devices",
    description: "Split layout CTA with device mockups",
    component: splitCTAExamples.withDevices,
    defaultContent: {}
  },
  {
    id: "ctaSplitWithFeatures",
    name: "CTA Split with Features",
    description: "Split layout CTA with features",
    component: splitCTAExamples.withFeatures,
    defaultContent: {}
  }
];

