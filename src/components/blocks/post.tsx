// Simplified imports using @ui8kit/blocks library
import { centeredPostExamples, splitPostExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allPostTemplates = [
  // Centered Post templates
  {
    id: "postCenteredClassic",
    name: "Post Centered Classic",
    description: "Centered layout classic post",
    component: centeredPostExamples.classic,
    defaultContent: {}
  },
  {
    id: "postCenteredMinimal",
    name: "Post Centered Minimal",
    description: "Centered layout minimal post",
    component: centeredPostExamples.minimal,
    defaultContent: {}
  },
  {
    id: "postCenteredMagazine",
    name: "Post Centered Magazine",
    description: "Centered layout magazine post",
    component: centeredPostExamples.magazine,
    defaultContent: {}
  },
  {
    id: "postCenteredFeatured",
    name: "Post Centered Featured",
    description: "Centered layout featured post",
    component: centeredPostExamples.featured,
    defaultContent: {}
  },
  {
    id: "postCenteredEditorial",
    name: "Post Centered Editorial",
    description: "Centered layout editorial post",
    component: centeredPostExamples.editorial,
    defaultContent: {}
  },
  
  // Split Post templates
  {
    id: "postSplitStandard",
    name: "Post Split Standard",
    description: "Split layout standard post",
    component: splitPostExamples.standard,
    defaultContent: {}
  },
  {
    id: "postSplitAuthor",
    name: "Post Split Author",
    description: "Split layout post with author",
    component: splitPostExamples.author,
    defaultContent: {}
  },
  {
    id: "postSplitMedia",
    name: "Post Split Media",
    description: "Split layout post with media",
    component: splitPostExamples.media,
    defaultContent: {}
  },
  {
    id: "postSplitSidebar",
    name: "Post Split Sidebar",
    description: "Split layout post with sidebar",
    component: splitPostExamples.sidebar,
    defaultContent: {}
  },
  {
    id: "postSplitHero",
    name: "Post Split Hero",
    description: "Split layout post with hero",
    component: splitPostExamples.hero,
    defaultContent: {}
  }
];

