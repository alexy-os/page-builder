// Features content data (derived from agreed examples; content/design unchanged)
import {
  Shield,
  Users,
  BarChart,
  Globe,
  ZoomIn,
  Code,
  Database,
  Cloud,
  Lock,
  Smartphone,
  Briefcase,
  GraduationCap,
  Heart,
  Check,
  ArrowRight,
  Rocket
} from "lucide-react";
import type { GridFeaturesData, FeaturesData } from "@ui8kit/blocks";

interface GridFeaturesDataContent {
  gridFeaturesThreeColumns: GridFeaturesData,
  gridFeaturesThreeColumnsIcons: GridFeaturesData,
  gridFeaturesMediaCards: GridFeaturesData,
  gridFeaturesCareerPositions: GridFeaturesData,
  gridFeaturesCareerStats: GridFeaturesData
}

interface SplitFeaturesDataContent {
  splitFeaturesMedia: FeaturesData,
  splitFeaturesFeatures: FeaturesData,
  splitFeaturesAnalytics: FeaturesData,
  splitFeaturesSecurity: FeaturesData,
  splitFeaturesPerformance: FeaturesData
}

export const GridFeaturesContent: GridFeaturesDataContent = {
  gridFeaturesThreeColumns: {
    badge: "Features",
    title: "Everything you need to succeed",
    description:
      "Our comprehensive platform provides all the essential tools and features to help you build, deploy, and scale your applications with confidence.",
    items: [
      { id: "1", title: "Easy Integration", description: "Connect with your existing tools and workflows seamlessly. Our API-first approach ensures compatibility with your current tech stack." },
      { id: "2", title: "Real-time Collaboration", description: "Work together with your team in real-time. Share projects, leave comments, and track changes with our collaborative features." },
      { id: "3", title: "Advanced Security", description: "Enterprise-grade security with end-to-end encryption, SSO integration, and compliance with industry standards." },
      { id: "4", title: "Scalable Infrastructure", description: "Auto-scaling infrastructure that grows with your business. Handle traffic spikes without missing a beat." },
      { id: "5", title: "24/7 Support", description: "Get help when you need it with our round-the-clock support team and comprehensive documentation." },
      { id: "6", title: "Analytics & Insights", description: "Make data-driven decisions with detailed analytics and reporting tools that provide actionable insights." }
    ]
  },
  gridFeaturesThreeColumnsIcons: {
    badge: "Platform",
    title: "Built for developers, designed for scale",
    description:
      "Experience the power of our developer-first platform with tools and features that streamline your workflow and accelerate development.",
    items: [
      { id: "1", title: "Developer Experience", description: "Intuitive APIs, comprehensive SDKs, and excellent documentation to get you up and running quickly.", lucideIcon: Code },
      { id: "2", title: "Database Management", description: "Powerful database tools with automated backups, scaling, and performance optimization built-in.", lucideIcon: Database },
      { id: "3", title: "Cloud Infrastructure", description: "Reliable cloud infrastructure with global deployment, auto-scaling, and 99.99% uptime guarantee.", lucideIcon: Cloud },
      { id: "4", title: "Security First", description: "Enterprise-grade security with encryption, access controls, and compliance certifications.", lucideIcon: Lock },
      { id: "5", title: "Mobile Ready", description: "Build responsive applications that work seamlessly across all devices and platforms.", lucideIcon: Smartphone },
      { id: "6", title: "Performance Analytics", description: "Monitor application performance with real-time metrics, alerts, and detailed reporting.", lucideIcon: BarChart }
    ]
  },
  gridFeaturesMediaCards: {
    badge: "Solutions",
    title: "Comprehensive solutions for every need",
    description:
      "Discover our range of specialized solutions designed to address specific business challenges and drive growth.",
    items: [
      { id: "1", title: "E-commerce Platform", description: "Complete e-commerce solution with payment processing, inventory management, and customer analytics.", image: { src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "E-commerce platform" }, lucideIcon: Smartphone },
      { id: "2", title: "Data Analytics Suite", description: "Advanced analytics tools for data visualization, reporting, and business intelligence insights.", image: { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Data analytics dashboard" }, lucideIcon: BarChart },
      { id: "3", title: "Team Collaboration", description: "Streamline team communication and project management with our collaboration tools.", image: { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Team collaboration" }, lucideIcon: Users },
      { id: "4", title: "Security Management", description: "Comprehensive security suite with threat detection, monitoring, and incident response.", image: { src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Security management" }, lucideIcon: Shield },
      { id: "5", title: "Cloud Infrastructure", description: "Scalable cloud solutions with automated deployment, monitoring, and optimization.", image: { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "Cloud infrastructure" }, lucideIcon: Cloud },
      { id: "6", title: "API Development", description: "Powerful API development tools with testing, documentation, and version management.", image: { src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", alt: "API development" }, lucideIcon: Code }
    ]
  },
  gridFeaturesCareerPositions: {
    badge: "Careers",
    title: "Join our growing team",
    description:
      "We're looking for talented individuals to help us build the future of technology. Explore our open positions and find your next opportunity.",
    items: [
      { id: "1", title: "Senior Frontend Developer", description: "Lead frontend development using React, TypeScript, and modern web technologies. Work on user-facing features and improve developer experience.", department: "Engineering", location: "Remote / San Francisco", lucideIcon: Code },
      { id: "2", title: "Product Manager", description: "Drive product strategy and roadmap for our core platform. Work closely with engineering and design teams to deliver exceptional user experiences.", department: "Product", location: "New York / Remote", lucideIcon: Briefcase },
      { id: "3", title: "UX/UI Designer", description: "Design intuitive and beautiful user interfaces for our applications. Conduct user research and create design systems.", department: "Design", location: "Remote", lucideIcon: ZoomIn },
      { id: "4", title: "DevOps Engineer", description: "Build and maintain our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability and scalability.", department: "Engineering", location: "Remote / London", lucideIcon: Cloud },
      { id: "5", title: "Data Scientist", description: "Analyze user behavior and business metrics to drive data-informed decisions. Build machine learning models and predictive analytics.", department: "Data", location: "San Francisco", lucideIcon: BarChart },
      { id: "6", title: "Customer Success Manager", description: "Help our customers achieve their goals and maximize value from our platform. Build relationships and drive customer satisfaction.", department: "Customer Success", location: "Remote", lucideIcon: Users }
    ]
  },
  gridFeaturesCareerStats: {
    badge: "Company",
    title: "Why join our team?",
    description:
      "We're building an inclusive workplace where everyone can thrive. Here's what makes us different and why our team loves working here.",
    items: [
      { id: "1", title: "Team Members", description: "Talented professionals from around the world working together to build amazing products.", stats: { value: "150+", label: "Team Members" }, lucideIcon: Users },
      { id: "2", title: "Countries", description: "Global remote-first company with team members spanning across multiple continents.", stats: { value: "25+", label: "Countries" }, lucideIcon: Globe },
      { id: "3", title: "Customer Satisfaction", description: "Our customers love what we build, and that's reflected in our consistently high satisfaction scores.", stats: { value: "98%", label: "Customer Satisfaction" }, lucideIcon: Heart },
      { id: "4", title: "Learning Budget", description: "Annual learning and development budget for each team member to grow their skills.", stats: { value: "$2,500", label: "Learning Budget" }, lucideIcon: GraduationCap },
      { id: "5", title: "Company Growth", description: "Year-over-year revenue growth demonstrating our strong market position and stability.", stats: { value: "300%", label: "YoY Growth" }, lucideIcon: BarChart },
      { id: "6", title: "Work-Life Balance", description: "Flexible working hours and unlimited PTO to help maintain a healthy work-life balance.", stats: { value: "Unlimited", label: "PTO Days" }, lucideIcon: Heart }
    ]
  }
};

export const SplitFeaturesContent: SplitFeaturesDataContent = {
  splitFeaturesMedia: {
    badge: "Features",
    title: "Everything you need to build modern applications",
    description:
      "Our platform provides all the tools and features you need to create, deploy, and scale your applications with confidence.",
    image: { src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Modern application development" },
    features: [
      { id: "1", title: "Lightning Fast Performance", description: "Optimized for speed with advanced caching and CDN integration" },
      { id: "2", title: "Enterprise Security", description: "Bank-level security with end-to-end encryption and compliance" },
      { id: "3", title: "Scalable Infrastructure", description: "Auto-scaling infrastructure that grows with your business needs" },
      { id: "4", title: "24/7 Expert Support", description: "Round-the-clock support from our team of technical experts" }
    ],
    primaryButtonText: "Get Started",
    secondaryButtonText: "View Demo",
    primaryButtonIcon: Rocket,
    secondaryButtonIcon: ArrowRight
  },
  splitFeaturesFeatures: {
    badge: "Innovation",
    title: "Powerful features for modern teams",
    description:
      "Streamline your workflow with our comprehensive suite of tools designed for collaboration and productivity.",
    image: { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Team collaboration" },
    features: [
      { id: "1", title: "Real-time Collaboration", description: "Work together seamlessly with live editing and instant updates", lucideIcon: Users },
      { id: "2", title: "Advanced Analytics", description: "Get deep insights into your team's performance and productivity", lucideIcon: BarChart },
      { id: "3", title: "Global Deployment", description: "Deploy your applications worldwide with our global infrastructure", lucideIcon: Globe },
      { id: "4", title: "Automated Workflows", description: "Streamline repetitive tasks with intelligent automation", lucideIcon: ArrowRight }
    ]
  },
  splitFeaturesAnalytics: {
    badge: "Analytics",
    title: "Data-driven insights for better decisions",
    description:
      "Transform your business with powerful analytics and real-time reporting that help you understand your customers and optimize performance.",
    features: [
      { id: "1", title: "Predictive Analytics", description: "Forecast trends and make proactive business decisions" },
      { id: "2", title: "Custom Dashboards", description: "Create personalized views of your most important metrics" },
      { id: "3", title: "Automated Reports", description: "Schedule and deliver reports automatically to stakeholders" }
    ]
  },
  splitFeaturesSecurity: {
    badge: "Security",
    title: "Enterprise-grade security you can trust",
    description:
      "Protect your business with our comprehensive security suite featuring advanced threat detection, encryption, and compliance tools.",
    features: [
      { id: "1", title: "Multi-factor Authentication", description: "Secure access with multiple verification methods", lucideIcon: Shield },
      { id: "2", title: "End-to-end Encryption", description: "Your data is encrypted both in transit and at rest", lucideIcon: Shield },
      { id: "3", title: "Compliance Ready", description: "Meet GDPR, HIPAA, and SOC 2 requirements out of the box", lucideIcon: Check },
      { id: "4", title: "Threat Monitoring", description: "24/7 monitoring and automated threat response", lucideIcon: Shield }
    ],
    primaryButtonText: "Learn More",
    primaryButtonIcon: ArrowRight
  },
  splitFeaturesPerformance: {
    badge: "Performance",
    title: "Blazing fast performance at scale",
    description:
      "Experience unmatched speed and reliability with our optimized infrastructure designed to handle millions of requests.",
    image: { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Performance analytics dashboard" },
    features: [
      { id: "1", title: "99.99% Uptime SLA", description: "Guaranteed availability with industry-leading uptime" },
      { id: "2", title: "Sub-100ms Response Time", description: "Lightning-fast API responses for optimal user experience" },
      { id: "3", title: "Auto-scaling Infrastructure", description: "Automatically scale to handle traffic spikes" },
      { id: "4", title: "Global Edge Network", description: "Serve content from the closest location to your users" }
    ],
    primaryButtonText: "View Benchmarks",
    secondaryButtonText: "Start Free Trial",
    primaryButtonIcon: BarChart,
    secondaryButtonIcon: Rocket
  }
};


