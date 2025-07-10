import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterSectionProps {
  content: {
    returnButtonText: string;
    disclaimer: {
      title: string;
      text: string;
    };
  };
}

export default function FooterSection({ content }: FooterSectionProps) {
  const { returnButtonText, disclaimer } = content;

  return (
    <div className="border-t border-border bg-background defcon-theme-transition">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">
          <Button
            variant="outline"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary/10 border-primary text-primary hover:bg-primary/20 defcon-theme-transition transform hover:scale-105 font-mono text-sm sm:text-base defcon-focus"
          >
            ↑ {returnButtonText}
          </Button>
        </div>
        
        <div className="mt-8 sm:mt-12 bg-destructive/10 border border-destructive rounded-lg p-4 sm:p-6 defcon-theme-transition">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-destructive flex-shrink-0 sm:mt-1" />
            <div>
              <h4 className="text-destructive font-bold mb-2 text-sm sm:text-base">
                {disclaimer.title}
              </h4>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                {disclaimer.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const footerSectionTemplate = {
  id: "defconFooterSection",
  name: "Server Monitoring Footer",
  description: "A footer section with return button and system disclaimer",
  component: FooterSection,
  defaultContent: {
    returnButtonText: "RETURN TO MONITORING DASHBOARD",
    disclaimer: {
      title: "OPERATIONAL DISCLAIMER",
      text: "This monitoring dashboard is for authorized personnel only. Data correlation does not imply causation. Server metrics should be used in conjunction with other monitoring tools. Always verify alerts through multiple channels. 🖥️"
    }
  }
}; 