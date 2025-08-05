// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitFeaturesTemplates, 
  gridFeaturesTemplates,
  splitFeaturesExamples,
  gridFeaturesExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allFeaturesTemplates = [
  ...Object.keys(splitFeaturesTemplates).map(key => ({
    ...splitFeaturesTemplates[key as keyof typeof splitFeaturesTemplates],
    component: splitFeaturesExamples[key as keyof typeof splitFeaturesExamples]
  })),
  ...Object.keys(gridFeaturesTemplates).map(key => ({
    ...gridFeaturesTemplates[key as keyof typeof gridFeaturesTemplates], 
    component: gridFeaturesExamples[key as keyof typeof gridFeaturesExamples]
  }))
];
