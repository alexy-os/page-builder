import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesBlockProps {
  content: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
}

export default function FeaturesBlock({ content }: FeaturesBlockProps) {
  
  return (
    <section className="py-20 px-6 bg-accent/25">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature: Feature, index: number) => (
            <Card 
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border border-border bg-card hover:bg-card/80 hover:scale-105 rounded-lg"
            >
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export const featuresBlockTemplate = {
  id: "featuresFeaturesBlock",
  name: "Features Grid",
  description: "Showcase key features",
  component: FeaturesBlock,
  defaultContent: {
    title: "Powerful Features",
    subtitle: "Everything you need to build amazing landing pages",
    features: [
      {
        icon: "🚀",
        title: "Fast Performance",
        description: "Lightning-fast loading times with optimized code"
      },
      {
        icon: "🎨",
        title: "Beautiful Design",
        description: "Professional templates and customizable themes"
      },
      {
        icon: "📱",
        title: "Mobile Ready",
        description: "Fully responsive design that works on all devices"
      }
    ]
  }
};
