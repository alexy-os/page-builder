// Simplified imports using @ui8kit/blocks library
import { splitTeamExamples, gridTeamExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allTeamTemplates = [
  // Split Team templates
  {
    id: "teamSplitLeadership",
    name: "Team Split Leadership",
    description: "Split layout team leadership",
    component: splitTeamExamples.leadership,
    defaultContent: {}
  },
  {
    id: "teamSplitShowcase",
    name: "Team Split Showcase",
    description: "Split layout team showcase",
    component: splitTeamExamples.showcase,
    defaultContent: {}
  },
  {
    id: "teamSplitHiring",
    name: "Team Split Hiring",
    description: "Split layout team hiring",
    component: splitTeamExamples.hiring,
    defaultContent: {}
  },
  {
    id: "teamSplitCulture",
    name: "Team Split Culture",
    description: "Split layout team culture",
    component: splitTeamExamples.culture,
    defaultContent: {}
  },
  {
    id: "teamSplitDepartments",
    name: "Team Split Departments",
    description: "Split layout team departments",
    component: splitTeamExamples.departments,
    defaultContent: {}
  },
  
  // Grid Team templates
  {
    id: "teamGridGrid",
    name: "Team Grid Grid",
    description: "Grid layout team grid",
    component: gridTeamExamples.grid,
    defaultContent: {}
  },
  {
    id: "teamGridCards",
    name: "Team Grid Cards",
    description: "Grid layout team cards",
    component: gridTeamExamples.cards,
    defaultContent: {}
  },
  {
    id: "teamGridMinimal",
    name: "Team Grid Minimal",
    description: "Grid layout minimal team",
    component: gridTeamExamples.minimal,
    defaultContent: {}
  },
  {
    id: "teamGridShowcase",
    name: "Team Grid Showcase",
    description: "Grid layout team showcase",
    component: gridTeamExamples.showcase,
    defaultContent: {}
  },
  {
    id: "teamGridDirectory",
    name: "Team Grid Directory",
    description: "Grid layout team directory",
    component: gridTeamExamples.directory,
    defaultContent: {}
  }
];
