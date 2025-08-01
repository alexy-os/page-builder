// Simplified imports using @ui8kit/blocks library
import { splitTestimonialExamples, gridTestimonialExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allTestimonialTemplates = [
  // Split Testimonial templates
  {
    id: "testimonialSplitFeatured",
    name: "Testimonial Split Featured",
    description: "Split layout featured testimonial",
    component: splitTestimonialExamples.featured,
    defaultContent: {}
  },
  {
    id: "testimonialSplitCarousel",
    name: "Testimonial Split Carousel",
    description: "Split layout testimonial carousel",
    component: splitTestimonialExamples.carousel,
    defaultContent: {}
  },
  {
    id: "testimonialSplitStats",
    name: "Testimonial Split Stats",
    description: "Split layout testimonial with stats",
    component: splitTestimonialExamples.stats,
    defaultContent: {}
  },
  
  // Grid Testimonial templates
  {
    id: "testimonialGridGrid",
    name: "Testimonial Grid Grid",
    description: "Grid layout testimonial grid",
    component: gridTestimonialExamples.grid,
    defaultContent: {}
  },
  {
    id: "testimonialGridMasonry",
    name: "Testimonial Grid Masonry",
    description: "Grid layout masonry testimonials",
    component: gridTestimonialExamples.masonry,
    defaultContent: {}
  },
  {
    id: "testimonialGridMinimal",
    name: "Testimonial Grid Minimal",
    description: "Grid layout minimal testimonials",
    component: gridTestimonialExamples.minimal,
    defaultContent: {}
  },
  {
    id: "testimonialGridCards",
    name: "Testimonial Grid Cards",
    description: "Grid layout testimonial cards",
    component: gridTestimonialExamples.cards,
    defaultContent: {}
  },
  {
    id: "testimonialGridCompact",
    name: "Testimonial Grid Compact",
    description: "Grid layout compact testimonials",
    component: gridTestimonialExamples.compact,
    defaultContent: {}
  },
  {
    id: "testimonialGridSlider",
    name: "Testimonial Grid Slider",
    description: "Grid layout testimonial slider",
    component: gridTestimonialExamples.slider,
    defaultContent: {}
  },
  {
    id: "testimonialGridMagazine",
    name: "Testimonial Grid Magazine",
    description: "Grid layout magazine testimonials",
    component: gridTestimonialExamples.magazine,
    defaultContent: {}
  }
];
