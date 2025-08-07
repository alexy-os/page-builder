// CTA content data
import { ArrowRight, Check, Users, Shield, Zap } from "lucide-react";

interface CenteredCTADataContent {
  centeredCTASimple: any;
  centeredCTAWithStats: any;
  centeredCTAWithLogos: any;
  centeredCTAWithBackground: any;
  centeredCTAWithFeatures: any;
}

interface SplitCTADataContent {
  splitCTAWithImage: any;
  splitCTAWithStats: any;
  splitCTAWithBackground: any;
  splitCTAWithFeatures: any;
  splitCTAWithDevices: any;
}

export const CenteredCTAContent: CenteredCTADataContent = {
  centeredCTASimple: {
    title: "Ready to get started?",
    description: "Join thousands of satisfied customers who trust our platform.",
    buttonText: "Get Started",
    buttonIcon: ArrowRight
  },
  centeredCTAWithStats: {
    badge: "Why Choose Us",
    title: "Join over 10,000+ happy customers",
    description: "Our platform provides all the tools and features you need to grow your business.",
    buttonText: "Start Free Trial",
    buttonIcon: ArrowRight,
    stats: [
      { value: "10k+", label: "Happy Customers" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Support" }
    ]
  },
  centeredCTAWithLogos: {
    title: "Trusted by the world's most innovative teams",
    description: "Join thousands of companies already building with our platform.",
    buttonText: "Get Started",
    buttonIcon: ArrowRight,
    logos: [
      { name: "Company 1", src: "/logos/company1.svg" },
      { name: "Company 2", src: "/logos/company2.svg" },
      { name: "Company 3", src: "/logos/company3.svg" },
      { name: "Company 4", src: "/logos/company4.svg" }
    ]
  },
  centeredCTAWithBackground: {
    title: "Transform your workflow today",
    description: "Everything you need to build amazing products and grow your business.",
    buttonText: "Start Building",
    buttonIcon: ArrowRight,
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  centeredCTAWithFeatures: {
    badge: "Everything Included",
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
  }
};

export const SplitCTAContent: SplitCTADataContent = {
  splitCTAWithImage: {
    badge: "Get Started",
    title: "Ready to transform your business?",
    description: "Join thousands of companies already using our platform to grow their business.",
    buttonText: "Start Free Trial",
    buttonIcon: ArrowRight,
    image: {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Team collaboration"
    }
  },
  splitCTAWithStats: {
    title: "Numbers don't lie",
    description: "See the impact our platform has made on businesses worldwide.",
    buttonText: "View Case Studies",
    buttonIcon: ArrowRight,
    stats: [
      { value: "250%", label: "Revenue Growth" },
      { value: "10M+", label: "Users Served" },
      { value: "99.9%", label: "Uptime" },
      { value: "5 min", label: "Setup Time" }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Analytics dashboard"
    }
  },
  splitCTAWithBackground: {
    title: "Start your journey today",
    description: "Transform the way you work with our powerful platform.",
    buttonText: "Get Started",
    buttonIcon: ArrowRight,
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  splitCTAWithFeatures: {
    badge: "Why Choose Us",
    title: "Everything you need in one place",
    description: "Our platform provides all the tools and features you need to grow your business.",
    buttonText: "Start Free Trial",
    buttonIcon: ArrowRight,
    features: [
      { icon: Check, title: "Easy Setup", description: "Get started in minutes" },
      { icon: Shield, title: "Secure", description: "Bank-level security" },
      { icon: Zap, title: "Fast", description: "Lightning fast performance" },
      { icon: Users, title: "Team Ready", description: "Collaborate with your team" }
    ]
  },
  splitCTAWithDevices: {
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
  }
};