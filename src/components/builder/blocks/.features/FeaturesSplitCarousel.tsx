import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Content = {
  badge: string;
  title: string;
  description: string;
  carouselItems: { id: string; label: string }[];
};

const content: Content = {
  badge: "Design System",
  title: "Discover Endless Possibilities with Buildy/UI",
  description:
    "Empower your projects with versatile and innovative solutions. Streamline your business operations with our user-friendly design system.",
  carouselItems: [
    { id: "item1", label: "Possibilities with Buildy/UI" },
    { id: "item2", label: "Shadcn Library Integration" },
    { id: "item3", label: "User-friendly UI/UX" },
    { id: "item4", label: "Dark Mode Support Default" },
    { id: "item5", label: "Innovate Your Brand!" },
  ],
} as const;

type FeaturesSplitCarouselProps = React.ComponentPropsWithoutRef<"section"> & Partial<Content>;

export const FeaturesSplitCarousel = (props: FeaturesSplitCarouselProps) => {
  const { badge, title, description, carouselItems } = {
    ...content,
    ...props
  };

  return (
    <section className="w-full py-16 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        <header className="flex flex-col gap-4 items-start">
          <Badge variant="outline" className="rounded-full h-7">
            {badge}
          </Badge>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold max-w-xl">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>
        </header>
        <div className="w-full max-w-full px-4 md:px-6 lg:px-8">
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            >
            <CarouselContent>
              {carouselItems?.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="flex rounded aspect-video bg-muted items-center justify-center">
                    <span className="text-sm">{item.label}</span>
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
};