import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Linkedin, Send, Twitter, Volleyball } from "lucide-react"

interface FooterSocialButtonsProps {
  content: {
    brand: string;
    description: string;
    placeholder: string;
    quickLinks: Array<{ label: string; href: string }>;
    contact: {
      address: string;
      city: string;
      phone: string;
      email: string;
    };
    socialMedia: Array<{ label: string }>;
    legal: Array<{ label: string; href: string }>;
    copyright: string;
  };
}

export default function FooterSocialButtons({ content }: FooterSocialButtonsProps) {
  return (
    <footer className="w-full py-4 lg:py-8 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 text-2xl font-bold text-foreground">
              <Volleyball className="mr-1 h-8 w-8 inline-block" /> {content.brand}
            </div>
            <p className="mb-6 text-muted-foreground">{content.description}</p>
            <div className="flex">
              <Input type="email" placeholder={content.placeholder} className="bg-secondary" />
              <Button variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2 text-muted-foreground">
              {content.quickLinks.map((link, index) => (
                <a key={index} href={link.href} className="block hover:text-primary">{link.label}</a>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Us</h3>
            <address className="not-italic space-y-2 text-muted-foreground">
              <p>{content.contact.address}</p>
              <p>{content.contact.city}</p>
              <p>Phone: {content.contact.phone}</p>
              <p>Email: {content.contact.email}</p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Follow Us</h3>
            <div className="flex space-x-2">
              {content.socialMedia.map((social, index) => (
                <Button key={index} variant="outline" size="icon" className="border-border">
                  {social.label === 'Facebook' && <Facebook className="h-4 w-4" />}
                  {social.label === 'Twitter' && <Twitter className="h-4 w-4" />}
                  {social.label === 'Instagram' && <Instagram className="h-4 w-4" />}
                  {social.label === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center border-border">
          <div className="flex flex-col items-center justify-between md:flex-row md:items-center text-muted-foreground">
            <p>{content.copyright}</p>
            <nav className="flex gap-4">
              {content.legal.map((item, index) => (
                <a key={index} href={item.href} className="hover:text-primary">{item.label}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const footerSocialButtonsTemplate = {
  id: "footerSocialButtons",
  name: "Footer Social Buttons",
  description: "Footer with social buttons and contact info",
  component: FooterSocialButtons,
  defaultContent: {
    brand: "BuildY/UI",
    description: "Easily build your website with our UI components",
    placeholder: "Your email",
    quickLinks: [
      { label: 'Home', href: '#' },
      { label: 'About Us', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Contact', href: '#' }
    ],
    contact: {
      address: "1st BuildY Street",
      city: "Shadcn City, BC 34567, Radix",
      phone: "(123) 456-7890",
      email: "welcome@buildy.co"
    },
    socialMedia: [
      { label: 'Facebook' },
      { label: 'Twitter' },
      { label: 'Instagram' },
      { label: 'LinkedIn' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Settings', href: '#' }
    ],
    copyright: "© 2025 BuildY/UI. All rights reserved"
  }
};