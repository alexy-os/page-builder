// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitCTATemplates, 
  centeredCTATemplates,
  splitCTAExamples,
  centeredCTAExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allCTATemplates = [
  ...Object.keys(splitCTATemplates).map(key => ({
    ...splitCTATemplates[key as keyof typeof splitCTATemplates],
    component: splitCTAExamples[key as keyof typeof splitCTAExamples]
  })),
  ...Object.keys(centeredCTATemplates).map(key => ({
    ...centeredCTATemplates[key as keyof typeof centeredCTATemplates], 
    component: centeredCTAExamples[key as keyof typeof centeredCTAExamples]
  }))
];

