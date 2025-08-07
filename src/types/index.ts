export interface Block {
  id: string;
  type: string;
  content: any;
  order: number;
}

// New interface for storing block content data
export interface BlockData {
  id: string;  // ID блока (теперь равен templateId без префиксов и временных меток)
  type: string; // тип блока (например, "heroSplitMedia") - равен templateId
  content: any; // данные контента блока
}

export interface Template {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  defaultProps?: any;
}

export interface Theme {
  colorScheme: string;
  borderRadius: string;
}

export interface Project {
  name: string;
  blocks: Block[];
  theme: Theme;
  lastModified?: string;
  exportedAt?: string;
} 

// Centralized project structure
export interface ProjectState {
  name: string;
  id: string;
  version: string;
  
  blocks: any[];
  
  // New data array for block content
  data: BlockData[];
  
  theme: {
    currentThemeId: string;
    customThemes: CustomTheme[];
  };

  collections: Collection[];
  
  savedBlocks: SavedBlock[];
  
  favorites: string[];
  
  metadata: {
    createdAt: string;
    lastModified: string;
    version: string;
  };
}

export interface Collection {
  id: string;
  name: string;
  type: 'buildy' | 'user';
  blockIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedBlock {
  id: string;
  templateId: string;
  name: string;
  description: string;
  savedAt: string;
}

export interface CustomTheme {
  id: string;
  name: string;
  schema: any;
}

export interface SessionConfig {
  useSessionOnly: boolean;
  sessionId: string;
  startedAt: string;
}

export interface ProjectExportData {
  project: ProjectState;
  exportedAt: string;
  version: string;
} 