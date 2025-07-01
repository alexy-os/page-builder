import { Moon, Sun, Download, Upload, Menu, Palette, Grid3X3, Hammer, EllipsisVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSelector } from "@/components/theme-selector";

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
  onImportCollections
}: NavigationProps) {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              BuildY/UI
            </h1>
          </Link>
          <div className="hidden md:block text-sm text-muted-foreground">
            {projectName}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="mr-2">
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
          
          {(onExport || onImport || onExportCollections || onImportCollections) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
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
                    <DropdownMenuSeparator />
                  </>
                )}
                {onExportCollections && (
                  <DropdownMenuItem onClick={onExportCollections}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Collections
                  </DropdownMenuItem>
                )}
                {(onImport || onImportTheme || onImportCollections) && (
                  <>
                    {onExportCollections && <DropdownMenuSeparator />}
                    {onImport && (
                      <DropdownMenuItem onClick={onImport}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Project
                      </DropdownMenuItem>
                    )}
                    {onImportTheme && (
                      <DropdownMenuItem onClick={onImportTheme}>
                        <Palette className="mr-2 h-4 w-4" />
                        Import Theme
                      </DropdownMenuItem>
                    )}
                    {onImportCollections && (
                      <DropdownMenuItem onClick={onImportCollections}>
                        <Upload className="mr-2 h-4 w-4" />
                        Import Collections
                      </DropdownMenuItem>
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