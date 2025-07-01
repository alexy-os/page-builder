import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CallToActionCenteredSectionProps {
  content: {
    title: string
    description: string
    primaryButtonText: string
    secondaryButtonText: string
  }
}

export default function CallToActionCenteredSection({ content }: CallToActionCenteredSectionProps) {
  return (
    <section className="w-full py-16 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center rounded-lg bg-accent p-8 md:rounded-xl lg:p-16">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold md:text-4xl text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground lg:text-lg">
              {content.description}
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full sm:w-auto">
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

export const callToActionCenteredSectionTemplate = {
  id: "ctaCallToActionCenteredSection",
  name: "Call To Action Centered Section",
  description: "Centered call to action section with buttons",
  component: CallToActionCenteredSection,
  defaultContent: {
    title: "Unlock Your Business Potential",
    description: "Discover innovative solutions that drive growth, efficiency, and transformative success for your organization.",
    primaryButtonText: "Explore Solutions",
    secondaryButtonText: "Start Your Journey"
  }
}