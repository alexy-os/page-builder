// Business content data extracted from examples
import { 
  Shield, 
  Users, 
  BarChart, 
  Building,
  TrendingUp,
  Code,
  Database,
  Cloud,
  Smartphone,
  Target, 
  Award, 
  Globe,
  Zap,
  Rocket,
  Clock,
  DollarSign
} from "lucide-react";

// Sample business cards
export const sampleBusinessCards = [
  {
    id: "1",
    title: "Advanced Analytics",
    description: "Get deep insights into your business performance with our comprehensive analytics dashboard and reporting tools.",
    lucideIcon: BarChart,
    colSpan: 2
  },
  {
    id: "2",
    title: "Cloud Infrastructure",
    description: "Scalable and secure cloud solutions that grow with your business needs.",
    lucideIcon: Cloud
  },
  {
    id: "3",
    title: "Mobile Solutions",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    lucideIcon: Smartphone
  },
  {
    id: "4",
    title: "Security First",
    description: "Enterprise-grade security with end-to-end encryption and compliance standards.",
    lucideIcon: Shield,
    rowSpan: 2
  },
  {
    id: "5",
    title: "API Integration",
    description: "Seamless integration with third-party services and existing systems.",
    lucideIcon: Code
  },
  {
    id: "6",
    title: "Database Management",
    description: "Optimized database solutions for high-performance applications.",
    lucideIcon: Database
  }
];

export const sampleSolutions = [
  {
    id: "1",
    title: "Enterprise Resource Planning",
    description: "Streamline your business operations with our comprehensive ERP solution that integrates all your business processes into one unified system.",
    lucideIcon: Building,
    stats: {
      value: "40%",
      label: "Efficiency Increase"
    }
  },
  {
    id: "2",
    title: "Customer Relationship Management",
    description: "Build stronger customer relationships and drive sales growth with our advanced CRM platform featuring automation and analytics.",
    lucideIcon: Users,
    image: {
      src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "CRM Dashboard"
    }
  },
  {
    id: "3",
    title: "Business Intelligence",
    description: "Make data-driven decisions with our powerful BI tools that transform raw data into actionable business insights.",
    lucideIcon: TrendingUp,
    stats: {
      value: "60%",
      label: "Faster Decisions"
    }
  }
];

export const samplePricingPlans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small businesses getting started",
    price: "$29",
    monthlyPrice: "$29",
    yearlyPrice: "$24",
    features: [
      "Up to 5 team members",
      "10GB storage",
      "Basic analytics",
      "Email support",
      "Mobile app access"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline"
  },
  {
    id: "professional",
    name: "Professional",
    description: "For growing teams that need more power",
    price: "$79",
    monthlyPrice: "$79",
    yearlyPrice: "$64",
    features: [
      "Up to 25 team members",
      "100GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations"
    ],
    buttonText: "Choose Professional",
    buttonVariant: "default",
    isPopular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: "$199",
    monthlyPrice: "$199",
    yearlyPrice: "$159",
    features: [
      "Unlimited team members",
      "1TB storage",
      "Custom analytics",
      "24/7 phone support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline"
  }
];

export const sampleCareerOpenings = [
  {
    id: "1",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    department: "Engineering",
    type: "Full-time",
    salary: "$120k - $180k"
  },
  {
    id: "2",
    title: "Product Manager",
    location: "New York, NY",
    department: "Product",
    type: "Full-time",
    salary: "$110k - $160k"
  },
  {
    id: "3",
    title: "UX Designer",
    location: "Remote",
    department: "Design",
    type: "Full-time",
    salary: "$90k - $130k"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    location: "Austin, TX",
    department: "Engineering",
    type: "Full-time",
    salary: "$100k - $150k"
  },
  {
    id: "5",
    title: "Sales Director",
    location: "Boston, MA",
    department: "Sales",
    type: "Full-time",
    salary: "$130k - $200k"
  },
  {
    id: "6",
    title: "Marketing Manager",
    location: "Los Angeles, CA",
    department: "Marketing",
    type: "Full-time",
    salary: "$80k - $120k"
  }
];

export const sampleMetrics = [
  {
    id: "1",
    value: "500+",
    label: "Enterprise Clients",
    change: "+25%",
    lucideIcon: Building
  },
  {
    id: "2",
    value: "99.9%",
    label: "Uptime Guarantee",
    change: "Improved",
    lucideIcon: Shield
  },
  {
    id: "3",
    value: "24/7",
    label: "Support Available",
    lucideIcon: Clock
  },
  {
    id: "4",
    value: "$2.5M",
    label: "Cost Savings Generated",
    change: "+40%",
    lucideIcon: DollarSign
  }
];

export const sampleFeatures = [
  {
    id: "1",
    title: "Advanced Analytics",
    description: "Get deep insights into your business performance with real-time analytics and comprehensive reporting dashboards.",
    lucideIcon: BarChart
  },
  {
    id: "2",
    title: "Scalable Infrastructure",
    description: "Our cloud-native architecture scales automatically with your business needs, ensuring optimal performance at all times.",
    lucideIcon: Rocket
  },
  {
    id: "3",
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption, compliance certifications, and advanced threat protection.",
    lucideIcon: Shield
  },
  {
    id: "4",
    title: "Global Reach",
    description: "Serve customers worldwide with our global infrastructure and multi-region deployment capabilities.",
    lucideIcon: Globe
  }
];

export const sampleTestimonials = [
  {
    id: "1",
    quote: "This platform has transformed how we manage our business operations. The efficiency gains have been remarkable, and our team productivity has increased by 40%.",
    author: {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
    },
    rating: 5
  }
];

export const sampleCompanyValues = [
  {
    id: "1",
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible",
    lucideIcon: Zap
  },
  {
    id: "2",
    title: "Customer Success",
    description: "Your success is our primary measure of achievement",
    lucideIcon: Target
  },
  {
    id: "3",
    title: "Quality Excellence",
    description: "We deliver nothing but the highest quality solutions",
    lucideIcon: Award
  },
  {
    id: "4",
    title: "Team Collaboration",
    description: "Together we achieve more than we ever could alone",
    lucideIcon: Users
  }
];