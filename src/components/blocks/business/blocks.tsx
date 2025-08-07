// Business blocks components - GridBusiness and SplitBusiness
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useBlockContent } from "@/hooks/useBlockContent";

// =================
// TYPE DEFINITIONS
// =================

interface BusinessCard {
  id: string;
  title: string;
  description: string;
  lucideIcon?: any;
  colSpan?: number;
  rowSpan?: number;
}

interface BusinessSolution {
  id: string;
  title: string;
  description: string;
  lucideIcon?: any;
  stats?: {
    value: string;
    label: string;
  };
  image?: {
    src: string;
    alt: string;
  };
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  monthlyPrice?: string;
  yearlyPrice?: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "outline" | "secondary";
  isPopular?: boolean;
}

interface CareerOpening {
  id: string;
  title: string;
  location: string;
  department: string;
  type: string;
  salary: string;
}

interface BusinessMetric {
  id: string;
  value: string;
  label: string;
  change?: string;
  lucideIcon?: any;
}

interface BusinessFeature {
  id: string;
  title: string;
  description: string;
  lucideIcon?: any;
}

interface BusinessTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
}

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  lucideIcon?: any;
}

// Grid Business Data interface
export interface GridBusinessData {
  promo?: string;
  badge?: string;
  title: string;
  description?: string;
  buttonText?: string;
  cards?: BusinessCard[];
  solutions?: BusinessSolution[];
  plans?: PricingPlan[];
  openings?: CareerOpening[];
  _showYearlyToggle?: boolean;
}

// Split Business Data interface
export interface SplitBusinessData {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  metrics?: BusinessMetric[];
  features?: BusinessFeature[];
  testimonials?: BusinessTestimonial[];
  cards?: CompanyValue[];
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
  content?: GridBusinessData;
  variant?: "cardsGallery" | "solutionsGrid" | "pricing" | "pricingYear" | "career";
  cols?: "1-2-3" | "1-2" | "1-3" | "1-4";
  className?: string;
  useContainer?: boolean;
  templateId?: string;
  savedBlockId?: string;
}

export function GridBusiness({
  content: providedContent,
  variant = "cardsGallery",
  cols = "1-2-3",
  className = "",
  useContainer = true,
  templateId,
  savedBlockId
}: GridBusinessProps) {
  const contentAdapter = useBlockContent();

  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content: GridBusinessData = providedContent || 
    contentAdapter.getContent(templateId || `gridBusiness${variant}`, savedBlockId) || 
    { title: "Business Solutions", description: "Discover our comprehensive business offerings" };

  const containerClass = useContainer ? "container mx-auto px-4" : "";
  
  const getGridCols = () => {
    switch (cols) {
      case "1-2": return "grid-cols-1 md:grid-cols-2";
      case "1-3": return "grid-cols-1 md:grid-cols-3";
      case "1-4": return "grid-cols-1 md:grid-cols-4";
      case "1-2-3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className={containerClass}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {(content.promo || content.badge) && (
            <Badge variant="secondary" className="mb-4">
              {content.promo || content.badge}
            </Badge>
          )}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg text-muted-foreground">
              {content.description}
            </p>
          )}
        </div>

        {/* Content based on variant */}
        {variant === "cardsGallery" && content.cards && (
          <div className={cn("grid gap-6", getGridCols())}>
            {content.cards.map((card) => {
              const IconComponent = card.lucideIcon;
              return (
                <Card 
                  key={card.id} 
                  className={cn(
                    "h-full",
                    card.colSpan === 2 && "md:col-span-2",
                    card.rowSpan === 2 && "md:row-span-2"
                  )}
                >
                  <CardHeader>
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-primary mb-2" />
                    )}
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {variant === "solutionsGrid" && content.solutions && (
          <div className={cn("grid gap-6", getGridCols())}>
            {content.solutions.map((solution) => {
              const IconComponent = solution.lucideIcon;
              return (
                <Card key={solution.id} className="h-full">
                  <CardHeader>
                    {IconComponent && (
                      <IconComponent className="h-8 w-8 text-primary mb-2" />
                    )}
                    <CardTitle className="text-xl">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {solution.description}
                    </CardDescription>
                    {solution.stats && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {solution.stats.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {solution.stats.label}
                        </div>
                      </div>
                    )}
                    {solution.image && (
                      <img
                        src={solution.image.src}
                        alt={solution.image.alt}
                        className="w-full h-48 object-cover rounded-md mt-4"
                      />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {(variant === "pricing" || variant === "pricingYear") && content.plans && (
          <div className={cn("grid gap-6", getGridCols())}>
            {content.plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "h-full relative",
                  plan.isPopular && "border-primary shadow-lg scale-105"
                )}
              >
                {plan.isPopular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-primary mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.buttonVariant || "default"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {variant === "career" && content.openings && (
          <div className={cn("grid gap-6", getGridCols())}>
            {content.openings.map((opening) => (
              <Card key={opening.id} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{opening.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>{opening.location}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{opening.department}</Badge>
                        <Badge variant="outline">{opening.type}</Badge>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold text-primary">
                    {opening.salary}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {content.buttonText && (
          <div className="text-center mt-12">
            <Button size="lg">
              {content.buttonText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// =================
// SPLIT BUSINESS COMPONENT
// =================

interface SplitBusinessProps {
  content?: SplitBusinessData;
  variant?: "solutions" | "metrics" | "testimonial" | "features" | "about";
  leftMedia?: boolean;
  className?: string;
  useContainer?: boolean;
  templateId?: string;
  savedBlockId?: string;
}

export function SplitBusiness({
  content: providedContent,
  variant = "solutions",
  leftMedia = false,
  className = "",
  useContainer = true,
  templateId,
  savedBlockId
}: SplitBusinessProps) {
  const contentAdapter = useBlockContent();

  // PRIORITY: 1. Provided content, 2. Session content (via adapter), 3. Static fallback
  const content: SplitBusinessData = providedContent || 
    contentAdapter.getContent(templateId || `splitBusiness${variant}`, savedBlockId) || 
    { title: "Business Excellence", description: "Driving innovation and growth" };

  const containerClass = useContainer ? "container mx-auto px-4" : "";

  const ContentSection = () => (
    <div className="space-y-6">
      {content.badge && (
        <Badge variant="secondary">{content.badge}</Badge>
      )}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {content.title}
        </h2>
        {content.subtitle && (
          <h3 className="text-xl text-muted-foreground mb-4">
            {content.subtitle}
          </h3>
        )}
        {content.description && (
          <p className="text-lg text-muted-foreground">
            {content.description}
          </p>
        )}
      </div>

      {/* Metrics */}
      {content.metrics && (
        <div className="grid grid-cols-2 gap-4">
          {content.metrics.map((metric) => {
            const IconComponent = metric.lucideIcon;
            return (
              <div key={metric.id} className="text-center">
                {IconComponent && (
                  <IconComponent className="h-6 w-6 text-primary mx-auto mb-2" />
                )}
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
                {metric.change && (
                  <div className="text-xs text-green-600">{metric.change}</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Stats */}
      {content.stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{content.stats.clients}</div>
            <div className="text-sm text-muted-foreground">Clients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{content.stats.projects}</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{content.stats.satisfaction}</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{content.stats.years}</div>
            <div className="text-sm text-muted-foreground">Years</div>
          </div>
        </div>
      )}

      {/* Features */}
      {content.features && (
        <div className="space-y-4">
          {content.features.map((feature) => {
            const IconComponent = feature.lucideIcon;
            return (
              <div key={feature.id} className="flex items-start gap-4">
                {IconComponent && (
                  <IconComponent className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Company Values */}
      {content.cards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.cards.map((value) => {
            const IconComponent = value.lucideIcon;
            return (
              <div key={value.id} className="flex items-start gap-3">
                {IconComponent && (
                  <IconComponent className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                )}
                <div>
                  <h4 className="font-semibold mb-1">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Testimonials */}
      {content.testimonials && content.testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="p-6">
          <blockquote className="text-lg mb-4">
            "{testimonial.quote}"
          </blockquote>
          <div className="flex items-center gap-3">
            {testimonial.author.avatar && (
              <img
                src={testimonial.author.avatar}
                alt={testimonial.author.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="font-semibold">{testimonial.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {testimonial.author.role} at {testimonial.author.company}
              </div>
            </div>
          </div>
        </Card>
      ))}

      {/* Buttons */}
      {(content.buttonText || content.secondaryButtonText) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {content.buttonText && (
            <Button size="lg">{content.buttonText}</Button>
          )}
          {content.secondaryButtonText && (
            <Button size="lg" variant="outline">
              {content.secondaryButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const MediaSection = () => (
    content.image ? (
      <div className="relative">
        <img
          src={content.image.src}
          alt={content.image.alt}
          className="w-full h-[400px] lg:h-[500px] object-cover rounded-lg"
        />
      </div>
    ) : null
  );

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
}