// Simplified imports using @ui8kit/blocks library
import { gridPortfolioExamples, splitPortfolioExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allPortfolioTemplates = [
  // Grid Portfolio templates
  {
    id: "portfolioGridCards",
    name: "Portfolio Grid Cards",
    description: "Grid layout portfolio with cards",
    component: gridPortfolioExamples.cards,
    defaultContent: {}
  },
  {
    id: "portfolioGridMasonry",
    name: "Portfolio Grid Masonry",
    description: "Grid layout masonry portfolio",
    component: gridPortfolioExamples.masonry,
    defaultContent: {}
  },
  {
    id: "portfolioGridMinimal",
    name: "Portfolio Grid Minimal",
    description: "Grid layout minimal portfolio",
    component: gridPortfolioExamples.minimal,
    defaultContent: {}
  },
  {
    id: "portfolioGridDetailed",
    name: "Portfolio Grid Detailed",
    description: "Grid layout detailed portfolio",
    component: gridPortfolioExamples.detailed,
    defaultContent: {}
  },
  {
    id: "portfolioGridShowcase",
    name: "Portfolio Grid Showcase",
    description: "Grid layout portfolio showcase",
    component: gridPortfolioExamples.showcase,
    defaultContent: {}
  },
  
  // Split Portfolio templates
  {
    id: "portfolioSplitShowcase",
    name: "Portfolio Split Showcase",
    description: "Split layout portfolio showcase",
    component: splitPortfolioExamples.showcase,
    defaultContent: {}
  },
  {
    id: "portfolioSplitAbout",
    name: "Portfolio Split About",
    description: "Split layout portfolio about",
    component: splitPortfolioExamples.about,
    defaultContent: {}
  },
  {
    id: "portfolioSplitSkills",
    name: "Portfolio Split Skills",
    description: "Split layout portfolio skills",
    component: splitPortfolioExamples.skills,
    defaultContent: {}
  },
  {
    id: "portfolioSplitTestimonial",
    name: "Portfolio Split Testimonial",
    description: "Split layout portfolio testimonial",
    component: splitPortfolioExamples.testimonial,
    defaultContent: {}
  },
  {
    id: "portfolioSplitProcess",
    name: "Portfolio Split Process",
    description: "Split layout portfolio process",
    component: splitPortfolioExamples.process,
    defaultContent: {}
  }
];

