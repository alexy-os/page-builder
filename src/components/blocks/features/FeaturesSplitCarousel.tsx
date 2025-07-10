import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface FeaturesSplitCarouselProps {
  content: {
    badge: string;
    title: string;
    description: string;
    carouselItems: Array<{
      id: string;
      label: string;
    }>;
  };
}

export default function FeaturesSplitCarousel({ content }: FeaturesSplitCarouselProps) {
  const { badge, title, description, carouselItems } = content;
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 items-end lg:grid-cols-2">
          <header className="flex flex-col gap-4 items-start">
            <Badge variant="outline" className="text-muted-foreground rounded-full h-7">
              {badge}
            </Badge>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold max-w-xl text-foreground">
                {title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {description}
              </p>
            </div>
          </header>
          <div className="w-full max-w-full px-4 md:px-6 lg:px-8">
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {carouselItems?.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="flex rounded aspect-video bg-muted items-center justify-center">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export const featuresSplitCarouselTemplate = {
  id: "featuresSplitCarousel",
  name: "Features Split Carousel",
  description: "A split section with a carousel for features",
  component: FeaturesSplitCarousel,
  defaultContent: {
    badge: "Design System",
    title: "Discover Endless Possibilities with Buildy/UI",
    description: "Empower your projects with versatile and innovative solutions.",
    carouselItems: [
      { id: "item1", label: "Possibilities with Buildy/UI" },
      { id: "item2", label: "Shadcn Library Integration" },
      { id: "item3", label: "User-friendly UI/UX" }
    ]
  }
};