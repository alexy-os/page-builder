import type { CenteredHeroData, HeroData } from "@ui8kit/blocks";
import { Info, Rocket, Play, ArrowRight, Heart } from "lucide-react";
import { Code, BookOpen, ExternalLink, Shield, Zap } from "lucide-react";

interface CenteredHeroDataContent {
  centeredHeroSimple: CenteredHeroData;
  centeredHeroWithTopButton: CenteredHeroData;
  centeredHeroWithImage: CenteredHeroData;
  centeredHeroWithStats: CenteredHeroData;
  centeredHeroMission: CenteredHeroData;
}

interface SplitHeroDataContent {
  splitHeroMedia: HeroData;
  splitHeroLeftMedia: HeroData;
  splitHeroGallery: HeroData;
  splitHeroWithTopButton: HeroData;
  splitHeroSecurity: HeroData;
}

export const CenteredHeroContent: CenteredHeroDataContent = {
  centeredHeroSimple: {
  badge: "Welcome",
  title: "Scale your cloud infrastructure effortlessly",
  description: "Transform how your team deploys and manages cloud resources with our enterprise-grade platform. Built for modern teams that demand scalability, security, and performance.",
  primaryButtonText: "Start Free Trial",
  secondaryButtonText: "Watch Demo",
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: Play
  },
  centeredHeroWithTopButton: {
    topButton: {
      text: "✨ New: AI-powered cloud optimization is here",
      href: "#"
    },
    badge: "AI-Powered Automation",
    title: "Automate your cloud operations with intelligent AI",
    description: "Discover how artificial intelligence can streamline your cloud workflows, reduce manual overhead, and help your team focus on innovation instead of infrastructure management.",
    primaryButtonText: "Try AI Features",
    secondaryButtonText: "Learn More",
    primaryButtonIcon: Info,
    secondaryButtonIcon: Rocket
  },
  centeredHeroWithImage: {
    title: "Experience the power of visual cloud management",
    description: "Create and manage complex cloud architectures with intuitive visual tools. Our platform provides everything you need to design, deploy, and monitor cloud infrastructure that scales with your business.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cloud management dashboard",
    primaryButtonText: "Start Building",
    secondaryButtonText: "Watch Tutorial"
  },
  centeredHeroWithStats: {
    badge: "Trusted by Enterprises",
    title: "Join millions who trust our cloud platform",
    description: "Our growing community of users worldwide relies on our platform to power their cloud infrastructure. See why companies of all sizes choose us as their trusted cloud partner.",
    stats: [
      {
        id: "1",
        value: "10M+",
        label: "Cloud Instances"
      },
      {
        id: "2",
        value: "150+",
        label: "Countries"
      },
      {
        id: "3",
        value: "99.99%",
        label: "Uptime"
      },
      {
        id: "4",
        value: "24/7",
        label: "Support"
      }
    ],
    primaryButtonText: "Get Started",
    secondaryButtonText: "View Case Studies",
    primaryButtonIcon: ArrowRight
  },
  centeredHeroMission: {
    badge: "Our Mission",
    title: "Building cloud technologies that connect the world",
    description: "We believe cloud technology should bring us together, not divide us. Our mission is to create tools that foster collaboration, innovation, and positive change across global teams and organizations.",
    stats: [
      {
        id: "1",
        value: "500M+",
        label: "API Calls Daily"
      },
      {
        id: "2",
        value: "195",
        label: "Countries Served"
      },
      {
        id: "3",
        value: "1B+",
        label: "Deployments"
      }
    ],
    primaryButtonText: "Join Our Mission",
    secondaryButtonText: "Read Our Story",
    primaryButtonIcon: Heart
  }
};

export const SplitHeroContent: SplitHeroDataContent = {
  splitHeroMedia: {
    badge: "New Release",
    title: "BuildY the future with modern technology",
    description: "Transform your ideas into reality with our cutting-edge platform. Experience unparalleled performance, security, and scalability that grows with your business.",
    image: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern technology dashboard"
    },
    primaryButtonText: "Get Started Free",
    secondaryButtonText: "View Demo",
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: Info
  },
  splitHeroLeftMedia: {
    badge: "Developer Tools",
    title: "Code faster, deploy smarter, scale better",
    description: "Our comprehensive developer platform provides everything you need to build, test, and deploy applications with confidence. Join thousands of developers who trust our tools.",
    image: {
      src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Developer coding environment"
    },
    primaryButtonText: "Start Building",
    secondaryButtonText: "Documentation",
    primaryButtonIcon: Code,
    secondaryButtonIcon: BookOpen
  },
  splitHeroGallery: {
    badge: "Portfolio",
    title: "Showcase your work beautifully",
    description: "Create stunning portfolios and galleries that captivate your audience. Our platform makes it easy to present your work in the best possible light.",
    images: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 1"
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 2"
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 3"
      }
    ],
    primaryButtonText: "Explore Gallery",
    secondaryButtonText: "Learn More",
    primaryButtonIcon: BookOpen,
    secondaryButtonIcon: Code
  },
  splitHeroWithTopButton: {
    topButton: {
      text: "🎉 Announcing our Series A funding",
      href: "#"
    },
    badge: "Funding News",
    title: "We raised $50M to accelerate innovation",
    description: "With this new funding, we're doubling down on our mission to democratize technology and make powerful tools accessible to everyone.",
    images: [
      {
        id: "1",
        src: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 1"
      },
      {
        id: "2",
        src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 2"
      },
      {
        id: "3",
        src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        alt: "Portfolio showcase 3"
      }
    ],
    primaryButtonText: "Read Announcement",
    secondaryButtonText: "Join Journey",
    primaryButtonIcon: ExternalLink,
    secondaryButtonIcon: Rocket
  },
  splitHeroSecurity: {
    badge: "Enterprise Security",
    title: "Protect your business with enterprise-grade security",
    description: "Our comprehensive security suite provides advanced threat protection, compliance management, and peace of mind for businesses of all sizes.",
    image: {
      src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Security dashboard interface"
    },
    primaryButtonText: "Start Audit",
    secondaryButtonText: "View Features",
    primaryButtonIcon: Shield,
    secondaryButtonIcon: Zap
  }
};