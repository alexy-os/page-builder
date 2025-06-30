import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface BlogArticlesColumnsCardsProps {
  content: {
    title: string;
    description: string;
    articles: Array<{
      category: string;
      author: {
        name: string;
        avatar: string;
      };
      headline: string;
      description: string;
      className: string;
    }>;
  };
}

export default function BlogArticlesColumnsCards({ content }: BlogArticlesColumnsCardsProps) {
  return (
    <section className="w-full py-8 lg:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-8">
        <header className="flex flex-col gap-2 text-foreground">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold max-w-xl">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {content.description}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {content.articles.map((article, index) => (
            <article
              key={index}
              className={`flex flex-col gap-4 hover:opacity-75 cursor-pointer ${article.className} bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="bg-muted rounded-md aspect-video"></div>
              <div className="flex flex-row gap-4 items-center text-muted-foreground">
                <Badge variant="secondary">{article.category}</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span>By</span>
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={article.author.avatar} />
                    <AvatarFallback>
                      {article.author.name[0] + article.author.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="max-w-3xl text-2xl md:text-4xl tracking-tight text-foreground">
                  {article.headline}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const blogArticlesColumnsCardsTemplate = {
  id: "blogArticlesColumnsCards",
  name: "Blog Articles Columns Cards",
  description: "Display blog articles in columns with cards",
  component: BlogArticlesColumnsCards,
  defaultContent: {
    title: "Latest Articles",
    description: "Exploring the Future of Web Design Trends.",
    articles: [
      {
        category: "News",
        author: {
          name: "John Johnsen",
          avatar: "https://github.com/shadcn.png"
        },
        headline: "Streamline Your Business with Buildy/UI",
        description: "Simplify your operations and improve productivity with modern tools designed for SMBs.",
        className: "md:col-span-2"
      },
      {
        category: "News",
        author: {
          name: "John Johnsen",
          avatar: "https://github.com/shadcn.png"
        },
        headline: "Enhance Supplier Management",
        description: "Discover efficient methods to manage supplier relationships and invoices.",
        className: ""
      },
      {
        category: "News",
        author: {
          name: "John Johnsen",
          avatar: "https://github.com/shadcn.png"
        },
        headline: "Boost Your Marketing with Buildy/UI",
        description: "Learn how to leverage our design system to create impactful marketing strategies.",
        className: ""
      }
    ]
  }
};