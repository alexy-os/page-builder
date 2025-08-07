// Example hook showing how to use the new content management system
import { useCallback } from 'react';
import { useProjectStore } from '@/store';
import { useBlockContent } from './useBlockContent';

/**
 * Example hook demonstrating content management for blocks
 * Shows how to save and load custom content for blocks in collections
 */
export function useContentManagement() {
  const { 
    getSavedBlocks, 
    getCollections, 
    updateBlockData, 
    getContentForSavedBlock 
  } = useProjectStore();
  
  const contentAdapter = useBlockContent();

  // Example: Save custom content for a hero block
  const saveCustomHeroContent = useCallback((savedBlockId: string, customContent: any) => {
    // Extract templateId from savedBlock
    const savedBlocks = getSavedBlocks();
    const savedBlock = savedBlocks.find(block => block.id === savedBlockId);
    
    if (!savedBlock) {
      console.error('SavedBlock not found:', savedBlockId);
      return false;
    }

    try {
      // Since savedBlockId now equals templateId directly, use it as both blockId and blockType
      updateBlockData(savedBlockId, savedBlockId, customContent);
      
      console.log('✅ Custom content saved:', { blockId: savedBlockId, blockType: savedBlockId, content: customContent });
      return true;
    } catch (error) {
      console.error('Error saving custom content:', error);
    }
    
    return false;
  }, [getSavedBlocks, updateBlockData]);

  // Example: Get content for a block (custom or default)
  const getBlockContent = useCallback((templateId: string, savedBlockId?: string) => {
    if (savedBlockId) {
      // Try to get custom content first
      const customContent = getContentForSavedBlock(savedBlockId);
      if (customContent) {
        return customContent;
      }
    }
    
    // Fallback to default content
    return contentAdapter.getContent(templateId, savedBlockId);
  }, [getContentForSavedBlock, contentAdapter]);

  // Example: List all blocks with custom content in collections  
  const listCustomContentBlocks = useCallback(() => {
    const collections = getCollections();
    const savedBlocks = getSavedBlocks();
    const customBlocks: Array<{
      collectionName: string;
      blockName: string;
      blockId: string;
      templateId: string;
      hasCustomContent: boolean;
    }> = [];

    collections.forEach(collection => {
      collection.blockIds.forEach(blockId => {
        const savedBlock = savedBlocks.find(block => block.id === blockId);
        if (savedBlock) {
          const hasCustomContent = contentAdapter.hasCustomContent(savedBlock.templateId, blockId);
          customBlocks.push({
            collectionName: collection.name,
            blockName: savedBlock.name,
            blockId: blockId,
            templateId: savedBlock.templateId,
            hasCustomContent
          });
        }
      });
    });

    return customBlocks;
  }, [getCollections, getSavedBlocks, contentAdapter]);

  return {
    saveCustomHeroContent,
    getBlockContent,
    listCustomContentBlocks,
    // Direct access to content adapter methods
    ...contentAdapter
  };
}

// Usage example:
/*
function ExampleComponent() {
  const { 
    saveCustomHeroContent, 
    getBlockContent, 
    listCustomContentBlocks 
  } = useContentManagement();

  // Save custom hero content
  const handleSaveContent = () => {
    const customContent = {
      badge: "Custom Badge",
      title: "My Custom Hero Title", 
      description: "This is custom content for this hero block",
      primaryButtonText: "Custom CTA",
      // ... other content fields
    };
    
    saveCustomHeroContent("heroSplitMedia", customContent);
  };

  // Get content for rendering (custom or default)
  const heroContent = getBlockContent("heroSplitMedia", "heroSplitMedia");
  
  // List all blocks with custom content
  const customBlocks = listCustomContentBlocks();
  console.log('Blocks with custom content:', customBlocks);

  return (
    <div>
      <HeroComponent content={heroContent} />
      <button onClick={handleSaveContent}>Save Custom Content</button>
    </div>
  );
}
*/