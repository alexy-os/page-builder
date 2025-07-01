import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'buildy-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, []);

  // Add template to favorites
  const addToFavorites = useCallback((templateId: string) => {
    if (!favorites.includes(templateId)) {
      const newFavorites = [...favorites, templateId];
      saveFavorites(newFavorites);
    }
  }, [favorites, saveFavorites]);

  // Remove template from favorites
  const removeFromFavorites = useCallback((templateId: string) => {
    const newFavorites = favorites.filter(id => id !== templateId);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((templateId: string) => {
    if (favorites.includes(templateId)) {
      removeFromFavorites(templateId);
    } else {
      addToFavorites(templateId);
    }
  }, [favorites, addToFavorites, removeFromFavorites]);

  // Check if template is favorited
  const isFavorite = useCallback((templateId: string) => {
    return favorites.includes(templateId);
  }, [favorites]);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    hasFavorites: favorites.length > 0,
  };
} 