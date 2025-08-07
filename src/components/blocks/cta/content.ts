// CTA content data
import { ArrowRight, Check, Star, Users, Shield, Zap } from "lucide-react";

export const sampleCTANewsletterData = {
  badge: "Stay Updated",
  title: "Get the latest updates",
  description: "Subscribe to our newsletter and be the first to know about new features, updates, and exclusive content.",
  buttonText: "Subscribe Now",
  buttonIcon: ArrowRight,
  placeholder: "Enter your email",
  features: [
    "Weekly newsletters",
    "Exclusive content",
    "No spam guaranteed"
  ]
};

export const sampleCTASimpleData = {
  title: "Ready to get started?",
  description: "Join thousands of satisfied customers who trust our platform.",
  buttonText: "Get Started",
  buttonIcon: ArrowRight,
  buttonVariant: "default" as const
};

export const sampleCTAWithFeaturesData = {
  badge: "Why Choose Us",
  title: "Everything you need to succeed",
  description: "Our platform provides all the tools and features you need to grow your business.",
  buttonText: "Start Free Trial",
  buttonIcon: ArrowRight,
  features: [
    { icon: Check, title: "Easy Setup", description: "Get started in minutes" },
    { icon: Shield, title: "Secure", description: "Bank-level security" },
    { icon: Zap, title: "Fast", description: "Lightning fast performance" },
    { icon: Users, title: "Team Ready", description: "Collaborate with your team" }
  ]
};

export const sampleCTATestimonialData = {
  badge: "Testimonials",
  title: "Join thousands of happy customers",
  description: "See what our customers are saying about us.",
  buttonText: "Start Your Journey",
  buttonIcon: ArrowRight,
  testimonial: {
    content: "This platform has completely transformed how we work. The results speak for themselves.",
    author: "Sarah Johnson",
    role: "CEO, TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5
  },
  stats: [
    { value: "10k+", label: "Happy Customers" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ]
};

export const sampleCTAAppDownloadData = {
  badge: "Download App",
  title: "Take us with you",
  description: "Download our mobile app and access your account anywhere, anytime.",
  buttonText: "Download Now",
  buttonIcon: ArrowRight,
  appStores: [
    { name: "App Store", icon: "🍎", url: "#" },
    { name: "Google Play", icon: "🤖", url: "#" }
  ],
  image: {
    src: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Mobile app preview"
  }
};

export const sampleCTAContactData = {
  badge: "Contact Us",
  title: "Let's work together",
  description: "Ready to take your project to the next level? Get in touch with our team.",
  buttonText: "Contact Us",
  buttonIcon: ArrowRight,
  contactInfo: [
    { label: "Email", value: "hello@company.com", icon: "📧" },
    { label: "Phone", value: "+1 (555) 123-4567", icon: "📞" },
    { label: "Address", value: "123 Business St, City, State 12345", icon: "📍" }
  ]
};