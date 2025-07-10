import { Bookmark, Star } from "lucide-react";

interface BusinessSolutionsGridProps {
  content: {
    title: string;
    description: string;
    items: Array<{
      title: string;
      description: string;
      icon: React.ReactNode;
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
          {items?.map((item) => (
            <div key={item.title} className="bg-card p-6 rounded-md border border-border hover:shadow-lg transition-all">
              {item.icon}
              <h3 className="text-xl font-semibold text-card-foreground mt-4">{item.title}</h3>
              <p className="text-muted-foreground mt-2">{item.description}</p>
            </div>
          ))}
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
      { title: "Solution 1", description: "Description here", icon: <Star /> },
      { title: "Solution 2", description: "Description here", icon: <Bookmark /> }
    ]
  }
};