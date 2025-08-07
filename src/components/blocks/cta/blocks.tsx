import React from "react";
import { useCTAContent } from "@/hooks/useBlockContent";
import type { Template } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Simple CTA Components
 */

// Interface for content props that can be passed to components
interface ContentProps {
  content?: any;
  blockId?: string;
}

// Simple CenteredCTA component
const CenteredCTA = ({ content, variant = "simple", useContainer = true, className = "" }: any) => {
  if (!content) return <div>No content</div>;

  return (
    <section className={`py-16 ${className}`}>
      <div className={useContainer ? "container mx-auto px-4" : ""}>
        <div className="max-w-4xl mx-auto text-center">
          {content.badge && (
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              {content.badge}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{content.title}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{content.description}</p>
          
          {content.buttonText && (
            <Button size="lg" className="mb-8">
              {content.buttonText}
              {content.buttonIcon && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          )}

          {/* Stats */}
          {content.stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {content.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Features */}
          {content.features && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {content.features.map((feature: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {feature.icon && <feature.icon className="h-6 w-6 text-primary" />}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Logos */}
          {content.logos && (
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
              {content.logos.map((logo: any, index: number) => (
                <div key={index} className="text-sm font-medium">
                  {logo.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Simple SplitCTA component
const SplitCTA = ({ content, variant = "withImage", leftMedia = false, useContainer = true, className = "" }: any) => {
  if (!content) return <div>No content</div>;

  const ContentSection = () => (
    <div className="flex flex-col justify-center space-y-6">
      {content.badge && (
        <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium w-fit">
          {content.badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold">{content.title}</h2>
      <p className="text-lg text-muted-foreground">{content.description}</p>
      
      {content.buttonText && (
        <Button size="lg" className="w-fit">
          {content.buttonText}
          {content.buttonIcon && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      )}

      {/* Features */}
      {content.features && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {content.features.map((feature: any, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                {feature.icon && <feature.icon className="h-4 w-4 text-primary" />}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {content.stats && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          {content.stats.map((stat: any, index: number) => (
            <div key={index}>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* App Stores */}
      {content.appStores && (
        <div className="flex space-x-4 mt-6">
          {content.appStores.map((store: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 bg-secondary/50 px-4 py-2 rounded-lg">
              <span>{store.icon}</span>
              <span className="text-sm font-medium">{store.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const ImageSection = () => (
    <div className="flex items-center justify-center">
      {content.image ? (
        <img 
          src={content.image.src} 
          alt={content.image.alt} 
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      ) : (
        <div className="w-full h-64 bg-secondary/50 rounded-lg flex items-center justify-center">
          <span className="text-muted-foreground">Image placeholder</span>
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-16 ${className}`}>
      <div className={useContainer ? "container mx-auto px-4" : ""}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {leftMedia ? (
            <>
              <ImageSection />
              <ContentSection />
            </>
          ) : (
            <>
              <ContentSection />
              <ImageSection />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// ===== CENTERED CTA EXAMPLES =====

// 1. Simple CTA
const CenteredCTASimpleCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTASimple', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="simple"
      useContainer={true}
    />
  );
};

// 2. CTA with stats
const CenteredCTAWithStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithStats', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withStats"
      useContainer={true}
    />
  );
};

// 3. CTA with logos
const CenteredCTAWithLogosCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithLogos', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withLogos"
      useContainer={true}
    />
  );
};

// 4. CTA with background
const CenteredCTAWithBackgroundCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithBackground', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withBackground"
      useContainer={true}
      className="bg-gradient-to-br from-primary/50 to-secondary/50"
    />
  );
};

// 5. CTA with features
const CenteredCTAWithFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getCenteredCTAContent } = useCTAContent();
  
  const content = providedContent || getCenteredCTAContent('centeredCTAWithFeatures', blockId);

  return (
    <CenteredCTA
      content={content}
      variant="withFeatures"
      useContainer={true}
      className="bg-gradient-to-br from-primary/5 to-secondary/5"
    />
  );
};

// ===== SPLIT CTA EXAMPLES =====

// 1. Split CTA with image
const SplitCTAWithImageCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithImage', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withImage"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// 2. Split CTA with stats
const SplitCTAWithStatsCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithStats', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withStats"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 3. Split CTA with background
const SplitCTAWithBackgroundCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithBackground', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withBackground"
      leftMedia={false}
      useContainer={true}
      className="bg-gradient-to-r from-primary/50 to-primary/10"
    />
  );
};

// 4. Split CTA with features
const SplitCTAWithFeaturesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithFeatures', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withFeatures"
      leftMedia={true}
      useContainer={true}
    />
  );
};

// 5. Split CTA with devices
const SplitCTAWithDevicesCustom = ({ content: providedContent, blockId }: ContentProps = {}) => {
  const { getSplitCTAContent } = useCTAContent();
  
  const content = providedContent || getSplitCTAContent('splitCTAWithDevices', blockId);

  return (
    <SplitCTA
      content={content}
      variant="withDevices"
      leftMedia={false}
      useContainer={true}
    />
  );
};

// Component mappings for custom templates
const centeredCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  centeredCTASimple: CenteredCTASimpleCustom,
  centeredCTAWithStats: CenteredCTAWithStatsCustom,
  centeredCTAWithLogos: CenteredCTAWithLogosCustom,
  centeredCTAWithBackground: CenteredCTAWithBackgroundCustom,
  centeredCTAWithFeatures: CenteredCTAWithFeaturesCustom
};

const splitCTACustom: Record<string, React.ComponentType<ContentProps>> = {
  splitCTAWithImage: SplitCTAWithImageCustom,
  splitCTAWithStats: SplitCTAWithStatsCustom,
  splitCTAWithBackground: SplitCTAWithBackgroundCustom,
  splitCTAWithFeatures: SplitCTAWithFeaturesCustom,
  splitCTAWithDevices: SplitCTAWithDevicesCustom
};

// Define our own templates since we can't import them from @ui8kit/blocks
const centeredCTATemplates: Record<string, Template> = {
  centeredCTASimple: {
    id: "centeredCTASimple",
    name: "Simple CTA",
    description: "Simple centered call-to-action",
    component: CenteredCTASimpleCustom
  },
  centeredCTAWithStats: {
    id: "centeredCTAWithStats",
    name: "CTA with Stats",
    description: "Centered CTA with statistics",
    component: CenteredCTAWithStatsCustom
  },
  centeredCTAWithLogos: {
    id: "centeredCTAWithLogos",
    name: "CTA with Logos",
    description: "Centered CTA with company logos",
    component: CenteredCTAWithLogosCustom
  },
  centeredCTAWithBackground: {
    id: "centeredCTAWithBackground",
    name: "CTA with Background",
    description: "Centered CTA with background image",
    component: CenteredCTAWithBackgroundCustom
  },
  centeredCTAWithFeatures: {
    id: "centeredCTAWithFeatures",
    name: "CTA with Features",
    description: "Centered CTA showcasing key features",
    component: CenteredCTAWithFeaturesCustom
  }
};

const splitCTATemplates: Record<string, Template> = {
  splitCTAWithImage: {
    id: "splitCTAWithImage",
    name: "Split CTA with Image",
    description: "Split layout CTA with side image",
    component: SplitCTAWithImageCustom
  },
  splitCTAWithStats: {
    id: "splitCTAWithStats",
    name: "Split CTA with Stats",
    description: "Split layout CTA with statistics",
    component: SplitCTAWithStatsCustom
  },
  splitCTAWithBackground: {
    id: "splitCTAWithBackground",
    name: "Split CTA with Background",
    description: "Split layout CTA with background",
    component: SplitCTAWithBackgroundCustom
  },
  splitCTAWithFeatures: {
    id: "splitCTAWithFeatures",
    name: "Split CTA with Features",
    description: "Split layout showcasing features",
    component: SplitCTAWithFeaturesCustom
  },
  splitCTAWithDevices: {
    id: "splitCTAWithDevices",
    name: "Split CTA with Devices",
    description: "Split layout for app download with devices",
    component: SplitCTAWithDevicesCustom
  }
};

// Export all CTA templates following hero pattern
export const allCTATemplates = [
  ...Object.keys(centeredCTATemplates).map(key => {
    const template = centeredCTATemplates[key as keyof typeof centeredCTATemplates];
    const customComponent = centeredCTACustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  }),
  ...Object.keys(splitCTATemplates).map(key => {
    const template = splitCTATemplates[key as keyof typeof splitCTATemplates];
    const customComponent = splitCTACustom[template.id];
    return {
      ...template,
      component: customComponent || (() => <div>Missing Component: {template.id}</div>)
    };
  })
];