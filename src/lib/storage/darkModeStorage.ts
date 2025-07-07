// Dark Mode Storage - management of themes and theme mode in localStorage

const DARK_MODE_KEY = 'darkMode';
const CURRENT_THEME_KEY = 'current-theme';
const CUSTOM_THEMES_KEY = 'custom-themes';

export interface CustomTheme {
  id: string;
  name: string;
  schema: any;
}

export class DarkModeStorage {
  // Management of theme mode (dark/light)
  static getDarkMode(): boolean {
    try {
      const saved = localStorage.getItem(DARK_MODE_KEY);
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Error loading dark mode from localStorage:', error);
      return false;
    }
  }

  static setDarkMode(isDark: boolean): void {
    try {
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error saving dark mode to localStorage:', error);
    }
  }

  // Management of current theme
  static getCurrentTheme(): string {
    try {
      return localStorage.getItem(CURRENT_THEME_KEY) || 'sky-os';
    } catch (error) {
      console.error('Error loading current theme from localStorage:', error);
      return 'sky-os';
    }
  }

  static setCurrentTheme(themeId: string): void {
    try {
      localStorage.setItem(CURRENT_THEME_KEY, themeId);
    } catch (error) {
      console.error('Error saving current theme to localStorage:', error);
    }
  }

  // Management of custom themes
  static getCustomThemes(): CustomTheme[] {
    try {
      const customThemesData = localStorage.getItem(CUSTOM_THEMES_KEY);
      return customThemesData ? JSON.parse(customThemesData) : [];
    } catch (error) {
      console.error('Error loading custom themes from localStorage:', error);
      return [];
    }
  }

  static saveCustomThemes(themes: CustomTheme[]): void {
    try {
      localStorage.setItem(CUSTOM_THEMES_KEY, JSON.stringify(themes));
    } catch (error) {
      console.error('Error saving custom themes to localStorage:', error);
    }
  }

  static addCustomTheme(theme: CustomTheme): void {
    try {
      const existingThemes = this.getCustomThemes();
      const updatedThemes = [...existingThemes, theme];
      this.saveCustomThemes(updatedThemes);
    } catch (error) {
      console.error('Error adding custom theme to localStorage:', error);
    }
  }

  static removeCustomTheme(themeId: string): void {
    try {
      const existingThemes = this.getCustomThemes();
      const filteredThemes = existingThemes.filter(theme => theme.id !== themeId);
      this.saveCustomThemes(filteredThemes);
    } catch (error) {
      console.error('Error removing custom theme from localStorage:', error);
    }
  }

  // Clear all data related to themes
  static clearAll(): void {
    try {
      localStorage.removeItem(DARK_MODE_KEY);
      localStorage.removeItem(CURRENT_THEME_KEY);
      localStorage.removeItem(CUSTOM_THEMES_KEY);
    } catch (error) {
      console.error('Error clearing theme data from localStorage:', error);
    }
  }
}