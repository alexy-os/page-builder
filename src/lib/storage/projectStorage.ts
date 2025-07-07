// Project Storage - management of projects and favorites in localStorage

const PROJECT_KEY = 'pagebuilder_project';
const FAVORITES_KEY = 'pagebuilder_favorites';

export interface ProjectData {
  name: string;
  blocks: any[];
  themeId: string;
  lastModified?: string;
  exportedAt?: string;
}

export interface FavoriteProject {
  id: string;
  name: string;
  themeId: string;
  blocks: any[];
  createdAt: string;
}

export class ProjectStorage {
  // Management of main project
  static getProject(): ProjectData | null {
    try {
      const saved = localStorage.getItem(PROJECT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading project from localStorage:', error);
      return null;
    }
  }

  static getProjectBlocks(): any[] {
    try {
      const project = this.getProject();
      return project?.blocks || [];
    } catch (error) {
      console.error('Error loading project blocks from localStorage:', error);
      return [];
    }
  }

  static getProjectName(): string {
    try {
      const project = this.getProject();
      return project?.name || 'Buildy Project';
    } catch (error) {
      console.error('Error loading project name from localStorage:', error);
      return 'Buildy Project';
    }
  }

  static saveProject(project: ProjectData): void {
    try {
      const projectWithTimestamp = {
        ...project,
        lastModified: new Date().toISOString()
      };
      localStorage.setItem(PROJECT_KEY, JSON.stringify(projectWithTimestamp));
    } catch (error) {
      console.error('Error saving project to localStorage:', error);
    }
  }

  static updateProjectBlocks(blocks: any[]): void {
    try {
      const existingProject = this.getProject();
      const project: ProjectData = {
        name: existingProject?.name || 'Buildy Project',
        blocks,
        themeId: existingProject?.themeId || 'sky-os',
        lastModified: new Date().toISOString()
      };
      this.saveProject(project);
    } catch (error) {
      console.error('Error updating project blocks in localStorage:', error);
    }
  }

  static updateProjectName(name: string): void {
    try {
      const existingProject = this.getProject();
      if (existingProject) {
        const project: ProjectData = {
          ...existingProject,
          name,
          lastModified: new Date().toISOString()
        };
        this.saveProject(project);
      }
    } catch (error) {
      console.error('Error updating project name in localStorage:', error);
    }
  }

  static updateProjectTheme(themeId: string): void {
    try {
      const existingProject = this.getProject();
      if (existingProject) {
        const project: ProjectData = {
          ...existingProject,
          themeId,
          lastModified: new Date().toISOString()
        };
        this.saveProject(project);
      }
    } catch (error) {
      console.error('Error updating project theme in localStorage:', error);
    }
  }

  static clearProject(): void {
    try {
      localStorage.removeItem(PROJECT_KEY);
    } catch (error) {
      console.error('Error clearing project from localStorage:', error);
    }
  }

  // Management of favorite projects
  static getFavorites(): FavoriteProject[] {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  }

  static saveFavorites(favorites: FavoriteProject[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }

  static addToFavorites(project: Omit<FavoriteProject, 'id' | 'createdAt'>): void {
    try {
      const favorites = this.getFavorites();
      const newFavorite: FavoriteProject = {
        ...project,
        id: `fav-${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      const updatedFavorites = [...favorites, newFavorite];
      this.saveFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error adding to favorites in localStorage:', error);
    }
  }

  static removeFromFavorites(favoriteId: string): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(fav => fav.id !== favoriteId);
      this.saveFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error removing from favorites in localStorage:', error);
    }
  }

  static clearFavorites(): void {
    try {
      localStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error);
    }
  }

  // Clear all data related to projects
  static clearAll(): void {
    try {
      this.clearProject();
      this.clearFavorites();
    } catch (error) {
      console.error('Error clearing all project data from localStorage:', error);
    }
  }
}