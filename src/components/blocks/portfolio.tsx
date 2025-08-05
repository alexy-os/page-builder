// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitPortfolioTemplates, 
  gridPortfolioTemplates,
  splitPortfolioExamples,
  gridPortfolioExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allPortfolioTemplates = [
  ...Object.keys(splitPortfolioTemplates).map(key => ({
    ...splitPortfolioTemplates[key as keyof typeof splitPortfolioTemplates],
    component: splitPortfolioExamples[key as keyof typeof splitPortfolioExamples]
  })),
  ...Object.keys(gridPortfolioTemplates).map(key => ({
    ...gridPortfolioTemplates[key as keyof typeof gridPortfolioTemplates], 
    component: gridPortfolioExamples[key as keyof typeof gridPortfolioExamples]
  }))
];

