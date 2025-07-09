import { Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQContentSectionProps {
  content: {
    badge: string;
    title: string;
    description: string;
    button: {
      text: string;
      variant: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary';
    };
    faqs: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  };
}

export default function FAQContentSection({ content }: FAQContentSectionProps) {
  const { badge, title, description, button, faqs } = content;
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <div>
                <Badge variant="outline" className="text-muted-foreground">{badge}</Badge>
              </div>
              <h4 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground max-w-xl">
                {title}
              </h4>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {description}
              </p>
            </header>
            <Button variant={button.variant} className="gap-4 w-fit">
              {button.text} <Send className="w-4 h-4" />
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
}

export const faqContentSectionTemplate = {
  id: "featuresFAQContentSection",
  name: "FAQ Content Section",
  description: "A section for displaying FAQs",
  component: FAQContentSection,
  defaultContent: {
    badge: "FAQ",
    title: "Why Choose shadcn/ui?",
    description: "Discover the reasons why shadcn/ui is the ideal choice.",
    button: {
      text: "Any questions?",
      variant: "default"
    },
    faqs: [
      {
        id: "faq1",
        question: "What makes shadcn/ui unique?",
        answer: "shadcn/ui leverages Radix UI and Tailwind CSS for accessible components."
      },
      {
        id: "faq2",
        question: "Is shadcn/ui suitable for production?",
        answer: "Yes, it's designed for production with a focus on accessibility."
      }
    ]
  }
};