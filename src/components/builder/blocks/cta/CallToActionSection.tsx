import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CallToActionSectionProps {
  content: {
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
  }
}

export default function CallToActionSection({ content }: CallToActionSectionProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid w-full rounded-lg bg-accent p-8 md:rounded-xl lg:grid-cols-2 lg:items-center lg:p-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold md:text-4xl text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground lg:text-lg">
              {content.description}
            </p>
          </div>
          
          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:justify-end">
            <Button variant="outline" className="w-full sm:w-auto border-border text-foreground">
              {content.primaryButtonText} <ArrowRight />
            </Button>
            <Button variant="default" className="w-full sm:w-auto bg-primary text-primary-foreground">
              {content.secondaryButtonText} <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export const callToActionSectionTemplate = {
  id: "ctaCallToActionSection",
  name: "Call To Action Section",
  description: "Call to action section with buttons",
  component: CallToActionSection,
  defaultContent: {
    title: "Transform Your Business Today",
    description: "Unlock powerful solutions that drive growth, efficiency, and innovation for your organization.",
    primaryButtonText: "Explore Solutions",
    secondaryButtonText: "Start Your Journey"
  }
}