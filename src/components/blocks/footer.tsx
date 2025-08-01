// Simplified imports using @ui8kit/blocks library
import { splitFooterExamples, gridFooterExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allFooterTemplates = [
  // Split Footer templates
  {
    id: "footerSplitBrand",
    name: "Footer Split Brand",
    description: "Split layout footer with brand focus",
    component: splitFooterExamples.brand,
    defaultContent: {}
  },
  {
    id: "footerSplitNewsletter",
    name: "Footer Split Newsletter",
    description: "Split layout footer with newsletter signup",
    component: splitFooterExamples.newsletter,
    defaultContent: {}
  },
  {
    id: "footerSplitContact",
    name: "Footer Split Contact",
    description: "Split layout footer with contact info",
    component: splitFooterExamples.contact,
    defaultContent: {}
  },
  {
    id: "footerSplitSocial",
    name: "Footer Split Social",
    description: "Split layout footer with social links",
    component: splitFooterExamples.social,
    defaultContent: {}
  },
  {
    id: "footerSplitMinimal",
    name: "Footer Split Minimal",
    description: "Split layout minimal footer",
    component: splitFooterExamples.minimal,
    defaultContent: {}
  },
  
  // Grid Footer templates
  {
    id: "footerGridColumns",
    name: "Footer Grid Columns",
    description: "Grid layout footer with columns",
    component: gridFooterExamples.columns,
    defaultContent: {}
  },
  {
    id: "footerGridMega",
    name: "Footer Grid Mega",
    description: "Grid layout mega footer",
    component: gridFooterExamples.mega,
    defaultContent: {}
  },
  {
    id: "footerGridCompact",
    name: "Footer Grid Compact",
    description: "Grid layout compact footer",
    component: gridFooterExamples.compact,
    defaultContent: {}
  },
  {
    id: "footerGridNewsletter",
    name: "Footer Grid Newsletter",
    description: "Grid layout footer with newsletter",
    component: gridFooterExamples.newsletter,
    defaultContent: {}
  },
  {
    id: "footerGridSitemap",
    name: "Footer Grid Sitemap",
    description: "Grid layout footer with sitemap",
    component: gridFooterExamples.sitemap,
    defaultContent: {}
  }
];
