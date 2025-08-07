// Hook for managing dynamic block content from collections
import { useCallback, useMemo } from 'react';
import { useProjectStore } from '@/store';
import { blockRegistry } from '@/lib/blockRegistry';
import { CenteredHeroContent, SplitHeroContent } from '@/components/blocks/hero/content';
import { SplitBlogContent, GridBlogContent } from '@/components/blocks/blog/content';
import { GridBusinessContent, SplitBusinessContent } from '@/components/blocks/business/hooks';

// Helper function to clean content from corrupted objects (from JSON serialization)
const cleanContentFromSession = (content: any): any => {
  if (!content || typeof content !== 'object') return content;
  
  const cleaned = { ...content };
  
  // Remove corrupted React components and functions
  Object.keys(cleaned).forEach(key => {
    const value = cleaned[key];
    
    // Remove objects that look like serialized React components or functions
    if (typeof value === 'object' && value !== null) {
      // Check for common React component properties that become objects after JSON serialization
      if (value.$$typeof || value.displayName || value.render || 
          (key.includes('Icon') || key.includes('icon'))) {
        delete cleaned[key];
      }
      // Recursively clean nested objects
      else if (Array.isArray(value)) {
        cleaned[key] = value.map(item => cleanContentFromSession(item));
      } else {
        cleaned[key] = cleanContentFromSession(value);
      }
    }
  });
  
  return cleaned;
};

export interface ContentAdapter {
  getContent: (templateId: string, blockId?: string) => any;
  saveContent: (templateId: string, blockId: string, content: any) => void;
  hasCustomContent: (templateId: string, blockId?: string) => boolean;
}

/**
 * Hook for getting and managing block content
 * Provides an adapter to get content from:
 * 1. Session data stored in project.data (highest priority)  
 * 2. Custom data by blockId (if available)
 * 3. Default content from static content files (fallback)
 */
export function useBlockContent(): ContentAdapter {
  const { 
    getContentForSavedBlock, 
    updateBlockData, 
    getBlockDataById,
    getBlockData
  } = useProjectStore();

  // Get content for a specific template/block
  const getContent = useCallback((templateId: string, blockId?: string) => {
    // PRIORITY 1: Check if we have content in session data (from import/migration)
    const allBlockData = getBlockData();
    
    // Look for content by templateId in session data (most common case)
    const sessionContent = allBlockData.find(item => item.type === templateId);
    if (sessionContent?.content) {
      // Clean the session content from any corrupted objects
      const cleanedSessionContent = cleanContentFromSession(sessionContent.content);
      return cleanedSessionContent;
    }

    // PRIORITY 2: If blockId is provided, try to get specific custom content
    if (blockId) {
      // Since blockId now equals templateId, use it directly
      const customContent = getBlockDataById(blockId, blockId);
      if (customContent?.content) {
        return customContent.content;
      }
      
      // Try alternative method using savedBlock ID format
      const savedBlockContent = getContentForSavedBlock(blockId);
      if (savedBlockContent) {
        return savedBlockContent;
      }
    }

    // PRIORITY 3: Fallback to default static content
    return getDefaultContent(templateId);
  }, [getContentForSavedBlock, getBlockDataById, getBlockData]);

  // Save custom content for a block  
  const saveContent = useCallback((templateId: string, blockId: string, content: any) => {
    const blockType = extractBlockTypeFromTemplateId(templateId);
    if (blockType) {
      updateBlockData(blockId, blockType, content);
    }
  }, [updateBlockData]);

  // Check if a block has custom content
  const hasCustomContent = useCallback((templateId: string, blockId?: string) => {
    if (!blockId) return false;
    
    const blockType = extractBlockTypeFromTemplateId(templateId);
    if (blockType) {
      const customContent = getBlockDataById(blockId, blockType);
      return !!customContent?.content;
    }
    
    // Try alternative method
    const savedBlockContent = getContentForSavedBlock(blockId);
    return !!savedBlockContent;
  }, [getBlockDataById, getContentForSavedBlock]);

  return useMemo(() => ({
    getContent,
    saveContent,
    hasCustomContent
  }), [getContent, saveContent, hasCustomContent]);
}

/**
 * Extract block type from templateId
 * Example: "centeredHeroSimple" -> "centeredHeroSimple"
 *          "splitHeroMedia" -> "splitHeroMedia"
 */
function extractBlockTypeFromTemplateId(templateId: string): string | null {
  // For hero blocks, the templateId IS the block type
  if (templateId.includes('Hero') || templateId.includes('hero')) {
    return templateId;
  }
  
  // Add logic for other block types if needed
  return templateId;
}

/**
 * Get default content for a template using block registry
 */
function getDefaultContent(templateId: string): any {
  // Try to get content from registered block providers first
  const registryContent = blockRegistry.getContent(templateId);
  if (registryContent) {
    return registryContent;
  }

  // Fallback to hardcoded logic for backward compatibility
  // Hero blocks
  if (templateId.startsWith('centered')) {
    const key = templateId as keyof typeof CenteredHeroContent;
    return CenteredHeroContent[key] || null;
  }
  
  if (templateId.startsWith('split')) {
    const key = templateId as keyof typeof SplitHeroContent;
    return SplitHeroContent[key] || null;
  }
  
  // Blog blocks
  if (templateId.startsWith('splitBlog')) {
    const key = templateId as keyof typeof SplitBlogContent;
    return SplitBlogContent[key] || null;
  }
  
  if (templateId.startsWith('gridBlog')) {
    const key = templateId as keyof typeof GridBlogContent;
    return GridBlogContent[key] || null;
  }
  
  return null;
}

/**
 * Hook specifically for Hero block content with type safety
 * Now prioritizes session data over static content
 */
export function useHeroContent() {
  const contentAdapter = useBlockContent();
  
  return {
    ...contentAdapter,
    // Type-safe methods for Hero blocks with session priority
    getCenteredHeroContent: (templateId: keyof typeof CenteredHeroContent, blockId?: string) => {
      // Use the smart content adapter which checks session first
      const content = contentAdapter.getContent(templateId, blockId);
      // If nothing found, fallback to static content (should rarely happen now)
      return content || CenteredHeroContent[templateId];
    },
    getSplitHeroContent: (templateId: keyof typeof SplitHeroContent, blockId?: string) => {
      // Use the smart content adapter which checks session first  
      const content = contentAdapter.getContent(templateId, blockId);
      // If nothing found, fallback to static content (should rarely happen now)
      return content || SplitHeroContent[templateId];
    },
    
    // Helper method to check if content is coming from session
    isContentFromSession: (templateId: string) => {
      // Check if there's session content for this template
      return contentAdapter.hasCustomContent(templateId);
    }
  };
}

export function useBlogContent() {
  const contentAdapter = useBlockContent();

  return {
    ...contentAdapter,
    getSplitBlogContent: (templateId: keyof typeof SplitBlogContent, blockId?: string) => {
      const content = contentAdapter.getContent(templateId, blockId);
      return content || SplitBlogContent[templateId];
    },
    getGridBlogContent: (templateId: keyof typeof GridBlogContent, blockId?: string) => {
      const content = contentAdapter.getContent(templateId, blockId);
      return content || GridBlogContent[templateId];
    },
    isContentFromSession: (templateId: string) => {
      return contentAdapter.hasCustomContent(templateId);
    }
  };
}

/**
 * Hook specifically for Business block content with type safety
 * Similar to useHeroContent but for business blocks
 */
export function useBusinessContent() {
  const contentAdapter = useBlockContent();
  
  return {
    ...contentAdapter,
    // Type-safe methods for Business blocks with session priority
    getGridBusinessContent: (templateId: keyof typeof GridBusinessContent, blockId?: string) => {
      // Use the smart content adapter which checks session first
      const content = contentAdapter.getContent(templateId, blockId);
      // If nothing found, fallback to static content
      return content || GridBusinessContent[templateId];
    },
    getSplitBusinessContent: (templateId: keyof typeof SplitBusinessContent, blockId?: string) => {
      // Use the smart content adapter which checks session first  
      const content = contentAdapter.getContent(templateId, blockId);
      // If nothing found, fallback to static content
      return content || SplitBusinessContent[templateId];
    },
    
    // Helper method to check if content is coming from session
    isContentFromSession: (templateId: string) => {
      // Check if there's session content for this template
      return contentAdapter.hasCustomContent(templateId);
    }
  };
}