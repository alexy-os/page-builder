// WebSocket CRUD Connector - connector for CRUD operations through WebSocket

import type {
  ProjectData,
  CollectionData,
  BlockData,
  ThemeData,
  CanvasData,
  VersionInfo,
  WebSocketCrudResponse,
  MigrationRequest
} from './types';
import { 
  WebSocketMessageType, 
  CrudAction, 
  ResourceType 
} from './types';
import { WebSocketManager } from './webSocketManager';

export class WebSocketCrudConnector {
  private static instance: WebSocketCrudConnector;
  private wsManager: WebSocketManager;
  private userId: string | null = null;
  private sessionId: string;

  private constructor(wsManager: WebSocketManager) {
    this.wsManager = wsManager;
    this.sessionId = this.generateSessionId();
  }

  static getInstance(wsManager?: WebSocketManager): WebSocketCrudConnector {
    if (!WebSocketCrudConnector.instance) {
      if (!wsManager) {
        throw new Error('WebSocketManager is required for first initialization');
      }
      WebSocketCrudConnector.instance = new WebSocketCrudConnector(wsManager);
    }
    return WebSocketCrudConnector.instance;
  }

  // Setting the user
  setUserId(userId: string): void {
    this.userId = userId;
  }

  // Getting the current user
  getUserId(): string | null {
    return this.userId;
  }

  // CRUD operations for projects
  async createProject(projectData: Omit<ProjectData, 'id' | 'version' | 'createdAt' | 'updatedAt'>): Promise<WebSocketCrudResponse<ProjectData>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.PROJECT, {
      ...projectData,
      userId: this.userId
    });
  }

  async getProject(projectId: string): Promise<WebSocketCrudResponse<ProjectData>> {
    return await this.sendCrudRequest(CrudAction.READ, ResourceType.PROJECT, { id: projectId });
  }

  async updateProject(projectId: string, updates: Partial<ProjectData>): Promise<WebSocketCrudResponse<ProjectData>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.PROJECT, {
      id: projectId,
      ...updates,
      userId: this.userId
    });
  }

  async deleteProject(projectId: string): Promise<WebSocketCrudResponse<void>> {
    return await this.sendCrudRequest(CrudAction.DELETE, ResourceType.PROJECT, { id: projectId });
  }

  async listProjects(filters?: { userId?: string; limit?: number; offset?: number }): Promise<WebSocketCrudResponse<ProjectData[]>> {
    return await this.sendCrudRequest(CrudAction.LIST, ResourceType.PROJECT, {
      filters: {
        userId: this.userId,
        ...filters
      }
    });
  }

  // CRUD operations for collections
  async createCollection(collectionData: Omit<CollectionData, 'id' | 'version' | 'createdAt' | 'updatedAt'>): Promise<WebSocketCrudResponse<CollectionData>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.COLLECTION, {
      ...collectionData,
      userId: this.userId
    });
  }

  async getCollection(collectionId: string): Promise<WebSocketCrudResponse<CollectionData>> {
    return await this.sendCrudRequest(CrudAction.READ, ResourceType.COLLECTION, { id: collectionId });
  }

  async updateCollection(collectionId: string, updates: Partial<CollectionData>): Promise<WebSocketCrudResponse<CollectionData>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.COLLECTION, {
      id: collectionId,
      ...updates,
      userId: this.userId
    });
  }

  async deleteCollection(collectionId: string): Promise<WebSocketCrudResponse<void>> {
    return await this.sendCrudRequest(CrudAction.DELETE, ResourceType.COLLECTION, { id: collectionId });
  }

  async listCollections(filters?: { userId?: string; type?: string; limit?: number; offset?: number }): Promise<WebSocketCrudResponse<CollectionData[]>> {
    return await this.sendCrudRequest(CrudAction.LIST, ResourceType.COLLECTION, {
      filters: {
        userId: this.userId,
        ...filters
      }
    });
  }

  // CRUD operations for blocks
  async createBlock(blockData: Omit<BlockData, 'id' | 'version' | 'createdAt' | 'updatedAt'>): Promise<WebSocketCrudResponse<BlockData>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.BLOCK, {
      ...blockData,
      userId: this.userId
    });
  }

  async getBlock(blockId: string): Promise<WebSocketCrudResponse<BlockData>> {
    return await this.sendCrudRequest(CrudAction.READ, ResourceType.BLOCK, { id: blockId });
  }

  async updateBlock(blockId: string, updates: Partial<BlockData>): Promise<WebSocketCrudResponse<BlockData>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.BLOCK, {
      id: blockId,
      ...updates,
      userId: this.userId
    });
  }

  async deleteBlock(blockId: string): Promise<WebSocketCrudResponse<void>> {
    return await this.sendCrudRequest(CrudAction.DELETE, ResourceType.BLOCK, { id: blockId });
  }

  async listBlocks(filters?: { userId?: string; templateId?: string; limit?: number; offset?: number }): Promise<WebSocketCrudResponse<BlockData[]>> {
    return await this.sendCrudRequest(CrudAction.LIST, ResourceType.BLOCK, {
      filters: {
        userId: this.userId,
        ...filters
      }
    });
  }

  // CRUD operations for themes
  async createTheme(themeData: Omit<ThemeData, 'id' | 'version' | 'createdAt' | 'updatedAt'>): Promise<WebSocketCrudResponse<ThemeData>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.THEME, {
      ...themeData,
      userId: this.userId
    });
  }

  async getTheme(themeId: string): Promise<WebSocketCrudResponse<ThemeData>> {
    return await this.sendCrudRequest(CrudAction.READ, ResourceType.THEME, { id: themeId });
  }

  async updateTheme(themeId: string, updates: Partial<ThemeData>): Promise<WebSocketCrudResponse<ThemeData>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.THEME, {
      id: themeId,
      ...updates,
      userId: this.userId
    });
  }

  async deleteTheme(themeId: string): Promise<WebSocketCrudResponse<void>> {
    return await this.sendCrudRequest(CrudAction.DELETE, ResourceType.THEME, { id: themeId });
  }

  async listThemes(filters?: { userId?: string; isCustom?: boolean; limit?: number; offset?: number }): Promise<WebSocketCrudResponse<ThemeData[]>> {
    return await this.sendCrudRequest(CrudAction.LIST, ResourceType.THEME, {
      filters: {
        userId: this.userId,
        ...filters
      }
    });
  }

  // CRUD operations for Canvas
  async updateCanvas(canvasData: CanvasData): Promise<WebSocketCrudResponse<CanvasData>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.CANVAS, canvasData);
  }

  async getCanvas(projectId: string): Promise<WebSocketCrudResponse<CanvasData>> {
    return await this.sendCrudRequest(CrudAction.READ, ResourceType.CANVAS, { projectId });
  }

  // Operations with versions
  async createVersion(versionData: Omit<VersionInfo, 'id' | 'createdAt'>): Promise<WebSocketCrudResponse<VersionInfo>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.VERSION, {
      ...versionData,
      userId: this.userId
    });
  }

  async getVersionHistory(resourceType: ResourceType, resourceId: string, limit?: number): Promise<WebSocketCrudResponse<VersionInfo[]>> {
    return await this.sendCrudRequest(CrudAction.LIST, ResourceType.VERSION, {
      filters: {
        resourceType,
        resourceId,
        userId: this.userId,
        limit
      }
    });
  }

  async restoreVersion(versionId: string): Promise<WebSocketCrudResponse<any>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.VERSION, {
      id: versionId,
      action: 'restore'
    });
  }

  // Synchronization
  async syncData(resourceType?: ResourceType, lastSyncTimestamp?: string): Promise<WebSocketCrudResponse<any>> {
    return await this.sendCrudRequest(CrudAction.SYNC, resourceType || ResourceType.PROJECT, {
      userId: this.userId,
      lastSync: lastSyncTimestamp,
      sessionId: this.sessionId
    });
  }

  async resolveSyncConflict(conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: any): Promise<WebSocketCrudResponse<any>> {
    return await this.sendCrudRequest(CrudAction.UPDATE, ResourceType.PROJECT, {
      conflictId,
      resolution,
      mergedData,
      action: 'resolve_conflict'
    });
  }

  // Data migration between devices/users
  async migrateData(migrationRequest: MigrationRequest): Promise<WebSocketCrudResponse<any>> {
    return await this.sendCrudRequest(CrudAction.CREATE, ResourceType.PROJECT, {
      ...migrationRequest,
      action: 'migrate'
    });
  }

  // Subscription to real-time updates
  async subscribeToUpdates(resourceType: ResourceType, resourceId?: string): Promise<() => void> {
    await this.sendCrudRequest(CrudAction.SUBSCRIBE, resourceType, {
      resourceId,
      userId: this.userId ?? undefined,
      sessionId: this.sessionId
    });

    // Returning the unsubscribe function
    return () => {
      this.sendCrudRequest(CrudAction.UNSUBSCRIBE, resourceType, {
        resourceId,
        userId: this.userId ?? undefined,
        sessionId: this.sessionId
      }).catch(error => {
        console.error('Error unsubscribing:', error);
      });
    };
  }

  // Subscription to events with a handler
  subscribeToEvents(eventType: string, handler: (data: any) => void): () => void {
    return this.wsManager.subscribe(eventType, (message) => {
      if (message.type === WebSocketMessageType.EVENT) {
        handler(message.data);
      }
    });
  }

  // Real-time Canvas update
  async updateCanvasRealtime(canvasData: CanvasData): Promise<void> {
    this.wsManager.sendMessageNoResponse({
      type: WebSocketMessageType.EVENT,
      action: CrudAction.UPDATE,
      resource: ResourceType.CANVAS,
      data: canvasData,
      userId: this.userId ?? undefined,
      sessionId: this.sessionId
    });
  }

  // Sending heartbeat with user data
  sendUserHeartbeat(additionalData?: any): void {
    this.wsManager.sendMessageNoResponse({
      type: WebSocketMessageType.HEARTBEAT,
      action: 'user_ping' as any,
      resource: 'user' as any,
             data: {
         userId: this.userId ?? undefined,
         sessionId: this.sessionId,
         timestamp: Date.now(),
         ...additionalData
       }
    });
  }

  // Private methods
  private async sendCrudRequest(action: CrudAction, resource: ResourceType, data?: any): Promise<WebSocketCrudResponse<any>> {
    try {
      const response = await this.wsManager.sendMessage({
        type: WebSocketMessageType.REQUEST,
        action,
        resource,
                 data,
         userId: this.userId ?? undefined,
         sessionId: this.sessionId
      });

      return {
        success: true,
        data: response,
        version: response?.version
      };
    } catch (error) {
      console.error(`CRUD operation failed: ${action} ${resource}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Getting the connection state
  getConnectionState() {
    return this.wsManager.getConnectionState();
  }

  // Getting the synchronization state
  getSyncState() {
    return this.wsManager.getSyncState();
  }

  // Checking the connection
  isConnected(): boolean {
    return this.wsManager.isConnected();
  }
}