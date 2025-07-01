import { Moon, Sun, Download, Upload, Menu, Palette } from "lucide-react";
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
  onExport: () => void;
  onExportHTML: () => void;
  onImport: () => void;
  onImportTheme: () => void;
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
  onImportTheme
}: NavigationProps) {
  return (
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                Export Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExportHTML}>
                <Download className="mr-2 h-4 w-4" />
                Export HTML
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onImport}>
                <Upload className="mr-2 h-4 w-4" />
                Import Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onImportTheme}>
                <Palette className="mr-2 h-4 w-4" />
                Import Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
} 