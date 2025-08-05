// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitBlogTemplates, 
  gridBlogTemplates,
  splitBlogExamples,
  gridBlogExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allBlogTemplates = [
  ...Object.keys(splitBlogTemplates).map(key => ({
    ...splitBlogTemplates[key as keyof typeof splitBlogTemplates],
    component: splitBlogExamples[key as keyof typeof splitBlogExamples]
  })),
  ...Object.keys(gridBlogTemplates).map(key => ({
    ...gridBlogTemplates[key as keyof typeof gridBlogTemplates], 
    component: gridBlogExamples[key as keyof typeof gridBlogExamples]
  }))
];