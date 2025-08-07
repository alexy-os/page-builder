// Portfolio content data based on examples; content/design unchanged
import type { GridPortfolioData, SplitPortfolioData } from "@ui8kit/blocks";
import { Monitor, Smartphone, Palette, Camera, Globe, Code, Award } from "lucide-react";

interface GridPortfolioDataContent {
  gridPortfolioCards: GridPortfolioData,
  gridPortfolioMasonry: GridPortfolioData,
  gridPortfolioMinimal: GridPortfolioData,
  gridPortfolioDetailed: GridPortfolioData,
  gridPortfolioShowcase: GridPortfolioData
}

interface SplitPortfolioDataContent {
  splitPortfolioShowcase: SplitPortfolioData,
  splitPortfolioAbout: SplitPortfolioData,
  splitPortfolioSkills: SplitPortfolioData,
  splitPortfolioTestimonial: SplitPortfolioData,
  splitPortfolioProcess: SplitPortfolioData
}

const sampleProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "Modern online shopping platform with advanced filtering, payment integration, and real-time inventory management. Built with React, Node.js, and PostgreSQL.",
    image: {
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "E-Commerce Platform Screenshot"
    },
    tags: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    category: "Web Development",
    client: "TechCorp Inc",
    year: "2024",
    status: "featured" as const,
    links: {
      live: "https://example.com",
      github: "https://github.com/example",
      case_study: "https://example.com/case-study"
    },
    stats: { views: "2.5K", likes: "180", duration: "3 months" },
    lucideIcon: Monitor
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial analytics dashboard.",
    image: {
      src: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Mobile Banking App Design"
    },
    tags: ["React Native", "Firebase", "Biometrics", "Charts"],
    category: "Mobile Development",
    client: "FinanceFlow",
    year: "2024",
    status: "completed" as const,
    links: { live: "https://example.com", case_study: "https://example.com/case-study" },
    stats: { views: "1.8K", likes: "145", duration: "4 months" },
    lucideIcon: Smartphone
  },
  {
    id: "3",
    title: "Brand Identity Design",
    description:
      "Complete brand identity package including logo design, color palette, typography system, and brand guidelines for a sustainable fashion startup.",
    image: {
      src: "https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Brand Identity Design Showcase"
    },
    tags: ["Branding", "Logo Design", "Figma", "Illustrator"],
    category: "Design",
    client: "EcoWear",
    year: "2023",
    status: "completed" as const,
    links: { live: "https://example.com" },
    stats: { views: "3.2K", likes: "220", duration: "2 months" },
    lucideIcon: Palette
  },
  {
    id: "4",
    title: "Photography Portfolio",
    description:
      "Minimalist photography portfolio website with custom gallery layouts, image optimization, and integrated booking system for client inquiries.",
    image: {
      src: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Photography Portfolio Website"
    },
    tags: ["Next.js", "Sanity CMS", "Cloudinary", "Framer Motion"],
    category: "Web Development",
    client: "Sarah Mitchell Photography",
    year: "2023",
    status: "completed" as const,
    links: { live: "https://example.com", github: "https://github.com/example" },
    stats: { views: "1.5K", likes: "98", duration: "6 weeks" },
    lucideIcon: Camera
  },
  {
    id: "5",
    title: "SaaS Dashboard",
    description:
      "Comprehensive analytics dashboard for SaaS businesses with real-time metrics, user management, and advanced reporting capabilities.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "SaaS Dashboard Interface"
    },
    tags: ["Vue.js", "D3.js", "Python", "Docker", "Redis"],
    category: "Web Development",
    client: "DataInsights Pro",
    year: "2024",
    status: "in-progress" as const,
    links: { live: "https://example.com" },
    stats: { views: "900", likes: "67", duration: "5 months" },
    lucideIcon: Code
  },
  {
    id: "6",
    title: "Restaurant Website",
    description:
      "Modern restaurant website with online reservation system, menu management, and integration with food delivery platforms.",
    image: {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
      alt: "Restaurant Website Design"
    },
    tags: ["WordPress", "PHP", "MySQL", "OpenTable API"],
    category: "Web Development",
    client: "Bella Vista Restaurant",
    year: "2023",
    status: "completed" as const,
    links: { live: "https://example.com" },
    stats: { views: "1.2K", likes: "89", duration: "8 weeks" },
    lucideIcon: Globe
  }
];

const sampleCategories = [
  { id: "web", name: "Web Development", lucideIcon: Monitor },
  { id: "mobile", name: "Mobile Development", lucideIcon: Smartphone },
  { id: "design", name: "Design", lucideIcon: Palette },
  { id: "photography", name: "Photography", lucideIcon: Camera },
  { id: "branding", name: "Branding", lucideIcon: Award }
];

export const GridPortfolioContent: GridPortfolioDataContent = {
  gridPortfolioCards: {
    badge: "Portfolio",
    title: "Featured Projects",
    description: "A showcase of my recent work across web development, mobile apps, and design projects.",
    projects: sampleProjects
  },
  gridPortfolioMasonry: {
    badge: "Creative Work",
    title: "Visual Portfolio",
    description: "Explore my creative projects with a focus on visual storytelling and innovative design solutions.",
    projects: sampleProjects,
    categories: sampleCategories
  },
  gridPortfolioMinimal: {
    badge: "Selected Works",
    title: "Clean & Simple",
    description: "A minimalist approach to showcasing quality work with focus on clean design and functionality.",
    projects: sampleProjects.slice(0, 8)
  },
  gridPortfolioDetailed: {
    badge: "Case Studies",
    title: "Detailed Project Showcase",
    description: "In-depth look at my projects with comprehensive details, client information, and project outcomes.",
    buttonText: "View All Projects",
    projects: sampleProjects,
    categories: sampleCategories,
    showFilters: true
  },
  gridPortfolioShowcase: {
    badge: "Premium Work",
    title: "Award-Winning Projects",
    description: "Highlighting exceptional projects that have received recognition and delivered outstanding results for clients.",
    buttonText: "Start Your Project",
    projects: sampleProjects,
    categories: sampleCategories
  }
};

export const SplitPortfolioContent: SplitPortfolioDataContent = {
  splitPortfolioShowcase: {
    badge: "Portfolio",
    title: "Creating Digital Experiences",
    description:
      "I'm a full-stack developer and designer passionate about creating beautiful, functional digital experiences that solve real-world problems.",
    buttonText: "View Full Portfolio",
    projects: sampleProjects,
    stats: { totalProjects: "50+", yearsExperience: "8", happyClients: "25", awards: "12" }
  },
  splitPortfolioAbout: {
    badge: "About Me",
    title: "Hello, I'm Alex Johnson",
    description:
      "A passionate full-stack developer with 8 years of experience creating innovative digital solutions. I specialize in modern web technologies and have a keen eye for design.",
    projects: sampleProjects,
    categories: sampleCategories,
    stats: { totalProjects: "50+", yearsExperience: "8", happyClients: "25", awards: "12" }
  },
  splitPortfolioSkills: {
    badge: "Skills",
    title: "Technical Expertise",
    description:
      "I combine technical proficiency with creative problem-solving to deliver exceptional results across multiple disciplines.",
    buttonText: "Hire Me",
    projects: sampleProjects,
    categories: sampleCategories,
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
      "AWS", "Docker", "Figma", "Adobe Creative Suite", "Git", "Agile/Scrum"
    ]
  },
  splitPortfolioTestimonial: {
    badge: "Testimonials",
    title: "What Clients Say",
    description:
      "I'm proud to have worked with amazing clients who have trusted me to bring their visions to life. Here's what they have to say about our collaboration.",
    projects: sampleProjects,
    testimonial: {
      text:
        "Alex delivered exceptional results that exceeded our expectations. The attention to detail and technical expertise made our project a huge success. I highly recommend working with Alex for any complex development needs.",
      author: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp Inc"
    }
  },
  splitPortfolioProcess: {
    badge: "Process",
    title: "How I Work",
    description:
      "My proven 5-step process ensures every project is delivered on time, within budget, and exceeds expectations through careful planning and execution.",
    buttonText: "Start a Project",
    projects: sampleProjects,
    skills: [
      "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
      "Figma", "Adobe XD", "Git", "Jira", "Slack", "Notion"
    ]
  }
};


