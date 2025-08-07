// Simplified storage system - only sessionStorage, immediate operations
import type { ProjectState, Collection, SavedBlock, CustomTheme, BlockData } from '@/types';
import { migrateProjectToUnifiedNaming, needsMigration, validateUnifiedFormat } from './migration';

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
    data: [], // New data array for block content
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
      
      let project = JSON.parse(data);
      
      // Auto-migrate to unified naming format if needed
      if (needsMigration(project)) {
        console.log('🔄 Auto-migrating project to unified naming format...');
        project = migrateProjectToUnifiedNaming(project);
        this.saveProject(project);
        console.log('✅ Project migrated successfully');
      }
      
      return project;
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
    
    // Ensure all savedBlocks use templateId format (normalize on export)
    const normalizedProject = {
      ...project,
      savedBlocks: project.savedBlocks.map(block => ({
        ...block,
        id: block.templateId  // Ensure ID is the templateId
      })),
      data: project.data.map(blockData => ({
        ...blockData,
        id: blockData.type  // Ensure data ID matches type (templateId)
      }))
    };
    
    const exportData = {
      project: normalizedProject,
      exportedAt: new Date().toISOString(),
      version: '2.0.0',  // Increment version for new format
    };
    return JSON.stringify(exportData, null, 2);
  }

  importProject(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      
      // New format: full project structure
      if (data.project) {
        console.log('Importing project structure, version:', data.version || 'unknown');
        
        let importProject = data.project;
        
        // Handle version 1.0.0 format (old format with prefixed IDs)
        if (!data.version || data.version === '1.0.0') {
          console.log('Converting from old format to new format');
          importProject = {
            ...data.project,
            savedBlocks: data.project.savedBlocks?.map((block: any) => ({
              ...block,
              id: block.templateId  // Convert old format to new
            })) || [],
            data: data.project.data?.map((blockData: any) => ({
              ...blockData,
              id: blockData.type  // Ensure data ID matches type
            })) || []
          };
        }
        
        this.saveProject(importProject);
        return true;
      }
      
      // Legacy format: just collections (from old exports)
      if (data.collections && Array.isArray(data.collections)) {
        console.log('Importing legacy format - merging collections into existing project');
        
        const currentProject = this.getProject();
        
        // Merge collections, but keep existing ones if there are conflicts
        const existingCollectionIds = new Set(currentProject.collections.map(c => c.id));
        const newCollections = data.collections.filter((c: any) => 
          c.id && c.name && !existingCollectionIds.has(c.id)
        );
        
        // Add new collections to existing project
        currentProject.collections = [...currentProject.collections, ...newCollections];
        
        // Import savedBlocks if available and convert old format to new
        if (data.savedBlocks && Array.isArray(data.savedBlocks)) {
          const existingSavedBlockIds = new Set(currentProject.savedBlocks.map(b => b.id));
          data.savedBlocks.forEach((block: any) => {
            if (block.id && block.templateId && !existingSavedBlockIds.has(block.templateId)) {
              // Convert old block ID format to new format (use templateId directly)
              const normalizedBlock = {
                ...block,
                id: block.templateId  // Use templateId as the new ID
              };
              currentProject.savedBlocks.push(normalizedBlock);
            }
          });
        }
        
        this.saveProject(currentProject);
        return true;
      }
      
      console.error('Invalid import format - missing project or collections data');
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

  // Block content data operations
  getBlockData(): BlockData[] {
    return this.getProject().data;
  }

  saveBlockData(blockData: BlockData): void {
    const project = this.getProject();
    const index = project.data.findIndex(d => d.id === blockData.id && d.type === blockData.type);
    if (index >= 0) {
      project.data[index] = blockData;
    } else {
      project.data.push(blockData);
    }
    this.saveProject(project);
  }

  updateBlockData(blockId: string, blockType: string, content: any): void {
    const blockData: BlockData = {
      id: blockId,
      type: blockType,
      content
    };
    this.saveBlockData(blockData);
  }

  getBlockDataById(blockId: string, blockType: string): BlockData | undefined {
    return this.getProject().data.find(d => d.id === blockId && d.type === blockType);
  }

  deleteBlockData(blockId: string, blockType: string): void {
    const project = this.getProject();
    project.data = project.data.filter(d => !(d.id === blockId && d.type === blockType));
    this.saveProject(project);
  }

  clearBlockData(): void {
    const project = this.getProject();
    project.data = [];
    this.saveProject(project);
  }

  // Helper method to get content for a block by savedBlock ID
  getContentForSavedBlock(savedBlockId: string): any {
    // Since savedBlockId now equals templateId directly, use it as both blockId and blockType
    const blockData = this.getBlockDataById(savedBlockId, savedBlockId);
    return blockData?.content || null;
  }

  // Force migration to unified naming (for manual triggering)
  forceUnifiedNamingMigration(): boolean {
    try {
      const project = this.getProject();
      const migratedProject = migrateProjectToUnifiedNaming(project);
      this.saveProject(migratedProject);
      console.log('✅ Forced migration completed successfully');
      return true;
    } catch (error) {
      console.error('❌ Migration failed:', error);
      return false;
    }
  }

  // Check if project is in unified format
  isUnifiedFormat(): boolean {
    try {
      const project = this.getProject();
      return validateUnifiedFormat(project);
    } catch {
      return false;
    }
  }

  // Statistics for debugging
  getStats() {
    const project = this.getProject();
    return {
      projectName: project.name,
      blocksCount: project.blocks.length,
      dataCount: project.data.length, // Add data count to stats
      collectionsCount: project.collections.length,
      savedBlocksCount: project.savedBlocks.length,
      favoritesCount: project.favorites.length,
      customThemesCount: project.theme.customThemes.length,
      storageType: 'SessionStorage',
      lastSync: new Date(project.metadata.lastModified).toLocaleTimeString(),
      memoryUsage: Math.round(JSON.stringify(project).length / 1024), // KB
      isUnifiedFormat: this.isUnifiedFormat()
    };
  }
} 