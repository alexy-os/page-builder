// Block registry system for dynamic block type management
export interface BlockContentProvider {
  getContent: (templateId: string) => any;
  isValidTemplate: (templateId: string) => boolean;
  cleanContent: (content: any) => any;
  name: string;
}

// Global registry of block content providers
class BlockRegistry {
  private providers = new Map<string, BlockContentProvider>();

  // Register a content provider for a block type
  register(blockType: string, provider: BlockContentProvider) {
    this.providers.set(blockType, provider);
  }

  // Get content provider for a block type
  getProvider(templateId: string): BlockContentProvider | null {
    // Try to find provider by checking if templateId matches any registered type
    for (const [, provider] of this.providers.entries()) {
      if (provider.isValidTemplate(templateId)) {
        return provider;
      }
    }
    return null;
  }

  // Get content for any template using registered providers
  getContent(templateId: string): any {
    const provider = this.getProvider(templateId);
    return provider ? provider.getContent(templateId) : null;
  }

  // Clean content using the appropriate provider
  cleanContent(templateId: string, content: any): any {
    const provider = this.getProvider(templateId);
    return provider ? provider.cleanContent(content) : content;
  }

  // Check if template is supported
  isValidTemplate(templateId: string): boolean {
    return this.getProvider(templateId) !== null;
  }

  // Get all registered provider names
  getRegisteredTypes(): string[] {
    return Array.from(this.providers.keys());
  }
}

// Global singleton instance
export const blockRegistry = new BlockRegistry();

// Utility function to register block types (called during app initialization)
export function initializeBlockRegistry() {
  // Dynamically import and register providers to avoid circular dependencies
  import('@/components/blocks/hero/hooks').then(({ getHeroContent, isHeroTemplate, cleanHeroContent }) => {
    blockRegistry.register('hero', {
      name: 'Hero',
      getContent: getHeroContent,
      isValidTemplate: isHeroTemplate,
      cleanContent: cleanHeroContent
    });
  });

  import('@/components/blocks/blog/hooks').then(({ getBlogContent, isBlogTemplate, cleanBlogContent }) => {
    blockRegistry.register('blog', {
      name: 'Blog', 
      getContent: getBlogContent,
      isValidTemplate: isBlogTemplate,
      cleanContent: cleanBlogContent
    });
  });

  import('@/components/blocks/business/hooks').then(({ getBusinessContent, isBusinessTemplate, cleanBusinessContent }) => {
    blockRegistry.register('business', {
      name: 'Business',
      getContent: getBusinessContent,
      isValidTemplate: isBusinessTemplate,
      cleanContent: cleanBusinessContent
    });
  });

  import('@/components/blocks/cta/hooks').then(({ getCTAContent, isCTATemplate, cleanCTAContent }) => {
    blockRegistry.register('cta', {
      name: 'CTA',
      getContent: getCTAContent,
      isValidTemplate: isCTATemplate,
      cleanContent: cleanCTAContent
    });
  });

  import('@/components/blocks/faq/hooks').then(({ getFAQContent, isFAQTemplate, cleanFAQContent }) => {
    blockRegistry.register('faq', {
      name: 'FAQ',
      getContent: getFAQContent,
      isValidTemplate: isFAQTemplate,
      cleanContent: cleanFAQContent
    });
  });

  import('@/components/blocks/features/hooks').then(({ getFeaturesContent, isFeaturesTemplate, cleanFeaturesContent }) => {
    blockRegistry.register('features', {
      name: 'Features',
      getContent: getFeaturesContent,
      isValidTemplate: isFeaturesTemplate,
      cleanContent: cleanFeaturesContent
    });
  });

  import('@/components/blocks/footer/hooks').then(({ getFooterContent, isFooterTemplate, cleanFooterContent }) => {
    blockRegistry.register('footer', {
      name: 'Footer',
      getContent: getFooterContent,
      isValidTemplate: isFooterTemplate,
      cleanContent: cleanFooterContent
    });
  });

  import('@/components/blocks/gallery/hooks').then(({ getGalleryContent, isGalleryTemplate, cleanGalleryContent }) => {
    blockRegistry.register('gallery', {
      name: 'Gallery',
      getContent: getGalleryContent,
      isValidTemplate: isGalleryTemplate,
      cleanContent: cleanGalleryContent
    });
  });

  import('@/components/blocks/portfolio/hooks').then(({ getPortfolioContent, isPortfolioTemplate, cleanPortfolioContent }) => {
    blockRegistry.register('portfolio', {
      name: 'Portfolio',
      getContent: getPortfolioContent,
      isValidTemplate: isPortfolioTemplate,
      cleanContent: cleanPortfolioContent
    });
  });

  import('@/components/blocks/post/hooks').then(({ getPostContent, isPostTemplate, cleanPostContent }) => {
    blockRegistry.register('post', {
      name: 'Post',
      getContent: getPostContent,
      isValidTemplate: isPostTemplate,
      cleanContent: cleanPostContent
    });
  });

  import('@/components/blocks/team/hooks').then(({ getTeamContent, isTeamTemplate, cleanTeamContent }) => {
    blockRegistry.register('team', {
      name: 'Team',
      getContent: getTeamContent,
      isValidTemplate: isTeamTemplate,
      cleanContent: cleanTeamContent
    });
  });

  import('@/components/blocks/testimonial/hooks').then(({ getTestimonialContent, isTestimonialTemplate, cleanTestimonialContent }) => {
    blockRegistry.register('testimonial', {
      name: 'Testimonial',
      getContent: getTestimonialContent,
      isValidTemplate: isTestimonialTemplate,
      cleanContent: cleanTestimonialContent
    });
  });

  // Add more block types here as needed...
}