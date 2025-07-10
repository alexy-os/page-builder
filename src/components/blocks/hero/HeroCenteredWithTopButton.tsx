import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroCenteredWithTopButtonProps {
  content: {
    topButtonText: string;
    title: string;
    description: string;
    mainButtonText: string;
  };
}

export default function HeroCenteredWithTopButton({ content }: HeroCenteredWithTopButtonProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          <Button variant="outline" size="sm" className="text-sm">
            {content.topButtonText} <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
          
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
            {content.title}
          </h1>
          
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            {content.description}
          </p>
          
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            {content.mainButtonText} <CheckCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export const heroCenteredWithTopButtonTemplate = {
  id: "heroCenteredWithTopButton",
  name: "Hero Centered With Top Button",
  description: "Centered hero section with a top button",
  component: HeroCenteredWithTopButton,
  defaultContent: {
    topButtonText: "New Feature",
    title: "Discover the Power of BuildY",
    description: "Our platform is designed to enhance your productivity and streamline your workflows.",
    mainButtonText: "Start Building"
  }
};