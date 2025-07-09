// New centralized data storage architecture

export { HybridStorage } from './hybridStorage';

// Export types from central location
export type { 
  ProjectState, 
  Collection, 
  SavedBlock, 
  CustomTheme, 
  SessionConfig, 
  ProjectExportData 
} from '@/types';

// All other storage classes are no longer used
// All logic is now centralized in HybridStorage