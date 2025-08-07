// CTA content data
import { ArrowRight, Users, Shield, Zap, Play, Rocket, Globe, Heart, Star, Award, ExternalLink, CheckCircle, TrendingUp, Download } from "lucide-react";
import type { CenteredCTAData, SplitCTAData } from "@ui8kit/blocks";

interface CenteredCTADataContent {
  centeredCTASimple: CenteredCTAData,
  centeredCTAWithStats: CenteredCTAData,
  centeredCTAWithLogos: CenteredCTAData,
  centeredCTAWithBackground: CenteredCTAData,
  centeredCTAWithFeatures: CenteredCTAData
}

interface SplitCTADataContent {
  splitCTAWithImage: SplitCTAData,
  splitCTAWithStats: SplitCTAData,
  splitCTAWithBackground: SplitCTAData,
  splitCTAWithFeatures: SplitCTAData,
  splitCTAWithDevices: SplitCTAData
}

export const CenteredCTAContent: CenteredCTADataContent = {
  centeredCTASimple: {
    badge: "New Release",
    title: "Transform Your Business Today",
    description: "Join thousands of companies already using our platform to streamline operations, increase productivity, and drive growth.",
    buttons: [
      {
        id: "get-started",
        text: "Get Started Free",
        variant: "default",
        lucideIcon: ArrowRight
      },
      {
        id: "watch-demo",
        text: "Watch Demo",
        variant: "outline",
        lucideIcon: Play
      }
    ]
  },
  centeredCTAWithLogos: {
    title: "Trusted by Industry Leaders",
    description: "Join the companies that have already transformed their business with our innovative solutions.",
    buttons: [
      {
        id: "start-trial",
        text: "Start Free Trial",
        variant: "default",
        lucideIcon: Rocket
      },
      {
        id: "contact-sales",
        text: "Contact Sales",
        variant: "outline"
      }
    ],
    brands: [
      {
        id: "tech-corp",
        name: "TechCorp",
        lucideIcon: Zap
      },
      {
        id: "global-inc",
        name: "GlobalInc",
        lucideIcon: Globe
      },
      {
        id: "shield-security",
        name: "ShieldSec",
        lucideIcon: Shield
      },
      {
        id: "heart-health",
        name: "HealthCare+",
        lucideIcon: Heart
      },
      {
        id: "star-systems",
        name: "StarSystems",
        lucideIcon: Star
      },
      {
        id: "rocket-labs",
        name: "RocketLabs",
        lucideIcon: Rocket
      }
    ]
  },
  centeredCTAWithBackground: {
    badge: "Limited Time",
    title: "Ready to Scale Your Success?",
    description: "Don't let another opportunity pass by. Start your journey to exponential growth with our proven platform.",
    buttons: [
      {
        id: "claim-offer",
        text: "Claim Your Spot",
        variant: "default",
        lucideIcon: Award
      },
      {
        id: "learn-more",
        text: "Learn More",
        variant: "outline",
        lucideIcon: ExternalLink
      }
    ],
    backgroundImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
    gradient: "bg-gradient-to-br from-primary/50 to-primary/10"
  },
  centeredCTAWithFeatures: {
    title: "Everything You Need to Succeed",
    description: "Our comprehensive platform provides all the tools and features your business needs to thrive in today's competitive market.",
    buttons: [
      {
        id: "explore-features",
        text: "Explore Features",
        variant: "default",
        lucideIcon: Rocket
      },
      {
        id: "get-demo",
        text: "Get Demo",
        variant: "outline",
        lucideIcon: Play
      }
    ],
    features: [
      {
        id: "analytics",
        title: "Advanced Analytics",
        description: "Deep insights into your business performance",
        lucideIcon: TrendingUp
      },
      {
        id: "security",
        title: "Enterprise Security",
        description: "Bank-level security for your data",
        lucideIcon: Shield
      },
      {
        id: "support",
        title: "24/7 Support",
        description: "Round-the-clock expert assistance",
        lucideIcon: Users
      },
      {
        id: "integration",
        title: "Easy Integration",
        description: "Seamless connection with your existing tools",
        lucideIcon: Zap
      },
      {
        id: "scalability",
        title: "Infinite Scalability",
        description: "Grows with your business needs",
        lucideIcon: Rocket
      },
      {
        id: "reliability",
        title: "99.9% Uptime",
        description: "Reliable performance you can count on",
        lucideIcon: CheckCircle
      }
    ]
  },
  centeredCTAWithStats: {
    badge: "Proven Results",
    title: "Join the Success Story",
    description: "See why thousands of businesses choose our platform to accelerate their growth and achieve remarkable results.",
    buttons: [
      {
        id: "join-now",
        text: "Join Now",
        variant: "default",
        lucideIcon: ArrowRight
      },
      {
        id: "view-case-studies",
        text: "View Case Studies",
        variant: "outline",
        lucideIcon: ExternalLink
      }
    ],
    stats: {
      users: "50K+",
      rating: "4.9",
      downloads: "1M+"
    }
  }
};

export const SplitCTAContent: SplitCTADataContent = {

  // Example 1: Split CTA with Image
  splitCTAWithImage: {
    badge: "New Product",
    title: "Revolutionize Your Workflow",
    description: "Experience the next generation of productivity tools designed to streamline your processes and boost team collaboration.",
    buttons: [
      {
        id: "start-free",
        text: "Start Free Trial",
        variant: "default",
        lucideIcon: ArrowRight
      },
      {
        id: "see-demo",
        text: "See Demo",
        variant: "outline",
        lucideIcon: Play
      }
    ],
    image: {
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
      alt: "Team collaboration workspace"
    },
    features: [
      {
        id: "real-time",
        title: "Real-time Collaboration",
        description: "Work together seamlessly",
        lucideIcon: Users
      },
      {
        id: "secure",
        title: "Enterprise Security",
        description: "Your data is always protected",
        lucideIcon: Shield
      },
      {
        id: "fast",
        title: "Lightning Fast",
        description: "Optimized for peak performance",
        lucideIcon: Zap
      }
    ]
  },

  // Example 2: Split CTA with Background
  splitCTAWithBackground: {
    badge: "Premium",
    title: "Unlock Your Full Potential",
    description: "Take your business to the next level with our comprehensive suite of advanced tools and premium features.",
    buttons: [
      {
        id: "upgrade-now",
        text: "Upgrade Now",
        variant: "default",
        lucideIcon: Rocket
      },
      {
        id: "compare-plans",
        text: "Compare Plans",
        variant: "outline",
        lucideIcon: ExternalLink
      }
    ],
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    stats: {
      users: "100K+",
      rating: "4.8",
      downloads: "5M+"
    }
  },

  // Example 3: Split CTA with Statistics
  splitCTAWithStats: {
    title: "Trusted by Thousands Worldwide",
    description: "Join a growing community of successful businesses that have transformed their operations with our proven platform.",
    buttons: [
      {
        id: "get-started",
        text: "Get Started Today",
        variant: "default",
        lucideIcon: ArrowRight
      },
      {
        id: "read-stories",
        text: "Read Success Stories",
        variant: "outline",
        lucideIcon: Award
      }
    ],
    stats: {
      users: "75K+",
      rating: "4.9",
      downloads: "2.5M+"
    }
  },

  // Example 4: Split CTA with Device Stats
  splitCTAWithDevices: {
    badge: "Cross-Platform",
    title: "Access Anywhere, Anytime",
    description: "Our platform works seamlessly across all your devices, ensuring you stay productive whether you're at your desk or on the go.",
    buttons: [
      {
        id: "download-app",
        text: "Download App",
        variant: "default",
        lucideIcon: Download
      },
      {
        id: "web-version",
        text: "Try Web Version",
        variant: "outline",
        lucideIcon: Globe
      }
    ],
    devices: {
      desktop: "85%",
      mobile: "92%",
      tablet: "78%"
    }
  },

  // Example 5: Split CTA with Features
  splitCTAWithFeatures: {
    badge: "Feature Rich",
    title: "Everything You Need in One Place",
    description: "Discover how our comprehensive feature set can transform the way you work and help you achieve better results.",
    buttons: [
      {
        id: "explore-all",
        text: "Explore All Features",
        variant: "default",
        lucideIcon: Rocket
      },
      {
        id: "schedule-demo",
        text: "Schedule Demo",
        variant: "outline",
        lucideIcon: Play
      }
    ],
    features: [
      {
        id: "analytics",
        title: "Advanced Analytics",
        description: "Get deep insights into your performance with comprehensive reporting and real-time dashboards.",
        lucideIcon: TrendingUp
      },
      {
        id: "automation",
        title: "Smart Automation",
        description: "Automate repetitive tasks and workflows to save time and reduce human error.",
        lucideIcon: Zap
      },
      {
        id: "collaboration",
        title: "Team Collaboration",
        description: "Work together efficiently with built-in communication and project management tools.",
        lucideIcon: Users
      },
      {
        id: "security",
        title: "Enterprise Security",
        description: "Protect your data with bank-level encryption and advanced security protocols.",
        lucideIcon: Shield
      }
    ]
  }
};