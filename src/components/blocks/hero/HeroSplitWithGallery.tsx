import { BookOpen, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroSplitWithGalleryProps {
  content: {
    badge?: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    images: {
      grid: {
        className: string;
        items: Array<{
          id: string;
          src: string;
          className: string;
        }>;
      };
    };
  };
}

export default function HeroSplitWithGallery({ content }: HeroSplitWithGalleryProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="flex gap-4 flex-col">
            {content.badge && (
              <div className="flex justify-center">
                <Badge variant="outline" className="text-sm font-medium text-foreground">
                  {content.badge}
                </Badge>
              </div>
            )}
            <div className="flex gap-4 flex-col">
              <h2 className="max-w-2xl text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                {content.title}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl">
                {content.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="default" size="lg" className="items-center gap-2 bg-primary text-primary-foreground">
                {content.primaryButtonText} <BookOpen />
              </Button>
              <Button variant="outline" size="lg" className="items-center gap-2 border-border text-foreground">
                {content.secondaryButtonText} <Github />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {content.images.grid.items.map((image, index) => (
              <div key={image.id} className={image.className}>
                <img 
                  src={image.src} 
                  alt={image.id} 
                  className="w-full h-auto max-w-[300px] object-cover rounded-md" 
                  decoding="async" 
                  loading={index < 2 ? "eager" : "lazy"}
                  width={300} 
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 300px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const heroSplitWithGalleryTemplate = {
  id: "heroSplitWithGallery",
  name: "Hero Split With Gallery",
  description: "Split hero section with gallery images",
  component: HeroSplitWithGallery,
  defaultContent: {
    badge: "We're building",
    title: "Build with shadcn ui components",
    description: "Beautifully designed components built with Radix UI and Tailwind CSS.",
    primaryButtonText: "Documentation",
    secondaryButtonText: "GitHub",
    images: {
      grid: {
        className: "grid grid-cols-2 gap-8",
        items: [
          { id: "image1", src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300&q=60", className: "bg-muted rounded-md aspect-square" },
          { id: "image2", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=600&q=60", className: "bg-muted rounded-md row-span-2" },
          { id: "image3", src: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300&q=60", className: "bg-muted rounded-md aspect-square" }
        ]
      }
    }
  }
};