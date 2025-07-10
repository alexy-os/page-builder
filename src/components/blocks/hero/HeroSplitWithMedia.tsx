import { Button } from "@/components/ui/button";

interface HeroSplitWithMediaProps {
  content: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    image: {
      src: string;
      alt: string;
      className: string;
    };
  };
}

export default function HeroSplitWithMedia({ content }: HeroSplitWithMediaProps) {
  return (
    <section className="w-full py-16 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col items-start space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {content.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.description}
            </p>
            <div className="flex gap-4">
              <Button variant="default" size="lg">
                {content.primaryButtonText}
              </Button>
              <Button variant="outline" size="lg">
                {content.secondaryButtonText}
              </Button>
            </div>
          </div>
          <div className="aspect-square rounded-lg bg-muted">
            <img src={content.image.src} alt={content.image.alt} className={content.image.className} width={600} height={600} />
          </div>
        </div>
      </div>
    </section>
  );
}

export const heroSplitWithMediaTemplate = {
  id: "heroSplitWithMedia",
  name: "Hero Split With Media",
  description: "Split hero section with media image",
  component: HeroSplitWithMedia,
  defaultContent: {
    title: "Transform Your Workflow",
    description: "Streamline your development process with our powerful tools and components.",
    primaryButtonText: "Try Now",
    secondaryButtonText: "View Demo",
    image: {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      alt: "Split Image",
      className: "w-full h-full object-cover rounded-lg"
    }
  }
};