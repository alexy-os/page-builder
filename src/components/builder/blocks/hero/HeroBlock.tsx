import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroBlockProps {
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundImage: string;
  };
  isPreview?: boolean;
}

export default function HeroBlock({ content, isPreview = false }: HeroBlockProps) {
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${content.backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {content.title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="text-lg px-8 py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {content.buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="text-lg px-8 py-6 h-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-lg backdrop-blur-sm"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      {!isPreview && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}
    </section>
  );
}

export const heroTemplate = {
  id: "hero",
  name: "Hero Section",
  description: "Eye-catching header with CTA",
  component: HeroBlock,
  defaultContent: {
    title: "Build Something Amazing",
    subtitle: "Create stunning landing pages with our professional page builder",
    buttonText: "Get Started",
    backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop"
  }
};
