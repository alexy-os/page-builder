// Hook for managing dynamic block content from collections
import { useCallback, useMemo } from 'react';
import { useProjectStore } from '@/store';
import { CenteredHeroContent, SplitHeroContent } from '@/components/blocks/hero/content';

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
      // For saved blocks, extract the type from templateId
      const blockType = extractBlockTypeFromTemplateId(templateId);
      if (blockType) {
        const customContent = getBlockDataById(blockId, blockType);
        if (customContent?.content) {
          return customContent.content;
        }
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
 * Get default content for a template
 */
function getDefaultContent(templateId: string): any {
  // Hero blocks
  if (templateId.startsWith('centered')) {
    const key = templateId as keyof typeof CenteredHeroContent;
    return CenteredHeroContent[key] || null;
  }
  
  if (templateId.startsWith('split')) {
    const key = templateId as keyof typeof SplitHeroContent;
    return SplitHeroContent[key] || null;
  }
  
  // Add other block types here as needed
  // if (templateId.startsWith('blog')) { ... }
  // if (templateId.startsWith('features')) { ... }
  
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