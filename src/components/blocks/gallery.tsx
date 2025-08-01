// Simplified imports using @ui8kit/blocks library
import { splitGalleryExamples, gridGalleryExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allGalleryTemplates = [
  // Split Gallery templates
  {
    id: "gallerySplitShowcase",
    name: "Gallery Split Showcase",
    description: "Split layout gallery showcase",
    component: splitGalleryExamples.showcase,
    defaultContent: {}
  },
  {
    id: "gallerySplitPortfolio",
    name: "Gallery Split Portfolio",
    description: "Split layout gallery portfolio",
    component: splitGalleryExamples.portfolio,
    defaultContent: {}
  },
  
  // Grid Gallery templates
  {
    id: "galleryGridGrid",
    name: "Gallery Grid Grid",
    description: "Grid layout gallery",
    component: gridGalleryExamples.grid,
    defaultContent: {}
  },
  {
    id: "galleryGridMasonry",
    name: "Gallery Grid Masonry",
    description: "Grid layout masonry gallery",
    component: gridGalleryExamples.masonry,
    defaultContent: {}
  },
  {
    id: "galleryGridCarousel",
    name: "Gallery Grid Carousel",
    description: "Grid layout carousel gallery",
    component: gridGalleryExamples.carousel,
    defaultContent: {}
  },
  {
    id: "galleryGridMosaic",
    name: "Gallery Grid Mosaic",
    description: "Grid layout mosaic gallery",
    component: gridGalleryExamples.mosaic,
    defaultContent: {}
  },
  {
    id: "galleryGridMinimal",
    name: "Gallery Grid Minimal",
    description: "Grid layout minimal gallery",
    component: gridGalleryExamples.minimal,
    defaultContent: {}
  },
  {
    id: "galleryGridCards",
    name: "Gallery Grid Cards",
    description: "Grid layout cards gallery",
    component: gridGalleryExamples.cards,
    defaultContent: {}
  },
  {
    id: "galleryGridPolaroid",
    name: "Gallery Grid Polaroid",
    description: "Grid layout polaroid gallery",
    component: gridGalleryExamples.polaroid,
    defaultContent: {}
  },
  {
    id: "galleryGridMagazine",
    name: "Gallery Grid Magazine",
    description: "Grid layout magazine gallery",
    component: gridGalleryExamples.magazine,
    defaultContent: {}
  }
];

