import { useState, useEffect, useCallback, useMemo } from "react";
import { useAtom } from 'jotai';
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
import { themeLoadingAtom, themeErrorAtom } from "@/atoms";

interface ThemeSelectorProps {
  onThemeChange?: (themeId: string) => void;
  forceUpdate?: number;
}

export function ThemeSelector({ onThemeChange, forceUpdate }: ThemeSelectorProps) {
  const [currentTheme, setCurrentThemeState] = useState<string>('');
  const [themes, setThemes] = useState<Theme[]>([]);
  
  // Jotai atoms for loading and error states
  const [isLoading, setIsLoading] = useAtom(themeLoadingAtom);
  const [error, setError] = useAtom(themeErrorAtom);

  // Safe theme loading with error handling
  const safeLoadThemes = useCallback(async () => {
    try {
      setError(null);
      const availableThemes = getAvailableThemes();
      
      // Validate themes array
      const validThemes = Array.isArray(availableThemes) ? availableThemes.filter(theme => 
        theme && 
        typeof theme === 'object' && 
        typeof theme.id === 'string' && 
        typeof theme.name === 'string'
      ) : [];
      
      setThemes(validThemes);
      
      const savedTheme = getCurrentTheme();
      setCurrentThemeState(savedTheme);
      
      return { availableThemes: validThemes, savedTheme };
    } catch (error) {
      console.error('Error loading themes:', error);
      setError('Failed to load themes');
      // Fallback to basic theme
      setThemes([{ id: 'sky-os', name: 'Sky OS', fileName: 'sky-os', schema: {} as any }]);
      setCurrentThemeState('sky-os');
      return { availableThemes: [], savedTheme: 'sky-os' };
    }
  }, [setError]);

  // Memoized theme loading to prevent unnecessary re-renders
  const refreshThemes = useCallback(async () => {
    return await safeLoadThemes();
  }, [safeLoadThemes]);

  // Initialize themes on mount
  useEffect(() => {
    let mounted = true;
    
    const initializeThemes = async () => {
      setIsLoading(true);
      try {
        const { savedTheme } = await refreshThemes();
        
        if (mounted) {
          // Safe theme CSS loading
          try {
            await loadThemeCSS(savedTheme);
          } catch (error) {
            console.error('Error loading initial theme CSS:', error);
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeThemes();
    
    return () => {
      mounted = false;
    };
  }, []); // Only run on mount

  // Update on forceUpdate prop change
  useEffect(() => {
    if (forceUpdate !== undefined && forceUpdate > 0) {
      refreshThemes();
    }
  }, [forceUpdate, refreshThemes]);

  // Safe theme change handler
  const handleThemeChange = useCallback(async (themeId: string) => {
    if (isLoading || themeId === currentTheme) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update state optimistically
      setCurrentThemeState(themeId);
      setCurrentTheme(themeId);
      
      // Load theme resources safely
      await Promise.all([
        loadThemeCSS(themeId).catch(error => {
          console.error('Error loading theme CSS:', error);
        }),
        loadFontsForTheme(themeId).catch(error => {
          console.error('Error loading theme fonts:', error);
        })
      ]);
      
      // Call callback if provided
      onThemeChange?.(themeId);
      
    } catch (error) {
      console.error('Error switching theme:', error);
      setError('Failed to switch theme');
      // Revert on error
      setCurrentThemeState(currentTheme);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentTheme, onThemeChange, setIsLoading, setError]);

  // Safe theme deletion
  const handleDeleteCustomTheme = useCallback((themeId: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    
    if (isLoading) return;
    
    if (confirm('Are you sure you want to delete this custom theme?')) {
      try {
        deleteCustomTheme(themeId);
        
        // Update list of themes
        refreshThemes().then(({ availableThemes }) => {
          // If the deleted theme was active, switch to the first available
          if (currentTheme === themeId) {
            const firstTheme = availableThemes[0];
            if (firstTheme) {
              handleThemeChange(firstTheme.id);
            }
          }
        });
      } catch (error) {
        console.error('Error deleting custom theme:', error);
        setError('Failed to delete theme');
      }
    }
  }, [isLoading, currentTheme, refreshThemes, handleThemeChange, setError]);

  // Memoize current theme data to prevent unnecessary re-renders
  const currentThemeData = useMemo(() => {
    return themes.find(theme => theme.id === currentTheme);
  }, [themes, currentTheme]);

  // Show error state
  if (error) {
    return (
      <Button variant="outline" size="sm" className="gap-2 text-red-600">
        <Palette className="h-4 w-4" />
        Theme Error
      </Button>
    );
  }

  // Show loading state
  if (isLoading && themes.length === 0) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Palette className="h-4 w-4" />
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" disabled={isLoading}>
          <Palette className="h-4 w-4" />
          {currentThemeData?.name || 'Select theme'}
          {isLoading && ' (Loading...)'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.length === 0 ? (
          <DropdownMenuItem disabled>
            No themes available
          </DropdownMenuItem>
        ) : (
          themes.map((theme) => (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className="flex items-center justify-between cursor-pointer"
              disabled={isLoading}
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
                {theme.isCustom && !isLoading && (
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
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 