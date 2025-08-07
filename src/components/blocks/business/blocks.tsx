// Business blocks components - GridBusiness and SplitBusiness
// Microcomponents extracted from approved examples
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useBusinessContent } from "@/hooks/useBlockContent";
import { GridBusinessData, SplitBusinessData } from './content';
import type { Template } from "@/types";

// =================
// MICROCOMPONENTS
// =================

// Business Card Component
const BusinessCard = ({ card, className }: { card: any; className?: string }) => {
  const Icon = card.lucideIcon;
  
  return (
    <Card className={cn(
      "h-full transition-all duration-200 hover:shadow-lg border-border/50",
      card.colSpan && `col-span-${card.colSpan}`,
      card.rowSpan && `row-span-${card.rowSpan}`,
      className
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
};

// Business Solution Component
const BusinessSolution = ({ solution, className }: { solution: any; className?: string }) => {
  const Icon = solution.lucideIcon;
  
  return (
    <Card className={cn("h-full transition-all duration-200 hover:shadow-lg", className)}>
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
};

// Pricing Plan Component
const PricingPlan = ({ plan, isYearly = false, className }: { plan: any; isYearly?: boolean; className?: string }) => {
  const price = isYearly ? plan.yearlyPrice || plan.price : plan.monthlyPrice || plan.price;
  
  return (
    <Card className={cn(
      "relative h-full transition-all duration-200 hover:shadow-lg",
      plan.isPopular && "border-primary shadow-lg scale-105",
      className
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
};

// Career Opening Component
const CareerOpening = ({ opening, className }: { opening: any; className?: string }) => {
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-lg", className)}>
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
  );
};

// Business Metric Component
const BusinessMetric = ({ metric, className }: { metric: any; className?: string }) => {
  const Icon = metric.lucideIcon;
  
  return (
    <div className={cn("text-center space-y-2", className)}>
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
};

// Business Feature Component
const BusinessFeature = ({ feature, className }: { feature: any; className?: string }) => {
  const Icon = feature.lucideIcon;
  
  return (
    <div className={cn("space-y-3", className)}>
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
};

// Testimonial Component
const TestimonialCard = ({ testimonial, className }: { testimonial: any; className?: string }) => {
  return (
    <Card className={cn("h-full", className)}>
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
  );
};

// Stats Grid Component
const StatsGrid = ({ stats, className }: { stats: any; className?: string }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-6", className)}>
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-3xl font-bold text-primary">{value as string}</div>
          <div className="text-sm text-muted-foreground capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </div>
        </div>
      ))}
    </div>
  );
};

// =================
// MAIN COMPONENTS
// =================

// Grid Business Component
interface GridBusinessProps {
  content?: GridBusinessData;
  variant: 'cardsGallery' | 'solutionsGrid' | 'pricing' | 'pricingYear' | 'career';
  cols?: '1-2-3' | '1-2' | '1-1-1';
  useContainer?: boolean;
  className?: string;
  templateId?: string;
  blockId?: string;
}

export const GridBusiness = ({ 
  content: providedContent, 
  variant, 
  cols = '1-2-3',
  useContainer = true,
  className,
  templateId,
  blockId
}: GridBusinessProps) => {
  const { getBusinessContent } = useBusinessContent();
  const [isYearly, setIsYearly] = useState(false);
  
  // Content priority: provided > session content > static fallback
  const content = providedContent || getBusinessContent(templateId || `gridBusiness${variant.charAt(0).toUpperCase() + variant.slice(1)}`, blockId);
  
  if (!content) return null;

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
          {variant === 'cardsGallery' && content.cards?.map((card: any) => (
            <BusinessCard key={card.id} card={card} />
          ))}
          
          {variant === 'solutionsGrid' && content.solutions?.map((solution: any) => (
            <BusinessSolution key={solution.id} solution={solution} />
          ))}
          
          {(variant === 'pricing' || variant === 'pricingYear') && content.plans?.map((plan: any) => (
            <PricingPlan key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
          
          {variant === 'career' && content.openings?.map((opening: any) => (
            <CareerOpening key={opening.id} opening={opening} />
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

// Split Business Component
interface SplitBusinessProps {
  content?: SplitBusinessData;
  variant: 'solutions' | 'metrics' | 'testimonial' | 'features' | 'about';
  leftMedia?: boolean;
  useContainer?: boolean;
  className?: string;
  templateId?: string;
  blockId?: string;
}

export const SplitBusiness = ({ 
  content: providedContent, 
  variant, 
  leftMedia = false,
  useContainer = true,
  className,
  templateId,
  blockId
}: SplitBusinessProps) => {
  const { getBusinessContent } = useBusinessContent();
  
  // Content priority: provided > session content > static fallback
  const content = providedContent || getBusinessContent(templateId || `splitBusiness${variant.charAt(0).toUpperCase() + variant.slice(1)}`, blockId);
  
  if (!content) return null;

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
          {content.metrics.map((metric: any) => (
            <BusinessMetric key={metric.id} metric={metric} />
          ))}
        </div>
      )}

      {variant === 'metrics' && content.stats && (
        <StatsGrid stats={content.stats} />
      )}

      {variant === 'features' && content.features && (
        <div className="space-y-8">
          {content.features.map((feature: any) => (
            <BusinessFeature key={feature.id} feature={feature} />
          ))}
        </div>
      )}

      {variant === 'about' && content.cards && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {content.cards.map((card: any) => (
            <BusinessFeature key={card.id} feature={card} />
          ))}
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
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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

// ===========================
// BUSINESS TEMPLATE COMPONENTS 
// ===========================

// Interface for content props that can be passed to components
interface ContentProps {
  content?: any;
  blockId?: string;
}

// GridBusiness Template Components
const GridBusinessCardsGalleryCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('gridBusinessCardsGallery', blockId);

  return (
    <GridBusiness
      content={content}
      variant="cardsGallery"
      cols="1-2-3"
      useContainer={true}
    />
  );
};

const GridBusinessSolutionsGridCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('gridBusinessSolutionsGrid', blockId);

  return (
    <GridBusiness
      content={content}
      variant="solutionsGrid"
      cols="1-2-3"
      useContainer={true}
      className="bg-gradient-to-b from-primary/50 to-primary/10"
    />
  );
};

const GridBusinessPricingCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('gridBusinessPricing', blockId);

  return (
    <GridBusiness
      content={content}
      variant="pricing"
      cols="1-2-3"
      useContainer={true}
    />
  );
};

const GridBusinessPricingYearCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('gridBusinessPricingYear', blockId);

  return (
    <GridBusiness
      content={content}
      variant="pricingYear"
      cols="1-2-3"
      useContainer={true}
      className="bg-gradient-to-br from-primary/5 to-secondary/5"
    />
  );
};

const GridBusinessCareerCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('gridBusinessCareer', blockId);

  return (
    <GridBusiness
      content={content}
      variant="career"
      cols="1-2"
      useContainer={true}
    />
  );
};

// SplitBusiness Template Components
const SplitBusinessSolutionsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('splitBusinessSolutions', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="solutions"
      leftMedia={false}
      useContainer={true}
    />
  );
};

const SplitBusinessMetricsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('splitBusinessMetrics', blockId);

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

const SplitBusinessTestimonialCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('splitBusinessTestimonial', blockId);

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

const SplitBusinessFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('splitBusinessFeatures', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="features"
      leftMedia={true}
      useContainer={true}
    />
  );
};

const SplitBusinessAboutCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getBusinessContent } = useBusinessContent();
  const content = providedContent || getBusinessContent('splitBusinessAbout', blockId);

  return (
    <SplitBusiness
      content={content}
      variant="about"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// Grid Business Template Definitions
const gridBusinessTemplates: Record<string, Template> = {
  gridBusinessCardsGallery: {
    id: "gridBusinessCardsGallery",
    name: "Business Cards Gallery",
    category: "business",
    description: "Grid layout showcasing business services and solutions",
    component: GridBusinessCardsGalleryCustom,
    tags: ["business", "grid", "services"],
    preview: "/previews/business/grid-cards-gallery.jpg"
  },
  gridBusinessSolutionsGrid: {
    id: "gridBusinessSolutionsGrid",
    name: "Business Solutions Grid",
    category: "business", 
    description: "Grid layout for business solutions with stats and images",
    component: GridBusinessSolutionsGridCustom,
    tags: ["business", "grid", "solutions"],
    preview: "/previews/business/grid-solutions.jpg"
  },
  gridBusinessPricing: {
    id: "gridBusinessPricing",
    name: "Business Pricing",
    category: "business",
    description: "Grid layout for pricing plans and packages",
    component: GridBusinessPricingCustom,
    tags: ["business", "grid", "pricing"],
    preview: "/previews/business/grid-pricing.jpg"
  },
  gridBusinessPricingYear: {
    id: "gridBusinessPricingYear",
    name: "Business Pricing with Yearly Toggle",
    category: "business",
    description: "Grid layout for pricing with monthly/yearly toggle",
    component: GridBusinessPricingYearCustom,
    tags: ["business", "grid", "pricing", "yearly"],
    preview: "/previews/business/grid-pricing-year.jpg"
  },
  gridBusinessCareer: {
    id: "gridBusinessCareer",
    name: "Business Career Openings",
    category: "business",
    description: "Grid layout for job openings and career opportunities",
    component: GridBusinessCareerCustom,
    tags: ["business", "grid", "career"],
    preview: "/previews/business/grid-career.jpg"
  }
};

// Split Business Template Definitions
const splitBusinessTemplates: Record<string, Template> = {
  splitBusinessSolutions: {
    id: "splitBusinessSolutions",
    name: "Business Solutions Split",
    category: "business",
    description: "Split layout for showcasing business solutions with metrics",
    component: SplitBusinessSolutionsCustom,
    tags: ["business", "split", "solutions"],
    preview: "/previews/business/split-solutions.jpg"
  },
  splitBusinessMetrics: {
    id: "splitBusinessMetrics",
    name: "Business Metrics Split",
    category: "business",
    description: "Split layout highlighting business metrics and stats", 
    component: SplitBusinessMetricsCustom,
    tags: ["business", "split", "metrics"],
    preview: "/previews/business/split-metrics.jpg"
  },
  splitBusinessTestimonial: {
    id: "splitBusinessTestimonial",
    name: "Business Testimonial Split",
    category: "business",
    description: "Split layout featuring customer testimonials",
    component: SplitBusinessTestimonialCustom,
    tags: ["business", "split", "testimonial"],
    preview: "/previews/business/split-testimonial.jpg"
  },
  splitBusinessFeatures: {
    id: "splitBusinessFeatures",
    name: "Business Features Split",
    category: "business",
    description: "Split layout showcasing platform features",
    component: SplitBusinessFeaturesCustom,
    tags: ["business", "split", "features"],
    preview: "/previews/business/split-features.jpg"
  },
  splitBusinessAbout: {
    id: "splitBusinessAbout",
    name: "Business About Split",
    category: "business",
    description: "Split layout for company story and values",
    component: SplitBusinessAboutCustom,
    tags: ["business", "split", "about"],
    preview: "/previews/business/split-about.jpg"
  }
};

// Component mappings for custom templates
const gridBusinessCustom: Record<string, React.ComponentType<ContentProps>> = {
  gridBusinessCardsGallery: GridBusinessCardsGalleryCustom,
  gridBusinessSolutionsGrid: GridBusinessSolutionsGridCustom,
  gridBusinessPricing: GridBusinessPricingCustom,
  gridBusinessPricingYear: GridBusinessPricingYearCustom,
  gridBusinessCareer: GridBusinessCareerCustom
};

const splitBusinessCustom: Record<string, React.ComponentType<ContentProps>> = {
  splitBusinessSolutions: SplitBusinessSolutionsCustom,
  splitBusinessMetrics: SplitBusinessMetricsCustom,
  splitBusinessTestimonial: SplitBusinessTestimonialCustom,
  splitBusinessFeatures: SplitBusinessFeaturesCustom,
  splitBusinessAbout: SplitBusinessAboutCustom
};

// Export all business templates
export const allBusinessTemplates = [
  ...Object.keys(gridBusinessTemplates).map(key => {
    const template = gridBusinessTemplates[key as keyof typeof gridBusinessTemplates];
    const customComponent = gridBusinessCustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitBusinessTemplates).map(key => {
    const template = splitBusinessTemplates[key as keyof typeof splitBusinessTemplates];
    const customComponent = splitBusinessCustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];