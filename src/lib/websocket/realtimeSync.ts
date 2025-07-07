// Realtime Sync - synchronization between hybrid storage and WebSocket

import type {
  SyncConflict
} from './types';
import { ResourceType } from './types';
import { WebSocketCrudConnector } from './webSocketCrudConnector';
import { HybridStorage } from '../storage/hybridStorage';

export interface RealtimeSyncConfig {
  autoSync: boolean;
  syncInterval: number;
  conflictResolution: 'local' | 'remote' | 'manual';
  enableRealtime: boolean;
}

export class RealtimeSync {
  private static instance: RealtimeSync;
  private wsConnector: WebSocketCrudConnector;
  private hybridStorage: HybridStorage;
  private config: RealtimeSyncConfig;
  private syncTimer: NodeJS.Timeout | null = null;
  private subscriptions: (() => void)[] = [];
  private lastSyncTimestamp: string | null = null;
  private pendingConflicts: SyncConflict[] = [];
  private isInitialized = false;

  private constructor(
    wsConnector: WebSocketCrudConnector,
    hybridStorage: HybridStorage,
    config: Partial<RealtimeSyncConfig> = {}
  ) {
    this.wsConnector = wsConnector;
    this.hybridStorage = hybridStorage;
    this.config = {
      autoSync: true,
      syncInterval: 30000, // 30 seconds
      conflictResolution: 'manual',
      enableRealtime: true,
      ...config
    };
  }

  static getInstance(
    wsConnector?: WebSocketCrudConnector,
    hybridStorage?: HybridStorage,
    config?: Partial<RealtimeSyncConfig>
  ): RealtimeSync {
    if (!RealtimeSync.instance) {
      if (!wsConnector || !hybridStorage) {
        throw new Error('WebSocketCrudConnector and HybridStorage are required for initialization');
      }
      RealtimeSync.instance = new RealtimeSync(wsConnector, hybridStorage, config);
    }
    return RealtimeSync.instance;
  }

  // Initialization of synchronization
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('RealtimeSync already initialized');
      return;
    }

    try {
      // Subscription to real-time events
      if (this.config.enableRealtime) {
        await this.setupRealtimeSubscriptions();
      }

      // Start auto-synchronization
      if (this.config.autoSync) {
        this.startAutoSync();
      }

      // Initial synchronization
      await this.performInitialSync();

      this.isInitialized = true;
      console.log('RealtimeSync initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RealtimeSync:', error);
      throw error;
    }
  }

  // Stop synchronization
  async stop(): Promise<void> {
    // Stop auto-synchronization
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }

    // Unsubscribe from all events
    this.subscriptions.forEach(unsubscribe => unsubscribe());
    this.subscriptions = [];

    this.isInitialized = false;
    console.log('RealtimeSync stopped');
  }

  // Synchronization of the project
  async syncProject(projectId?: string): Promise<{ conflicts: SyncConflict[]; synced: boolean }> {
    try {
      console.log('Syncing project...', projectId);

      // Getting the local project
      const localProject = await this.hybridStorage.loadProject();
      if (!localProject && !projectId) {
        return { conflicts: [], synced: false };
      }

      let remoteProject = null;
      if (projectId || localProject?.id) {
        const response = await this.wsConnector.getProject(projectId || localProject.id);
        remoteProject = response.success ? response.data : null;
      }

      const conflicts: SyncConflict[] = [];

      // Comparison of versions
      if (localProject && remoteProject) {
        if (localProject.version !== remoteProject.version) {
          const conflict: SyncConflict = {
            id: `project-conflict-${Date.now()}`,
            resourceType: ResourceType.PROJECT,
            resourceId: localProject.id,
            localVersion: localProject.version,
            remoteVersion: remoteProject.version,
            localData: localProject,
            remoteData: remoteProject,
            timestamp: new Date().toISOString()
          };
          conflicts.push(conflict);
        }
      }

      // Processing conflicts
      if (conflicts.length > 0) {
        this.pendingConflicts.push(...conflicts);
        
        if (this.config.conflictResolution !== 'manual') {
          await this.resolveConflicts(conflicts);
        }
      } else {
        // Updating local data if there are no conflicts
        if (remoteProject && (!localProject || remoteProject.updatedAt > localProject.updatedAt)) {
          await this.hybridStorage.saveProject(remoteProject);
        }
        // Sending local changes to the server
        else if (localProject && (!remoteProject || localProject.updatedAt > remoteProject.updatedAt)) {
          await this.wsConnector.updateProject(localProject.id, localProject);
        }
      }

      this.lastSyncTimestamp = new Date().toISOString();
      return { conflicts, synced: conflicts.length === 0 };

    } catch (error) {
      console.error('Error syncing project:', error);
      return { conflicts: [], synced: false };
    }
  }

  // Synchronization of collections
  async syncCollections(): Promise<{ conflicts: SyncConflict[]; synced: boolean }> {
    try {
      console.log('Syncing collections...');
      
      const conflicts: SyncConflict[] = [];
      // TODO: Add method getCollectionsWithCounts to HybridStorage
      // const localCollections = await this.hybridStorage.getCollectionsWithCounts();
      const localCollections: any[] = []; // Temporary solution
      
      const response = await this.wsConnector.listCollections();
      const remoteCollections = response.success ? response.data || [] : [];

      // Comparison of collections
      for (const localCollection of localCollections) {
        const remoteCollection = remoteCollections.find((r: any) => r.id === localCollection.id);
        
        if (remoteCollection && localCollection.updatedAt !== remoteCollection.updatedAt) {
          const conflict: SyncConflict = {
            id: `collection-conflict-${localCollection.id}-${Date.now()}`,
            resourceType: ResourceType.COLLECTION,
            resourceId: localCollection.id,
            localVersion: '1.0', // TODO: add versioning to collections
            remoteVersion: '1.1',
            localData: localCollection,
            remoteData: remoteCollection,
            timestamp: new Date().toISOString()
          };
          conflicts.push(conflict);
        }
      }

      // Synchronization of new collections with the server
      for (const remoteCollection of remoteCollections) {
        const localExists = localCollections.find((l: any) => l.id === remoteCollection.id);
        if (!localExists) {
          await this.hybridStorage.saveCollection(remoteCollection);
        }
      }

      if (conflicts.length > 0) {
        this.pendingConflicts.push(...conflicts);
        
        if (this.config.conflictResolution !== 'manual') {
          await this.resolveConflicts(conflicts);
        }
      }

      return { conflicts, synced: conflicts.length === 0 };

    } catch (error) {
      console.error('Error syncing collections:', error);
      return { conflicts: [], synced: false };
    }
  }

  // Data migration between devices
  async migrateToDevice(targetUserId: string, resourceTypes: ('project' | 'collection' | 'theme')[] = ['project', 'collection', 'theme']): Promise<boolean> {
    try {
      console.log('Migrating data to device...', targetUserId);

      const sourceUserId = this.wsConnector.getUserId();
      if (!sourceUserId) {
        throw new Error('Source user ID not set');
      }

      for (const resourceType of resourceTypes) {
        const migrationRequest = {
          type: resourceType,
          sourceUserId,
          targetUserId,
          includeVersions: true
        };

        const response = await this.wsConnector.migrateData(migrationRequest);
        if (!response.success) {
          console.error(`Failed to migrate ${resourceType}:`, response.error);
          return false;
        }
      }

      console.log('Migration completed successfully');
      return true;

    } catch (error) {
      console.error('Error during migration:', error);
      return false;
    }
  }

  // Sending real-time Canvas update
  async broadcastCanvasUpdate(canvasData: any): Promise<void> {
    if (this.config.enableRealtime && this.wsConnector.isConnected()) {
      await this.wsConnector.updateCanvasRealtime(canvasData);
    }
  }

  // Conflict resolution
  async resolveConflicts(conflicts: SyncConflict[]): Promise<void> {
    for (const conflict of conflicts) {
      try {
        let resolution: 'local' | 'remote' | 'merge' = this.config.conflictResolution as any;
        let mergedData = null;

        if (resolution === 'merge') {
          mergedData = await this.mergeConflictData(conflict);
          resolution = 'merge';
        }

        await this.wsConnector.resolveSyncConflict(conflict.id, resolution, mergedData);

        // Updating local data depending on the resolution
        if (resolution === 'remote' || resolution === 'merge') {
          const dataToSave = mergedData || conflict.remoteData;
          
          switch (conflict.resourceType) {
            case ResourceType.PROJECT:
              await this.hybridStorage.saveProject(dataToSave);
              break;
            case ResourceType.COLLECTION:
              await this.hybridStorage.saveCollection(dataToSave);
              break;
          }
        }

      } catch (error) {
        console.error('Error resolving conflict:', conflict.id, error);
      }
    }

    // Deleting resolved conflicts
    const conflictIds = conflicts.map(c => c.id);
    this.pendingConflicts = this.pendingConflicts.filter(c => !conflictIds.includes(c.id));
  }

  // Getting pending conflicts
  getPendingConflicts(): SyncConflict[] {
    return [...this.pendingConflicts];
  }

  // Updating configuration
  updateConfig(newConfig: Partial<RealtimeSyncConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Restart auto-synchronization if the interval has changed
    if (this.config.autoSync && this.syncTimer) {
      this.startAutoSync();
    }
  }

  // Getting synchronization statistics
  getSyncStats(): {
    isInitialized: boolean;
    lastSync: string | null;
    pendingConflicts: number;
    isConnected: boolean;
    autoSyncEnabled: boolean;
  } {
    return {
      isInitialized: this.isInitialized,
      lastSync: this.lastSyncTimestamp,
      pendingConflicts: this.pendingConflicts.length,
      isConnected: this.wsConnector.isConnected(),
      autoSyncEnabled: this.config.autoSync
    };
  }

  // Private methods
  private async setupRealtimeSubscriptions(): Promise<void> {
    // Subscription to project updates
    const unsubProject = await this.wsConnector.subscribeToUpdates(ResourceType.PROJECT);
    this.subscriptions.push(unsubProject);

    // Subscription to collection updates
    const unsubCollection = await this.wsConnector.subscribeToUpdates(ResourceType.COLLECTION);
    this.subscriptions.push(unsubCollection);

    // Subscription to Canvas updates
    const unsubCanvas = this.wsConnector.subscribeToEvents('canvas:update', (data) => {
      this.handleCanvasUpdate(data);
    });
    this.subscriptions.push(unsubCanvas);

    // Subscription to migration events
    const unsubMigration = this.wsConnector.subscribeToEvents('migration:complete', (data) => {
      this.handleMigrationComplete(data);
    });
    this.subscriptions.push(unsubMigration);
  }

  private startAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }

    this.syncTimer = setInterval(async () => {
      if (this.wsConnector.isConnected()) {
        await this.syncProject();
        await this.syncCollections();
      }
    }, this.config.syncInterval);
  }

  private async performInitialSync(): Promise<void> {
    if (this.wsConnector.isConnected()) {
      await this.syncProject();
      await this.syncCollections();
    }
  }

  private async mergeConflictData(conflict: SyncConflict): Promise<any> {
      // Simple merge - can be expanded
    const merged = {
      ...conflict.localData,
      ...conflict.remoteData,
      version: conflict.remoteVersion,
      updatedAt: new Date().toISOString(),
      mergedAt: new Date().toISOString()
    };

    return merged;
  }

  private handleCanvasUpdate(data: any): void {
    console.log('Received real-time canvas update:', data);
    // Here you can add logic to update Canvas in real-time
    
    // Emitting an event for subscribers
    const event = new CustomEvent('canvas-updated', { detail: data });
    window.dispatchEvent(event);
  }

  private handleMigrationComplete(data: any): void {
    console.log('Migration completed:', data);
    
    // Perform full synchronization after migration
    this.performInitialSync().catch(error => {
      console.error('Error performing sync after migration:', error);
    });
  }
}