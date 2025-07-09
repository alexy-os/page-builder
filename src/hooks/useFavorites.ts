// Simplified hook for working with favorites through HybridStorage

import { HybridStorage } from '@/lib/storage';

const storage = HybridStorage.getInstance();

export function useFavorites() {
  const favorites = storage.getFavorites();

  const addToFavorites = (templateId: string) => {
    storage.addToFavorites(templateId);
  };

  const removeFromFavorites = (templateId: string) => {
    storage.removeFromFavorites(templateId);
  };

  const toggleFavorite = (templateId: string) => {
    if (storage.isFavorite(templateId)) {
      storage.removeFromFavorites(templateId);
    } else {
      storage.addToFavorites(templateId);
    }
  };

  const isFavorite = (templateId: string) => {
    return storage.isFavorite(templateId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    hasFavorites: favorites.length > 0,
  };
} 