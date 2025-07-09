import { useEffect, useCallback } from "react";
import { useAtom } from 'jotai';

import BlockSidebar from "../components/builder/BlockSidebar";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import Navigation from "../components/Navigation";
import ImportProjectDialog from "../components/dialogs/ImportProjectDialog";
import ImportThemeDialog from "../components/dialogs/ImportThemeDialog";

import { useProjectStore, useUIStore, useThemeStore } from "@/store";
import { useHybridStorage } from "../hooks/useHybridStorage";
import { exportToHTML } from "../utils/htmlExporter";
import { initializationErrorAtom, isInitializedAtom } from "@/atoms";

export default function PageBuilder() {
  // Jotai atoms for local state
  const [initializationError, setInitializationError] = useAtom(initializationErrorAtom);
  const [isInitialized, setIsInitialized] = useAtom(isInitializedAtom);

  // All hooks must be called unconditionally at the top
  // Zustand stores
  const { 
    isDark, 
    currentThemeId, 
    themeSelectorKey, 
    toggleDarkMode, 
    changeTheme, 
    importCustomTheme,
    initialize: initializeTheme 
  } = useThemeStore();
  
  const { 
    project,
    isLoading,
    updateProjectBlocks,
    exportProject,
    importProject,
    initializeProject
  } = useProjectStore();
  
  const {
    showImportDialog,
    showImportThemeDialog,
    setShowImportDialog,
    setShowImportThemeDialog,
    enableSessionMode,
    disableSessionMode,
    isSessionMode
  } = useUIStore();
  
  // Legacy hook for storage operations
  const {
    clearProjectBlocks,
    fullReset,
    stats,
    forceSync
  } = useHybridStorage();

  // Safe initialization with error handling
  const safeInitialize = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      setInitializationError(null);
      
      // Initialize theme first (synchronous)
      initializeTheme();
      
      // Then initialize project
      initializeProject();
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error during initialization:', error);
      setInitializationError(error instanceof Error ? error.message : 'Unknown initialization error');
    }
  }, [isInitialized, initializeTheme, initializeProject, setInitializationError, setIsInitialized]);

  // Event handlers - all using useCallback
  const handleExport = useCallback(() => {
    try {
      console.log('Starting export process...');
      console.log('Current project:', project);
      
      if (!project) {
        throw new Error('No project loaded');
      }
      
      // Force sync to ensure all data is saved
      try {
        if (forceSync) {
          forceSync();
          console.log('Forced sync completed');
        }
      } catch (syncError) {
        console.warn('Sync before export failed:', syncError);
      }
      
      const jsonData = exportProject();
      console.log('Export data received:', jsonData ? 'Success' : 'Failed');
      
      if (!jsonData || jsonData.trim() === '') {
        throw new Error('Export returned empty data');
      }
      
      // Validate JSON before creating file
      try {
        JSON.parse(jsonData);
      } catch (parseError) {
        throw new Error('Export returned invalid JSON data');
      }
      
      // Create and download file
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Project exported successfully');
      
      // Show success message
      alert('Project exported successfully!');
      
    } catch (error) {
      console.error('Error exporting project:', error);
      alert(`Error exporting project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [exportProject, project, forceSync]);

  const handleExportHTML = useCallback(() => {
    try {
      const blocks = project?.blocks || [];
      const projectName = project?.name || "Buildy Project";
      exportToHTML(blocks, projectName, currentThemeId);
    } catch (error) {
      console.error('Error exporting HTML:', error);
      alert('Error exporting HTML. Please try again.');
    }
  }, [project, currentThemeId]);

  const handleImport = useCallback((jsonData: string) => {
    try {
      const success = importProject(jsonData);
      if (success) {
        // Get the updated project from the store after import
        const updatedProject = useProjectStore.getState().project;
        if (updatedProject?.theme?.currentThemeId) {
          changeTheme(updatedProject.theme.currentThemeId);
        }
      }
      // Don't return anything - dialog expects void
    } catch (error) {
      console.error('Error importing project:', error);
      // Could show error dialog here if needed
    }
  }, [importProject, changeTheme]);

  const handleImportTheme = useCallback((themeData: any) => {
    try {
      return importCustomTheme(themeData);
    } catch (error) {
      console.error('Error importing theme:', error);
      return '';
    }
  }, [importCustomTheme]);

  const handleClearProject = useCallback(() => {
    if (confirm('Are you sure you want to clear the current project? This will remove all blocks from the canvas.')) {
      try {
        clearProjectBlocks();
      } catch (error) {
        console.error('Error clearing project:', error);
        alert('Error clearing project. Please try again.');
      }
    }
  }, [clearProjectBlocks]);

  const handleFullReset = useCallback(() => {
    if (confirm('Are you sure you want to perform a full reset? This will clear ALL data (projects, collections, themes) and reload the application.')) {
      try {
        fullReset();
      } catch (error) {
        console.error('Error performing full reset:', error);
        alert('Error performing reset. Please refresh the page manually.');
      }
    }
  }, [fullReset]);

  const handleEnableSessionMode = useCallback(() => {
    if (confirm('Enable Session Mode? Your data will only be stored for this browser session and will be lost when you close the browser.')) {
      try {
        enableSessionMode();
      } catch (error) {
        console.error('Error enabling session mode:', error);
        alert('Error enabling session mode. Please try again.');
      }
    }
  }, [enableSessionMode]);

  const handleDisableSessionMode = useCallback(() => {
    if (confirm('Disable Session Mode? Your current session data will be saved to permanent storage.')) {
      try {
        disableSessionMode();
      } catch (error) {
        console.error('Error disabling session mode:', error);
        alert('Error disabling session mode. Please try again.');
      }
    }
  }, [disableSessionMode]);

  // Safe blocks update with validation
  const handleUpdateBlocks = useCallback((newBlocks: any[]) => {
    try {
      // Validate blocks structure
      if (!Array.isArray(newBlocks)) {
        console.error('Invalid blocks data: must be an array');
        return;
      }

      // Validate each block
      const validBlocks = newBlocks.filter(block => {
        if (!block || typeof block !== 'object') {
          console.warn('Invalid block removed:', block);
          return false;
        }
        if (!block.id || !block.type) {
          console.warn('Block missing required fields:', block);
          return false;
        }
        return true;
      });

      updateProjectBlocks(validBlocks);
    } catch (error) {
      console.error('Error updating blocks:', error);
      alert('Error updating blocks. Please try again.');
    }
  }, [updateProjectBlocks]);

  // Initialize stores on mount - only once
  useEffect(() => {
    safeInitialize();
  }, []); // Empty dependency array - run only once

  // Get safe project data
  const blocks = Array.isArray(project?.blocks) ? project.blocks : [];
  const projectName = project?.name || "Buildy Project";

  // Render different states - all hooks are called above this point
  
  // Handle initialization error
  if (initializationError) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-red-600">Initialization Error</h2>
          <p className="text-muted-foreground mb-4">{initializationError}</p>
          <button 
            onClick={() => {
              setInitializationError(null);
              setIsInitialized(false);
              fullReset();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reset Application
          </button>
        </div>
      </div>
    );
  }

  // Show loading state during initialization
  if (!isInitialized || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  // Validate project data
  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Project Found</h2>
          <p className="text-muted-foreground mb-4">
            Unable to load project data. This might be due to corrupted storage.
          </p>
          <button 
            onClick={fullReset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Create New Project
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navigation
        projectName={projectName}
        isDark={isDark}
        themeSelectorKey={themeSelectorKey}
        onToggleDarkMode={toggleDarkMode}
        onThemeChange={changeTheme}
        onExport={handleExport}
        onExportHTML={handleExportHTML}
        onImport={() => setShowImportDialog(true)}
        onImportTheme={() => setShowImportThemeDialog(true)}
        onClearProject={handleClearProject}
        onEnableSessionMode={handleEnableSessionMode}
        onDisableSessionMode={handleDisableSessionMode}
        onFullReset={handleFullReset}
        isSessionMode={isSessionMode}
      />

      {/* Main Builder Interface */}
      <div className="flex-1 flex overflow-hidden">
        <BlockSidebar 
          blocks={blocks}
          setBlocks={handleUpdateBlocks}
        />
        <BuilderCanvas 
          blocks={blocks}
          setBlocks={handleUpdateBlocks}
        />
      </div>

      {/* Storage Stats (for development/debugging) */}
      {process.env.NODE_ENV === 'development' && stats && (
        <div className="bg-muted/50 px-4 py-2 text-xs text-muted-foreground border-t">
          Project: {stats.projectName} | Blocks: {stats.blocksCount} | Collections: {stats.collectionsCount} | 
          Favorites: {stats.favoritesCount} | Storage: {stats.useSessionOnly ? 'Session' : 'LocalStorage'} | 
          Memory: {(stats.memoryUsage / 1024).toFixed(1)}KB | Last Sync: {stats.lastSync}
        </div>
      )}

      {/* Dialogs */}
      <ImportProjectDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleImport}
      />

      <ImportThemeDialog
        open={showImportThemeDialog}
        onOpenChange={setShowImportThemeDialog}
        onImport={handleImportTheme}
      />
    </div>
  );
}
