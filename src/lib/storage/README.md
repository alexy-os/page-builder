# BuildY Simple Storage System

The entire data storage system has been simplified to use **SimpleStorage** with only sessionStorage. Everything is immediate and fast.

## Key Benefits

- ✅ **Immediate operations** - no delays, no syncing
- ✅ **Single storage** - only sessionStorage 
- ✅ **Simple API** - no complex modes or configurations
- ✅ **Fast performance** - no heavy operations or intervals
- ✅ **Session-based** - data persists during browser session

## Storage Keys

Only **2 keys** are used in sessionStorage:
- `buildy_project` - all project data (blocks, collections, favorites, themes)
- `buildy_darkmode` - dark mode preference

## API Usage

```typescript
import { SimpleStorage } from '@/lib/storage/simpleStorage';

const storage = SimpleStorage.getInstance();

// All operations are immediate
storage.updateProjectBlocks(blocks); // Saves instantly
storage.addToFavorites(templateId); // Saves instantly
storage.saveCollection(collection); // Saves instantly
```

## Hook Usage

```typescript
import { useSimpleStorage } from '@/hooks/useSimpleStorage';
import { useTheme } from '@/hooks/useTheme';
import { useProject } from '@/hooks/useProject';
import { useCollections } from '@/hooks/useCollections';
import { useFavorites } from '@/hooks/useFavorites';

function Component() {
  const { fullReset, exportProject } = useSimpleStorage();
  const { isDark, toggleDarkMode } = useTheme();
  const { blocks, setBlocks } = useProject();
  const { collections, createCollection } = useCollections();
  const { favorites, toggleFavorite } = useFavorites();
}
```

## Store Integration

All Zustand stores now use SimpleStorage:

```typescript
// These stores use SimpleStorage under the hood
import { useProjectStore, useUIStore, useThemeStore } from '@/store';
```

## Migration from HybridStorage

- ❌ No more session/localStorage modes
- ❌ No more sync intervals or debouncing
- ❌ No more complex initialization logic
- ❌ No more performance issues

All data operations are now **immediate** and **simple**.

## File Structure

```
src/lib/storage/
├── simpleStorage.ts     # ✅ New simple storage class
└── README.md           # ✅ This documentation

Old files removed:
├── hybridStorage.ts    # ❌ Removed (was complex)
├── index.ts           # ❌ Removed (no longer needed)
```

All logic is now centralized in `SimpleStorage`. 

## Development

In development mode, no special debugging stats are needed - everything is immediate and visible in React DevTools.

The system is designed for maximum simplicity and performance. 