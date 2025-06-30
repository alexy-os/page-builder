import { Check } from "lucide-react";

interface FeaturesThreeColumnsProps {
  content: {
    title: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

export default function FeaturesThreeColumns({ content }: FeaturesThreeColumnsProps) {
  const { title, description, features } = content;
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-left mb-12">{description}</p>
        </div>
        <div className="flex gap-10 pt-12 flex-col w-full">
          <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
            {features?.map((feature) => (
              <div key={feature.id} className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const featuresThreeColumnsTemplate = {
  id: "featuresThreeColumns",
  name: "Features Three Columns",
  description: "A three-column layout for displaying features",
  component: FeaturesThreeColumns,
  defaultContent: {
    title: 'Effortless Prototyping and Flexible UI Development',
    description: 'Simplify your business with our intuitive and customizable UI components.',
    features: [
      { id: 'feature-1', title: 'Modular Design', description: 'Create custom layouts using our grid system and responsive classes.' },
      { id: 'feature-2', title: 'Theming Flexibility', description: 'Easily customize colors, fonts, and spacing to match your brand identity.' },
      { id: 'feature-3', title: 'Component Library', description: 'Access a comprehensive set of pre-built UI components for rapid development.' },
      { id: 'feature-4', title: 'Dark Mode Support', description: 'Provide users with comfortable viewing options through built-in dark mode functionality.' },
      { id: 'feature-5', title: 'Accessibility', description: 'Ensure inclusivity with semantic HTML and ARIA attributes for all components.' },
      { id: 'feature-6', title: 'Performance Optimization', description: 'Leverage Tailwind CSS for efficient rendering and reduced bundle size.' }
    ]
  }
};