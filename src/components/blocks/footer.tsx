// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitFooterTemplates, 
  gridFooterTemplates,
  splitFooterExamples,
  gridFooterExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allFooterTemplates = [
  ...Object.keys(splitFooterTemplates).map(key => ({
    ...splitFooterTemplates[key as keyof typeof splitFooterTemplates],
    component: splitFooterExamples[key as keyof typeof splitFooterExamples]
  })),
  ...Object.keys(gridFooterTemplates).map(key => ({
    ...gridFooterTemplates[key as keyof typeof gridFooterTemplates], 
    component: gridFooterExamples[key as keyof typeof gridFooterExamples]
  }))
];
