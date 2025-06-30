import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, type ButtonProps } from "@/components/ui/button";

type Content = {
  badge: string;
  title: string;
  description: string;
  button: {
    text: string;
    variant: ButtonProps["variant"];
    icon: React.ReactNode;
  };
  faqs: {
    id: string;
    question: string;
    answer: string;
  }[];
};

const content: Content = {
  badge: "FAQ",
  title: "Why Choose shadcn/ui?",
  description:
    "Discover the reasons why shadcn/ui is the ideal choice for modern, flexible, and accessible UI components, empowering developers to build faster and smarter.",
  button: {
    text: "Any questions?",
    variant: "default",
    icon: <Send className="w-4 h-4" />
  },
  faqs: [
    {
      id: "faq1",
      question: "What makes shadcn/ui unique?",
      answer:
        "shadcn/ui leverages the power of Radix UI and Tailwind CSS to provide accessible, customizable, and modular components for rapid development.",
    },
    {
      id: "faq2",
      question: "Is shadcn/ui suitable for production?",
      answer:
        "Absolutely. With a focus on accessibility, performance, and customization, shadcn/ui is designed for production-ready applications.",
    },
    {
      id: "faq3",
      question: "How does it integrate with Tailwind CSS?",
      answer:
        "shadcn/ui components come with pre-built Tailwind CSS classes, making customization and theming effortless for developers.",
    },
    {
      id: "faq4",
      question: "Is it open source?",
      answer:
        "Yes! shadcn/ui is completely open source, offering developers the freedom to use and adapt components in any project.",
    },
    {
      id: "faq5",
      question: "What kind of support is available?",
      answer:
        "shadcn/ui has comprehensive documentation and an active community to assist developers with any challenges.",
    },
  ],
} as const;

type FAQContentSectionProps = React.ComponentPropsWithoutRef<"section"> & Partial<Content>

export const FAQContentSection = (props: FAQContentSectionProps) => {
  const { badge, title, description, button, faqs } = {
    ...content,
    ...props
  }

  return (
    <section className="w-full py-16 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <div>
                <Badge variant="outline">{badge}</Badge>
              </div>
              <h4 className="text-3xl md:text-4xl lg:text-6xl font-bold max-w-xl">
                {title}
              </h4>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {description}
              </p>
            </header>
            <Button variant={button.variant} className="gap-4 w-fit">
              {button.text} {button.icon}
            </Button>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(({ id, question, answer }) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="font-bold text-muted-foreground">{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};