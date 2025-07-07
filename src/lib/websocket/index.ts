// WebSocket modules index - central export of all WebSocket modules

export * from './types';
export { WebSocketManager } from './webSocketManager';
export { WebSocketCrudConnector } from './webSocketCrudConnector';
export { RealtimeSync } from './realtimeSync';
export type { RealtimeSyncConfig } from './realtimeSync';

// Utility class for easy initialization of the entire WebSocket system
import { WebSocketManager } from './webSocketManager';
import { WebSocketCrudConnector } from './webSocketCrudConnector';
import { RealtimeSync, type RealtimeSyncConfig } from './realtimeSync';
import { HybridStorage } from '../storage/hybridStorage';
import type { WebSocketConfig } from './types';

export interface WebSocketSystemConfig {
  websocket: WebSocketConfig;
  realtime?: Partial<RealtimeSyncConfig>;
  userId?: string;
}

export class WebSocketSystem {
  private static instance: WebSocketSystem;
  private wsManager!: WebSocketManager;
  private crudConnector!: WebSocketCrudConnector;
  private realtimeSync!: RealtimeSync;
  private hybridStorage!: HybridStorage;
  private isInitialized = false;

  private constructor() {
    // Empty constructor - initialization in initialize()
  }

  static getInstance(): WebSocketSystem {
    if (!WebSocketSystem.instance) {
      WebSocketSystem.instance = new WebSocketSystem();
    }
    return WebSocketSystem.instance;
  }

  // Full initialization of the WebSocket system
  async initialize(config: WebSocketSystemConfig): Promise<{
    wsManager: WebSocketManager;
    crudConnector: WebSocketCrudConnector;
    realtimeSync: RealtimeSync;
  }> {
    if (this.isInitialized) {
      return {
        wsManager: this.wsManager,
        crudConnector: this.crudConnector,
        realtimeSync: this.realtimeSync
      };
    }

    try {
      console.log('Initializing WebSocket system...');

      // Initialize WebSocket Manager
      this.wsManager = WebSocketManager.getInstance(config.websocket);
      await this.wsManager.connect();

      // Initialize CRUD Connector
      this.crudConnector = WebSocketCrudConnector.getInstance(this.wsManager);
      if (config.userId) {
        this.crudConnector.setUserId(config.userId);
      }

      // Initialize HybridStorage
      this.hybridStorage = HybridStorage.getInstance();

      // Initialize RealtimeSync
      this.realtimeSync = RealtimeSync.getInstance(
        this.crudConnector,
        this.hybridStorage,
        config.realtime
      );
      await this.realtimeSync.initialize();

      this.isInitialized = true;
      console.log('WebSocket system initialized successfully');

      return {
        wsManager: this.wsManager,
        crudConnector: this.crudConnector,
        realtimeSync: this.realtimeSync
      };

    } catch (error) {
      console.error('Failed to initialize WebSocket system:', error);
      throw error;
    }
  }

  // Quick initialization with minimal settings
  async quickConnect(url: string, userId?: string): Promise<{
    wsManager: WebSocketManager;
    crudConnector: WebSocketCrudConnector;
    realtimeSync: RealtimeSync;
  }> {
    const config: WebSocketSystemConfig = {
      websocket: { url },
      realtime: {
        autoSync: true,
        enableRealtime: true,
        conflictResolution: 'manual'
      },
      userId
    };

    return await this.initialize(config);
  }

  // Shutdown of the entire system
  async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      return;
    }

    try {
      console.log('Shutting down WebSocket system...');

      if (this.realtimeSync) {
        await this.realtimeSync.stop();
      }

      if (this.wsManager) {
        this.wsManager.disconnect();
      }

      this.isInitialized = false;
      console.log('WebSocket system shut down successfully');

    } catch (error) {
      console.error('Error during WebSocket system shutdown:', error);
    }
  }

  // Getting components of the system
  getComponents(): {
    wsManager: WebSocketManager | null;
    crudConnector: WebSocketCrudConnector | null;
    realtimeSync: RealtimeSync | null;
    hybridStorage: HybridStorage | null;
  } {
    return {
      wsManager: this.wsManager || null,
      crudConnector: this.crudConnector || null,
      realtimeSync: this.realtimeSync || null,
      hybridStorage: this.hybridStorage || null
    };
  }

  // Checking the state of the system
  getSystemStatus(): {
    isInitialized: boolean;
    isConnected: boolean;
    connectionState: any;
    syncStats: any;
  } {
    return {
      isInitialized: this.isInitialized,
      isConnected: this.wsManager?.isConnected() || false,
      connectionState: this.wsManager?.getConnectionState() || null,
      syncStats: this.realtimeSync?.getSyncStats() || null
    };
  }

  // Setting the user for the entire system
  setUserId(userId: string): void {
    if (this.crudConnector) {
      this.crudConnector.setUserId(userId);
    }
  }

  // Data migration
  async migrateToDevice(targetUserId: string, resourceTypes?: ('project' | 'collection' | 'theme')[]): Promise<boolean> {
    if (!this.realtimeSync) {
      throw new Error('RealtimeSync not initialized');
    }
    return await this.realtimeSync.migrateToDevice(targetUserId, resourceTypes);
  }

  // Force synchronization
  async forceSync(): Promise<void> {
    if (!this.realtimeSync) {
      throw new Error('RealtimeSync not initialized');
    }
    await this.realtimeSync.syncProject();
    await this.realtimeSync.syncCollections();
  }

  // Updating Canvas in real-time
  async updateCanvasRealtime(canvasData: any): Promise<void> {
    if (!this.realtimeSync) {
      throw new Error('RealtimeSync not initialized');
    }
    await this.realtimeSync.broadcastCanvasUpdate(canvasData);
  }

  // Getting synchronization conflicts
  getPendingConflicts() {
    return this.realtimeSync?.getPendingConflicts() || [];
  }
}