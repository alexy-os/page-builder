// Business-specific content management hooks
import { 
  sampleBusinessCards,
  sampleSolutions,
  samplePricingPlans,
  sampleCareerOpenings,
  sampleMetrics,
  sampleFeatures,
  sampleTestimonials,
  sampleCompanyValues 
} from './content';

// Business content mapping
export const GridBusinessContent = {
  gridBusinessCardsGallery: {
    promo: "Our Services",
    title: "Comprehensive business solutions for modern enterprises",
    description: "We provide cutting-edge technology solutions that help businesses scale, optimize operations, and achieve their strategic goals.",
    cards: sampleBusinessCards
  },
  gridBusinessSolutionsGrid: {
    badge: "Solutions",
    title: "Transform your business with our proven solutions",
    description: "Our enterprise-grade solutions are designed to help you streamline operations, improve efficiency, and drive growth.",
    solutions: sampleSolutions
  },
  gridBusinessPricing: {
    title: "Choose the perfect plan for your business",
    description: "Flexible pricing options designed to scale with your business needs. Start free and upgrade as you grow.",
    plans: samplePricingPlans
  },
  gridBusinessPricingYear: {
    title: "Save more with annual billing",
    description: "Get the same great features at a discounted rate when you choose annual billing. Save up to 20% on all plans.",
    plans: samplePricingPlans,
    _showYearlyToggle: true
  },
  gridBusinessCareer: {
    title: "Join our growing team",
    description: "We're always looking for talented individuals to join our mission of building innovative solutions that make a difference.",
    buttonText: "View All Openings",
    openings: sampleCareerOpenings
  }
};

export const SplitBusinessContent = {
  splitBusinessSolutions: {
    badge: "Enterprise Solutions",
    title: "Accelerate your business growth with our proven solutions",
    description: "We help enterprises streamline operations, reduce costs, and drive innovation through cutting-edge technology solutions tailored to your specific needs.",
    buttonText: "Schedule Demo",
    secondaryButtonText: "View Case Studies",
    metrics: sampleMetrics,
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Business analytics dashboard"
    }
  },
  splitBusinessMetrics: {
    badge: "Proven Results",
    title: "Delivering measurable business impact",
    subtitle: "Trusted by industry leaders worldwide",
    description: "Our track record speaks for itself. We've helped hundreds of companies achieve their goals through innovative solutions and dedicated support.",
    buttonText: "View Our Results",
    stats: {
      clients: "500+",
      projects: "1,200+",
      satisfaction: "99.5%",
      years: "15+"
    }
  },
  splitBusinessTestimonial: {
    badge: "Customer Success",
    title: "What our clients say about us",
    description: "Don't just take our word for it. Hear from the business leaders who have transformed their operations with our solutions.",
    buttonText: "Read More Reviews",
    testimonials: sampleTestimonials,
    image: {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Happy business team"
    }
  },
  splitBusinessFeatures: {
    badge: "Platform Features",
    title: "Everything you need to succeed in one platform",
    description: "Our comprehensive business platform provides all the tools and features you need to manage, grow, and scale your operations effectively.",
    buttonText: "Start Free Trial",
    secondaryButtonText: "View All Features",
    features: sampleFeatures
  },
  splitBusinessAbout: {
    badge: "Our Story",
    title: "Building the future of business technology",
    subtitle: "Since 2008, we've been at the forefront of innovation",
    description: "We started with a simple mission: to help businesses leverage technology to achieve their full potential. Today, we're proud to serve over 500 companies worldwide with our cutting-edge solutions and unwavering commitment to excellence.",
    buttonText: "Join Our Team",
    secondaryButtonText: "Learn More",
    cards: sampleCompanyValues,
    image: {
      src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Our team at work"
    }
  }
};

export interface BusinessContentHooks {
  getGridBusinessContent: (templateId: keyof typeof GridBusinessContent) => any;
  getSplitBusinessContent: (templateId: keyof typeof SplitBusinessContent) => any;
}

// Content provider for business blocks
export function getBusinessContent(templateId: string): any {
  // Check GridBusiness content
  if (templateId.startsWith('gridBusiness')) {
    const key = templateId as keyof typeof GridBusinessContent;
    return GridBusinessContent[key] || null;
  }
  
  // Check SplitBusiness content  
  if (templateId.startsWith('splitBusiness')) {
    const key = templateId as keyof typeof SplitBusinessContent;
    return SplitBusinessContent[key] || null;
  }
  
  return null;
}

// Check if templateId is business type
export function isBusinessTemplate(templateId: string): boolean {
  return templateId.includes('Business') || templateId.includes('business');
}

// Clean content for serialization (remove React components/functions)
export function cleanBusinessContent(content: any): any {
  if (!content || typeof content !== 'object') return content;
  
  const cleaned = { ...content };
  
  // Remove React components and functions that can't be serialized
  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];
    
    // Remove React components (icons) and functions
    if (typeof value === 'function' || 
        (typeof value === 'object' && value?.$$typeof)) {
      delete cleaned[key];
    }
    // Recursively clean nested objects
    else if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanBusinessContent(item));
      } else {
        cleaned[key] = cleanBusinessContent(value);
      }
    }
  });
  
  return cleaned;
}