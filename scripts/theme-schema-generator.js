#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const THEMES_DIR = path.resolve(__dirname, '../src/styles/themes');
const SCHEMA_DIR = path.resolve(__dirname, '../src/styles/schema');

// CSS variable regex patterns
const CSS_VAR_REGEX = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
const ROOT_REGEX = /:root\s*\{([\s\S]*?)\}/g;
const DARK_REGEX = /\.dark\s*\{([\s\S]*?)\}/g;

/**
 * Parse CSS variables from CSS content
 */
function parseCSSVariables(cssContent) {
  const result = {
    light: {},
    dark: {}
  };

  // Reset regex indices
  ROOT_REGEX.lastIndex = 0;
  DARK_REGEX.lastIndex = 0;

  // Parse :root variables (light theme)
  const rootMatch = ROOT_REGEX.exec(cssContent);
  if (rootMatch) {
    const rootContent = rootMatch[1];
    let match;
    const cssVarRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    while ((match = cssVarRegex.exec(rootContent)) !== null) {
      const [, key, value] = match;
      result.light[key] = value.trim();
    }
  }

  // Parse .dark variables (dark theme)
  const darkMatch = DARK_REGEX.exec(cssContent);
  if (darkMatch) {
    const darkContent = darkMatch[1];
    let match;
    const cssVarRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
    while ((match = cssVarRegex.exec(darkContent)) !== null) {
      const [, key, value] = match;
      result.dark[key] = value.trim();
    }
  }

  return result;
}

/**
 * Process a single theme directory
 */
function processTheme(themeName, themePath) {
  console.log(`🎨 Processing theme: ${themeName}`);
  
  const schema = {
    "$schema": "https://ui.shadcn.com/schema/registry-item.json",
    "name": themeName,
    "type": "registry:style",
    "cssVars": {
      "light": {},
      "dark": {}
    },
    "cssVarsV4": {
      "light": {},
      "dark": {}
    },
    "css": {
      "@layer base": {
        "body": {
          "letter-spacing": "var(--tracking-normal)"
        }
      }
    }
  };

  // Process TW3 (HSL) version
  const tw3Path = path.join(themePath, 'tw3-hsl', 'index.css');
  if (fs.existsSync(tw3Path)) {
    console.log(`  ✅ Found TW3 CSS: ${tw3Path}`);
    const tw3Content = fs.readFileSync(tw3Path, 'utf-8');
    const tw3Vars = parseCSSVariables(tw3Content);
    schema.cssVars = tw3Vars;
  } else {
    console.log(`  ❌ TW3 CSS not found: ${tw3Path}`);
  }

  // Process TW4 (OKLCH) version
  const tw4Path = path.join(themePath, 'tw4-oklch', 'index.css');
  if (fs.existsSync(tw4Path)) {
    console.log(`  ✅ Found TW4 CSS: ${tw4Path}`);
    const tw4Content = fs.readFileSync(tw4Path, 'utf-8');
    const tw4Vars = parseCSSVariables(tw4Content);
    schema.cssVarsV4 = tw4Vars;
  } else {
    console.log(`  ❌ TW4 CSS not found: ${tw4Path}`);
  }

  return schema;
}

/**
 * Recursively scan themes directory
 */
function scanThemes() {
  console.log(`🔍 Scanning themes directory: ${THEMES_DIR}`);
  
  if (!fs.existsSync(THEMES_DIR)) {
    console.error(`❌ Themes directory not found: ${THEMES_DIR}`);
    process.exit(1);
  }

  const themes = [];
  const entries = fs.readdirSync(THEMES_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const themeName = entry.name;
      const themePath = path.join(THEMES_DIR, themeName);
      
      // Check if this directory contains theme structure
      const tw3Dir = path.join(themePath, 'tw3-hsl');
      const tw4Dir = path.join(themePath, 'tw4-oklch');
      
      if (fs.existsSync(tw3Dir) || fs.existsSync(tw4Dir)) {
        const schema = processTheme(themeName, themePath);
        themes.push({ name: themeName, schema });
      } else {
        console.log(`  ⚠️  Skipping ${themeName} - no theme structure found`);
      }
    }
  }

  return themes;
}

/**
 * Save schema to JSON file
 */
function saveSchema(themeName, schema) {
  // Ensure schema directory exists
  if (!fs.existsSync(SCHEMA_DIR)) {
    fs.mkdirSync(SCHEMA_DIR, { recursive: true });
  }

  const schemaPath = path.join(SCHEMA_DIR, `${themeName}.json`);
  const jsonContent = JSON.stringify(schema, null, 2);
  
  fs.writeFileSync(schemaPath, jsonContent, 'utf-8');
  console.log(`  💾 Schema saved: ${schemaPath}`);
}

/**
 * Main function
 */
function main() {
  console.log('🚀 Starting theme schema generation...\n');

  try {
    const themes = scanThemes();
    
    if (themes.length === 0) {
      console.log('❌ No themes found!');
      process.exit(1);
    }

    console.log(`\n📦 Found ${themes.length} themes:`);
    themes.forEach(({ name }) => console.log(`  - ${name}`));

    console.log('\n💾 Generating schemas...');
    
    for (const { name, schema } of themes) {
      saveSchema(name, schema);
    }

    console.log(`\n✅ Successfully generated ${themes.length} theme schemas!`);
    console.log(`📁 Schema files saved to: ${SCHEMA_DIR}`);

  } catch (error) {
    console.error('❌ Error generating schemas:', error);
    process.exit(1);
  }
}

// Run the script
main(); 