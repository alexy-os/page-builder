import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogCardsSectionProps {
  content: {
    title: string;
    button?: {
      text?: string;
    };
    articles: Array<{
      title: string;
      description: string;
      imageAlt: string;
    }>;
  };
}

export default function BlogCardsSection({ content }: BlogCardsSectionProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8 text-foreground">
        <header className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold">
            {content.title}
          </h2>
          {content.button && (
            <Button className="gap-4 bg-primary text-primary-foreground hover:bg-primary/90">
              {content.button.text} <MoveRight className="w-4 h-4" />
            </Button>
          )}
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.articles.map((article, index) => (
            <article key={index} className="flex flex-col gap-4 hover:opacity-75 cursor-pointer bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
              <div 
                className="bg-muted rounded-md aspect-video mb-4"
                role="img"
                aria-label={article.imageAlt}
              ></div>
              <h3 className="text-xl tracking-tight text-foreground">{article.title}</h3>
              <p className="text-muted-foreground text-base">{article.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const blogCardsSectionTemplate = {
  id: "blogCardsSection",
  name: "Blog Cards Section",
  description: "Display blog articles in card format",
  component: BlogCardsSection,
  defaultContent: {
    title: "Latest articles",
    button: {
      text: "View all articles"
    },
    articles: [
      {
        title: "Exploring the Future of Web Design",
        description: "Discover how emerging technologies are reshaping the digital landscape.",
        imageAlt: "Future of Web Design"
      },
      {
        title: "10 Essential UI Design Trends for 2025",
        description: "Stay ahead of the curve with these cutting-edge design principles.",
        imageAlt: "UI Design Trends"
      },
      {
        title: "Mastering React: Advanced Techniques for Building Scalable Apps",
        description: "Learn how to optimize your React applications for better performance and maintainability.",
        imageAlt: "React Advanced Techniques"
      }
    ]
  }
};