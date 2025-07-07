// Hybrid Storage System - hybrid storage system with localStorage

import { ProjectStorage, CollectionStorage } from './index';

interface MemoryCache {
  projects: Map<string, any>;
  collections: Map<string, any>;
  lastSync: number;
}

export class HybridStorage {
  private static instance: HybridStorage;
  private memoryCache: MemoryCache;
  private syncInterval: number = 8000; // 8 seconds
  private lastActivity: number = Date.now();

  private constructor() {
    this.memoryCache = {
      projects: new Map(),
      collections: new Map(),
      lastSync: Date.now()
    };
    
    this.initializeMemoryCache();
    this.startSyncTimer();
  }

  static getInstance(): HybridStorage {
    if (!HybridStorage.instance) {
      HybridStorage.instance = new HybridStorage();
    }
    return HybridStorage.instance;
  }

  private async initializeMemoryCache(): Promise<void> {
    try {
      // Load data from localStorage to memory
      const currentProject = ProjectStorage.getProject();
      if (currentProject) {
        this.memoryCache.projects.set('current', currentProject);
      }

      const favorites = ProjectStorage.getFavorites();
      favorites.forEach((fav, index) => {
        this.memoryCache.projects.set(`favorite_${index}`, fav);
      });

      const collections = CollectionStorage.getCollections();
      collections.forEach(collection => {
        this.memoryCache.collections.set(collection.id, collection);
      });

      const savedBlocks = CollectionStorage.getSavedBlocks();
      savedBlocks.forEach(block => {
        this.memoryCache.collections.set(`block_${block.id}`, block);
      });

      console.log('Memory cache initialized with localStorage data');
    } catch (error) {
      console.error('Error initializing memory cache:', error);
    }
  }

  private startSyncTimer(): void {
    setInterval(() => {
      const now = Date.now();
      // Synchronize only if there was activity in the last 30 seconds
      if (now - this.lastActivity < 30000) {
        this.syncToLocalStorage();
      }
    }, this.syncInterval);
  }

  private async syncToLocalStorage(): Promise<void> {
    try {
      const now = Date.now();
      
      // Save projects
      for (const [key, projectData] of this.memoryCache.projects) {
        if (key === 'current') {
          const currentProject = ProjectStorage.getProject();
          if (!currentProject || JSON.stringify(currentProject) !== JSON.stringify(projectData)) {
            ProjectStorage.saveProject(projectData);
          }
        }
      }

      // Save collections
      const collectionsToSave = Array.from(this.memoryCache.collections.values())
        .filter(item => item.type && (item.type === 'buildy' || item.type === 'user'));
      
      if (collectionsToSave.length > 0) {
        CollectionStorage.saveCollections(collectionsToSave);
      }

      const blocksToSave = Array.from(this.memoryCache.collections.values())
        .filter(item => item.templateId); // This is blocks, not collections
      
      if (blocksToSave.length > 0) {
        CollectionStorage.saveSavedBlocks(blocksToSave);
      }

      this.memoryCache.lastSync = now;
      console.log('Memory cache synced to localStorage');
    } catch (error) {
      console.error('Error syncing memory cache to localStorage:', error);
    }
  }

  // Projects
  async saveProject(projectData: any): Promise<void> {
    this.lastActivity = Date.now();
    
    try {
      // Save to memory
      this.memoryCache.projects.set('current', projectData);
      
      // Save to localStorage
      ProjectStorage.saveProject(projectData);
      
      console.log('Project saved to hybrid storage');
    } catch (error) {
      console.error('Error saving project to hybrid storage:', error);
    }
  }

  async loadProject(): Promise<any | null> {
    try {
      // First check memory
      const memoryProject = this.memoryCache.projects.get('current');
      if (memoryProject) {
        return memoryProject;
      }

      // If not in memory, load from localStorage
      const storageProject = ProjectStorage.getProject();
      if (storageProject) {
        this.memoryCache.projects.set('current', storageProject);
        return storageProject;
      }

      return null;
    } catch (error) {
      console.error('Error loading project from hybrid storage:', error);
      return null;
    }
  }

  async updateProjectBlocks(blocks: any[]): Promise<void> {
    this.lastActivity = Date.now();
    
    try {
      const currentProject = await this.loadProject();
      if (currentProject) {
        const updatedProject = { ...currentProject, blocks };
        await this.saveProject(updatedProject);
      }
    } catch (error) {
      console.error('Error updating project blocks in hybrid storage:', error);
    }
  }

  // Collections
  async saveCollection(collection: any): Promise<void> {
    this.lastActivity = Date.now();
    
    try {
      // Save to memory
      this.memoryCache.collections.set(collection.id, collection);
      
      // Save to localStorage
      const existingCollections = CollectionStorage.getCollections();
      const updatedCollections = existingCollections.filter(c => c.id !== collection.id);
      updatedCollections.push(collection);
      CollectionStorage.saveCollections(updatedCollections);
      
      console.log(`Collection ${collection.name} saved to hybrid storage`);
    } catch (error) {
      console.error('Error saving collection to hybrid storage:', error);
    }
  }

  async loadCollection(collectionId: string): Promise<any | null> {
    try {
      // First check memory
      const memoryCollection = this.memoryCache.collections.get(collectionId);
      if (memoryCollection) {
        return memoryCollection;
      }

      // If not in memory, load from localStorage
      const storageCollection = CollectionStorage.getCollectionById(collectionId);
      if (storageCollection) {
        this.memoryCache.collections.set(collectionId, storageCollection);
        return storageCollection;
      }

      return null;
    } catch (error) {
      console.error('Error loading collection from hybrid storage:', error);
      return null;
    }
  }

  async saveBlock(block: any): Promise<void> {
    this.lastActivity = Date.now();
    
    try {
      // Save to memory
      this.memoryCache.collections.set(`block_${block.id}`, block);
      
      // Save to localStorage
      const existingBlocks = CollectionStorage.getSavedBlocks();
      const updatedBlocks = existingBlocks.filter(b => b.id !== block.id);
      updatedBlocks.push(block);
      CollectionStorage.saveSavedBlocks(updatedBlocks);
      
      console.log(`Block ${block.name} saved to hybrid storage`);
    } catch (error) {
      console.error('Error saving block to hybrid storage:', error);
    }
  }

  async loadBlock(blockId: string): Promise<any | null> {
    try {
      // First check memory
      const memoryBlock = this.memoryCache.collections.get(`block_${blockId}`);
      if (memoryBlock) {
        return memoryBlock;
      }

      // If not in memory, load from localStorage
      const storageBlock = CollectionStorage.getSavedBlockById(blockId);
      if (storageBlock) {
        this.memoryCache.collections.set(`block_${blockId}`, storageBlock);
        return storageBlock;
      }

      return null;
    } catch (error) {
      console.error('Error loading block from hybrid storage:', error);
      return null;
    }
  }

  // Quick search in memory
  async searchInMemory(query: string): Promise<{
    projects: any[];
    collections: any[];
    blocks: any[];
  }> {
    const results: {
      projects: any[];
      collections: any[];
      blocks: any[];
    } = {
      projects: [],
      collections: [],
      blocks: []
    };

    const queryLower = query.toLowerCase();

    try {
      // Search in projects
      for (const [key, project] of this.memoryCache.projects) {
        if (project.name?.toLowerCase().includes(queryLower)) {
          results.projects.push({ id: key, ...project });
        }
      }

      // Search in collections and blocks
      for (const [key, item] of this.memoryCache.collections) {
        if (item.name?.toLowerCase().includes(queryLower)) {
          if (item.type) {
            results.collections.push({ id: key, ...item });
          } else if (item.templateId) {
            results.blocks.push({ id: key, ...item });
          }
        }
      }

      return results;
    } catch (error) {
      console.error('Error searching in memory:', error);
      return results;
    }
  }

  // Statistics
  getMemoryStats(): {
    projectsCount: number;
    collectionsCount: number;
    blocksCount: number;
    lastSync: string;
    memoryUsage: number;
  } {
    const collectionsCount = Array.from(this.memoryCache.collections.values())
      .filter(item => item.type).length;
    
    const blocksCount = Array.from(this.memoryCache.collections.values())
      .filter(item => item.templateId).length;

    return {
      projectsCount: this.memoryCache.projects.size,
      collectionsCount,
      blocksCount,
      lastSync: new Date(this.memoryCache.lastSync).toLocaleString(),
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  private estimateMemoryUsage(): number {
    try {
      const dataStr = JSON.stringify({
        projects: Array.from(this.memoryCache.projects.entries()),
        collections: Array.from(this.memoryCache.collections.entries())
      });
      return new Blob([dataStr]).size;
    } catch (error) {
      return 0;
    }
  }

  // Clear
  async clearMemoryCache(): Promise<void> {
    this.memoryCache.projects.clear();
    this.memoryCache.collections.clear();
    this.memoryCache.lastSync = Date.now();
    console.log('Memory cache cleared');
  }

  async clearAll(): Promise<void> {
    await this.clearMemoryCache();
    ProjectStorage.clearAll();
    CollectionStorage.clearAll();
    console.log('All hybrid storage data cleared');
  }

  // Force synchronization
  async forceSync(): Promise<void> {
    await this.syncToLocalStorage();
  }
}