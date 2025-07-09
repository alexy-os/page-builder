// Simplified storage system - only sessionStorage, immediate operations
import type { ProjectState, Collection, SavedBlock, CustomTheme } from '@/types';

const PROJECT_KEY = 'buildy_project';
const DARK_MODE_KEY = 'buildy_darkmode';

// Default collections
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

// Default project
function createDefaultProject(): ProjectState {
  return {
    name: 'Buildy Project',
    id: `project-${Date.now()}`,
    version: '1.0.0',
    blocks: [],
    theme: {
      currentThemeId: 'sky-os',
      customThemes: [],
    },
    collections: DEFAULT_COLLECTIONS,
    savedBlocks: [],
    favorites: [],
    metadata: {
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: '1.0.0',
    },
  };
}

export class SimpleStorage {
  private static instance: SimpleStorage;
  
  static getInstance(): SimpleStorage {
    if (!SimpleStorage.instance) {
      SimpleStorage.instance = new SimpleStorage();
    }
    return SimpleStorage.instance;
  }

  // Get project (immediate)
  getProject(): ProjectState {
    try {
      const data = sessionStorage.getItem(PROJECT_KEY);
      if (!data) {
        const defaultProject = createDefaultProject();
        this.saveProject(defaultProject);
        return defaultProject;
      }
      return JSON.parse(data);
    } catch (error) {
      console.warn('Error loading project, creating new:', error);
      const defaultProject = createDefaultProject();
      this.saveProject(defaultProject);
      return defaultProject;
    }
  }

  // Save project (immediate)
  saveProject(project: ProjectState): void {
    try {
      const updatedProject = {
        ...project,
        metadata: {
          ...project.metadata,
          lastModified: new Date().toISOString(),
        },
      };
      sessionStorage.setItem(PROJECT_KEY, JSON.stringify(updatedProject));
    } catch (error) {
      console.error('Error saving project:', error);
    }
  }

  // Dark mode
  getDarkMode(): boolean {
    try {
      const data = sessionStorage.getItem(DARK_MODE_KEY);
      return data ? JSON.parse(data) : false;
    } catch {
      return false;
    }
  }

  setDarkMode(isDark: boolean): void {
    sessionStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
  }

  // Project operations
  updateProjectName(name: string): void {
    const project = this.getProject();
    project.name = name;
    this.saveProject(project);
  }

  updateProjectBlocks(blocks: any[]): void {
    const project = this.getProject();
    project.blocks = blocks;
    this.saveProject(project);
  }

  clearProjectBlocks(): void {
    const project = this.getProject();
    project.blocks = [];
    this.saveProject(project);
  }

  // Theme operations
  getCurrentTheme(): string {
    return this.getProject().theme.currentThemeId;
  }

  setCurrentTheme(themeId: string): void {
    const project = this.getProject();
    project.theme.currentThemeId = themeId;
    this.saveProject(project);
  }

  getCustomThemes(): CustomTheme[] {
    return this.getProject().theme.customThemes;
  }

  addCustomTheme(theme: CustomTheme): void {
    const project = this.getProject();
    project.theme.customThemes.push(theme);
    this.saveProject(project);
  }

  removeCustomTheme(themeId: string): void {
    const project = this.getProject();
    project.theme.customThemes = project.theme.customThemes.filter(t => t.id !== themeId);
    this.saveProject(project);
  }

  // Collections
  getCollections(): Collection[] {
    return this.getProject().collections;
  }

  saveCollection(collection: Collection): void {
    const project = this.getProject();
    const index = project.collections.findIndex(c => c.id === collection.id);
    if (index >= 0) {
      project.collections[index] = collection;
    } else {
      project.collections.push(collection);
    }
    this.saveProject(project);
  }

  deleteCollection(collectionId: string): void {
    const project = this.getProject();
    project.collections = project.collections.filter(c => c.id !== collectionId);
    this.saveProject(project);
  }

  clearCollections(): void {
    const project = this.getProject();
    project.collections = DEFAULT_COLLECTIONS;
    project.savedBlocks = [];
    this.saveProject(project);
  }

  // Saved blocks
  getSavedBlocks(): SavedBlock[] {
    return this.getProject().savedBlocks;
  }

  saveBlock(block: SavedBlock): void {
    const project = this.getProject();
    const index = project.savedBlocks.findIndex(b => b.id === block.id);
    if (index >= 0) {
      project.savedBlocks[index] = block;
    } else {
      project.savedBlocks.push(block);
    }
    this.saveProject(project);
  }

  deleteBlock(blockId: string): void {
    const project = this.getProject();
    project.savedBlocks = project.savedBlocks.filter(b => b.id !== blockId);
    this.saveProject(project);
  }

  // Favorites
  getFavorites(): string[] {
    return this.getProject().favorites;
  }

  addToFavorites(templateId: string): void {
    const project = this.getProject();
    if (!project.favorites.includes(templateId)) {
      project.favorites.push(templateId);
      this.saveProject(project);
    }
  }

  removeFromFavorites(templateId: string): void {
    const project = this.getProject();
    project.favorites = project.favorites.filter(id => id !== templateId);
    this.saveProject(project);
  }

  isFavorite(templateId: string): boolean {
    return this.getProject().favorites.includes(templateId);
  }

  // Import/Export
  exportProject(): string {
    const project = this.getProject();
    const exportData = {
      project,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };
    return JSON.stringify(exportData, null, 2);
  }

  importProject(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.project) {
        this.saveProject(data.project);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing project:', error);
      return false;
    }
  }

  // Clear all data
  clearAll(): void {
    sessionStorage.clear();
  }

  // Statistics for debugging
  getStats() {
    const project = this.getProject();
    return {
      projectName: project.name,
      blocksCount: project.blocks.length,
      collectionsCount: project.collections.length,
      savedBlocksCount: project.savedBlocks.length,
      favoritesCount: project.favorites.length,
      customThemesCount: project.theme.customThemes.length,
      storageType: 'SessionStorage',
      lastSync: new Date(project.metadata.lastModified).toLocaleTimeString(),
      memoryUsage: Math.round(JSON.stringify(project).length / 1024) // KB
    };
  }
} 