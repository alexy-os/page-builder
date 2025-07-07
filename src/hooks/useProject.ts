import { useState } from "react";

const STORAGE_KEY = "pagebuilder_project";

export interface ProjectData {
  name: string;
  blocks: any[];
  themeId: string;
  lastModified?: string;
  exportedAt?: string;
}

export function useProject() {
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).blocks || [] : [];
  });
  
  const [projectName, setProjectName] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).name || "Buildy Project" : "Buildy Project";
  });

  // Auto-save project to localStorage
  const saveProject = (themeId: string) => {
    const project: ProjectData = {
      name: projectName,
      blocks,
      themeId,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  };

  const exportProject = (themeId: string) => {
    const project: ProjectData = {
      name: projectName,
      blocks,
      themeId,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(project, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, "_")}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importProject = (projectJson: string, onThemeChange: (themeId: string) => void) => {
    const project = JSON.parse(projectJson);
    if (project.blocks && Array.isArray(project.blocks)) {
      setBlocks(project.blocks);
      setProjectName(project.name || "Imported Project");
      const importedThemeId = project.themeId || 'sky-os';
      onThemeChange(importedThemeId);
      return true;
    }
    return false;
  };

  // Clear project from localStorage and reset state
  const clearProject = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setBlocks([]);
      setProjectName("Buildy Project");
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