import { allBlogTemplates } from "./blog";
import { allHeroTemplates } from "./hero";
import { allBusinessTemplates } from "./business";
import { allCTATemplates } from "./cta";
import { allFAQTemplates } from "./faq";
import { allFeaturesTemplates } from "./features";
import { allFooterTemplates } from "./footer";
import { allGalleryTemplates } from "./gallery";
import { allPortfolioTemplates } from "./portfolio";
import { allPostTemplates } from "./post";
import { allTeamTemplates } from "./team";
import { allTestimonialTemplates } from "./testimonial";
 
export const allTemplates = [
  ...allHeroTemplates,
  ...allBlogTemplates,
  ...allBusinessTemplates,
  ...allCTATemplates,
  ...allFAQTemplates,
  ...allFeaturesTemplates,
  ...allFooterTemplates,
  ...allGalleryTemplates,
  ...allPortfolioTemplates,
  ...allPostTemplates,
  ...allTeamTemplates,
  ...allTestimonialTemplates
];

export const allComponents = allTemplates.reduce((acc, template) => {
  acc[template.id] = template.component;
  return acc;
}, {} as Record<string, any>);