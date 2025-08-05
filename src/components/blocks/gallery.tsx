// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitGalleryTemplates, 
  gridGalleryTemplates,
  splitGalleryExamples,
  gridGalleryExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allGalleryTemplates = [
  ...Object.keys(splitGalleryTemplates).map(key => ({
    ...splitGalleryTemplates[key as keyof typeof splitGalleryTemplates],
    component: splitGalleryExamples[key as keyof typeof splitGalleryExamples]
  })),
  ...Object.keys(gridGalleryTemplates).map(key => ({
    ...gridGalleryTemplates[key as keyof typeof gridGalleryTemplates], 
    component: gridGalleryExamples[key as keyof typeof gridGalleryExamples]
  }))
];

