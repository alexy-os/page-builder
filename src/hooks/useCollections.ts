import { useState, useEffect, useCallback } from 'react';

export interface Collection {
  id: string;
  name: string;
  type: 'buildy' | 'user';
  blockIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedBlock {
  id: string;
  templateId: string;
  name: string;
  description: string;
  savedAt: string;
}

const COLLECTIONS_STORAGE_KEY = 'buildy-collections';
const SAVED_BLOCKS_STORAGE_KEY = 'buildy-saved-blocks';

// Default BuildY collections
const defaultCollections: Collection[] = [
  {
    id: 'landing',
    name: 'Landing',
    type: 'buildy',
    blockIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'blog',
    name: 'Blog',
    type: 'buildy',
    blockIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'website',
    name: 'Website',
    type: 'buildy',
    blockIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'layouts',
    name: 'Layouts',
    type: 'buildy',
    blockIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [savedBlocks, setSavedBlocks] = useState<SavedBlock[]>([]);

  // Load collections and saved blocks from localStorage
  useEffect(() => {
    try {
      const storedCollections = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
      const storedBlocks = localStorage.getItem(SAVED_BLOCKS_STORAGE_KEY);

      if (storedCollections) {
        const parsed = JSON.parse(storedCollections);
        setCollections(parsed);
      } else {
        // Initialize with default collections
        setCollections(defaultCollections);
        localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(defaultCollections));
      }

      if (storedBlocks) {
        setSavedBlocks(JSON.parse(storedBlocks));
      }
    } catch (error) {
      console.error('Error loading collections from localStorage:', error);
      setCollections(defaultCollections);
    }
  }, []);

  // Save collections to localStorage
  const saveCollections = useCallback((newCollections: Collection[]) => {
    try {
      localStorage.setItem(COLLECTIONS_STORAGE_KEY, JSON.stringify(newCollections));
      setCollections(newCollections);
    } catch (error) {
      console.error('Error saving collections to localStorage:', error);
    }
  }, []);

  // Save blocks to localStorage
  const saveSavedBlocks = useCallback((newSavedBlocks: SavedBlock[]) => {
    try {
      localStorage.setItem(SAVED_BLOCKS_STORAGE_KEY, JSON.stringify(newSavedBlocks));
      setSavedBlocks(newSavedBlocks);
    } catch (error) {
      console.error('Error saving blocks to localStorage:', error);
    }
  }, []);

  // Create a new collection
  const createCollection = useCallback((name: string) => {
    const newCollection: Collection = {
      id: `user-${Date.now()}`,
      name,
      type: 'user',
      blockIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const newCollections = [...collections, newCollection];
    saveCollections(newCollections);
    return newCollection;
  }, [collections, saveCollections]);

  // Delete a collection
  const deleteCollection = useCallback((collectionId: string) => {
    const newCollections = collections.filter(c => c.id !== collectionId);
    saveCollections(newCollections);
  }, [collections, saveCollections]);

  // Save a block to a collection
  const saveBlockToCollection = useCallback((templateId: string, templateName: string, templateDescription: string, collectionId: string) => {
    const blockId = `block-${templateId}-${Date.now()}`;
    
    // Create saved block record
    const savedBlock: SavedBlock = {
      id: blockId,
      templateId,
      name: templateName,
      description: templateDescription,
      savedAt: new Date().toISOString(),
    };

    // Add to saved blocks
    const newSavedBlocks = [...savedBlocks, savedBlock];
    saveSavedBlocks(newSavedBlocks);

    // Add block ID to collection
    const newCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          blockIds: [...collection.blockIds, blockId],
          updatedAt: new Date().toISOString(),
        };
      }
      return collection;
    });

    saveCollections(newCollections);
    return savedBlock;
  }, [collections, savedBlocks, saveCollections, saveSavedBlocks]);

  // Remove a block from a collection
  const removeBlockFromCollection = useCallback((blockId: string, collectionId: string) => {
    // Remove from collection
    const newCollections = collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          blockIds: collection.blockIds.filter(id => id !== blockId),
          updatedAt: new Date().toISOString(),
        };
      }
      return collection;
    });

    saveCollections(newCollections);

    // Remove from saved blocks if not used in any other collection
    const isUsedInOtherCollections = newCollections.some(collection => 
      collection.id !== collectionId && collection.blockIds.includes(blockId)
    );

    if (!isUsedInOtherCollections) {
      const newSavedBlocks = savedBlocks.filter(block => block.id !== blockId);
      saveSavedBlocks(newSavedBlocks);
    }
  }, [collections, savedBlocks, saveCollections, saveSavedBlocks]);

  // Get blocks for a specific collection
  const getCollectionBlocks = useCallback((collectionId: string) => {
    const collection = collections.find(c => c.id === collectionId);
    if (!collection) return [];

    return collection.blockIds
      .map(blockId => savedBlocks.find(block => block.id === blockId))
      .filter(Boolean) as SavedBlock[];
  }, [collections, savedBlocks]);

  // Get collection with block count
  const getCollectionsWithCounts = useCallback(() => {
    return collections.map(collection => ({
      ...collection,
      count: collection.blockIds.length,
    }));
  }, [collections]);

  // Export collections data
  const exportCollections = useCallback(() => {
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
  }, [collections, savedBlocks]);

  // Import collections data
  const importCollections = useCallback((jsonData: string) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.collections && Array.isArray(data.collections)) {
        saveCollections(data.collections);
      }
      
      if (data.savedBlocks && Array.isArray(data.savedBlocks)) {
        saveSavedBlocks(data.savedBlocks);
      }

      return true;
    } catch (error) {
      console.error('Error importing collections:', error);
      return false;
    }
  }, [saveCollections, saveSavedBlocks]);

  // Check if template is in collection
  const isTemplateInCollection = useCallback((templateId: string, collectionId: string) => {
    const collectionBlocks = getCollectionBlocks(collectionId);
    return collectionBlocks.some(block => block.templateId === templateId);
  }, [getCollectionBlocks]);

  // Remove template from collection
  const removeTemplateFromCollection = useCallback((templateId: string, collectionId: string) => {
    const collectionBlocks = getCollectionBlocks(collectionId);
    const blockToRemove = collectionBlocks.find(block => block.templateId === templateId);
    
    if (blockToRemove) {
      removeBlockFromCollection(blockToRemove.id, collectionId);
    }
  }, [getCollectionBlocks, removeBlockFromCollection]);

  // Clear all collections and saved blocks
  const clearAllCollections = useCallback(() => {
    try {
      localStorage.removeItem(COLLECTIONS_STORAGE_KEY);
      localStorage.removeItem(SAVED_BLOCKS_STORAGE_KEY);
      // Reload page to reset state
      window.location.reload();
    } catch (error) {
      console.error('Error clearing collections:', error);
    }
  }, []);

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