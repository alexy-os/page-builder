import { Info, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroCenterBlockProps {
  content: {
    badge?: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  isPreview?: boolean;
}

export default function HeroCenterBlock({ content }: HeroCenterBlockProps) {
  return (
    <section className="w-full py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col text-center gap-8 items-center">
          {content.badge && (
            <div className="flex justify-center">
              <Badge variant="secondary" className="rounded-full px-4 py-2">
                {content.badge}
              </Badge>
            </div>
          )}
          
          <div className="flex flex-col gap-6">
            <h1 className="max-w-4xl text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {content.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {content.description}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

export const heroCenterTemplate = {
  id: "heroCenter",
  name: "Hero Center",
  description: "Centered hero section with badge and buttons",
  component: HeroCenterBlock,
  defaultContent: {
    badge: "Start Now",
    title: "Explore Our BuildY!",
    description: "Simplify your business operations with our cutting-edge solution. Say goodbye to time-consuming manual processes and hello to efficient, streamlined management.",
    primaryButtonText: "Learn More",
    secondaryButtonText: "Get Started"
  }
};