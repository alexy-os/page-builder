// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitTeamTemplates, 
  gridTeamTemplates,
  splitTeamExamples,
  gridTeamExamples 
} from "@ui8kit/blocks";

// Create template objects using Examples components but Templates metadata
export const allTeamTemplates = [
  ...Object.keys(splitTeamTemplates).map(key => ({
    ...splitTeamTemplates[key as keyof typeof splitTeamTemplates],
    component: splitTeamExamples[key as keyof typeof splitTeamExamples]
  })),
  ...Object.keys(gridTeamTemplates).map(key => ({
    ...gridTeamTemplates[key as keyof typeof gridTeamTemplates], 
    component: gridTeamExamples[key as keyof typeof gridTeamExamples]
  }))
];
