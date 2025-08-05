// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitFAQTemplates, 
  gridFAQTemplates,
  splitFAQExamples,
  gridFAQExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allFAQTemplates = [
  ...Object.keys(splitFAQTemplates).map(key => ({
    ...splitFAQTemplates[key as keyof typeof splitFAQTemplates],
    component: splitFAQExamples[key as keyof typeof splitFAQExamples]
  })),
  ...Object.keys(gridFAQTemplates).map(key => ({
    ...gridFAQTemplates[key as keyof typeof gridFAQTemplates], 
    component: gridFAQExamples[key as keyof typeof gridFAQExamples]
  }))
];

