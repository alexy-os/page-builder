// Simplified hook for working with collections through SimpleStorage

import { SimpleStorage } from '@/lib/storage/simpleStorage';
import type { Collection, SavedBlock } from '@/types';

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
    const blockId = `block-${templateId}-${Date.now()}`;
    
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

      // If not used elsewhere, delete the block
      if (!isUsedInOtherCollections) {
        storage.deleteBlock(blockId);
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