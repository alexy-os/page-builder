// Hook for working with hybrid storage (memory + localStorage)

import { useState, useEffect, useCallback } from 'react';
import { HybridStorage } from '@/lib/storage';

interface HybridStorageStats {
  projectsCount: number;
  collectionsCount: number;
  blocksCount: number;
  lastSync: string;
  memoryUsage: number;
}

export function useHybridStorage() {
  const [hybridStorage] = useState(() => HybridStorage.getInstance());
  const [stats, setStats] = useState<HybridStorageStats>({
    projectsCount: 0,
    collectionsCount: 0,
    blocksCount: 0,
    lastSync: '',
    memoryUsage: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize when component loads
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        setIsLoading(true);
        // Hybrid storage is automatically initialized
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for initialization
        updateStats();
      } catch (error) {
        console.error('Error initializing hybrid storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStorage();
  }, []);

  // Update statistics
  const updateStats = useCallback(() => {
    const newStats = hybridStorage.getMemoryStats();
    setStats(newStats);
  }, [hybridStorage]);

  // Periodic update of statistics
  useEffect(() => {
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, [updateStats]);

  // Methods for working with projects
  const saveProject = useCallback(async (projectData: any) => {
    try {
      setIsLoading(true);
      await hybridStorage.saveProject(projectData);
      updateStats();
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  const loadProject = useCallback(async () => {
    try {
      setIsLoading(true);
      const project = await hybridStorage.loadProject();
      updateStats();
      return project;
    } catch (error) {
      console.error('Error loading project:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  const updateProjectBlocks = useCallback(async (blocks: any[]) => {
    try {
      setIsLoading(true);
      await hybridStorage.updateProjectBlocks(blocks);
      updateStats();
      return true;
    } catch (error) {
      console.error('Error updating project blocks:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Methods for working with collections
  const saveCollection = useCallback(async (collection: any) => {
    try {
      setIsLoading(true);
      await hybridStorage.saveCollection(collection);
      updateStats();
      return true;
    } catch (error) {
      console.error('Error saving collection:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  const loadCollection = useCallback(async (collectionId: string) => {
    try {
      setIsLoading(true);
      const collection = await hybridStorage.loadCollection(collectionId);
      updateStats();
      return collection;
    } catch (error) {
      console.error('Error loading collection:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Methods for working with blocks
  const saveBlock = useCallback(async (block: any) => {
    try {
      setIsLoading(true);
      await hybridStorage.saveBlock(block);
      updateStats();
      return true;
    } catch (error) {
      console.error('Error saving block:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  const loadBlock = useCallback(async (blockId: string) => {
    try {
      setIsLoading(true);
      const block = await hybridStorage.loadBlock(blockId);
      updateStats();
      return block;
    } catch (error) {
      console.error('Error loading block:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Search in memory
  const searchInMemory = useCallback(async (query: string) => {
    try {
      setIsLoading(true);
      const results = await hybridStorage.searchInMemory(query);
      updateStats();
      return results;
    } catch (error) {
      console.error('Error searching in memory:', error);
      return { projects: [], collections: [], blocks: [] };
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Force synchronization
  const forceSync = useCallback(async () => {
    try {
      setIsLoading(true);
      await hybridStorage.forceSync();
      updateStats();
      return true;
    } catch (error) {
      console.error('Error forcing sync:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Clear cache
  const clearMemoryCache = useCallback(async () => {
    try {
      setIsLoading(true);
      await hybridStorage.clearMemoryCache();
      updateStats();
      return true;
    } catch (error) {
      console.error('Error clearing memory cache:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  // Clear all data
  const clearAll = useCallback(async () => {
    try {
      setIsLoading(true);
      await hybridStorage.clearAll();
      updateStats();
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [hybridStorage, updateStats]);

  return {
    // State
    stats,
    isLoading,
    
    // Projects methods
    saveProject,
    loadProject,
    updateProjectBlocks,
    
    // Collections methods
    saveCollection,
    loadCollection,
    
    // Blocks methods
    saveBlock,
    loadBlock,
    
    // Search and utilities
    searchInMemory,
    forceSync,
    clearMemoryCache,
    clearAll,
    updateStats,
    
    // Direct access to storage (for advanced usage)
    storage: hybridStorage
  };
}