// Project state management with Zustand
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { HybridStorage } from '@/lib/storage';
import type { ProjectState, Collection, SavedBlock } from '@/types';

interface ProjectStore {
  // State
  project: ProjectState | null;
  isLoading: boolean;
  
  // Project actions
  initializeProject: () => void;
  updateProjectName: (name: string) => void;
  updateProjectBlocks: (blocks: any[]) => void;
  clearProjectBlocks: () => void;
  
  // Collections actions
  getCollections: () => Collection[];
  saveCollection: (collection: Collection) => void;
  deleteCollection: (collectionId: string) => void;
  clearCollections: () => void;
  
  // Saved blocks actions
  getSavedBlocks: () => SavedBlock[];
  saveBlock: (block: SavedBlock) => void;
  deleteBlock: (blockId: string) => void;
  
  // Favorites actions
  getFavorites: () => string[];
  addToFavorites: (templateId: string) => void;
  removeFromFavorites: (templateId: string) => void;
  toggleFavorite: (templateId: string) => void;
  isFavorite: (templateId: string) => boolean;
  
  // Utils
  forceSync: () => void;
  exportProject: () => string;
  importProject: (jsonData: string) => boolean;
}

const storage = HybridStorage.getInstance();

export const useProjectStore = create<ProjectStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      project: null,
      isLoading: false,
      
      // Initialize project from storage
      initializeProject: () => {
        set({ isLoading: true });
        try {
          const project = storage.getProject();
          set({ project, isLoading: false });
        } catch (error) {
          console.error('Error initializing project:', error);
          set({ isLoading: false });
        }
      },
      
      // Project actions
      updateProjectName: (name: string) => {
        storage.updateProjectName(name);
        const project = storage.getProject();
        set({ project });
      },
      
      updateProjectBlocks: (blocks: any[]) => {
        storage.updateProjectBlocks(blocks);
        const project = storage.getProject();
        set({ project });
      },
      
      clearProjectBlocks: () => {
        storage.clearProjectBlocks();
        const project = storage.getProject();
        set({ project });
      },
      
      // Collections actions
      getCollections: () => {
        return storage.getCollections();
      },
      
      saveCollection: (collection: Collection) => {
        storage.saveCollection(collection);
        const project = storage.getProject();
        set({ project });
      },
      
      deleteCollection: (collectionId: string) => {
        storage.deleteCollection(collectionId);
        const project = storage.getProject();
        set({ project });
      },
      
      clearCollections: () => {
        storage.clearCollections();
        const project = storage.getProject();
        set({ project });
      },
      
      // Saved blocks actions
      getSavedBlocks: () => {
        return storage.getSavedBlocks();
      },
      
      saveBlock: (block: SavedBlock) => {
        storage.saveBlock(block);
        const project = storage.getProject();
        set({ project });
      },
      
      deleteBlock: (blockId: string) => {
        storage.deleteBlock(blockId);
        const project = storage.getProject();
        set({ project });
      },
      
      // Favorites actions - with immediate UI feedback
      getFavorites: () => {
        return storage.getFavorites();
      },
      
      addToFavorites: (templateId: string) => {
        storage.addToFavorites(templateId);
        const project = storage.getProject();
        set({ project }); // Immediate UI update
      },
      
      removeFromFavorites: (templateId: string) => {
        storage.removeFromFavorites(templateId);
        const project = storage.getProject();
        set({ project }); // Immediate UI update
      },
      
      toggleFavorite: (templateId: string) => {
        if (storage.isFavorite(templateId)) {
          get().removeFromFavorites(templateId);
        } else {
          get().addToFavorites(templateId);
        }
      },
      
      isFavorite: (templateId: string) => {
        return storage.isFavorite(templateId);
      },
      
      // Utils
      forceSync: () => {
        storage.forceSync();
      },
      
      exportProject: () => {
        return storage.exportProject();
      },
      
      importProject: (jsonData: string) => {
        const success = storage.importProject(jsonData);
        if (success) {
          const project = storage.getProject();
          set({ project });
        }
        return success;
      },
    }),
    {
      name: 'project-store',
    }
  )
); 