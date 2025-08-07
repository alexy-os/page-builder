// Business blocks templates using our custom components
import { GridBusiness, SplitBusiness } from "./business/blocks";
import type { Template } from "@/types";

// GridBusiness Templates
const GridBusinessCardsGallery = (props: any) => (
  <GridBusiness 
    variant="cardsGallery" 
    templateId="gridBusinessCardsGallery"
    {...props} 
  />
);

const GridBusinessSolutionsGrid = (props: any) => (
  <GridBusiness 
    variant="solutionsGrid" 
    templateId="gridBusinessSolutionsGrid"
    {...props} 
  />
);

const GridBusinessPricing = (props: any) => (
  <GridBusiness 
    variant="pricing" 
    templateId="gridBusinessPricing"
    {...props} 
  />
);

const GridBusinessPricingYear = (props: any) => (
  <GridBusiness 
    variant="pricingYear" 
    templateId="gridBusinessPricingYear"
    {...props} 
  />
);

const GridBusinessCareer = (props: any) => (
  <GridBusiness 
    variant="career" 
    templateId="gridBusinessCareer"
    {...props} 
  />
);

// SplitBusiness Templates
const SplitBusinessSolutions = (props: any) => (
  <SplitBusiness 
    variant="solutions" 
    templateId="splitBusinessSolutions"
    {...props} 
  />
);

const SplitBusinessMetrics = (props: any) => (
  <SplitBusiness 
    variant="metrics" 
    templateId="splitBusinessMetrics"
    {...props} 
  />
);

const SplitBusinessTestimonial = (props: any) => (
  <SplitBusiness 
    variant="testimonial" 
    templateId="splitBusinessTestimonial"
    {...props} 
  />
);

const SplitBusinessFeatures = (props: any) => (
  <SplitBusiness 
    variant="features" 
    templateId="splitBusinessFeatures"
    {...props} 
  />
);

const SplitBusinessAbout = (props: any) => (
  <SplitBusiness 
    variant="about" 
    templateId="splitBusinessAbout"
    {...props} 
  />
);

// Template definitions
export const allBusinessTemplates: Template[] = [
  // Grid Business Templates
  {
    id: "gridBusinessCardsGallery",
    name: "Business Cards Gallery",
    description: "Grid layout showcasing business services with icons and descriptions",
    component: GridBusinessCardsGallery
  },
  {
    id: "gridBusinessSolutionsGrid",
    name: "Business Solutions Grid",
    description: "Grid layout for business solutions with stats and images",
    component: GridBusinessSolutionsGrid
  },
  {
    id: "gridBusinessPricing",
    name: "Business Pricing Plans",
    description: "Grid layout for pricing plans with features and buttons",
    component: GridBusinessPricing
  },
  {
    id: "gridBusinessPricingYear",
    name: "Business Pricing with Annual Toggle",
    description: "Pricing plans with yearly billing options",
    component: GridBusinessPricingYear
  },
  {
    id: "gridBusinessCareer",
    name: "Business Career Openings",
    description: "Grid layout for job listings and career opportunities",
    component: GridBusinessCareer
  },
  
  // Split Business Templates  
  {
    id: "splitBusinessSolutions",
    name: "Business Solutions Split",
    description: "Split layout showcasing business solutions with metrics",
    component: SplitBusinessSolutions
  },
  {
    id: "splitBusinessMetrics",
    name: "Business Metrics Split", 
    description: "Split layout highlighting business achievements and statistics",
    component: SplitBusinessMetrics
  },
  {
    id: "splitBusinessTestimonial",
    name: "Business Testimonial Split",
    description: "Split layout featuring customer testimonials and success stories",
    component: SplitBusinessTestimonial
  },
  {
    id: "splitBusinessFeatures",
    name: "Business Features Split",
    description: "Split layout showcasing platform features and capabilities",
    component: SplitBusinessFeatures
  },
  {
    id: "splitBusinessAbout",
    name: "Business About Split",
    description: "Split layout for company story and values",
    component: SplitBusinessAbout
  }
];

