import { Moon, Sun, Download, Upload, Menu, Grid3X3, Hammer, EllipsisVertical, Trash2, Power } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSelector } from "@/components/ThemeSelector";

interface NavigationProps {
  projectName: string;
  isDark: boolean;
  themeSelectorKey: number;
  onToggleDarkMode: () => void;
  onThemeChange: (themeId: string) => void;
  onExport?: () => void;
  onExportHTML?: () => void;
  onImport?: () => void;
  onImportTheme?: () => void;
  onExportCollections?: () => void;
  onImportCollections?: () => void;
  onClearCollections?: () => void;
  onClearProject?: () => void;
  onFullReset?: () => void;
}

export default function Navigation({
  projectName,
  isDark,
  themeSelectorKey,
  onToggleDarkMode,
  onThemeChange,
  onExport,
  onExportHTML,
  onImport,
  onImportTheme,
  onExportCollections,
  onImportCollections,
  onClearCollections,
  onClearProject,
  onFullReset
}: NavigationProps) {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/55 bg-clip-text text-transparent">
              Build<span className="text-primary/55">Y</span>
            </h1>
          </Link>
          <div className="hidden md:block text-sm text-muted-foreground">
            {projectName}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 mr-2">
              <EllipsisVertical className="h-4 w-4" />
                Navigation
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/builder" className="flex items-center w-full">
                  <Hammer className="mr-2 h-4 w-4" />
                  Go to Builder
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="flex items-center w-full">
                  <Grid3X3 className="mr-2 h-4 w-4" />
                  Pins Collection
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeSelector 
            forceUpdate={themeSelectorKey}
            onThemeChange={onThemeChange}
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          {/* Main Menu */}
          {(onExport || onImport || onExportCollections || onImportCollections || onClearCollections || onClearProject || onFullReset) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {/* Export Section */}
                {onExport && (
                  <>
                    <DropdownMenuItem onClick={onExport}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Project
                    </DropdownMenuItem>
                    {onExportHTML && (
                      <DropdownMenuItem onClick={onExportHTML}>
                        <Download className="mr-2 h-4 w-4" />
                        Export HTML
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                
                {onExportCollections && (
                  <DropdownMenuItem onClick={onExportCollections}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Collections
                  </DropdownMenuItem>
                )}
                
                {/* Import Section */}
                {(onImport || onImportTheme || onImportCollections) && (
                  <>
                    {(onExport || onExportCollections) && <DropdownMenuSeparator />}
                    {onImport && (
                      <DropdownMenuItem onClick={onImport}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Project
                      </DropdownMenuItem>
                    )}
                    {/* onImportTheme && (
                      <DropdownMenuItem onClick={onImportTheme}>
                        <Palette className="mr-2 h-4 w-4" />
                        Import Theme
                      </DropdownMenuItem>
                    ) */}
                    {onImportCollections && (
                      <DropdownMenuItem onClick={onImportCollections}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Collections
                      </DropdownMenuItem>
                    )}
                  </>
                )}
                
                {/* Clear Section */}
                {(onClearCollections || onClearProject || onFullReset) && (
                  <>
                    <DropdownMenuSeparator />
                    {onClearCollections && (
                      <DropdownMenuItem 
                        onClick={onClearCollections}
                        className="text-amber-600 dark:text-amber-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Collections
                      </DropdownMenuItem>
                    )}
                    {onClearProject && (
                      <DropdownMenuItem 
                        onClick={onClearProject}
                        className="text-orange-600 dark:text-orange-400"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Clear Project
                      </DropdownMenuItem>
                    )}
                    {onFullReset && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={onFullReset}
                          className="text-red-600 dark:text-red-400"
                        >
                          <Power className="mr-2 h-4 w-4" />
                          Full Reset & Reload
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
} 