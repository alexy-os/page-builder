import { useState, useEffect } from "react";

import BlockSidebar from "../components/builder/BlockSidebar";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import Navigation from "../components/Navigation";
import ImportProjectDialog from "../components/dialogs/ImportProjectDialog";
import ImportThemeDialog from "../components/dialogs/ImportThemeDialog";

import { useTheme } from "../hooks/useTheme";
import { useProject } from "../hooks/useProject";
import { useHybridStorage } from "../hooks/useHybridStorage";
import { exportToHTML } from "../utils/htmlExporter";

export default function PageBuilder() {
  const { 
    isDark, 
    currentThemeId, 
    themeSelectorKey, 
    toggleDarkMode, 
    changeTheme, 
    importCustomTheme 
  } = useTheme();
  
  const { 
    blocks, 
    projectName, 
    setBlocks, 
    saveProject, 
    exportProject, 
    importProject
  } = useProject();
  
  // Новая архитектура HybridStorage
  const {
    enableSessionMode,
    disableSessionMode,
    isSessionMode,
    clearProjectBlocks,
    fullReset,
    stats
  } = useHybridStorage();
  
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showImportThemeDialog, setShowImportThemeDialog] = useState(false);

  // Auto-save project when data changes
  useEffect(() => {
    saveProject(currentThemeId);
  }, [blocks, projectName, currentThemeId, saveProject]);

  // Event handlers
  const handleExport = () => {
    exportProject(currentThemeId);
  };

  const handleExportHTML = () => {
    exportToHTML(blocks, projectName, currentThemeId);
  };

  const handleImport = (jsonData: string) => {
    importProject(jsonData, changeTheme);
  };

  const handleImportTheme = (themeData: any) => {
    return importCustomTheme(themeData);
  };

  // Новые обработчики для HybridStorage
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
        isSessionMode={isSessionMode()}
      />

      {/* Main Builder Interface */}
      <div className="flex-1 flex overflow-hidden">
        <BlockSidebar 
          blocks={blocks}
          setBlocks={setBlocks}
        />
        <BuilderCanvas 
          blocks={blocks}
          setBlocks={setBlocks}
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
