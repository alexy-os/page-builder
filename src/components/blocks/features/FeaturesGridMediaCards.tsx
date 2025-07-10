import { Badge } from "@/components/ui/badge";

interface FeaturesGridMediaCardsProps {
  content: {
    badge: string;
    title: string;
    description: string;
    features: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
}

export default function FeaturesGridMediaCards({ content }: FeaturesGridMediaCardsProps) {
  const { badge, title, description, features } = content;
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge variant="outline" className="text-muted-foreground">{badge}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold max-w-xl text-foreground text-left">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl text-left">
                {description}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features?.map((feature) => (
              <div key={feature.id} className="flex flex-col gap-2 bg-card border border-border hover:shadow-lg transition-all rounded-md p-6">
                <div className="bg-muted rounded-md aspect-video mb-2"></div>
                <h3 className="text-xl font-semibold text-card-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const featuresGridMediaCardsTemplate = {
  id: "featuresGridMediaCards",
  name: "Features Grid Media Cards",
  description: "A grid for displaying features with media cards",
  component: FeaturesGridMediaCards,
  defaultContent: {
    badge: "Marketing & Design",
    title: "Innovate Your Brand!",
    description: "Crafting remarkable experiences in UI/UX for your business.",
    features: [
      {
        id: "uiux1",
        title: "User-Centric Design",
        description: "Deliver intuitive and engaging interfaces that resonate with your target audience."
      },
      {
        id: "marketing1",
        title: "Strategic Branding",
        description: "Elevate your brand identity and ensure a consistent message across all platforms."
      },
      {
        id: "shadcn1",
        title: "Shadcn Library Integration",
        description: "Seamlessly blend components for a cohesive and modern design aesthetic."
      }
    ]
  }
};