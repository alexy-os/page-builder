// Theme state management with Zustand (Simplified)
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SimpleStorage } from '@/lib/storage/simpleStorage';
import { 
  getThemeById, 
  saveCustomTheme
} from '@/lib/themeManager';
import type { CustomTheme } from '@/types';

interface ThemeStore {
  // State
  isDark: boolean;
  currentThemeId: string;
  themeSelectorKey: number;
  customThemes: CustomTheme[];
  
  // Actions
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  changeTheme: (themeId: string) => void;
  addCustomTheme: (theme: CustomTheme) => void;
  removeCustomTheme: (themeId: string) => void;
  importCustomTheme: (themeData: any) => string;
  forceThemeSelectorUpdate: () => void;
  
  // Initialize
  initialize: () => void;
}

// Apply CSS variables directly in runtime
function applyThemeVariables(themeId: string, isDarkMode: boolean = false) {
  const theme = getThemeById(themeId);
  if (!theme) return;
  
  const { theme: themeVars, light, dark } = theme.schema.cssVars;
  const root = document.documentElement;
  
  // Apply theme variables
  Object.entries(themeVars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
  
  // Apply variables depending on mode
  if (isDarkMode) {
    Object.entries(dark).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  } else {
    Object.entries(light).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
}

const storage = SimpleStorage.getInstance();

export const useThemeStore = create<ThemeStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      isDark: false,
      currentThemeId: 'sky-os',
      themeSelectorKey: 0,
      customThemes: [],
      
      // Initialize from storage
      initialize: () => {
        const isDark = storage.getDarkMode();
        const currentThemeId = storage.getCurrentTheme();
        const customThemes = storage.getCustomThemes();
        
        set({ 
          isDark, 
          currentThemeId, 
          customThemes 
        });
        
        // Apply dark mode class
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        
        // Apply theme
        applyThemeVariables(currentThemeId, isDark);
      },
      
      // Dark mode actions
      toggleDarkMode: () => {
        const { isDark } = get();
        const newIsDark = !isDark;
        
        storage.setDarkMode(newIsDark);
        set({ isDark: newIsDark });
        
        if (newIsDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        
        // Re-apply theme with new dark mode
        const { currentThemeId } = get();
        applyThemeVariables(currentThemeId, newIsDark);
      },
      
      setDarkMode: (isDark: boolean) => {
        storage.setDarkMode(isDark);
        set({ isDark });
        
        if (isDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        
        const { currentThemeId } = get();
        applyThemeVariables(currentThemeId, isDark);
      },
      
      // Theme actions
      changeTheme: (themeId: string) => {
        storage.setCurrentTheme(themeId);
        set({ currentThemeId: themeId });
        
        const { isDark } = get();
        applyThemeVariables(themeId, isDark);
      },
      
      addCustomTheme: (theme: CustomTheme) => {
        storage.addCustomTheme(theme);
        const customThemes = storage.getCustomThemes();
        set({ customThemes });
      },
      
      removeCustomTheme: (themeId: string) => {
        storage.removeCustomTheme(themeId);
        const customThemes = storage.getCustomThemes();
        set({ customThemes });
      },
      
      importCustomTheme: (themeData: any) => {
        // Validate theme structure
        if (!themeData.cssVars || !themeData.cssVars.theme || !themeData.cssVars.light || !themeData.cssVars.dark) {
          throw new Error("Invalid theme format. Please check the schema structure.");
        }

        // Create unique ID for custom theme
        const customThemeId = `custom-${Date.now()}`;
        const customThemeName = themeData.name || "Custom Theme";
        
        // Save custom theme to SimpleStorage
        const theme: CustomTheme = {
          id: customThemeId,
          name: customThemeName,
          schema: themeData
        };
        
        get().addCustomTheme(theme);
        
        // Also save to themeManager for compatibility
        saveCustomTheme(customThemeId, customThemeName, themeData);
        
        // Switch to new theme
        get().changeTheme(customThemeId);
        
        // Force update ThemeSelector
        get().forceThemeSelectorUpdate();

        return customThemeName;
      },
      
      forceThemeSelectorUpdate: () => {
        set((state) => ({ 
          themeSelectorKey: state.themeSelectorKey + 1 
        }));
      },
    }),
    {
      name: 'theme-store',
    }
  )
); 