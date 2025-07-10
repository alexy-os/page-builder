import { Bookmark, Star, Shield, Zap, Users, Target } from "lucide-react";

const iconMap = {
  Star,
  Bookmark,
  Shield,
  Zap,
  Users,
  Target,
} as const;

interface BusinessSolutionsGridProps {
  content: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: keyof typeof iconMap;
    }>;
  };
}

export default function BusinessSolutionsGrid({ content }: BusinessSolutionsGridProps) {
  const { title, description, items } = content;
  
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{title}</h2>
        <p className="text-muted-foreground mb-8">{description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items?.map((item) => {
            const IconComponent = iconMap[item.icon];
            return (
              <div key={item.title} className="bg-card p-6 rounded-md border border-border hover:shadow-lg transition-all">
                {IconComponent && <IconComponent className="h-8 w-8 text-primary mb-4" />}
                <h3 className="text-xl font-semibold text-card-foreground mt-4">{item.title}</h3>
                <p className="text-muted-foreground mt-2">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const businessSolutionsGridTemplate = {
  id: "businessSolutionsGrid",
  name: "Business Solutions Grid",
  description: "A grid for displaying business solutions",
  component: BusinessSolutionsGrid,
  defaultContent: {
    title: "Our Solutions",
    description: "Explore our range of business solutions.",
    items: [
      { title: "Digital Strategy", description: "Comprehensive digital transformation solutions", icon: "Target" },
      { title: "Team Building", description: "Expert team management and development", icon: "Users" },
      { title: "Security Solutions", description: "Advanced cybersecurity protection", icon: "Shield" },
      { title: "Performance Boost", description: "Optimize your business performance", icon: "Zap" },
      { title: "Premium Support", description: "24/7 premium customer support", icon: "Star" },
      { title: "Resource Planning", description: "Strategic resource allocation", icon: "Bookmark" }
    ]
  }
};