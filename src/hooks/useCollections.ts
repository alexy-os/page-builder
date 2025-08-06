// Simplified hook for working with collections through SimpleStorage

import { SimpleStorage } from '@/lib/storage/simpleStorage';
import type { Collection, SavedBlock } from '@/types';
import { CenteredHeroContent, SplitHeroContent } from '@/components/blocks/hero/content';

const storage = SimpleStorage.getInstance();

export function useCollections() {
  const collections = storage.getCollections();
  const savedBlocks = storage.getSavedBlocks();

  // Create a new collection
  const createCollection = (name: string): Collection => {
    const newCollection: Collection = {
      id: `user-${Date.now()}`,
      name,
      type: 'user',
      blockIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    storage.saveCollection(newCollection);
    return newCollection;
  };

  // Delete a collection
  const deleteCollection = (collectionId: string) => {
    storage.deleteCollection(collectionId);
  };

  // Save a block to a collection
  const saveBlockToCollection = (templateId: string, templateName: string, templateDescription: string, collectionId: string): SavedBlock => {
    const timestamp = Date.now();
    const blockId = `block-${templateId}-${timestamp}`;
    
    // Create saved block record
    const savedBlock: SavedBlock = {
      id: blockId,
      templateId,
      name: templateName,
      description: templateDescription,
      savedAt: new Date().toISOString(),
    };

    // Save the block
    storage.saveBlock(savedBlock);

    // **NEW**: Automatically save content from intermediate layer to data array
    const content = getContentFromIntermediateLayer(templateId);
    if (content) {
      const dataBlockId = `${templateId}_${timestamp}`;
      storage.updateBlockData(dataBlockId, templateId, content);
    }

    // Add block ID to collection
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      const updatedCollection = {
        ...collection,
        blockIds: [...collection.blockIds, blockId],
        updatedAt: new Date().toISOString(),
      };
      storage.saveCollection(updatedCollection);
    }

    return savedBlock;
  };

  // Helper function to clean content from non-serializable objects (React components, functions)
  const cleanContentForSerialization = (content: any): any => {
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
        cleaned[key] = cleanContentForSerialization(value);
      }
    });
    
    return cleaned;
  };

  // Helper function to get content from intermediate layer (content.ts)
  const getContentFromIntermediateLayer = (templateId: string): any => {
    let rawContent = null;
    
    // Check CenteredHero content first
    if (templateId.includes('Hero') && templateId.startsWith('centered')) {
      const key = templateId as keyof typeof CenteredHeroContent;
      rawContent = CenteredHeroContent[key];
    }
    
    // Check SplitHero content  
    else if (templateId.includes('Hero') && templateId.startsWith('split')) {
      const key = templateId as keyof typeof SplitHeroContent;
      rawContent = SplitHeroContent[key];
    }
    
    // For now, only Hero blocks are supported with custom content
    // Other block types (blog, post, business, etc.) use library defaults
    else if (!templateId.includes('Hero')) {
      return null;
    }
    
    if (!rawContent) {
      return null;
    }
    
    // Clean the content for safe JSON serialization
    return cleanContentForSerialization(rawContent);
  };

  // Remove a block from a collection
  const removeBlockFromCollection = (blockId: string, collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      const updatedCollection = {
        ...collection,
        blockIds: collection.blockIds.filter(id => id !== blockId),
        updatedAt: new Date().toISOString(),
      };
      storage.saveCollection(updatedCollection);

      // Check if block is used in other collections
      const isUsedInOtherCollections = collections.some(c => 
        c.id !== collectionId && c.blockIds.includes(blockId)
      );

      // If not used elsewhere, delete the block AND its content data
      if (!isUsedInOtherCollections) {
        storage.deleteBlock(blockId);
        
        // Also delete corresponding content data
        const savedBlocks = storage.getSavedBlocks();
        const savedBlock = savedBlocks.find(block => block.id === blockId);
        if (savedBlock) {
          const parts = blockId.split('-');
          if (parts.length >= 3) {
            const templateId = parts[1];
            const timestamp = parts[2];
            const dataBlockId = `${templateId}_${timestamp}`;
            
            storage.deleteBlockData(dataBlockId, templateId);
          }
        }
      }
    }
  };

  // Get blocks for a specific collection
  const getCollectionBlocks = (collectionId: string): SavedBlock[] => {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return [];

    return collection.blockIds
      .map(blockId => savedBlocks.find(block => block.id === blockId))
      .filter(Boolean) as SavedBlock[];
  };

  // Get collection with block count
  const getCollectionsWithCounts = () => {
    return collections.map(collection => ({
      ...collection,
      count: collection.blockIds.length,
    }));
  };

  // Export collections data
  const exportCollections = () => {
    const data = {
      collections,
      savedBlocks,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buildy-collections-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import collections data
  const importCollections = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.collections && Array.isArray(data.collections)) {
        data.collections.forEach((collection: Collection) => {
          storage.saveCollection(collection);
        });
      }
      
      if (data.savedBlocks && Array.isArray(data.savedBlocks)) {
        data.savedBlocks.forEach((block: SavedBlock) => {
          storage.saveBlock(block);
        });
      }

      return true;
    } catch (error) {
      console.error('Error importing collections:', error);
      return false;
    }
  };

  // Check if template is in collection
  const isTemplateInCollection = (templateId: string, collectionId: string): boolean => {
    const collectionBlocks = getCollectionBlocks(collectionId);
    return collectionBlocks.some(block => block.templateId === templateId);
  };

  // Remove template from collection
  const removeTemplateFromCollection = (templateId: string, collectionId: string) => {
    const collectionBlocks = getCollectionBlocks(collectionId);
    const blockToRemove = collectionBlocks.find(block => block.templateId === templateId);
    
    if (blockToRemove) {
      removeBlockFromCollection(blockToRemove.id, collectionId);
    }
  };

  // Clear all collections and saved blocks
  const clearAllCollections = () => {
    try {
      storage.clearCollections();
      // Reload page to reset state
      window.location.reload();
    } catch (error) {
      console.error('Error clearing collections:', error);
    }
  };

  return {
    collections: getCollectionsWithCounts(),
    savedBlocks,
    createCollection,
    deleteCollection,
    saveBlockToCollection,
    removeBlockFromCollection,
    getCollectionBlocks,
    isTemplateInCollection,
    removeTemplateFromCollection,
    clearAllCollections,
    exportCollections,
    importCollections,
  };
} 