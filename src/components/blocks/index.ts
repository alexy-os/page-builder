import { allBlogTemplates } from "./blog";
import { allHeroTemplates } from "./hero";
// import { allBusinessTemplates } from "./business";
import { allCTATemplates } from "./cta";
import { allFAQTemplates } from "./faq";
import { allFeaturesTemplates } from "./features";
import { allFooterTemplates } from "./footer";
import { allGalleryTemplates } from "./gallery";
import { allPortfolioTemplates } from "./portfolio";
import { allPostTemplates } from "./post";
import { allTeamTemplates } from "./team";
import { allTestimonialTemplates } from "./testimonial";

import type { Template } from "@/types";
 
export const allTemplates: Template[] = [
  ...allHeroTemplates,
  ...allBlogTemplates,
  // ...allBusinessTemplates,
  ...allCTATemplates,
  ...allFAQTemplates,
  ...allFeaturesTemplates,
  ...allFooterTemplates,
  ...allGalleryTemplates,
  ...allPortfolioTemplates,
  ...allPostTemplates,
  ...allTeamTemplates,
  ...allTestimonialTemplates
] as Template[];

export const allComponents = allTemplates.reduce((acc, template) => {
  acc[template.id] = template.component;
  return acc;
}, {} as Record<string, any>);

// Debug helper for development (temporarily enabled for debugging)
/* if (process.env.NODE_ENV === 'development') {
  console.log('📊 Total templates:', allTemplates.length);
  console.log('📦 All component keys:', Object.keys(allComponents));
  
  // Check hero templates specifically
  const heroTemplates = allTemplates.filter(t => t.id.includes('hero') || t.id.includes('Hero'));
  console.log('🦸 Hero templates found:');
  heroTemplates.forEach(t => {
    console.log(`  - ID: "${t.id}" | Name: "${t.name}" | Has Component: ${!!t.component}`);
  });
} */