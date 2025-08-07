// Migration utilities for converting old block naming formats to new unified format
import type { ProjectState, SavedBlock, BlockData } from '@/types';

/**
 * Migrates project data from old naming format to new unified format
 * - Old SavedBlock.id: "block-{templateId}-{timestamp}" → New: "{templateId}"
 * - Old BlockData.id: "{templateId}_{timestamp}" → New: "{templateId}"
 * - Ensures all naming is consistent and uses only templateId
 */
export function migrateProjectToUnifiedNaming(project: ProjectState): ProjectState {
  console.log('🔄 Migrating project to unified naming format...');
  
  // Migrate savedBlocks - convert old prefixed IDs to clean templateIds
  const migratedSavedBlocks: SavedBlock[] = project.savedBlocks.map(block => {
    let newId = block.id;
    
    // Check if it's the old format "block-{templateId}-{timestamp}"
    if (block.id.startsWith('block-') && block.id.includes('-')) {
      const parts = block.id.split('-');
      if (parts.length >= 2) {
        // Use templateId as the new ID
        newId = block.templateId;
        console.log(`📝 Migrated savedBlock: ${block.id} → ${newId}`);
      }
    }
    
    return {
      ...block,
      id: newId
    };
  });
  
  // Migrate data array - convert old timestamped IDs to clean templateIds
  const migratedData: BlockData[] = project.data.map(blockData => {
    let newId = blockData.id;
    
    // Check if it's the old format "{templateId}_{timestamp}" or other format
    if (blockData.id.includes('_') || blockData.id !== blockData.type) {
      // Use type (templateId) as the new ID
      newId = blockData.type;
      console.log(`📝 Migrated blockData: ${blockData.id} → ${newId}`);
    }
    
    return {
      ...blockData,
      id: newId
    };
  });
  
  // Remove duplicates - keep the latest entry for each templateId
  const uniqueSavedBlocks = deduplicateByTemplateId(migratedSavedBlocks);
  const uniqueData = deduplicateByType(migratedData);
  
  const migratedProject = {
    ...project,
    savedBlocks: uniqueSavedBlocks,
    data: uniqueData
  };
  
  console.log('✅ Migration completed');
  console.log(`📊 SavedBlocks: ${project.savedBlocks.length} → ${uniqueSavedBlocks.length}`);
  console.log(`📊 Data entries: ${project.data.length} → ${uniqueData.length}`);
  
  return migratedProject;
}

/**
 * Removes duplicate savedBlocks, keeping the most recent one for each templateId
 */
function deduplicateByTemplateId(blocks: SavedBlock[]): SavedBlock[] {
  const blockMap = new Map<string, SavedBlock>();
  
  blocks.forEach(block => {
    const existing = blockMap.get(block.templateId);
    if (!existing || new Date(block.savedAt) > new Date(existing.savedAt)) {
      blockMap.set(block.templateId, block);
    }
  });
  
  return Array.from(blockMap.values());
}

/**
 * Removes duplicate blockData, keeping the most recent one for each type
 */
function deduplicateByType(data: BlockData[]): BlockData[] {
  const dataMap = new Map<string, BlockData>();
  
  data.forEach(blockData => {
    // Always keep the latest entry for each type
    dataMap.set(blockData.type, blockData);
  });
  
  return Array.from(dataMap.values());
}

/**
 * Checks if project needs migration
 */
export function needsMigration(project: ProjectState): boolean {
  // Check if any savedBlocks have old format IDs
  const hasOldSavedBlocks = project.savedBlocks.some(block => 
    block.id.startsWith('block-') || block.id !== block.templateId
  );
  
  // Check if any data entries have old format IDs
  const hasOldData = project.data.some(blockData => 
    blockData.id.includes('_') || blockData.id !== blockData.type
  );
  
  return hasOldSavedBlocks || hasOldData;
}

/**
 * Validates that project is in the new unified format
 */
export function validateUnifiedFormat(project: ProjectState): boolean {
  // Check that all savedBlocks use templateId as ID
  const validSavedBlocks = project.savedBlocks.every(block => 
    block.id === block.templateId && !block.id.includes('-') && !block.id.includes('_')
  );
  
  // Check that all data entries use type as ID
  const validData = project.data.every(blockData => 
    blockData.id === blockData.type && !blockData.id.includes('-') && !blockData.id.includes('_')
  );
  
  return validSavedBlocks && validData;
}