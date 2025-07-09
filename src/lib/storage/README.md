# New Data Storage Architecture for Page Builder

## Overview

The entire data storage system has been redesigned to use a centralized architecture through `HybridStorage`. Now, only **2 keys** are used in localStorage:

- `darkMode` - dark mode setting
- `project` - all project data (blocks, collections, themes, favorites)

## Key Advantages

✅ **Centralized Management** - all data in one place  
✅ **Session Mode** - ability to work only within a session  
✅ **Automatic Synchronization** - data syncs between memory and storage  
✅ **Hybrid Cache** - fast working with operational memory  
✅ **Simple API** - simplified hooks for all operations  

## Project Structure

```typescript
interface ProjectState {
  name: string;
  id: string;
  version: string;
  blocks: any[];              // Blocks in canvas
  theme: {
    currentThemeId: string;
    customThemes: CustomTheme[];
  };
  collections: Collection[];   // All collections
  savedBlocks: SavedBlock[];   // Saved blocks
  favorites: string[];         // Favorite templates
  metadata: {
    createdAt: string;
    lastModified: string;
    version: string;
  };
}
```

## Usage

### Main Hook
```typescript
import { useHybridStorage } from '@/hooks/useHybridStorage';

const {
  // State
  stats,
  isLoading,
  
  // Project
  getProject,
  updateProjectBlocks,
  clearProjectBlocks,
  
  // Themes
  getCurrentTheme,
  setCurrentTheme,
  
  // Collections
  getCollections,
  saveCollection,
  clearCollections,
  
  // Favorites
  getFavorites,
  toggleFavorite,
  
  // Session
  enableSessionMode,
  disableSessionMode,
  isSessionMode,
  
  // Utilities
  fullReset,
  exportProject,
  importProject
} = useHybridStorage();
```

### Simplified Hooks (Compatibility)
```typescript
// These hooks now use HybridStorage under the hood
import { useProject } from '@/hooks/useProject';
import { useTheme } from '@/hooks/useTheme';
import { useCollections } from '@/hooks/useCollections';
import { useFavorites } from '@/hooks/useFavorites';
```

## Operating Modes

### Normal Mode (Default)
- Data is saved in `localStorage`
- Data remains after browser closure
- Automatic synchronization every 5 seconds

### Session Mode
- Data is saved only in `sessionStorage`
- Data is deleted when the browser is closed
- Useful for temporary work or demonstrations

```typescript
// Enable session mode
enableSessionMode();

// Check mode
const isSession = isSessionMode();

// Disable session mode
disableSessionMode();
```

## Clearing Buttons

### In Navigation (General)
- **Session Mode** - switching between localStorage and sessionStorage
- **Clear Collections** - clearing only collections (for Pins page)
- **Clear Project** - clearing only canvas (for Builder page)  
- **Full Reset & Reload** - complete clearing of all data + reload

### Page-Specific
- **Pins**: clear button removes only collections
- **Builder**: clear button removes only canvas blocks

## Initialization

When the application starts:
1. `sessionStorage` is completely cleared
2. Data is loaded from `localStorage` or a default project is created
3. Auto-sync timer is started
4. Data is cached in memory for quick access

## Statistics and Debugging

In development mode, a statistics line is displayed at the bottom of the page:
```
Project: My Project | Blocks: 5 | Collections: 4 | Favorites: 2 | Storage: LocalStorage | Memory: 25.3KB | Last Sync: 10:30:45
```

## Migration

Old files have been removed:
- ❌ `collectionStorage.ts`
- ❌ `darkModeStorage.ts` 
- ❌ `projectStorage.ts`

All logic is now centralized in `HybridStorage`. 