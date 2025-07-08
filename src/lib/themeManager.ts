export interface ThemeSchema {
  $schema: string;
  name: string;
  type: string;
  cssVars: {
    theme?: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  cssVarsV4: {
    theme?: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  css?: Record<string, any>;
}

export interface Theme {
  id: string;
  name: string;
  fileName: string;
  schema: ThemeSchema;
  isCustom?: boolean;
}

// Import theme schemas statically for Vite
const themeSchemas = import.meta.glob('../styles/schema/*.json', { 
  eager: true 
}) as Record<string, { default: ThemeSchema }>;

// Get CSS variables based on Tailwind version from environment
export function getCSSVars(schema: ThemeSchema) {
  const tailwindVersion = import.meta.env.VITE_TAILWIND_VERSION || 'tw4-oklch';
  
  if (tailwindVersion === 'tw3-hsl') {
    return schema.cssVars || schema.cssVarsV4;
  } else if (tailwindVersion === 'tw4-oklch') {
    return schema.cssVarsV4; // fallback to cssVars if V4 not available
  }
  
  return schema.cssVarsV4; // default fallback
}

// Get all available themes (including custom)
export function getAvailableThemes(): Theme[] {
  const themes: Theme[] = [];
  
  // Add built-in themes
  for (const [path, module] of Object.entries(themeSchemas)) {
    const fileName = path.split('/').pop()?.replace('.json', '') || '';
    const schema = module.default;
    
    themes.push({
      id: fileName,
      name: schema.name,
      fileName,
      schema
    });
  }
  
  // Add custom themes from localStorage
  const customThemes = getCustomThemes();
  themes.push(...customThemes);
  
  return themes.sort((a, b) => a.name.localeCompare(b.name));
}

// Get custom themes from localStorage
export function getCustomThemes(): Theme[] {
  const customThemesData = localStorage.getItem('custom-themes');
  if (!customThemesData) return [];
  
  try {
    const customThemes = JSON.parse(customThemesData);
    return customThemes.map((theme: any) => ({
      id: theme.id,
      name: theme.name,
      fileName: theme.id,
      schema: theme.schema,
      isCustom: true
    }));
  } catch (error) {
    console.error('Error loading custom themes:', error);
    return [];
  }
}

// Save custom theme
export function saveCustomTheme(themeId: string, themeName: string, schema: ThemeSchema): void {
  const customThemes = getCustomThemes();
  
  // Check if a theme with this ID already exists
  const existingIndex = customThemes.findIndex(theme => theme.id === themeId);
  
  const newTheme = {
    id: themeId,
    name: themeName,
    fileName: themeId,
    schema,
    isCustom: true
  };
  
  if (existingIndex >= 0) {
    customThemes[existingIndex] = newTheme;
  } else {
    customThemes.push(newTheme);
  }
  
  localStorage.setItem('custom-themes', JSON.stringify(customThemes));
}

// Delete custom theme
export function deleteCustomTheme(themeId: string): void {
  const customThemes = getCustomThemes();
  const filteredThemes = customThemes.filter(theme => theme.id !== themeId);
  localStorage.setItem('custom-themes', JSON.stringify(filteredThemes));
}

// Get theme by ID
export function getThemeById(themeId: string): Theme | null {
  const themes = getAvailableThemes();
  return themes.find(theme => theme.id === themeId) || null;
}

// Generate CSS variables from theme schema
export function generateCSSVariables(schema: ThemeSchema): string {
  const { theme = {}, light, dark } = getCSSVars(schema);
  
  let css = ':root {\n';
  
  // Add theme variables
  for (const [key, value] of Object.entries(theme)) {
    css += `  --${key}: ${value};\n`;
  }
  
  // Add light variables
  for (const [key, value] of Object.entries(light)) {
    css += `  --${key}: ${value};\n`;
  }
  
  css += '}\n\n';
  
  // Add dark variables
  css += '.dark {\n';
  for (const [key, value] of Object.entries(dark)) {
    css += `  --${key}: ${value};\n`;
  }
  css += '}\n';
  
  return css;
}

// Generate CSS for HTML export with @theme directive for Tailwind v4
export function generateTailwindThemeCSS(schema: ThemeSchema): string {
  const { theme = {}, light, dark } = getCSSVars(schema);
  
  let css = '@custom-variant dark (&:is(.dark *));\n\n';
  
  // First add :root variables for light theme
  css += ':root {\n';
  for (const [key, value] of Object.entries(light)) {
    css += `  --${key}: ${value};\n`;
  }
  // Add theme variables to :root
  for (const [key, value] of Object.entries(theme)) {
    css += `  --${key}: ${value};\n`;
  }
  css += '}\n\n';
  
  // Add .dark variables
  css += '.dark {\n';
  for (const [key, value] of Object.entries(dark)) {
    css += `  --${key}: ${value};\n`;
  }
  css += '}\n\n';
  
  // Add @theme inline block as in CSS files
  css += '@theme inline {\n';
  
  // Color variables
  for (const [key] of Object.entries(light)) {
    if (!key.startsWith('font-') && !key.startsWith('radius') && 
        !key.startsWith('tracking-') && !key.startsWith('shadow-') && 
        !key.startsWith('spacing') && !key.startsWith('letter-spacing')) {
      css += `  --color-${key}: var(--${key});\n`;
    }
  }
  
  // Font variables
  css += `  --font-sans: var(--font-sans);\n`;
  css += `  --font-mono: var(--font-mono);\n`;
  css += `  --font-serif: var(--font-serif);\n\n`;
  
  // Radii
  css += `  --radius-sm: calc(var(--radius) - 4px);\n`;
  css += `  --radius-md: calc(var(--radius) - 2px);\n`;
  css += `  --radius-lg: var(--radius);\n`;
  css += `  --radius-xl: calc(var(--radius) + 4px);\n\n`;
  
    // Shadows
  const shadowKeys = ['shadow-2xs', 'shadow-xs', 'shadow-sm', 'shadow', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-2xl'];
  for (const shadowKey of shadowKeys) {
    if (light[shadowKey]) {
      css += `  --${shadowKey}: var(--${shadowKey});\n`;
    }
  }
  css += '\n';
  
  // Tracking
  css += `  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);\n`;
  css += `  --tracking-tight: calc(var(--tracking-normal) - 0.025em);\n`;
  css += `  --tracking-normal: var(--tracking-normal);\n`;
  css += `  --tracking-wide: calc(var(--tracking-normal) + 0.025em);\n`;
  css += `  --tracking-wider: calc(var(--tracking-normal) + 0.05em);\n`;
  css += `  --tracking-widest: calc(var(--tracking-normal) + 0.1em);\n`;
  
  css += '}\n\n';
  
  // Add body styles
  css += 'body {\n';
  css += '  letter-spacing: var(--tracking-normal);\n';
  css += '}\n';
  
  return css;
}

// Dynamically import theme CSS or apply custom theme
export async function loadThemeCSS(themeId: string): Promise<void> {
  // Remove previous theme CSS file
  const existingLink = document.querySelector('link[data-theme-css]');
  if (existingLink) {
    existingLink.remove();
  }
  
  // Remove previous custom styles
  const existingCustomStyle = document.querySelector('style[data-custom-theme]');
  if (existingCustomStyle) {
    existingCustomStyle.remove();
  }
  
  const theme = getThemeById(themeId);
  
  if (theme?.isCustom) {
    // For custom theme create <style> element
    const style = document.createElement('style');
    style.setAttribute('data-custom-theme', themeId);
    style.textContent = generateCSSVariables(theme.schema);
    document.head.appendChild(style);
  } else {
    // For built-in themes import CSS file based on environment
    const tailwindVersion = import.meta.env.VITE_TAILWIND_VERSION || 'tw4-oklch';
    
    try {
      if (tailwindVersion === 'tw4-oklch') {
        // For Tailwind 4, load CSS content as text to avoid PostCSS processing
        const response = await fetch(`/src/styles/index.css`);
        const cssContent = await response.text();
        
        const style = document.createElement('style');
        style.setAttribute('data-theme-css', themeId);
        style.textContent = cssContent;
        document.head.appendChild(style);
      } else {
        // For Tailwind 3, use link element as before
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `/src/styles/tailwind-v3.css`;
        link.setAttribute('data-theme-css', themeId);
        document.head.appendChild(link);
      }
    } catch (error) {
      console.warn(`Failed to load CSS file for theme ${themeId} with version ${tailwindVersion}:`, error);
    }
  }
}

// Get current theme from localStorage
export function getCurrentTheme(): string {
  return localStorage.getItem('current-theme') || 'sky-os';
}

// Save current theme to localStorage
export function setCurrentTheme(themeId: string): void {
  localStorage.setItem('current-theme', themeId);
}

// Parse fonts from CSS values
function parseFonts(fontValue: string): string[] {
  return fontValue
    .split(',')
    .map(font => font.trim().replace(/['"]/g, ''))
    .filter(font => font && !font.includes('system-ui') && !font.includes('sans-serif') && !font.includes('monospace') && !font.includes('serif'));
}

// Check if font is Google Font
function isGoogleFont(fontName: string): boolean {
  const googleFonts = [
    'Plus Jakarta Sans',
    'IBM Plex Mono', 
    'Lora',
    'Inter',
    'Roboto',
    'Open Sans',
    'Montserrat',
    'Poppins',
    'Geist',
    'Geist Mono',
    'Source Sans Pro',
    'Nunito',
    'Raleway',
    'Ubuntu',
    'Segoe UI',
    'Merriweather',
    'Playfair Display',
    'Lato',
    // Add new Google Fonts here
  ];
  
  return googleFonts.some(gFont => fontName.includes(gFont));
}

// Get Google Fonts from specific theme
export function getGoogleFontsFromTheme(themeId: string): Set<string> {
  const theme = getThemeById(themeId);
  if (!theme) return new Set();
  
  const fonts = new Set<string>();
  const { theme: themeVars = {}, light, dark } = getCSSVars(theme.schema);
  
  [themeVars, light, dark].forEach(vars => {
    Object.entries(vars).forEach(([key, value]) => {
      if (key.startsWith('font-')) {
        const parsedFonts = parseFonts(value);
        parsedFonts.forEach(font => {
          if (isGoogleFont(font)) {
            fonts.add(font);
          }
        });
      }
    });
  });
  
  return fonts;
}

// Generate Google Fonts URL for specific theme
export function generateGoogleFontsURLForTheme(themeId: string): string {
  const fonts = getGoogleFontsFromTheme(themeId);
  if (fonts.size === 0) return '';
  
  const fontParams: string[] = [];
  
  fonts.forEach(font => {
    const encodedFont = encodeURIComponent(font);
    // Add default weights for all fonts
    fontParams.push(`family=${encodedFont}:wght@300;400;500;600;700`);
  });
  
  return `https://fonts.googleapis.com/css2?${fontParams.join('&')}&display=swap`;
}

// Dynamically load fonts for theme
export async function loadFontsForTheme(themeId: string): Promise<void> {
  const fontsURL = generateGoogleFontsURLForTheme(themeId);
  if (!fontsURL) return;
  
  // Remove previous fonts
  const existingFontLinks = document.querySelectorAll('link[data-theme-fonts]');
  existingFontLinks.forEach(link => link.remove());
  
  // Add new fonts
  const link = document.createElement('link');
  link.href = fontsURL;
  link.rel = 'stylesheet';
  link.setAttribute('data-theme-fonts', themeId);
  document.head.appendChild(link);
} 