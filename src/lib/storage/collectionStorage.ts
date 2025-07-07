// Collection Storage - management of collections and saved blocks in localStorage

const COLLECTIONS_KEY = 'buildy-collections';
const SAVED_BLOCKS_KEY = 'buildy-saved-blocks';

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

export interface CollectionWithCount extends Collection {
  count: number;
}

export interface CollectionExportData {
  collections: Collection[];
  savedBlocks: SavedBlock[];
  exportedAt: string;
}

// Default BuildY collections
const DEFAULT_COLLECTIONS: Collection[] = [
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

export class CollectionStorage {
  // Management of collections
  static getCollections(): Collection[] {
    try {
      const stored = localStorage.getItem(COLLECTIONS_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Initialize with default collections
        this.saveCollections(DEFAULT_COLLECTIONS);
        return DEFAULT_COLLECTIONS;
      }
    } catch (error) {
      console.error('Error loading collections from localStorage:', error);
      return DEFAULT_COLLECTIONS;
    }
  }

  static saveCollections(collections: Collection[]): void {
    try {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collections to localStorage:', error);
    }
  }

  static addCollection(collection: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>): Collection {
    try {
      const collections = this.getCollections();
      const newCollection: Collection = {
        ...collection,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedCollections = [...collections, newCollection];
      this.saveCollections(updatedCollections);
      return newCollection;
    } catch (error) {
      console.error('Error adding collection to localStorage:', error);
      throw error;
    }
  }

  static updateCollection(collectionId: string, updates: Partial<Collection>): void {
    try {
      const collections = this.getCollections();
      const updatedCollections = collections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
        return collection;
      });
      this.saveCollections(updatedCollections);
    } catch (error) {
      console.error('Error updating collection in localStorage:', error);
    }
  }

  static deleteCollection(collectionId: string): void {
    try {
      const collections = this.getCollections();
      const updatedCollections = collections.filter(c => c.id !== collectionId);
      this.saveCollections(updatedCollections);
    } catch (error) {
      console.error('Error deleting collection from localStorage:', error);
    }
  }

  static getCollectionById(collectionId: string): Collection | null {
    try {
      const collections = this.getCollections();
      return collections.find(c => c.id === collectionId) || null;
    } catch (error) {
      console.error('Error finding collection in localStorage:', error);
      return null;
    }
  }

  static getCollectionsWithCounts(): CollectionWithCount[] {
    try {
      const collections = this.getCollections();
      return collections.map(collection => ({
        ...collection,
        count: collection.blockIds.length,
      }));
    } catch (error) {
      console.error('Error getting collections with counts from localStorage:', error);
      return [];
    }
  }

  // Management of saved blocks
  static getSavedBlocks(): SavedBlock[] {
    try {
      const stored = localStorage.getItem(SAVED_BLOCKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading saved blocks from localStorage:', error);
      return [];
    }
  }

  static saveSavedBlocks(blocks: SavedBlock[]): void {
    try {
      localStorage.setItem(SAVED_BLOCKS_KEY, JSON.stringify(blocks));
    } catch (error) {
      console.error('Error saving blocks to localStorage:', error);
    }
  }

  static addSavedBlock(block: Omit<SavedBlock, 'id' | 'savedAt'>): SavedBlock {
    try {
      const blocks = this.getSavedBlocks();
      const newBlock: SavedBlock = {
        ...block,
        id: `block-${block.templateId}-${Date.now()}`,
        savedAt: new Date().toISOString(),
      };
      const updatedBlocks = [...blocks, newBlock];
      this.saveSavedBlocks(updatedBlocks);
      return newBlock;
    } catch (error) {
      console.error('Error adding saved block to localStorage:', error);
      throw error;
    }
  }

  static removeSavedBlock(blockId: string): void {
    try {
      const blocks = this.getSavedBlocks();
      const updatedBlocks = blocks.filter(block => block.id !== blockId);
      this.saveSavedBlocks(updatedBlocks);
    } catch (error) {
      console.error('Error removing saved block from localStorage:', error);
    }
  }

  static getSavedBlockById(blockId: string): SavedBlock | null {
    try {
      const blocks = this.getSavedBlocks();
      return blocks.find(block => block.id === blockId) || null;
    } catch (error) {
      console.error('Error finding saved block in localStorage:', error);
      return null;
    }
  }

  // Link of collections and blocks
  static addBlockToCollection(collectionId: string, blockId: string): void {
    try {
      const collections = this.getCollections();
      const updatedCollections = collections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            blockIds: [...collection.blockIds, blockId],
            updatedAt: new Date().toISOString(),
          };
        }
        return collection;
      });
      this.saveCollections(updatedCollections);
    } catch (error) {
      console.error('Error adding block to collection in localStorage:', error);
    }
  }

  static removeBlockFromCollection(collectionId: string, blockId: string): void {
    try {
      const collections = this.getCollections();
      const updatedCollections = collections.map(collection => {
        if (collection.id === collectionId) {
          return {
            ...collection,
            blockIds: collection.blockIds.filter(id => id !== blockId),
            updatedAt: new Date().toISOString(),
          };
        }
        return collection;
      });
      this.saveCollections(updatedCollections);

      // Check if the block is used in other collections
      const isUsedInOtherCollections = updatedCollections.some(collection => 
        collection.id !== collectionId && collection.blockIds.includes(blockId)
      );

      // If the block is not used in other collections, delete it
      if (!isUsedInOtherCollections) {
        this.removeSavedBlock(blockId);
      }
    } catch (error) {
      console.error('Error removing block from collection in localStorage:', error);
    }
  }

  static getCollectionBlocks(collectionId: string): SavedBlock[] {
    try {
      const collection = this.getCollectionById(collectionId);
      if (!collection) return [];

      const savedBlocks = this.getSavedBlocks();
      return collection.blockIds
        .map(blockId => savedBlocks.find(block => block.id === blockId))
        .filter(Boolean) as SavedBlock[];
    } catch (error) {
      console.error('Error getting collection blocks from localStorage:', error);
      return [];
    }
  }

  static isTemplateInCollection(templateId: string, collectionId: string): boolean {
    try {
      const collectionBlocks = this.getCollectionBlocks(collectionId);
      return collectionBlocks.some(block => block.templateId === templateId);
    } catch (error) {
      console.error('Error checking template in collection from localStorage:', error);
      return false;
    }
  }

  static removeTemplateFromCollection(templateId: string, collectionId: string): void {
    try {
      const collectionBlocks = this.getCollectionBlocks(collectionId);
      const blockToRemove = collectionBlocks.find(block => block.templateId === templateId);
      
      if (blockToRemove) {
        this.removeBlockFromCollection(collectionId, blockToRemove.id);
      }
    } catch (error) {
      console.error('Error removing template from collection in localStorage:', error);
    }
  }

  // Export and import data
  static exportData(): CollectionExportData {
    try {
      return {
        collections: this.getCollections(),
        savedBlocks: this.getSavedBlocks(),
        exportedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error exporting collection data:', error);
      throw error;
    }
  }

  static importData(data: CollectionExportData): boolean {
    try {
      if (data.collections && Array.isArray(data.collections)) {
        this.saveCollections(data.collections);
      }
      
      if (data.savedBlocks && Array.isArray(data.savedBlocks)) {
        this.saveSavedBlocks(data.savedBlocks);
      }

      return true;
    } catch (error) {
      console.error('Error importing collection data:', error);
      return false;
    }
  }

  // Clear all data related to collections
  static clearAll(): void {
    try {
      localStorage.removeItem(COLLECTIONS_KEY);
      localStorage.removeItem(SAVED_BLOCKS_KEY);
    } catch (error) {
      console.error('Error clearing collection data from localStorage:', error);
    }
  }
}