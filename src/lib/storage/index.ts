// Storage modules index - central export of all storage modules

import { DarkModeStorage } from './darkModeStorage';
import { ProjectStorage } from './projectStorage';
import { CollectionStorage } from './collectionStorage';

export { DarkModeStorage } from './darkModeStorage';
export type { CustomTheme } from './darkModeStorage';

export { ProjectStorage } from './projectStorage';
export type { ProjectData, FavoriteProject } from './projectStorage';

export { CollectionStorage } from './collectionStorage';
export type { 
  Collection, 
  SavedBlock, 
  CollectionWithCount, 
  CollectionExportData 
} from './collectionStorage';

export { HybridStorage } from './hybridStorage';

// General interface for clearing all data
export class StorageManager {
  static clearAll(): void {
    try {
      DarkModeStorage.clearAll();
      ProjectStorage.clearAll();
      CollectionStorage.clearAll();
      console.log('All localStorage data has been cleared');
    } catch (error) {
      console.error('Error clearing all localStorage data:', error);
    }
  }

  static getStorageInfo(): {
    darkMode: boolean;
    currentTheme: string;
    customThemesCount: number;
    projectName: string;
    projectBlocksCount: number;
    favoritesCount: number;
    collectionsCount: number;
    savedBlocksCount: number;
  } {
    try {
      return {
        darkMode: DarkModeStorage.getDarkMode(),
        currentTheme: DarkModeStorage.getCurrentTheme(),
        customThemesCount: DarkModeStorage.getCustomThemes().length,
        projectName: ProjectStorage.getProjectName(),
        projectBlocksCount: ProjectStorage.getProjectBlocks().length,
        favoritesCount: ProjectStorage.getFavorites().length,
        collectionsCount: CollectionStorage.getCollections().length,
        savedBlocksCount: CollectionStorage.getSavedBlocks().length,
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return {
        darkMode: false,
        currentTheme: 'sky-os',
        customThemesCount: 0,
        projectName: 'Buildy Project',
        projectBlocksCount: 0,
        favoritesCount: 0,
        collectionsCount: 0,
        savedBlocksCount: 0,
      };
    }
  }
}