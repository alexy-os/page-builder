// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitTestimonialTemplates, 
  gridTestimonialTemplates,
  splitTestimonialExamples,
  gridTestimonialExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allTestimonialTemplates = [
  ...Object.keys(splitTestimonialTemplates).map(key => ({
    ...splitTestimonialTemplates[key as keyof typeof splitTestimonialTemplates],
    component: splitTestimonialExamples[key as keyof typeof splitTestimonialExamples]
  })),
  ...Object.keys(gridTestimonialTemplates).map(key => ({
    ...gridTestimonialTemplates[key as keyof typeof gridTestimonialTemplates], 
    component: gridTestimonialExamples[key as keyof typeof gridTestimonialExamples]
  }))
];
