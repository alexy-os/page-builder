export interface Block {
  id: string;
  type: string;
  content: any;
  order: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  defaultContent: any;
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