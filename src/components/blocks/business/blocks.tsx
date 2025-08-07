import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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

// =================
// TYPE DEFINITIONS (from examples)
// =================

export interface GridBusinessData {
  promo?: string;
  badge?: string;
  title: string;
  description: string;
  buttonText?: string;
  secondaryButtonText?: string;
  cards?: any[];
  solutions?: any[];
  plans?: any[];
  openings?: any[];
  _showYearlyToggle?: boolean;
}

export interface SplitBusinessData {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  secondaryButtonText?: string;
  metrics?: any[];
  features?: any[];
  testimonials?: any[];
  cards?: any[];
  stats?: {
    clients?: string;
    projects?: string;
    satisfaction?: string;
    years?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

// =================
// GRID BUSINESS COMPONENT
// =================

interface GridBusinessProps {
  content: GridBusinessData;
  variant: 'cardsGallery' | 'solutionsGrid' | 'pricing' | 'pricingYear' | 'career';
  cols: '1-2-3' | '1-2' | '1-1-1';
  useContainer?: boolean;
  className?: string;
}

export const GridBusiness = ({ 
  content, 
  variant, 
  cols = '1-2-3',
  useContainer = true,
  className
}: GridBusinessProps) => {
  const [isYearly, setIsYearly] = useState(false);
  
  const getGridCols = () => {
    switch (cols) {
      case '1-2': return 'grid-cols-1 md:grid-cols-2';
      case '1-1-1': return 'grid-cols-1 md:grid-cols-3';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const containerClass = useContainer ? 'container mx-auto px-4' : '';

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className={containerClass}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {(content.badge || content.promo) && (
            <Badge variant="secondary" className="mb-4">
              {content.badge || content.promo}
            </Badge>
          )}
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{content.title}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Yearly Toggle for Pricing */}
        {variant === 'pricingYear' && content._showYearlyToggle && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-4 py-2 rounded-md transition-all",
                  !isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-4 py-2 rounded-md transition-all",
                  isYearly ? "bg-background shadow-sm" : "text-muted-foreground"
                )}
              >
                Yearly
              </button>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className={cn("grid gap-6", getGridCols())}>
          {variant === 'cardsGallery' && content.cards?.map((card: any) => {
            const Icon = card.lucideIcon;
            return (
              <Card key={card.id} className={cn(
                "h-full transition-all duration-200 hover:shadow-lg border-border/50",
                card.colSpan && `col-span-${card.colSpan}`,
                card.rowSpan && `row-span-${card.rowSpan}`
              )}>
                <CardHeader className="pb-4">
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
          
          {variant === 'solutionsGrid' && content.solutions?.map((solution: any) => {
            const Icon = solution.lucideIcon;
            return (
              <Card key={solution.id} className="h-full transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-4">
                  {Icon && (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <CardTitle className="text-xl font-semibold">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </CardDescription>
                  
                  {solution.stats && (
                    <div className="pt-2 border-t border-border/50">
                      <div className="text-2xl font-bold text-primary">{solution.stats.value}</div>
                      <div className="text-sm text-muted-foreground">{solution.stats.label}</div>
                    </div>
                  )}
                  
                  {solution.image && (
                    <div className="pt-2">
                      <img 
                        src={solution.image.src} 
                        alt={solution.image.alt}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          
          {(variant === 'pricing' || variant === 'pricingYear') && content.plans?.map((plan: any) => {
            const price = isYearly ? plan.yearlyPrice || plan.price : plan.monthlyPrice || plan.price;
            return (
              <Card key={plan.id} className={cn(
                "relative h-full transition-all duration-200 hover:shadow-lg",
                plan.isPopular && "border-primary shadow-lg scale-105"
              )}>
                {plan.isPopular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <div className="text-4xl font-bold text-primary">{price}</div>
                    <div className="text-sm text-muted-foreground">
                      per month{isYearly && ", billed annually"}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {plan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant={plan.buttonVariant || "default"} 
                    className="w-full"
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          
          {variant === 'career' && content.openings?.map((opening: any) => (
            <Card key={opening.id} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold">{opening.title}</CardTitle>
                    <div className="text-sm text-muted-foreground">{opening.department}</div>
                  </div>
                  <Badge variant="secondary">{opening.type}</Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{opening.location}</span>
                  </div>
                  {opening.salary && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary:</span>
                      <span>{opening.salary}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Button */}
        {content.buttonText && (
          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              {content.buttonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// =================
// SPLIT BUSINESS COMPONENT
// =================

interface SplitBusinessProps {
  content: SplitBusinessData;
  variant: 'solutions' | 'metrics' | 'testimonial' | 'features' | 'about';
  leftMedia?: boolean;
  useContainer?: boolean;
  className?: string;
}

export const SplitBusiness = ({ 
  content, 
  variant, 
  leftMedia = false,
  useContainer = true,
  className
}: SplitBusinessProps) => {
  const containerClass = useContainer ? 'container mx-auto px-4' : '';

  const ContentSection = () => (
    <div className="space-y-6">
      {content.badge && (
        <Badge variant="secondary">{content.badge}</Badge>
      )}
      
      <div className="space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">{content.title}</h2>
        {content.subtitle && (
          <p className="text-xl text-muted-foreground font-medium">{content.subtitle}</p>
        )}
        <p className="text-lg text-muted-foreground leading-relaxed">
          {content.description}
        </p>
      </div>

      {/* Variant-specific content */}
      {variant === 'solutions' && content.metrics && (
        <div className="grid grid-cols-2 gap-6">
          {content.metrics.map((metric: any) => {
            const Icon = metric.lucideIcon;
            return (
              <div key={metric.id} className="text-center space-y-2">
                {Icon && (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div className="text-3xl font-bold text-primary">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                {metric.change && (
                  <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {variant === 'metrics' && content.stats && (
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(content.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-bold text-primary">{value as string}</div>
              <div className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      )}

      {variant === 'features' && content.features && (
        <div className="space-y-8">
          {content.features.map((feature: any) => {
            const Icon = feature.lucideIcon;
            return (
              <div key={feature.id} className="space-y-3">
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {variant === 'about' && content.cards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.cards.map((card: any) => {
            const Icon = card.lucideIcon;
            return (
              <div key={card.id} className="space-y-3">
                {Icon && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      {(content.buttonText || content.secondaryButtonText) && (
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          {content.buttonText && (
            <Button size="lg" className="px-8">
              {content.buttonText}
            </Button>
          )}
          {content.secondaryButtonText && (
            <Button variant="outline" size="lg" className="px-8">
              {content.secondaryButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const MediaSection = () => (
    <div className="space-y-6">
      {variant === 'testimonial' && content.testimonials && (
        <div className="space-y-6">
          {content.testimonials.map((testimonial: any) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 text-yellow-400 fill-current">★</div>
                    ))}
                  </div>
                  
                  <blockquote className="text-lg italic leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                    {testimonial.author.avatar && (
                      <img 
                        src={testimonial.author.avatar} 
                        alt={testimonial.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{testimonial.author.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.author.role} at {testimonial.author.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {content.image && (
        <div className="rounded-xl overflow-hidden shadow-2xl">
          <img 
            src={content.image.src} 
            alt={content.image.alt}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {leftMedia ? (
            <>
              <MediaSection />
              <ContentSection />
            </>
          ) : (
            <>
              <ContentSection />
              <MediaSection />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// =================
// EXAMPLE COMPONENTS (from GitHub examples)
// =================

// 1. Business cards gallery
export const GridBusinessCardsGalleryExample = () => {
  const sampleBusinessCards = [
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

  const content: GridBusinessData = {
    promo: "Our Services",
    title: "Comprehensive business solutions for modern enterprises",
    description: "We provide cutting-edge technology solutions that help businesses scale, optimize operations, and achieve their strategic goals.",
    cards: sampleBusinessCards
  };

  return (
    <GridBusiness
      content={content}
      variant="cardsGallery"
      cols="1-2-3"
    />
  );
};

// 2. Solutions grid
export const GridBusinessSolutionsGridExample = () => {
  const sampleSolutions = [
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

  const content: GridBusinessData = {
    badge: "Solutions",
    title: "Transform your business with our proven solutions",
    description: "Our enterprise-grade solutions are designed to help you streamline operations, improve efficiency, and drive growth.",
    solutions: sampleSolutions
  };

  return (
    <GridBusiness
      content={content}
      variant="solutionsGrid"
      cols="1-2-3"
      className="bg-gradient-to-b from-primary/50 to-primary/10"
    />
  );
};

// 3. Pricing grid
export const GridBusinessPricingExample = () => {
  const samplePricingPlans = [
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

  const content: GridBusinessData = {
    title: "Choose the perfect plan for your business",
    description: "Flexible pricing options designed to scale with your business needs. Start free and upgrade as you grow.",
    plans: samplePricingPlans
  };

  return (
    <GridBusiness
      content={content}
      variant="pricing"
      cols="1-2-3"
    />
  );
};

// 4. Pricing with yearly toggle
export const GridBusinessPricingYearExample = () => {
  const samplePricingPlans = [
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

  const content: GridBusinessData = {
    title: "Save more with annual billing",
    description: "Get the same great features at a discounted rate when you choose annual billing. Save up to 20% on all plans.",
    plans: samplePricingPlans,
    _showYearlyToggle: true
  };

  return (
    <GridBusiness
      content={content}
      variant="pricingYear"
      cols="1-2-3"
      _showYearlyToggle={true}
      className="bg-gradient-to-br from-primary/5 to-secondary/5"
    />
  );
};

// 5. Career openings grid
export const GridBusinessCareerExample = () => {
  const sampleCareerOpenings = [
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

  const content: GridBusinessData = {
    title: "Join our growing team",
    description: "We're always looking for talented individuals to join our mission of building innovative solutions that make a difference.",
    buttonText: "View All Openings",
    openings: sampleCareerOpenings
  };

  return (
    <GridBusiness
      content={content}
      variant="career"
      cols="1-2"
      useContainer={true}
    />
  );
};

// ===== SPLIT BUSINESS EXAMPLES =====

// 1. Business solutions split
export const SplitBusinessSolutionsExample = () => {
  const sampleMetrics = [
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

  const content: SplitBusinessData = {
    badge: "Enterprise Solutions",
    title: "Accelerate your business growth with our proven solutions",
    description: "We help enterprises streamline operations, reduce costs, and drive innovation through cutting-edge technology solutions tailored to your specific needs.",
    buttonText: "Schedule Demo",
    secondaryButtonText: "View Case Studies",
    metrics: sampleMetrics,
    image: {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c5f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Business analytics dashboard"
    }
  };

  return (
    <SplitBusiness
      content={content}
      variant="solutions"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// 2. Business metrics split
export const SplitBusinessMetricsExample = () => {
  const content: SplitBusinessData = {
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
  };

  return (
    <SplitBusiness
      content={content}
      variant="metrics"
      leftMedia={true}
      useContainer={true}
      className="bg-gradient-to-br from-primary/50 to-primary/10"
    />
  );
};

// 3. Business testimonial split
export const SplitBusinessTestimonialExample = () => {
  const sampleTestimonials = [
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

  const content: SplitBusinessData = {
    badge: "Customer Success",
    title: "What our clients say about us",
    description: "Don't just take our word for it. Hear from the business leaders who have transformed their operations with our solutions.",
    buttonText: "Read More Reviews",
    testimonials: sampleTestimonials,
    image: {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Happy business team"
    }
  };

  return (
    <SplitBusiness
      content={content}
      variant="testimonial"
      leftMedia={false}
      useContainer={true}
      className="bg-gradient-to-r from-primary/50 to-primary/10"
    />
  );
};

// 4. Business features split
export const SplitBusinessFeaturesExample = () => {
  const sampleFeatures = [
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

  const content: SplitBusinessData = {
    badge: "Platform Features",
    title: "Everything you need to succeed in one platform",
    description: "Our comprehensive business platform provides all the tools and features you need to manage, grow, and scale your operations effectively.",
    buttonText: "Start Free Trial",
    secondaryButtonText: "View All Features",
    features: sampleFeatures
  };

  return (
    <SplitBusiness
      content={content}
      variant="features"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 5. About business split
export const SplitBusinessAboutExample = () => {
  const sampleCompanyValues = [
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

  const content: SplitBusinessData = {
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
  };

  return (
    <SplitBusiness
      content={content}
      variant="about"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// Export all examples
export const gridBusinessExamples = {
  cardsGallery: GridBusinessCardsGalleryExample,
  solutionsGrid: GridBusinessSolutionsGridExample,
  pricing: GridBusinessPricingExample,
  pricingYear: GridBusinessPricingYearExample,
  career: GridBusinessCareerExample
};

export const splitBusinessExamples = {
  solutions: SplitBusinessSolutionsExample,
  metrics: SplitBusinessMetricsExample,
  testimonial: SplitBusinessTestimonialExample,
  features: SplitBusinessFeaturesExample,
  about: SplitBusinessAboutExample
};