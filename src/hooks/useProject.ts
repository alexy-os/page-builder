// Simplified hook for working with projects through HybridStorage

import { HybridStorage } from '@/lib/storage';

const storage = HybridStorage.getInstance();

export function useProject() {
  const project = storage.getProject();

  const blocks = project?.blocks || [];
  const projectName = project?.name || "Buildy Project";

  const setBlocks = (newBlocks: any[]) => {
    storage.updateProjectBlocks(newBlocks);
  };

  const setProjectName = (name: string) => {
    storage.updateProjectName(name);
  };

  const saveProject = (themeId: string) => {
    if (project) {
      storage.setCurrentTheme(themeId);
      storage.forceSync();
    }
  };

  const exportProject = (themeId: string) => {
    try {
      if (project) {
        storage.setCurrentTheme(themeId);
        const exportData = storage.exportProject();
        
        const dataBlob = new Blob([exportData], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `${projectName.replace(/\s+/g, "_")}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting project:', error);
    }
  };

  const importProject = (projectJson: string, onThemeChange: (themeId: string) => void) => {
    try {
      const success = storage.importProject(projectJson);
      if (success) {
        const newProject = storage.getProject();
        if (newProject) {
          onThemeChange(newProject.theme.currentThemeId);
        }
      }
      return success;
    } catch (error) {
      console.error('Error importing project:', error);
      return false;
    }
  };

  const clearProject = () => {
    try {
      storage.clearProjectBlocks();
      storage.updateProjectName("Buildy Project");
    } catch (error) {
      console.error('Error clearing project:', error);
    }
  };

  return {
    blocks,
    projectName,
    setBlocks,
    setProjectName,
    saveProject,
    exportProject,
    importProject,
    clearProject
  };
} 