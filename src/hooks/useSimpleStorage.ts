// Simplified storage hook for immediate operations
import { useState, useEffect, useCallback } from 'react';
import { SimpleStorage } from '@/lib/storage/simpleStorage';

interface StorageStats {
  projectName: string;
  blocksCount: number;
  dataCount: number;
  collectionsCount: number;
  savedBlocksCount: number;
  favoritesCount: number;
  customThemesCount: number;
  storageType: string;
  lastSync: string;
  memoryUsage: number;
}

export function useSimpleStorage() {
  const [storage] = useState(() => SimpleStorage.getInstance());
  const [stats, setStats] = useState<StorageStats>({
    projectName: 'No Project',
    blocksCount: 0,
    dataCount: 0,
    collectionsCount: 0,
    savedBlocksCount: 0,
    favoritesCount: 0,
    customThemesCount: 0,
    storageType: 'SessionStorage',
    lastSync: '',
    memoryUsage: 0
  });

  // Update statistics (simple and fast)
  const updateStats = useCallback(() => {
    try {
      const newStats = storage.getStats();
      setStats(newStats as StorageStats);
    } catch (error) {
      console.error('Error updating storage stats:', error);
    }
  }, [storage]);

  // Initialize stats
  useEffect(() => {
    updateStats();
  }, [updateStats]);

  // Simple operations that work immediately
  const clearAll = useCallback(() => {
    try {
      storage.clearAll();
      updateStats();
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }, [storage, updateStats]);

  const fullReset = useCallback(() => {
    try {
      storage.clearAll();
      window.location.reload();
    } catch (error) {
      console.error('Error performing full reset:', error);
    }
  }, [storage]);

  const exportProject = useCallback(() => {
    try {
      return storage.exportProject();
    } catch (error) {
      console.error('Error exporting project:', error);
      throw error;
    }
  }, [storage]);

  const importProject = useCallback((jsonData: string) => {
    try {
      const result = storage.importProject(jsonData);
      if (result) {
        updateStats();
      }
      return result;
    } catch (error) {
      console.error('Error importing project:', error);
      return false;
    }
  }, [storage, updateStats]);

  return {
    // State
    stats,
    
    // Direct storage access
    storage,
    
    // Simple utilities
    clearAll,
    fullReset,
    exportProject,
    importProject,
    updateStats
  };
} 