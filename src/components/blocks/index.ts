import { allBlogTemplates } from "./blog";
import { allHeroTemplates } from "./hero";
 
export const allTemplates = [
  ...allHeroTemplates,
  ...allBlogTemplates
];

export const allComponents = allTemplates.reduce((acc, template) => {
  acc[template.id] = template.component;
  return acc;
}, {} as Record<string, any>);