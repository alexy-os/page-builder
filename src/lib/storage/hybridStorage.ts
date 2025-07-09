// Centralized project state management

import type { ProjectState, SessionConfig, Collection, SavedBlock, CustomTheme } from '@/types';

const PROJECT_STORAGE_KEY = 'project';
const DARK_MODE_STORAGE_KEY = 'darkMode';
const SESSION_CONFIG_KEY = 'sessionConfig';

// Default collections for BuildY
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

// Default project state
function createDefaultProjectState(): ProjectState {
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

interface MemoryCache {
  project: ProjectState | null;
  darkMode: boolean;
  sessionConfig: SessionConfig | null;
  lastSync: number;
  isDirty: boolean;
}

export class HybridStorage {
  private static instance: HybridStorage;
  private memoryCache: MemoryCache;
  private syncInterval: number = 5000; // 5 seconds
  private lastActivity: number = Date.now();
  private syncTimer: NodeJS.Timeout | null = null;
  private useSessionOnly: boolean = true; // Default: session mode for sandbox experience

  private constructor() {
    this.memoryCache = {
      project: null,
      darkMode: false,
      sessionConfig: null,
      lastSync: Date.now(),
      isDirty: false,
    };
    
    this.initializeStorage();
    this.startSyncTimer();
  }

  static getInstance(): HybridStorage {
    if (!HybridStorage.instance) {
      HybridStorage.instance = new HybridStorage();
    }
    return HybridStorage.instance;
  }

  // Initialize storage
  private initializeStorage(): void {
    try {
      // Check session config first to determine mode
      const sessionConfig = this.getSessionConfig();
      if (sessionConfig) {
        this.useSessionOnly = sessionConfig.useSessionOnly;
      }
      
      // Only clear session storage if we're NOT in session mode
      // or if this is a fresh browser session (no existing session data)
      if (!this.useSessionOnly) {
        // If we're in localStorage mode, clear any old session data
        sessionStorage.clear();
        // console.log('SessionStorage cleared (localStorage mode)');
      } else {
        // We're in session mode - check if we have existing session data
        const existingSessionData = sessionStorage.getItem(PROJECT_STORAGE_KEY);
        if (!existingSessionData) {
          console.log('Session mode: No existing session data found, starting fresh session');
        } else {
          console.log('Session mode: Existing session data found, continuing session');
        }
      }
      
      // Load data
      this.loadFromStorage();
      
      {/* // console.log('HybridStorage initialized', { 
        useSessionOnly: this.useSessionOnly,
        hasSessionData: !!sessionStorage.getItem(PROJECT_STORAGE_KEY)
      }); */}
    } catch (error) {
      console.error('Error initializing HybridStorage:', error);
      this.resetToDefaults();
    }
  }

  // Clear sessionStorage only when switching modes
  private clearSessionStorage(): void {
    try {
      sessionStorage.clear();
      // console.log('SessionStorage cleared');
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  }

  // Safe JSON parsing utility
  private safeJSONParse<T>(data: string | null, fallback: T): T {
    if (!data) return fallback;
    
    try {
      const parsed = JSON.parse(data);
      return parsed !== null && parsed !== undefined ? parsed : fallback;
    } catch (error) {
      console.error('JSON parse error:', error);
      return fallback;
    }
  }

  // Safe JSON stringify utility
  private safeJSONStringify(data: any): string | null {
    try {
      return JSON.stringify(data);
    } catch (error) {
      console.error('JSON stringify error:', error);
      return null;
    }
  }

  // Validate project state structure
  private validateProjectState(project: any): boolean {
    if (!project || typeof project !== 'object') return false;
    
    // Check required fields
    if (!project.name || typeof project.name !== 'string') return false;
    if (!project.id || typeof project.id !== 'string') return false;
    if (!Array.isArray(project.blocks)) return false;
    
    // Validate theme structure
    if (!project.theme || typeof project.theme !== 'object') return false;
    if (!project.theme.currentThemeId || typeof project.theme.currentThemeId !== 'string') return false;
    if (!Array.isArray(project.theme.customThemes)) return false;
    
    // Validate collections
    if (!Array.isArray(project.collections)) return false;
    
    // Validate other arrays
    if (!Array.isArray(project.savedBlocks)) return false;
    if (!Array.isArray(project.favorites)) return false;
    
    // Validate metadata
    if (!project.metadata || typeof project.metadata !== 'object') return false;
    
    return true;
  }

  // Clean and repair corrupted project data
  private repairProjectState(project: any): ProjectState {
    const defaultProject = createDefaultProjectState();
    
    if (!project || typeof project !== 'object') {
      return defaultProject;
    }
    
    try {
      return {
        name: typeof project.name === 'string' ? project.name : defaultProject.name,
        id: typeof project.id === 'string' ? project.id : defaultProject.id,
        version: typeof project.version === 'string' ? project.version : defaultProject.version,
        
        blocks: Array.isArray(project.blocks) ? project.blocks.filter((block: any) => 
          block && 
          typeof block === 'object' && 
          typeof block.id === 'string' && 
          typeof block.type === 'string'
        ) : defaultProject.blocks,
        
        theme: {
          currentThemeId: project.theme?.currentThemeId || defaultProject.theme.currentThemeId,
          customThemes: Array.isArray(project.theme?.customThemes) ? project.theme.customThemes : defaultProject.theme.customThemes,
        },
        
        collections: Array.isArray(project.collections) ? project.collections.filter((collection: any) =>
          collection &&
          typeof collection === 'object' &&
          typeof collection.id === 'string' &&
          typeof collection.name === 'string'
        ) : defaultProject.collections,
        
        savedBlocks: Array.isArray(project.savedBlocks) ? project.savedBlocks.filter((block: any) =>
          block &&
          typeof block === 'object' &&
          typeof block.id === 'string'
        ) : defaultProject.savedBlocks,
        
        favorites: Array.isArray(project.favorites) ? project.favorites.filter((fav: any) =>
          typeof fav === 'string'
        ) : defaultProject.favorites,
        
        metadata: {
          createdAt: project.metadata?.createdAt || defaultProject.metadata.createdAt,
          lastModified: project.metadata?.lastModified || defaultProject.metadata.lastModified,
          version: project.metadata?.version || defaultProject.metadata.version,
        },
      };
    } catch (error) {
      console.error('Error repairing project state:', error);
      return defaultProject;
    }
  }

  // Load data from storage
  private loadFromStorage(): void {
    try {
      // Load dark mode (always from localStorage)
      const darkModeStr = localStorage.getItem(DARK_MODE_STORAGE_KEY);
      this.memoryCache.darkMode = this.safeJSONParse(darkModeStr, false);

      // Load project based on current mode
      const storage = this.useSessionOnly ? sessionStorage : localStorage;
      const projectStr = storage.getItem(PROJECT_STORAGE_KEY);
      
      if (projectStr) {
        const parsedProject = this.safeJSONParse(projectStr, null);
        
        if (parsedProject && this.validateProjectState(parsedProject)) {
          this.memoryCache.project = parsedProject;
          // console.log(`Project loaded from ${this.useSessionOnly ? 'session' : 'local'} storage`);
        } else {
          // Attempt to repair corrupted data
          console.warn('Corrupted project data detected, attempting repair...');
          this.memoryCache.project = this.repairProjectState(parsedProject);
          // Save repaired data immediately
          this.saveProject(this.memoryCache.project);
        }
      } else {
        // No existing project data
        if (this.useSessionOnly) {
          // In session mode, check if we can copy from localStorage
          const localProjectStr = localStorage.getItem(PROJECT_STORAGE_KEY);
          const localProject = this.safeJSONParse(localProjectStr, null);
          
          if (localProject && this.validateProjectState(localProject)) {
            this.memoryCache.project = localProject;
            // console.log('Project copied from localStorage to session');
            // Save to session storage immediately
            const projectData = this.safeJSONStringify(localProject);
            if (projectData) {
              sessionStorage.setItem(PROJECT_STORAGE_KEY, projectData);
            }
          } else if (localProject) {
            // Repair corrupted local data and use it
            this.memoryCache.project = this.repairProjectState(localProject);
            // console.log('Corrupted local project repaired and copied to session');
          } else {
            // Create fresh project for session
            this.memoryCache.project = createDefaultProjectState();
            // console.log('New project created for session mode');
          }
        } else {
          // In localStorage mode, create default project
          this.memoryCache.project = createDefaultProjectState();
          // console.log('New project created for localStorage mode');
        }
        
        // Save the new/copied project
        if (this.memoryCache.project) {
          this.saveProject(this.memoryCache.project);
        }
      }

      this.memoryCache.lastSync = Date.now();
      {/*} console.log('Data loading completed', { 
        useSessionOnly: this.useSessionOnly,
        projectName: this.memoryCache.project?.name,
        blocksCount: this.memoryCache.project?.blocks.length || 0
      });*/}
    } catch (error) {
      console.error('Error loading from storage:', error);
      this.resetToDefaults();
    }
  }

  // Reset to default values
  private resetToDefaults(): void {
    this.memoryCache.project = createDefaultProjectState();
    this.memoryCache.darkMode = false;
    this.memoryCache.sessionConfig = null;
    this.memoryCache.isDirty = true;
    this.syncToStorage();
  }

  // Start sync timer
  private startSyncTimer(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    this.syncTimer = setInterval(() => {
      const now = Date.now();
      // Sync only if there was activity and data changed
      if (now - this.lastActivity < 30000 && this.memoryCache.isDirty) {
        this.syncToStorage();
      }
    }, this.syncInterval);
  }

  // Sync to storage with safe JSON handling
  private syncToStorage(): void {
    try {
      // Save dark mode to localStorage
      const darkModeData = this.safeJSONStringify(this.memoryCache.darkMode);
      if (darkModeData !== null) {
        localStorage.setItem(DARK_MODE_STORAGE_KEY, darkModeData);
      }

      // Save project
      if (this.memoryCache.project) {
        // Validate before saving
        if (this.validateProjectState(this.memoryCache.project)) {
          const storage = this.useSessionOnly ? sessionStorage : localStorage;
          const projectData = this.safeJSONStringify(this.memoryCache.project);
          if (projectData !== null) {
            storage.setItem(PROJECT_STORAGE_KEY, projectData);
          }
        } else {
          console.warn('Invalid project state detected, skipping save');
        }
      }

      // Save session config
      if (this.memoryCache.sessionConfig) {
        const configData = this.safeJSONStringify(this.memoryCache.sessionConfig);
        if (configData !== null) {
          localStorage.setItem(SESSION_CONFIG_KEY, configData);
        }
      }

      this.memoryCache.lastSync = Date.now();
      this.memoryCache.isDirty = false;
      // console.log('Data synced to storage', { useSessionOnly: this.useSessionOnly });
    } catch (error) {
      console.error('Error syncing to storage:', error);
      // Don't throw - continue operation
    }
  }

  // Update activity
  private updateActivity(): void {
    this.lastActivity = Date.now();
    this.memoryCache.isDirty = true;
  }

  // === PUBLIC API ===

  // Session mode management
  enableSessionMode(): void {
    const sessionConfig: SessionConfig = {
      useSessionOnly: true,
      sessionId: `session-${Date.now()}`,
      startedAt: new Date().toISOString(),
    };
    
    // Save current state before switching
    if (!this.useSessionOnly && this.memoryCache.project) {
      // We're switching from localStorage to session mode
      // Copy current project data to session
      sessionStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(this.memoryCache.project));
      // console.log('Project data copied to session storage');
    }
    
    this.useSessionOnly = true;
    this.memoryCache.sessionConfig = sessionConfig;
    
    // Save session config to localStorage so it persists across refreshes
    localStorage.setItem(SESSION_CONFIG_KEY, JSON.stringify(sessionConfig));
    
    this.updateActivity();
    
    console.log('Session mode enabled');
  }

  disableSessionMode(): void {
    // Save current session data to localStorage before clearing
    if (this.useSessionOnly && this.memoryCache.project) {
      localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(this.memoryCache.project));
      console.log('Session data migrated to localStorage');
    }
    
    this.useSessionOnly = false;
    this.memoryCache.sessionConfig = null;
    localStorage.removeItem(SESSION_CONFIG_KEY);
    
    // Clear session storage after migration
    this.clearSessionStorage();
    
    console.log('Session mode disabled, data migrated to localStorage');
  }

  isSessionMode(): boolean {
    return this.useSessionOnly;
  }

  // Get session config with safe parsing
  getSessionConfig(): SessionConfig | null {
    try {
      const configStr = localStorage.getItem(SESSION_CONFIG_KEY);
      return this.safeJSONParse(configStr, null);
    } catch (error) {
      console.error('Error getting session config:', error);
      return null;
    }
  }

  // Project management
  getProject(): ProjectState | null {
    return this.memoryCache.project;
  }

  saveProject(project: ProjectState): void {
    this.memoryCache.project = {
      ...project,
      metadata: {
        ...project.metadata,
        lastModified: new Date().toISOString(),
      },
    };
    this.updateActivity();
  }

  updateProjectName(name: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.name = name;
      this.updateActivity();
    }
  }

  updateProjectBlocks(blocks: any[]): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.blocks = blocks;
      this.updateActivity();
    }
  }

  clearProjectBlocks(): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.blocks = [];
      this.updateActivity();
    }
  }

  // Theme management
  getDarkMode(): boolean {
    return this.memoryCache.darkMode;
  }

  setDarkMode(isDark: boolean): void {
    this.memoryCache.darkMode = isDark;
    this.updateActivity();
  }

  getCurrentTheme(): string {
    return this.memoryCache.project?.theme.currentThemeId || 'sky-os';
  }

  setCurrentTheme(themeId: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.theme.currentThemeId = themeId;
      this.updateActivity();
    }
  }

  getCustomThemes(): CustomTheme[] {
    return this.memoryCache.project?.theme.customThemes || [];
  }

  addCustomTheme(theme: CustomTheme): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.theme.customThemes.push(theme);
      this.updateActivity();
    }
  }

  removeCustomTheme(themeId: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.theme.customThemes = 
        this.memoryCache.project.theme.customThemes.filter(t => t.id !== themeId);
      this.updateActivity();
    }
  }

  // Collection management
  getCollections(): Collection[] {
    return this.memoryCache.project?.collections || [];
  }

  saveCollection(collection: Collection): void {
    if (this.memoryCache.project) {
      const index = this.memoryCache.project.collections.findIndex(c => c.id === collection.id);
      if (index >= 0) {
        this.memoryCache.project.collections[index] = collection;
      } else {
        this.memoryCache.project.collections.push(collection);
      }
      this.updateActivity();
    }
  }

  deleteCollection(collectionId: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.collections = 
        this.memoryCache.project.collections.filter(c => c.id !== collectionId);
      this.updateActivity();
    }
  }

  clearCollections(): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.collections = DEFAULT_COLLECTIONS;
      this.memoryCache.project.savedBlocks = [];
      this.updateActivity();
    }
  }

  // Saved blocks management
  getSavedBlocks(): SavedBlock[] {
    return this.memoryCache.project?.savedBlocks || [];
  }

  saveBlock(block: SavedBlock): void {
    if (this.memoryCache.project) {
      const index = this.memoryCache.project.savedBlocks.findIndex(b => b.id === block.id);
      if (index >= 0) {
        this.memoryCache.project.savedBlocks[index] = block;
      } else {
        this.memoryCache.project.savedBlocks.push(block);
      }
      this.updateActivity();
    }
  }

  deleteBlock(blockId: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.savedBlocks = 
        this.memoryCache.project.savedBlocks.filter(b => b.id !== blockId);
      this.updateActivity();
    }
  }

  // Favorites management
  getFavorites(): string[] {
    return this.memoryCache.project?.favorites || [];
  }

  addToFavorites(templateId: string): void {
    if (this.memoryCache.project && !this.memoryCache.project.favorites.includes(templateId)) {
      this.memoryCache.project.favorites.push(templateId);
      this.updateActivity();
      // Immediate sync for critical UI operations
      this.syncToStorage();
    }
  }

  removeFromFavorites(templateId: string): void {
    if (this.memoryCache.project) {
      this.memoryCache.project.favorites = 
        this.memoryCache.project.favorites.filter(id => id !== templateId);
      this.updateActivity();
      // Immediate sync for critical UI operations
      this.syncToStorage();
    }
  }

  isFavorite(templateId: string): boolean {
    return this.memoryCache.project?.favorites.includes(templateId) || false;
  }

  // Utilities
  forceSync(): void {
    this.syncToStorage();
  }

  clearAll(): void {
    this.resetToDefaults();
    localStorage.clear();
    sessionStorage.clear();
    console.log('All storage cleared');
  }

  // Full reset with reload
  fullReset(): void {
    this.clearAll();
    window.location.reload();
  }

  // Export project with validation
  exportProject(): string {
    if (!this.memoryCache.project) {
      throw new Error('No project to export');
    }

    // Validate before export
    if (!this.validateProjectState(this.memoryCache.project)) {
      throw new Error('Project data is corrupted and cannot be exported');
    }

    const exportData = {
      project: this.memoryCache.project,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    const jsonData = this.safeJSONStringify(exportData);
    if (jsonData === null) {
      throw new Error('Failed to serialize project data for export');
    }

    return jsonData;
  }

  // Import project with validation
  importProject(jsonData: string): boolean {
    try {
      const data: any = this.safeJSONParse(jsonData, null);
      
      if (!data || !data.project || !this.validateProjectState(data.project)) {
        console.error('Invalid project data format');
        return false;
      }
      
      // Additional repair step for imported data
      this.memoryCache.project = this.repairProjectState(data.project);
      this.updateActivity();
      return true;
    } catch (error) {
      console.error('Error importing project:', error);
      return false;
    }
  }

  // Statistics
  getStats(): {
    projectName: string;
    blocksCount: number;
    collectionsCount: number;
    savedBlocksCount: number;
    favoritesCount: number;
    customThemesCount: number;
    useSessionOnly: boolean;
    lastSync: string;
    memoryUsage: number;
  } {
    const project = this.memoryCache.project;
    return {
      projectName: project?.name || 'No Project',
      blocksCount: project?.blocks.length || 0,
      collectionsCount: project?.collections.length || 0,
      savedBlocksCount: project?.savedBlocks.length || 0,
      favoritesCount: project?.favorites.length || 0,
      customThemesCount: project?.theme.customThemes.length || 0,
      useSessionOnly: this.useSessionOnly,
      lastSync: new Date(this.memoryCache.lastSync).toLocaleString(),
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  private estimateMemoryUsage(): number {
    try {
      const dataStr = JSON.stringify(this.memoryCache);
      return new Blob([dataStr]).size;
    } catch (error) {
      return 0;
    }
  }

  // Cleanup on destruction
  destroy(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
    this.syncToStorage();
  }
}