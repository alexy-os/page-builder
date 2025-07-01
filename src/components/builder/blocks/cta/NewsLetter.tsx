import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

interface NewsLetterProps {
  content: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export default function NewsLetter({ content }: NewsLetterProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h3 className="text-center text-4xl md:text-5xl font-bold text-foreground">
          {content.title}
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          {content.description}
        </p>

        <form className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2 bg-accent p-4 rounded-lg">
          <Input placeholder="yourmail@website.com" className="bg-secondary" />
          <Button variant="default" className="bg-primary text-primary-foreground">
            {content.buttonText} <ArrowRight />
          </Button>
        </form>
      </div>
    </section>
  );
}

export const newsLetterTemplate = {
  id: "ctaNewsLetter",
  name: "News Letter",
  description: "Newsletter subscription section",
  component: NewsLetter,
  defaultContent: {
    title: "Keep up to date with all new products",
    description: "No spam. Only novelties and service improvement",
    buttonText: "Subscribe"
  }
};