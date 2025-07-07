import { useState, useEffect } from "react";

import BlockSidebar from "../components/builder/BlockSidebar";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import Navigation from "../components/Navigation";
import ImportProjectDialog from "../components/dialogs/ImportProjectDialog";
import ImportThemeDialog from "../components/dialogs/ImportThemeDialog";

import { useTheme } from "../hooks/useTheme";
import { useProject } from "../hooks/useProject";
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
    importProject,
    clearProject 
  } = useProject();
  
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
        onClearProject={clearProject}
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
