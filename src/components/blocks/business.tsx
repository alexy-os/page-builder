// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitBusinessTemplates, 
  gridBusinessTemplates,
  splitBusinessExamples,
  gridBusinessExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allBusinessTemplates = [
  ...Object.keys(splitBusinessTemplates).map(key => ({
    ...splitBusinessTemplates[key as keyof typeof splitBusinessTemplates],
    component: splitBusinessExamples[key as keyof typeof splitBusinessExamples]
  })),
  ...Object.keys(gridBusinessTemplates).map(key => ({
    ...gridBusinessTemplates[key as keyof typeof gridBusinessTemplates], 
    component: gridBusinessExamples[key as keyof typeof gridBusinessExamples]
  }))
];

