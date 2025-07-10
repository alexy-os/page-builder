import { Info, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroCenteredSectionProps {
  content: {
    badge?: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

export default function HeroCenteredSection({ content }: HeroCenteredSectionProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col text-center gap-8 items-center">
          {content.badge && (
            <div className="flex justify-center">
              <Badge variant="secondary" className="rounded-full px-4 py-2">
                {content.badge}
              </Badge>
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <h2 className="max-w-2xl text-3xl md:text-4xl lg:text-6xl font-bold text-foreground">
              {content.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {content.description}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Info className="mr-2 h-5 w-5" />
              {content.primaryButtonText}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 h-auto border-border text-foreground hover:bg-muted rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Rocket className="mr-2 h-5 w-5" />
              {content.secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const heroCenteredSectionTemplate = {
  id: "heroCenteredSection",
  name: "Hero Centered Section",
  description: "Centered hero section with badge and buttons",
  component: HeroCenteredSection,
  defaultContent: {
    badge: "Start Now",
    title: "Explore Our BuildY!",
    description: "Simplify your business operations with our cutting-edge solution.",
    primaryButtonText: "Learn More",
    secondaryButtonText: "Get Started"
  }
};