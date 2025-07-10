import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkCheck, Star, Shield, Zap, Users, Target, Heart } from "lucide-react";

const iconMap = {
  Bookmark,
  BookmarkCheck,
  Star,
  Shield,
  Zap,
  Users,
  Target,
  Heart,
} as const;

interface BusinessCardsGalleryProps {
  content: {
    promo: string;
    title: string;
    description: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      icon: keyof typeof iconMap;
      className: string;
    }>;
  };
}

export default function BusinessCardsGallery({ content }: BusinessCardsGalleryProps) {
  const { promo, title, description, cards } = content;
  
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 items-start">
            <Badge variant="outline" className="rounded-full h-7">
              {promo}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {cards?.map((card) => {
              const IconComponent = iconMap[card.icon];
              return (
                <div
                  key={card.id}
                  className={`bg-card rounded-md p-6 flex flex-col justify-between ${card.className} hover:shadow-lg transition-all duration-300 border border-border`}
                >
                  {IconComponent && <IconComponent className="h-8 w-8 text-primary mb-4" />}
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold tracking-tight text-card-foreground">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground text-base max-w-xs">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export const businessCardsGalleryTemplate = {
  id: "businessCardsGallery",
  name: "Business Cards Gallery",
  description: "A gallery of business cards for showcasing features",
  component: BusinessCardsGallery,
  defaultContent: {
    promo: "BuildY/UI Design",
    title: "Inspiring Innovation in Marketing & Design",
    description: "Craft intuitive and engaging interfaces with Buildy/UI. Streamline workflows and empower your brand with cutting-edge solutions.",
    cards: [
      {
        id: "card1",
        title: "Innovate Your Brand",
        description: "Transform your brand with modern design principles that resonate with your audience.",
        icon: "Bookmark",
        className: "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto"
      },
      {
        id: "card2",
        title: "Bookmark-Centric Design",
        description: "Deliver intuitive experiences that prioritize user needs and usability.",
        icon: "BookmarkCheck",
        className: "aspect-square"
      },
      {
        id: "card3",
        title: "Strategic Branding",
        description: "Ensure consistency and elevate your brand identity across platforms.",
        icon: "Target",
        className: "aspect-square"
      },
      {
        id: "card4",
        title: "Seamless Aesthetics",
        description: "Integrate cohesive, modern design components effortlessly.",
        icon: "Star",
        className: "aspect-square"
      },
      {
        id: "card5",
        title: "Security Foundation",
        description: "Leverage secure and robust componentry for your applications.",
        icon: "Shield",
        className: "aspect-square"
      },
      {
        id: "card6",
        title: "Performance Boost",
        description: "Achieve rapid development with optimized utility-first approach.",
        icon: "Zap",
        className: "aspect-square"
      },
      {
        id: "card7",
        title: "Team Collaboration",
        description: "Experience flexible and responsive development with your team.",
        icon: "Users",
        className: "aspect-square"
      },
      {
        id: "card8",
        title: "Open Source Excellence",
        description: "Access open source components for personal or commercial projects.",
        icon: "Heart",
        className: "lg:col-span-2 aspect-square lg:aspect-auto"
      }
    ]
  }
};