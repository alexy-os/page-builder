import { ArrowRight } from "lucide-react";

interface DesignSystemWebinarsProps {
  content: {
    title: string;
    webinars: Array<{
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

export default function DesignSystemWebinars({ content }: DesignSystemWebinarsProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col gap-12 text-center text-foreground">
        <header className="text-center py-8 lg:py-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {content.title}
          </h2>
        </header>
        <div className="grid gap-8 sm:grid-cols-12 lg:gap-10">
          {content.webinars.map((webinar, index) => (
            <a
              key={index}
              href={webinar.href}
              className="group grid gap-y-4 sm:grid-cols-10 sm:gap-x-6 lg:gap-x-8 sm:col-span-12 bg-card border border-border rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="sm:col-span-5 flex flex-col gap-4 justify-center p-6 text-start text-foreground">
                <div className="text-xs uppercase tracking-wider text-muted-foreground flex gap-4">
                  <span>{webinar.label}</span>
                  <span>{webinar.author}</span>
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold">
                  {webinar.title}
                </h3>
                <p className="text-sm text-muted-foreground">{webinar.summary}</p>
                <div className="flex items-center gap-2 text-primary font-medium hover:underline">
                  <span>Read more</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              <div className="sm:col-span-5">
                <div className="aspect-video overflow-hidden rounded-lg border border-border">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    width={560}
                    height={315}
                    className="object-cover w-full h-auto max-w-[560px] transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const designSystemWebinarsTemplate = {
  id: "businessDesignSystemWebinars",
  name: "Design System Webinars",
  description: "Display webinars related to the design system",
  component: DesignSystemWebinars,
  defaultContent: {
    title: "Discover Our Design System",
    webinars: [
      {
        title: "Introduction to Buildy/UI: A Modern Design System",
        summary: "Learn how Buildy/UI empowers developers and designers to create efficient, accessible, and beautiful interfaces effortlessly.",
        label: "UI/UX Insights",
        author: "Alex Dev",
        published: "10 Feb 2025",
        href: "#",
        image: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=315&q=80"
      },
      {
        title: "Advanced Prototyping with Buildy/UI",
        summary: "Explore advanced techniques for rapid prototyping and collaboration using our modular component library.",
        label: "Prototyping Techniques",
        author: "Jordan Smith",
        published: "15 Feb 2025",
        href: "#",
        image: "https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&h=315&q=80"
      }
    ]
  }
};