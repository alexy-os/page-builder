import { useEffect } from "react";

import BlockSidebar from "../components/builder/BlockSidebar";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import Navigation from "../components/Navigation";
import ImportProjectDialog from "../components/dialogs/ImportProjectDialog";
import ImportThemeDialog from "../components/dialogs/ImportThemeDialog";

import { useProjectStore, useUIStore, useThemeStore } from "@/store";
import { useHybridStorage } from "../hooks/useHybridStorage";
import { exportToHTML } from "../utils/htmlExporter";

export default function PageBuilder() {
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
    stats
  } = useHybridStorage();

  // Initialize stores on mount
  useEffect(() => {
    initializeTheme();
    initializeProject();
  }, [initializeTheme, initializeProject]);

  // Get project data
  const blocks = project?.blocks || [];
  const projectName = project?.name || "Buildy Project";

  // Event handlers
  const handleExport = () => {
    try {
      exportProject();
    } catch (error) {
      console.error('Error exporting project:', error);
    }
  };

  const handleExportHTML = () => {
    exportToHTML(blocks, projectName, currentThemeId);
  };

  const handleImport = (jsonData: string) => {
    const success = importProject(jsonData);
    if (success && project) {
      changeTheme(project.theme.currentThemeId);
    }
    return success;
  };

  const handleImportTheme = (themeData: any) => {
    return importCustomTheme(themeData);
  };

  const handleClearProject = () => {
    if (confirm('Are you sure you want to clear the current project? This will remove all blocks from the canvas.')) {
      clearProjectBlocks();
    }
  };

  const handleFullReset = () => {
    if (confirm('Are you sure you want to perform a full reset? This will clear ALL data (projects, collections, themes) and reload the application.')) {
      fullReset();
    }
  };

  const handleEnableSessionMode = () => {
    if (confirm('Enable Session Mode? Your data will only be stored for this browser session and will be lost when you close the browser.')) {
      enableSessionMode();
    }
  };

  const handleDisableSessionMode = () => {
    if (confirm('Disable Session Mode? Your current session data will be saved to permanent storage.')) {
      disableSessionMode();
    }
  };

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
          setBlocks={updateProjectBlocks}
        />
        <BuilderCanvas 
          blocks={blocks}
          setBlocks={updateProjectBlocks}
        />
      </div>

      {/* Storage Stats (for development/debugging) */}
      {process.env.NODE_ENV === 'development' && (
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
