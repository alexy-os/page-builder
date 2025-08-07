# Migration to Unified Block Naming System

## Overview

The system has been migrated from inconsistent block naming formats to a unified naming system that uses only the clean `templateId` for all block references.

## Changes Made

### Before (Old Format)
- **SavedBlock IDs**: `"block-{templateId}-{timestamp}"` (e.g., `"block-heroSplitMedia-1754303683138"`)
- **BlockData IDs**: `"{templateId}_{timestamp}"` (e.g., `"heroSplitMedia_1754303683138"`)
- **Favorites**: `templateId` (clean)
- **Workspace blocks**: `templateId` (clean)

### After (New Unified Format)
- **SavedBlock IDs**: `templateId` (e.g., `"heroSplitMedia"`)
- **BlockData IDs**: `templateId` (e.g., `"heroSplitMedia"`)
- **Favorites**: `templateId` (unchanged)
- **Workspace blocks**: `templateId` (unchanged)

## Benefits

1. **Consistent Naming**: All block references now use the same format
2. **Simplified Content Management**: `data.content` entries are easier to manage and find
3. **Better Import/Export**: No more complex ID parsing and conversion
4. **Reduced Complexity**: Eliminates timestamp-based ID generation
5. **Improved Performance**: Direct lookup by templateId without string parsing

## Migration Process

### Automatic Migration
- Projects are automatically migrated when loaded from sessionStorage
- Migration happens transparently in `SimpleStorage.getProject()`
- Old format data is converted to new format and saved

### Manual Migration
- Force migration via `storage.forceUnifiedNamingMigration()`
- Available in developer tools and admin interfaces

### Import/Export Compatibility
- **Export**: Always exports in new unified format (version 2.0.0)
- **Import**: Supports both old (1.0.0) and new (2.0.0) formats
- Legacy collections import automatically normalizes block IDs

## Technical Implementation

### Files Modified
1. `src/lib/storage/simpleStorage.ts` - Core storage logic
2. `src/hooks/useCollections.ts` - Collection management
3. `src/hooks/useContentManagement.ts` - Content management
4. `src/hooks/useBlockContent.ts` - Content retrieval
5. `src/store/projectStore.ts` - State management
6. `src/hooks/useSimpleStorage.ts` - Storage hook
7. `src/types/index.ts` - Type definitions

### New Files Added
1. `src/lib/storage/migration.ts` - Migration utilities

### Key Functions
- `migrateProjectToUnifiedNaming()` - Converts old format to new
- `needsMigration()` - Checks if migration is needed
- `validateUnifiedFormat()` - Validates new format compliance
- `forceUnifiedNamingMigration()` - Manual migration trigger

## Usage Examples

### Saving Blocks (New Way)
```typescript
// Old way
const blockId = `block-${templateId}-${timestamp}`;
const dataBlockId = `${templateId}_${timestamp}`;

// New way
const blockId = templateId;  // Clean and simple
const dataBlockId = templateId;  // Same as blockId
```

### Retrieving Content (New Way)
```typescript
// Old way - complex ID parsing
const parts = savedBlockId.split('-');
const templateId = parts[1];
const timestamp = parts[2];
const dataBlockId = `${templateId}_${timestamp}`;

// New way - direct lookup
const content = storage.getContentForSavedBlock(templateId);
```

## Validation

### Check Migration Status
```typescript
const isUnified = storage.isUnifiedFormat();
console.log('Project is in unified format:', isUnified);
```

### Storage Statistics
```typescript
const stats = storage.getStats();
console.log('Unified format:', stats.isUnifiedFormat);
```

## Backward Compatibility

- Old exported projects (.json files) can still be imported
- Automatic conversion happens during import
- No data loss during migration
- Duplicate blocks are removed (keeping latest)

## Testing

1. Export project before migration
2. Verify automatic migration on reload
3. Test import of old format files
4. Verify content preservation
5. Check unified format validation

## Rollback

If needed, rollback is possible by:
1. Restoring from pre-migration export
2. The system will auto-migrate again on next load

This migration ensures better maintainability and consistency across the entire block management system.