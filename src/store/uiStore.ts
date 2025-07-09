// UI state management with Zustand (Simplified)
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UIStore {
  // Dialog states
  showImportDialog: boolean;
  showImportThemeDialog: boolean;
  showImportCollectionsDialog: boolean;
  saveDialogOpen: boolean;
  
  // Navigation and layout
  activeCollection: string | null;
  activeCategory: string | null;
  columns: 2 | 3;
  activeTab: 'favorites' | 'all';
  
  // Dialog actions
  setShowImportDialog: (show: boolean) => void;
  setShowImportThemeDialog: (show: boolean) => void;
  setShowImportCollectionsDialog: (show: boolean) => void;
  setSaveDialogOpen: (open: boolean) => void;
  
  // Navigation actions
  setActiveCollection: (collection: string | null) => void;
  setActiveCategory: (category: string | null) => void;
  setColumns: (columns: 2 | 3) => void;
  setActiveTab: (tab: 'favorites' | 'all') => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      // Initial state
      showImportDialog: false,
      showImportThemeDialog: false,
      showImportCollectionsDialog: false,
      saveDialogOpen: false,
      
      activeCollection: (() => {
        // Initialize from URL params
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('collection');
      })(),
      activeCategory: (() => {
        // Initialize from URL params
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('category');
      })(),
      columns: 3,
      activeTab: 'all',
      
      // Dialog actions
      setShowImportDialog: (show: boolean) => {
        set({ showImportDialog: show });
      },
      
      setShowImportThemeDialog: (show: boolean) => {
        set({ showImportThemeDialog: show });
      },
      
      setShowImportCollectionsDialog: (show: boolean) => {
        set({ showImportCollectionsDialog: show });
      },
      
      setSaveDialogOpen: (open: boolean) => {
        set({ saveDialogOpen: open });
      },
      
      // Navigation actions
      setActiveCollection: (collection: string | null) => {
        set({ activeCollection: collection });
        
        // Update URL when collection changes
        const url = new URL(window.location.href);
        if (collection) {
          url.searchParams.set('collection', collection);
        } else {
          url.searchParams.delete('collection');
        }
        window.history.replaceState({}, '', url.toString());
      },
      
      setActiveCategory: (category: string | null) => {
        set({ activeCategory: category });
        
        // Update URL when category changes
        const url = new URL(window.location.href);
        if (category) {
          url.searchParams.set('category', category);
        } else {
          url.searchParams.delete('category');
        }
        window.history.replaceState({}, '', url.toString());
      },
      
      setColumns: (columns: 2 | 3) => {
        set({ columns });
      },
      
      setActiveTab: (tab: 'favorites' | 'all') => {
        set({ activeTab: tab });
      },
    }),
    {
      name: 'ui-store',
    }
  )
); 