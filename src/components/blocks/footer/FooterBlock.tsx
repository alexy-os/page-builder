import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  title: string;
  url: string;
}

interface FooterBlockProps {
  content: {
    companyName: string;
    description: string;
    social?: SocialLink[];
    links?: FooterLink[];
    copyright?: string;
  };
}

export default function FooterBlock({ content }: FooterBlockProps) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">{content.companyName}</h3>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              {content.description}
            </p>
            <div className="flex gap-4">
              {content.social?.map((social: SocialLink, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer">
                    <span className="text-sm font-medium">
                      {social.platform[0].toUpperCase()}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-card-foreground">Quick Links</h4>
            <div className="space-y-2">
              {content.links?.map((link: FooterLink, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-card-foreground">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>hello@pagecraft.com</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 {content.companyName}. {content.copyright || 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const footerTemplate = {
  id: "footer",
  name: "Footer",
  description: "Complete footer with links and info",
  component: FooterBlock,
  defaultContent: {
    companyName: "BuildY",
    description: "Professional page builder for modern websites",
    links: [
      { title: "Product", url: "#" },
      { title: "Features", url: "#" },
      { title: "Pricing", url: "#" },
      { title: "Support", url: "#" }
    ],
    social: [
      { platform: "Twitter", url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "GitHub", url: "#" }
    ],
    copyright: "All rights reserved."
  }
};
