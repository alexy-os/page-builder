import { BookOpen, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TelekomSplitWithGalleryProps {
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

export default function TelekomSplitWithGallery({ content }: TelekomSplitWithGalleryProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-chart-5/10">
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
              <Button variant="default" size="lg" className="items-center gap-2 bg-gradient-primary text-primary-foreground dark:text-white h-12 min-w-48">
                {content.primaryButtonText} <BookOpen />
              </Button>
              <Button variant="outline" size="lg" className="items-center gap-2 border-border text-foreground">
                {content.secondaryButtonText} <Github />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {content.images.grid.items.map((image) => (
              <div key={image.id} className={image.className}>
                <img src={image.src} alt={image.id} className="w-full h-full object-cover rounded-md"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export const telekomSplitWithGalleryTemplate = {
  id: "telekomSplitWithGallery",
  name: "Telekom Split With Gallery",
  description: "Split telekom section with gallery images",
  component: TelekomSplitWithGallery,
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
          { id: "image1", src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=300&fit=crop", className: "bg-muted rounded-md aspect-square" },
          { id: "image2", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=600&fit=crop", className: "bg-muted rounded-md row-span-2" },
          { id: "image3", src: "https://placehold.co/600x600", className: "bg-muted rounded-md aspect-square" }
        ]
      }
    }
  }
};