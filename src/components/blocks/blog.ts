// Simplified imports using @ui8kit/blocks library
import { splitBlogExamples, gridBlogExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allBlogTemplates = [
  // Split Blog templates from @ui8kit/blocks
  {
    id: "splitBlogNews",
    name: "Split Blog News",
    description: "Split layout blog news",
    component: splitBlogExamples.news,
    defaultContent: {}
  },
  {
    id: "splitBlogSlider",
    name: "Split Blog Slider",
    description: "Split layout blog slider",
    component: splitBlogExamples.slider,
    defaultContent: {}
  },
  {
    id: "splitBlogFeatured",
    name: "Split Blog Featured",
    description: "Split layout blog featured",
    component: splitBlogExamples.featured,
    defaultContent: {}
  },
  {
    id: "splitBlogNewsletter",
    name: "Split Blog Newsletter",
    description: "Split layout blog newsletter",
    component: splitBlogExamples.newsletter,
    defaultContent: {}
  },
  {
    id: "splitBlogTimeline",
    name: "Split Blog Timeline",
    description: "Split layout blog timeline",
    component: splitBlogExamples.timeline,
    defaultContent: {}
  },
  {
    id: "gridBlogCards",
    name: "Grid Blog Cards",
    description: "Grid layout blog cards",
    component: gridBlogExamples.cards,
    defaultContent: {}
  },
  {
    id: "gridBlogPostsGrid",
    name: "Grid Blog Posts Grid",
    description: "Grid layout blog posts grid",
    component: gridBlogExamples.postsGrid,
    defaultContent: {}
  },
  {
    id: "gridBlogFiltered",
    name: "Grid Blog Filtered",
    description: "Grid layout blog filtered",
    component: gridBlogExamples.filtered,
    defaultContent: {}
  },
  {
    id: "gridBlogCompact",
    name: "Grid Blog Compact",
    description: "Grid layout blog compact",
    component: gridBlogExamples.compact,
    defaultContent: {}
  },
  {
    id: "gridBlogFeatured",
    name: "Grid Blog Featured",
    description: "Grid layout blog featured",
    component: gridBlogExamples.featured,
    defaultContent: {}
  }
];

