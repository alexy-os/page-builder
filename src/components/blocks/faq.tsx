// Simplified imports using @ui8kit/blocks library
import { gridFAQExamples, splitFAQExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allFAQTemplates = [
  // Grid FAQ templates
  {
    id: "faqGridCards",
    name: "FAQ Grid Cards",
    description: "Grid layout FAQ with cards",
    component: gridFAQExamples.cards,
    defaultContent: {}
  },
  {
    id: "faqGridAccordion",
    name: "FAQ Grid Accordion",
    description: "Grid layout FAQ with accordion",
    component: gridFAQExamples.accordion,
    defaultContent: {}
  },
  {
    id: "faqGridCategories",
    name: "FAQ Grid Categories",
    description: "Grid layout FAQ with categories",
    component: gridFAQExamples.categories,
    defaultContent: {}
  },
  {
    id: "faqGridCompact",
    name: "FAQ Grid Compact",
    description: "Grid layout compact FAQ",
    component: gridFAQExamples.compact,
    defaultContent: {}
  },
  {
    id: "faqGridSupport",
    name: "FAQ Grid Support",
    description: "Grid layout FAQ for support",
    component: gridFAQExamples.support,
    defaultContent: {}
  },
  
  // Split FAQ templates
  {
    id: "faqSplitContact",
    name: "FAQ Split Contact",
    description: "Split layout FAQ with contact",
    component: splitFAQExamples.contact,
    defaultContent: {}
  },
  {
    id: "faqSplitSearch",
    name: "FAQ Split Search",
    description: "Split layout FAQ with search",
    component: splitFAQExamples.search,
    defaultContent: {}
  },
  {
    id: "faqSplitCategories",
    name: "FAQ Split Categories",
    description: "Split layout FAQ with categories",
    component: splitFAQExamples.categories,
    defaultContent: {}
  },
  {
    id: "faqSplitSupport",
    name: "FAQ Split Support",
    description: "Split layout FAQ for support",
    component: splitFAQExamples.support,
    defaultContent: {}
  },
  {
    id: "faqSplitAccordion",
    name: "FAQ Split Accordion",
    description: "Split layout FAQ with accordion",
    component: splitFAQExamples.accordion,
    defaultContent: {}
  }
];

