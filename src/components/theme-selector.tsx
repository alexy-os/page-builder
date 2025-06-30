import { useState, useEffect } from "react";
import { Palette, Check, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { 
  getAvailableThemes, 
  getCurrentTheme, 
  setCurrentTheme, 
  loadThemeCSS,
  type Theme,
  loadFontsForTheme,
  deleteCustomTheme
} from "@/lib/themeManager";

interface ThemeSelectorProps {
  onThemeChange?: (themeId: string) => void;
  forceUpdate?: number;
}

export function ThemeSelector({ onThemeChange, forceUpdate }: ThemeSelectorProps) {
  const [currentTheme, setCurrentThemeState] = useState<string>('');
  const [themes, setThemes] = useState<Theme[]>([]);

  // Load themes and the current theme on mount and on changes
  const refreshThemes = () => {
    const availableThemes = getAvailableThemes();
    setThemes(availableThemes);
    
    const savedTheme = getCurrentTheme();
    setCurrentThemeState(savedTheme);
    
    return { availableThemes, savedTheme };
  };

  useEffect(() => {
    const { savedTheme } = refreshThemes();
    loadThemeCSS(savedTheme);
  }, []);

  // Update on forceUpdate prop change
  useEffect(() => {
    if (forceUpdate !== undefined) {
      refreshThemes();
    }
  }, [forceUpdate]);

  const handleThemeChange = async (themeId: string) => {
    try {
      // Update state
      setCurrentThemeState(themeId);
      setCurrentTheme(themeId);
      
      // Load theme CSS or apply custom theme
      await loadThemeCSS(themeId);
      
      // Load fonts for theme
      await loadFontsForTheme(themeId);
      
      // Call callback if provided
      onThemeChange?.(themeId);
      
      // Update import in main.tsx
      updateMainTsxImport(themeId);
      
    } catch (error) {
      console.error('Error switching theme:', error);
    }
  };

  const handleDeleteCustomTheme = (themeId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this custom theme?')) {
      deleteCustomTheme(themeId);
      
      // Update list of themes
      const { availableThemes } = refreshThemes();
      
      // If the deleted theme was active, switch to the first available
      if (currentTheme === themeId) {
        const firstTheme = availableThemes[0];
        if (firstTheme) {
          handleThemeChange(firstTheme.id);
        }
      }
    }
  };

  // Update import in main.tsx (for production builds)
  const updateMainTsxImport = (themeId: string) => {
    // This function will only work in development mode
    // In production themes should be pre-built
    if (import.meta.env.DEV) {
      console.log(`Switching to theme: ${themeId}`);
      // In a real application, here you could use the HMR API
    }
  };

  const currentThemeData = themes.find(theme => theme.id === currentTheme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {currentThemeData?.name || 'Select theme'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => handleThemeChange(theme.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{theme.name}</span>
              {theme.isCustom && (
                <span className="text-xs text-muted-foreground">(Custom)</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {currentTheme === theme.id && (
                <Check className="h-4 w-4" />
              )}
              {theme.isCustom && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => handleDeleteCustomTheme(theme.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 