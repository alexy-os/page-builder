import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Content = {
  promo: string;
  title: string;
  description: string;
  cards: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    className: string;
  }[];
};

const content: Content = {
  promo: "BuildY/UI Design",
  title: "Inspiring Innovation in Marketing & Design",
  description:
    "Craft intuitive and engaging interfaces with Buildy/UI. Streamline workflows and empower your brand with cutting-edge solutions.",
  cards: [
    {
      id: "card1",
      title: "Innovate Your Brand",
      description:
        "Transform your brand with modern design principles that resonate with your audience.",
      icon: <Bookmark />,
      className: "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto",
    },
    {
      id: "card2",
      title: "Bookmark-Centric Design",
      description:
        "Deliver intuitive experiences that prioritize user needs and usability.",
      icon: <BookmarkCheck />,
      className: "aspect-square",
    },
    {
      id: "card3",
      title: "Strategic Branding",
      description:
        "Ensure consistency and elevate your brand identity across platforms.",
      icon: <BookmarkCheck />,
      className: "aspect-square",
    },
    {
      id: "card4",
      title: "Seamless Aesthetics",
      description:
        "Integrate cohesive, modern design components effortlessly.",
      icon: <Bookmark />,
      className: "aspect-square",
    },
    {
      id: "card5",
      title: "Radix UI Foundation",
      description:
        "Leverage Radix UI for accessible and robust componentry.",
      icon: <BookmarkCheck />,
      className: "aspect-square",
    },
    {
      id: "card6",
      title: "Tailwind Utility",
      description:
        "Achieve rapid prototyping with Tailwind CSS's utility-first approach.",
      icon: <Bookmark />,
      className: "aspect-square",
    },
    {
      id: "card7",
      title: "Effortless Prototyping",
      description:
        "Experience flexible and responsive development with pre-built components.",
      icon: <BookmarkCheck />,
      className: "aspect-square",
    },
    {
      id: "card8",
      title: "Open Source Excellence",
      description:
        "Access open source components for personal or commercial projects.",
      icon: <Bookmark />,
      className: "lg:col-span-2 aspect-square lg:aspect-auto",
    },
  ],
} as const;

type BusinessCardsGalleryProps = React.ComponentPropsWithoutRef<"section"> & Partial<Content>;

export const BusinessCardsGallery = (props: BusinessCardsGalleryProps) => {
  const { promo, title, description, cards } = {
    ...content,
    ...props
  };

  return (
  <section className="w-full py-16 lg:py-32">
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 items-start">
          <Badge variant="outline" className="rounded-full h-7">
            {promo}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cards?.map((card) => (
            <div
              key={card.id}
              className={`bg-muted rounded-md p-6 flex flex-col justify-between ${card.className}`}
            >
              {card.icon}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-base max-w-xs">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
};