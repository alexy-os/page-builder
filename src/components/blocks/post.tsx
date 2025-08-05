// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitPostTemplates, 
  centeredPostTemplates,
  splitPostExamples,
  centeredPostExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allPostTemplates = [
  ...Object.keys(splitPostTemplates).map(key => ({
    ...splitPostTemplates[key as keyof typeof splitPostTemplates],
    component: splitPostExamples[key as keyof typeof splitPostExamples]
  })),
  ...Object.keys(centeredPostTemplates).map(key => ({
    ...centeredPostTemplates[key as keyof typeof centeredPostTemplates], 
    component: centeredPostExamples[key as keyof typeof centeredPostExamples]
  }))
];

