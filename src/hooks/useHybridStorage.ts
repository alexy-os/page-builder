// Hook for working with the new centralized architecture of HybridStorage

import { useState, useEffect, useCallback, useRef } from 'react';
import { HybridStorage } from '@/lib/storage';
import type { ProjectState, Collection, SavedBlock, CustomTheme } from '@/types';

interface StorageStats {
  projectName: string;
  blocksCount: number;
  collectionsCount: number;
  savedBlocksCount: number;
  favoritesCount: number;
  customThemesCount: number;
  useSessionOnly: boolean;
  lastSync: string;
  memoryUsage: number;
}

export function useHybridStorage() {
  const [storage] = useState(() => HybridStorage.getInstance());
  const [stats, setStats] = useState<StorageStats>({
    projectName: 'No Project',
    blocksCount: 0,
    collectionsCount: 0,
    savedBlocksCount: 0,
    favoritesCount: 0,
    customThemesCount: 0,
    useSessionOnly: false,
    lastSync: '',
    memoryUsage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const statsUpdateRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // Update statistics
  const updateStats = useCallback(() => {
    try {
      const newStats = storage.getStats();
      setStats(newStats);
    } catch (error) {
      console.error('Error updating storage stats:', error);
    }
  }, [storage]);

  // Initialize and periodic update of statistics
  useEffect(() => {
    updateStats();

    statsUpdateRef.current = setInterval(updateStats, 3000);

    return () => {
      if (statsUpdateRef.current) {
        clearInterval(statsUpdateRef.current);
        statsUpdateRef.current = undefined;
      }
    };
  }, [updateStats]);

  // === PROJECT ===
  const getProject = useCallback(() => {
    return storage.getProject();
  }, [storage]);

  const saveProject = useCallback(async (project: ProjectState) => {
    try {
      setIsLoading(true);
      storage.saveProject(project);
      updateStats();
      return true;
    } catch (error) {
      console.error('Error saving project:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [storage, updateStats]);

  const updateProjectName = useCallback((name: string) => {
    try {
      storage.updateProjectName(name);
      updateStats();
    } catch (error) {
      console.error('Error updating project name:', error);
    }
  }, [storage, updateStats]);

  const updateProjectBlocks = useCallback((blocks: any[]) => {
    try {
      storage.updateProjectBlocks(blocks);
      updateStats();
    } catch (error) {
      console.error('Error updating project blocks:', error);
    }
  }, [storage, updateStats]);

  const clearProjectBlocks = useCallback(() => {
    try {
      storage.clearProjectBlocks();
      updateStats();
    } catch (error) {
      console.error('Error clearing project blocks:', error);
    }
  }, [storage, updateStats]);

  // === THEMES ===
  const getDarkMode = useCallback(() => {
    return storage.getDarkMode();
  }, [storage]);

  const setDarkMode = useCallback((isDark: boolean) => {
    try {
      storage.setDarkMode(isDark);
      updateStats();
    } catch (error) {
      console.error('Error setting dark mode:', error);
    }
  }, [storage, updateStats]);

  const getCurrentTheme = useCallback(() => {
    return storage.getCurrentTheme();
  }, [storage]);

  const setCurrentTheme = useCallback((themeId: string) => {
    try {
      storage.setCurrentTheme(themeId);
      updateStats();
    } catch (error) {
      console.error('Error setting current theme:', error);
    }
  }, [storage, updateStats]);

  const getCustomThemes = useCallback(() => {
    return storage.getCustomThemes();
  }, [storage]);

  const addCustomTheme = useCallback((theme: CustomTheme) => {
    try {
      storage.addCustomTheme(theme);
      updateStats();
    } catch (error) {
      console.error('Error adding custom theme:', error);
    }
  }, [storage, updateStats]);

  const removeCustomTheme = useCallback((themeId: string) => {
    try {
      storage.removeCustomTheme(themeId);
      updateStats();
    } catch (error) {
      console.error('Error removing custom theme:', error);
    }
  }, [storage, updateStats]);

  // === COLLECTIONS ===
  const getCollections = useCallback(() => {
    return storage.getCollections();
  }, [storage]);

  const saveCollection = useCallback((collection: Collection) => {
    try {
      storage.saveCollection(collection);
      updateStats();
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  }, [storage, updateStats]);

  const deleteCollection = useCallback((collectionId: string) => {
    try {
      storage.deleteCollection(collectionId);
      updateStats();
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }, [storage, updateStats]);

  const clearCollections = useCallback(() => {
    try {
      storage.clearCollections();
      updateStats();
    } catch (error) {
      console.error('Error clearing collections:', error);
    }
  }, [storage, updateStats]);

  // === SAVED BLOCKS ===
  const getSavedBlocks = useCallback(() => {
    return storage.getSavedBlocks();
  }, [storage]);

  const saveBlock = useCallback((block: SavedBlock) => {
    try {
      storage.saveBlock(block);
      updateStats();
    } catch (error) {
      console.error('Error saving block:', error);
    }
  }, [storage, updateStats]);

  const deleteBlock = useCallback((blockId: string) => {
    try {
      storage.deleteBlock(blockId);
      updateStats();
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  }, [storage, updateStats]);

  // === FAVORITES ===
  const getFavorites = useCallback(() => {
    return storage.getFavorites();
  }, [storage]);

  const addToFavorites = useCallback((templateId: string) => {
    try {
      storage.addToFavorites(templateId);
      updateStats();
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }, [storage, updateStats]);

  const removeFromFavorites = useCallback((templateId: string) => {
    try {
      storage.removeFromFavorites(templateId);
      updateStats();
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }, [storage, updateStats]);

  const isFavorite = useCallback((templateId: string) => {
    return storage.isFavorite(templateId);
  }, [storage]);

  const toggleFavorite = useCallback((templateId: string) => {
    try {
      if (storage.isFavorite(templateId)) {
        storage.removeFromFavorites(templateId);
      } else {
        storage.addToFavorites(templateId);
      }
      updateStats();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [storage, updateStats]);

  // === SESSION ===
  const enableSessionMode = useCallback(() => {
    try {
      storage.enableSessionMode();
      updateStats();
    } catch (error) {
      console.error('Error enabling session mode:', error);
    }
  }, [storage, updateStats]);

  const disableSessionMode = useCallback(() => {
    try {
      storage.disableSessionMode();
      updateStats();
    } catch (error) {
      console.error('Error disabling session mode:', error);
    }
  }, [storage, updateStats]);

  const isSessionMode = useCallback(() => {
    return storage.isSessionMode();
  }, [storage]);

  // === UTILITIES ===
  const forceSync = useCallback(async () => {
    try {
      setIsLoading(true);
      storage.forceSync();
      updateStats();
      return true;
    } catch (error) {
      console.error('Error forcing sync:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [storage, updateStats]);

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
      storage.fullReset();
    } catch (error) {
      console.error('Error performing full reset:', error);
    }
  }, [storage]);

    // === EXPORT/IMPORT ===
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
    isLoading,
    
    // Project
    getProject,
    saveProject,
    updateProjectName,
    updateProjectBlocks,
    clearProjectBlocks,
    
    // Themes
    getDarkMode,
    setDarkMode,
    getCurrentTheme,
    setCurrentTheme,
    getCustomThemes,
    addCustomTheme,
    removeCustomTheme,
    
    // Collections
    getCollections,
    saveCollection,
    deleteCollection,
    clearCollections,
    
    // Saved blocks
    getSavedBlocks,
    saveBlock,
    deleteBlock,
    
    // Favorites
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    
    // Session
    enableSessionMode,
    disableSessionMode,
    isSessionMode,
    
    // Utilities
    forceSync,
    clearAll,
    fullReset,
    exportProject,
    importProject,
    updateStats,
    
    // Direct access to storage
    storage,
  };
}