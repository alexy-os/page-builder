import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPostsGridSectionProps {
  content: {
    tagline: string;
    title: string;
    description: string;
    button: {
      name: string;
      variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
      icon: React.ReactNode;
    };
    posts: Array<{
      title: string;
      summary: string;
      label: string;
      author: string;
      published: string;
      href: string;
      image: string;
    }>;
  };
}

export default function BlogPostsGridSection({ content }: BlogPostsGridSectionProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-16 text-center text-foreground">
        <header className="max-w-2xl mx-auto flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {content.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {content.title}
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            {content.description}
          </p>
          <Button variant={content.button.variant} className="gap-2 self-center bg-primary text-primary-foreground hover:bg-primary/90">
            {content.button.name} {content.button.icon}
          </Button>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.posts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="flex flex-col rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 bg-card"
            >
              <img
                src={post.image}
                alt={post.title}
                className="aspect-video object-cover"
              />
              <div className="flex flex-col gap-4 p-6 text-start text-foreground">
                <h3 className="text-lg font-semibold lg:text-xl">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {post.summary}
                </p>
                <p className="flex items-center text-sm font-medium text-primary hover:underline">
                  Read more <ArrowRight className="ml-2 w-4 h-4" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const blogPostsGridSectionTemplate = {
  id: "blogPostsGridSection",
  name: "Blog Posts Grid Section",
  description: "Display blog posts in a grid layout",
  component: BlogPostsGridSection,
  defaultContent: {
    tagline: "Explore Insights",
    title: "Latest Blog Posts",
    description: "Stay updated with the latest trends, tips, and best practices in UI/UX design. Explore how Buildy/UI empowers developers and businesses alike.",
    button: {
      name: "All Posts",
      variant: "link",
      icon: <ArrowRight className="w-4 h-4" />
    },
    posts: [
      {
        title: "The Power of Atomic Design in Modern UI/UX",
        summary: "Discover how atomic design principles can help you create consistent and scalable user interfaces for any application.",
        label: "Design Systems",
        author: "Jane Doe",
        published: "1 Jan 2025",
        href: "#",
        image: "https://placehold.co/600x400?text=Atomic+Design"
      },
      {
        title: "Why Tailwind CSS is a Game Changer for Developers",
        summary: "Learn how utility-first CSS frameworks like Tailwind CSS streamline development without compromising on design.",
        label: "CSS Frameworks",
        author: "John Smith",
        published: "15 Jan 2025",
        href: "#",
        image: "https://placehold.co/600x400?text=Tailwind+CSS"
      },
      {
        title: "Building Accessible Components with shadcn/ui",
        summary: "Explore the accessibility-first approach of shadcn/ui and how it ensures inclusivity for all users.",
        label: "Accessibility",
        author: "Alex Johnson",
        published: "22 Jan 2025",
        href: "#",
        image: "https://placehold.co/600x400?text=shadcn/ui"
      }
    ]
  }
};