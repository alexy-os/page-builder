// Import built-in template objects and examples from @ui8kit/blocks library
import { 
  splitHeroTemplates, 
  centeredHeroTemplates,
  splitHeroExamples,
  //centeredHeroExamples,
  CenteredHero, type CenteredHeroData
} from "@ui8kit/blocks";

import { Info, Rocket, Play, ArrowRight, Heart } from "lucide-react";

/**
 * Custom Data for Hero
 */

// 1. Simple centered hero
const CenteredHeroSimpleCustom = () => {
  const content: CenteredHeroData = {
    badge: "Welcome",
    title: "Scale your cloud infrastructure effortlessly",
    description: "Transform how your team deploys and manages cloud resources with our enterprise-grade platform. Built for modern teams that demand scalability, security, and performance.",
    primaryButtonText: "Start Free Trial",
    secondaryButtonText: "Watch Demo",
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: Play
  };

  return (
    <div className="w-full relative">
  {/* Radial Gradient Background */}
  <div
    className="absolute inset-0 z-0 bg-gradient-to-t from-primary/10 to-secondary/10"
  />
    <CenteredHero
      content={content}
      variant="simple"
      useContainer={true}
      className="relative z-10"
      py="2xl"
    />
    </div>
  );
};

// 2. Centered hero with top button
const CenteredHeroWithTopButtonCustom = () => {
  const content: CenteredHeroData = {
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
  };

  return (
    <CenteredHero
      content={content}
      variant="withTopButton"
      useContainer={true}
      py="2xl"
    />
  );
};

// 3. Centered hero with image
const CenteredHeroWithImageCustom = () => {
  const content: CenteredHeroData = {
    title: "Experience the power of visual cloud management",
    description: "Create and manage complex cloud architectures with intuitive visual tools. Our platform provides everything you need to design, deploy, and monitor cloud infrastructure that scales with your business.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cloud management dashboard",
    primaryButtonText: "Start Building",
    secondaryButtonText: "Watch Tutorial"
  };

  return (
    <div className="w-full bg-background dark:bg-secondary/5 relative">
  {/* Bottom Fade Grid Background */}
  <div
    className="absolute inset-0 z-0 
               [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
               dark:[background-image:linear-gradient(to_right,rgba(71,85,105,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(71,85,105,0.4)_1px,transparent_1px)]"
    style={{
      backgroundSize: "20px 30px",
      WebkitMaskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      maskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)"
    }}
  />
    <CenteredHero
      content={content}
      variant="withImage"
      useContainer={true}
      className="relative z-10"
      py="2xl"
    />
</div>
  );
};

// 4. Centered hero with stats
const CenteredHeroWithStatsCustom = () => {
  const content: CenteredHeroData = {
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
  };

  return (
    <CenteredHero
      content={content}
      variant="withStats"
      useContainer={true}
      py="2xl"
    />
  );
};

// 5. Mission-focused centered hero
const CenteredHeroMissionCustom = () => {
  const content: CenteredHeroData = {
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
  };

  return (
    <CenteredHero
      content={content}
      variant="withStats"
      useContainer={true}
      className="bg-gradient-to-t from-indigo-50 to-teal-100 dark:from-indigo-950 dark:to-teal-950"
      py="2xl"
    />
  );
};

// Export all examples
const centeredHeroCustom = {
  simple: CenteredHeroSimpleCustom,
  withTopButton: CenteredHeroWithTopButtonCustom,
  withImage: CenteredHeroWithImageCustom,
  withStats: CenteredHeroWithStatsCustom,
  mission: CenteredHeroMissionCustom
};

// Create template objects using Examples components but Templates metadata
export const allHeroTemplates = [
  ...Object.keys(splitHeroTemplates).map(key => ({
    ...splitHeroTemplates[key as keyof typeof splitHeroTemplates],
    component: splitHeroExamples[key as keyof typeof splitHeroExamples]
  })),
  ...Object.keys(centeredHeroTemplates).map(key => ({
    ...centeredHeroTemplates[key as keyof typeof centeredHeroTemplates], 
    component: centeredHeroCustom[key as keyof typeof centeredHeroCustom]
  })),
  /*...Object.keys(centeredHeroTemplates).map(key => ({
    ...centeredHeroTemplates[key as keyof typeof centeredHeroTemplates], 
    component: centeredHeroExamples[key as keyof typeof centeredHeroExamples]
  }))*/
];