import { useState, useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Moon, Sun, Download, Upload, Menu, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeSelector } from "@/components/theme-selector";

import BlockSidebar from "../components/builder/BlockSidebar";
import BuilderCanvas from "../components/builder/BuilderCanvas";
import { allComponents } from "../components/builder/blocks/index";
import { 
  getCurrentTheme, 
  getThemeById, 
  generateTailwindThemeCSS,
  generateGoogleFontsURLForTheme,
  saveCustomTheme,
  setCurrentTheme
} from "@/lib/themeManager";

const STORAGE_KEY = "pagebuilder_project";

// Apply CSS variables directly in runtime
function applyThemeVariables(themeId: string, isDarkMode: boolean = false) {
  const theme = getThemeById(themeId);
  if (!theme) return;
  
  const { theme: themeVars, light, dark } = theme.schema.cssVars;
  const root = document.documentElement;
  
  // First clear all theme variables
  // (optional, for cleanliness)
  
  // Apply theme variables
  Object.entries(themeVars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Apply variables depending on mode
  if (isDarkMode) {
    // Dark mode - apply dark variables
    Object.entries(dark).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  } else {
    // Light mode - apply light variables
    Object.entries(light).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
}

export default function PageBuilder() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).blocks || [] : [];
  });
  
  const [projectName, setProjectName] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).name || "Buildy Project" : "Buildy Project";
  });
  
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return getCurrentTheme();
  });
  
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importJson, setImportJson] = useState("");
  
  // Add new state for theme import
  const [showImportThemeDialog, setShowImportThemeDialog] = useState(false);
  const [importThemeJson, setImportThemeJson] = useState("");
  const [importThemeError, setImportThemeError] = useState("");
  const [themeSelectorKey, setThemeSelectorKey] = useState(0);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const project = {
      name: projectName,
      blocks,
      themeId: currentThemeId,
      lastModified: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  }, [blocks, projectName, currentThemeId]);

  useEffect(() => {
    // Apply theme on load and change, pass isDark
    applyThemeVariables(currentThemeId, isDark);
    //loadFontsForTheme(currentThemeId);
  }, [currentThemeId, isDark]);

  const handleExport = () => {
    const project = {
      name: projectName,
      blocks,
      themeId: currentThemeId,
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

  const handleExportHTML = () => {
    // Create static HTML from React components
    const renderBlocksToHTML = () => {
      return blocks.map((block: any) => {
        const BlockComponent = allComponents[block.type as keyof typeof allComponents];
        if (!BlockComponent) return '';
        
        // Render component to static HTML
        return renderToStaticMarkup(
            <BlockComponent 
              content={block.content} 
              isPreview={false}
            />
        );
      }).join('\n');
    };

    const blocksHTML = renderBlocksToHTML();
    
    // Generate CSS styles for theme from schema
    const generateThemeCSS = () => {
      const themeData = getThemeById(currentThemeId);
      if (!themeData) {
        console.warn(`Theme with ID ${currentThemeId} not found`);
        return '';
      }
      
      return generateTailwindThemeCSS(themeData.schema);
    };

    const themeCSS = generateThemeCSS();
    const fontsURL = generateGoogleFontsURLForTheme(currentThemeId);

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Drag & Drop Page Builder</title>
    ${fontsURL ? `<link href="${fontsURL}" rel="stylesheet">` : ''}
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
        ${themeCSS}
    </style>
</head>
<body class="bg-background text-foreground">
${blocksHTML}

<!-- THEME TOGGLE - DELETE THIS SECTION IF NOT NEEDED -->
<div id="theme-toggle" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999;">
  <button onclick="toggleTheme()" style="
    background: var(--color-primary); 
    color: var(--color-primary-foreground); 
    border: none; 
    border-radius: var(--radius-lg); 
    padding: 12px; 
    cursor: pointer; 
    box-shadow: var(--shadow-lg);
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
  " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
    <span id="theme-icon">🌙</span>
  </button>
</div>

<script>
// THEME TOGGLE SCRIPT - DELETE THIS SECTION IF NOT NEEDED
function toggleTheme() {
  const html = document.documentElement;
  const icon = document.getElementById('theme-icon');
  
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme on page load
(function() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const icon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    icon.textContent = '☀️';
  } else {
    icon.textContent = '🌙';
  }
})();
</script>
<!-- END THEME TOGGLE -->

</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName.replace(/\s+/g, '_')}.html`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    try {
      const project = JSON.parse(importJson);
      if (project.blocks && Array.isArray(project.blocks)) {
        setBlocks(project.blocks);
        setProjectName(project.name || "Imported Project");
        const importedThemeId = project.themeId || 'sky-os';
        setCurrentThemeId(importedThemeId);
        setCurrentTheme(importedThemeId);
        setShowImportDialog(false);
        setImportJson("");
      }
    } catch (error) {
      alert("Invalid JSON format. Please check your project file.");
    }
  };

  // Add function for theme import
  const handleImportTheme = () => {
    try {
      const themeData = JSON.parse(importThemeJson);
      
      // Validate theme structure
      if (!themeData.cssVars || !themeData.cssVars.theme || !themeData.cssVars.light || !themeData.cssVars.dark) {
        setImportThemeError("Invalid theme format. Please check the schema structure.");
        return;
      }

      // Create unique ID for custom theme
      const customThemeId = `custom-${Date.now()}`;
      const customThemeName = themeData.name || "Custom Theme";
      
      // Save custom theme to localStorage
      saveCustomTheme(customThemeId, customThemeName, themeData);
      
      // Switch to new theme - update local state and localStorage
      setCurrentThemeId(customThemeId);
      setCurrentTheme(customThemeId);
      
      // Force update ThemeSelector
      setThemeSelectorKey(prev => prev + 1);

      setShowImportThemeDialog(false);
      setImportThemeJson("");
      setImportThemeError("");
      
      // Show success notification
      alert(`Theme "${customThemeName}" imported successfully!`);
      
    } catch (error) {
      setImportThemeError("Invalid JSON format. Please check your theme file.");
    }
  };

  return (
      <div className="h-screen flex flex-col bg-background text-foreground">
        {/* Top Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                BuildY/UI
              </h1>
              <div className="hidden md:block text-sm text-muted-foreground">
                {projectName}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <ThemeSelector 
                forceUpdate={themeSelectorKey}
                onThemeChange={(themeId) => setCurrentThemeId(themeId)}
              />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportHTML}>
                    <Download className="mr-2 h-4 w-4" />
                    Export HTML
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowImportDialog(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Import Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowImportThemeDialog(true)}>
                    <Palette className="mr-2 h-4 w-4" />
                    Import Theme
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </nav>

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

        {/* Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="import-json">Paste your project JSON:</Label>
                <textarea
                  id="import-json"
                  className="w-full h-32 p-3 mt-2 text-sm border rounded-md bg-background"
                  value={importJson}
                  onChange={(e) => setImportJson(e.target.value)}
                  placeholder="Paste your exported project JSON here..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleImport}>
                  Import
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Import Theme Dialog */}
        <Dialog open={showImportThemeDialog} onOpenChange={setShowImportThemeDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Import Theme</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Import a custom theme schema from{" "}
                <a 
                  href="https://tweakcn.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  tweakcn.com
                </a>
                {" "}or paste your JSON schema
              </p>
            </DialogHeader>
            <div className="flex flex-col gap-4 flex-1 min-h-0">
              <div className="flex flex-col gap-2">
                <Label htmlFor="theme-json" className="text-sm font-medium">
                  Theme Schema (JSON):
                </Label>
                <textarea
                  id="theme-json"
                  value={importThemeJson}
                  onChange={(e) => {
                    setImportThemeJson(e.target.value);
                    setImportThemeError("");
                  }}
                  className="flex-1 min-h-[300px] p-3 font-mono border border-input text-xs resize-none focus:outline-none focus:ring-1 focus:ring-ring text-secondary-foreground bg-muted/25"
                  placeholder={`{
  "cssVars": {
    "theme": {
      "background": "oklch(0.9707 0.0027 286.3504)",
      "foreground": "oklch(0.2316 0.0038 286.0989)",
      "primary": "oklch(0.6028 0.2177 257.4239)",
      ...
    },
    "light": {
      "background": "oklch(0.9707 0.0027 286.3504)",
      "foreground": "oklch(0.2316 0.0038 286.0989)",
      ...
    },
    "dark": {
      "background": "oklch(0.2178 0 0)",
      "foreground": "oklch(0.9067 0 0)",
      ...
    }
  }
}`}
                />
              </div>
              {importThemeError && (
                <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/20 p-2 rounded">
                  Error: {importThemeError}
                </div>
              )}
            </div>
            <div className="flex justify-between pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowImportThemeDialog(false);
                  setImportThemeJson("");
                  setImportThemeError("");
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleImportTheme}
                disabled={!importThemeJson.trim() || !!importThemeError}
              >
                Import Theme
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}
