// WebSocket Types - types of data for WebSocket connector

export interface WebSocketConfig {
  url: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  timeout?: number;
  protocols?: string[];
}

export interface WebSocketMessage<T = any> {
  id: string;
  type: WebSocketMessageType;
  action: CrudAction;
  resource: ResourceType;
  data?: T;
  timestamp: number;
  version?: string;
  userId?: string;
  sessionId?: string;
  error?: string;
}

export enum WebSocketMessageType {
  REQUEST = 'request',
  RESPONSE = 'response',
  EVENT = 'event',
  HEARTBEAT = 'heartbeat',
  ERROR = 'error'
}

export enum CrudAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  SYNC = 'sync',
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe'
}

export enum ResourceType {
  PROJECT = 'project',
  COLLECTION = 'collection',
  BLOCK = 'block',
  THEME = 'theme',
  USER = 'user',
  VERSION = 'version',
  CANVAS = 'canvas'
}

export interface ProjectData {
  id: string;
  name: string;
  blocks: any[];
  themeId: string;
  canvas?: CanvasData;
  version: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  metadata?: Record<string, any>;
}

export interface CollectionData {
  id: string;
  name: string;
  type: 'buildy' | 'user';
  blockIds: string[];
  version: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  metadata?: Record<string, any>;
}

export interface BlockData {
  id: string;
  templateId: string;
  name: string;
  description: string;
  content: any;
  version: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  metadata?: Record<string, any>;
}

export interface ThemeData {
  id: string;
  name: string;
  schema: any;
  version: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isCustom: boolean;
  metadata?: Record<string, any>;
}

export interface CanvasData {
  id: string;
  projectId: string;
  layout: any;
  components: any[];
  styles: Record<string, any>;
  version: string;
  updatedAt: string;
}

export interface VersionInfo {
  id: string;
  resourceType: ResourceType;
  resourceId: string;
  version: string;
  changes: any;
  createdAt: string;
  userId: string;
  message?: string;
}

export interface SyncState {
  isConnected: boolean;
  isReconnecting: boolean;
  lastSync: string | null;
  pendingOperations: WebSocketMessage[];
  subscriptions: Set<string>;
  syncConflicts: SyncConflict[];
}

export interface SyncConflict {
  id: string;
  resourceType: ResourceType;
  resourceId: string;
  localVersion: string;
  remoteVersion: string;
  localData: any;
  remoteData: any;
  timestamp: string;
}

export interface WebSocketConnectionState {
  status: 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error';
  error?: string;
  reconnectAttempts: number;
  lastHeartbeat?: number;
  latency?: number;
}

export interface RealtimeEvent {
  type: 'project_updated' | 'collection_updated' | 'theme_changed' | 'canvas_updated' | 'user_joined' | 'user_left';
  data: any;
  userId: string;
  timestamp: number;
}

export interface MigrationRequest {
  type: 'project' | 'collection' | 'theme' | 'all';
  sourceUserId: string;
  targetUserId: string;
  resourceIds?: string[];
  includeVersions?: boolean;
}

export interface WebSocketCrudResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  version?: string;
  conflicts?: SyncConflict[];
}