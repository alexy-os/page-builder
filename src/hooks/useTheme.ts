import { useState, useEffect } from "react";
import { 
  getCurrentTheme, 
  getThemeById, 
  setCurrentTheme,
  saveCustomTheme,
  type ThemeSchema
} from "@/lib/themeManager";

// Get CSS variables based on Tailwind version from environment
function getCSSVars(schema: ThemeSchema) {
  const tailwindVersion = import.meta.env.VITE_TAILWIND_VERSION || 'tw4-oklch';
  
  if (tailwindVersion === 'tw3-hsl') {
    return schema.cssVars;
  } else if (tailwindVersion === 'tw4-oklch') {
    return schema.cssVarsV4 || schema.cssVars; // fallback to cssVars if V4 not available
  }
  
  return schema.cssVars; // default fallback
}

// Apply CSS variables directly in runtime
function applyThemeVariables(themeId: string, isDarkMode: boolean = false) {
  const theme = getThemeById(themeId);
  if (!theme) return;
  
  const cssVars = getCSSVars(theme.schema);
  const { theme: themeVars, light, dark } = cssVars;
  const root = document.documentElement;
  
  // Apply theme variables
  if (themeVars) {
    Object.entries(themeVars).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
  
  // Apply variables depending on mode
  if (isDarkMode && dark) {
    // Dark mode - apply dark variables
    Object.entries(dark).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  } else if (!isDarkMode && light) {
    // Light mode - apply light variables
    Object.entries(light).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return getCurrentTheme();
  });

  const [themeSelectorKey, setThemeSelectorKey] = useState(0);

  // Apply dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Apply theme
  useEffect(() => {
    applyThemeVariables(currentThemeId, isDark);
  }, [currentThemeId, isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  const changeTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
    setCurrentTheme(themeId);
  };

  const importCustomTheme = (themeData: any) => {
    // Validate theme structure - check for both versions
    const hasV3 = themeData.cssVars && themeData.cssVars.light && themeData.cssVars.dark;
    const hasV4 = themeData.cssVarsV4 && themeData.cssVarsV4.light && themeData.cssVarsV4.dark;
    
    if (!hasV3 && !hasV4) {
      throw new Error("Invalid theme format. Theme must have either cssVars or cssVarsV4 structure.");
    }

    // Create unique ID for custom theme
    const customThemeId = `custom-${Date.now()}`;
    const customThemeName = themeData.name || "Custom Theme";
    
    // Save custom theme to localStorage
    saveCustomTheme(customThemeId, customThemeName, themeData);
    
    // Switch to new theme
    setCurrentThemeId(customThemeId);
    setCurrentTheme(customThemeId);
    
    // Force update ThemeSelector
    setThemeSelectorKey(prev => prev + 1);

    return customThemeName;
  };

  return {
    isDark,
    currentThemeId,
    themeSelectorKey,
    toggleDarkMode,
    changeTheme,
    importCustomTheme
  };
} 