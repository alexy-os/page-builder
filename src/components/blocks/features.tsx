// Simplified imports using @ui8kit/blocks library
import { splitFeaturesExamples, gridFeaturesExamples } from "@ui8kit/blocks";

// Simplified template structure using @ui8kit/blocks
export const allFeaturesTemplates = [
  // Split Features templates
  {
    id: "featuresSplitMedia",
    name: "Features Split Media",
    description: "Split layout features with media",
    component: splitFeaturesExamples.media,
    defaultContent: {}
  },
  {
    id: "featuresSplitLeftMedia",
    name: "Features Split Left Media",
    description: "Split layout features with left media",
    component: splitFeaturesExamples.leftMedia,
    defaultContent: {}
  },
  {
    id: "featuresSplitAnalytics",
    name: "Features Split Analytics",
    description: "Split layout features for analytics",
    component: splitFeaturesExamples.analytics,
    defaultContent: {}
  },
  {
    id: "featuresSplitSecurity",
    name: "Features Split Security",
    description: "Split layout features for security",
    component: splitFeaturesExamples.security,
    defaultContent: {}
  },
  {
    id: "featuresSplitPerformance",
    name: "Features Split Performance",
    description: "Split layout features for performance",
    component: splitFeaturesExamples.performance,
    defaultContent: {}
  },
  
  // Grid Features templates
  {
    id: "featuresGridThreeColumns",
    name: "Features Grid Three Columns",
    description: "Grid layout features in three columns",
    component: gridFeaturesExamples.threeColumns,
    defaultContent: {}
  },
  {
    id: "featuresGridThreeColumnsIcons",
    name: "Features Grid Three Columns Icons",
    description: "Grid layout features with icons",
    component: gridFeaturesExamples.threeColumnsIcons,
    defaultContent: {}
  },
  {
    id: "featuresGridMediaCards",
    name: "Features Grid Media Cards",
    description: "Grid layout features with media cards",
    component: gridFeaturesExamples.mediaCards,
    defaultContent: {}
  },
  {
    id: "featuresGridCareerPositions",
    name: "Features Grid Career Positions",
    description: "Grid layout features for career positions",
    component: gridFeaturesExamples.careerPositions,
    defaultContent: {}
  },
  {
    id: "featuresGridCareerStats",
    name: "Features Grid Career Stats",
    description: "Grid layout features with career stats",
    component: gridFeaturesExamples.careerStats,
    defaultContent: {}
  }
];
