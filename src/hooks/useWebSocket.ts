// Hook for working with WebSocket system

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  WebSocketSystem, 
  WebSocketManager, 
  WebSocketCrudConnector, 
  RealtimeSync,
  type WebSocketSystemConfig,
  type ProjectData,
  type CollectionData,
  type ThemeData,
  type SyncConflict,
  type WebSocketConnectionState
} from '@/lib/websocket';

interface WebSocketHookState {
  isInitialized: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  connectionState: WebSocketConnectionState | null;
  syncStats: any;
  pendingConflicts: SyncConflict[];
  error: string | null;
}

interface WebSocketHookActions {
  // Initialization
  connect: (config: WebSocketSystemConfig) => Promise<boolean>;
  quickConnect: (url: string, userId?: string) => Promise<boolean>;
  disconnect: () => Promise<void>;
  
  // CRUD operations
  createProject: (projectData: Omit<ProjectData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => Promise<any>;
  getProject: (projectId: string) => Promise<any>;
  updateProject: (projectId: string, updates: Partial<ProjectData>) => Promise<any>;
  deleteProject: (projectId: string) => Promise<any>;
  listProjects: (filters?: any) => Promise<any>;
  
  createCollection: (collectionData: Omit<CollectionData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => Promise<any>;
  getCollection: (collectionId: string) => Promise<any>;
  updateCollection: (collectionId: string, updates: Partial<CollectionData>) => Promise<any>;
  deleteCollection: (collectionId: string) => Promise<any>;
  listCollections: (filters?: any) => Promise<any>;
  
  createTheme: (themeData: Omit<ThemeData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => Promise<any>;
  getTheme: (themeId: string) => Promise<any>;
  updateTheme: (themeId: string, updates: Partial<ThemeData>) => Promise<any>;
  listThemes: (filters?: any) => Promise<any>;
  
  // Synchronization
  forceSync: () => Promise<void>;
  resolveConflict: (conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: any) => Promise<any>;
  
  // Migration
  migrateToDevice: (targetUserId: string, resourceTypes?: ('project' | 'collection' | 'theme')[]) => Promise<boolean>;
  
  // Real-time Canvas updates
  updateCanvasRealtime: (canvasData: any) => Promise<void>;
  subscribeToCanvasUpdates: (callback: (data: any) => void) => (() => void) | null;
  
  // User
  setUserId: (userId: string) => void;
  
  // Subscriptions
  subscribeToEvents: (eventType: string, callback: (data: any) => void) => (() => void) | null;
}

export function useWebSocket(): WebSocketHookState & WebSocketHookActions {
  const [state, setState] = useState<WebSocketHookState>({
    isInitialized: false,
    isConnected: false,
    isConnecting: false,
    connectionState: null,
    syncStats: null,
    pendingConflicts: [],
    error: null
  });

  const wsSystemRef = useRef<WebSocketSystem | null>(null);
  const wsManagerRef = useRef<WebSocketManager | null>(null);
  const crudConnectorRef = useRef<WebSocketCrudConnector | null>(null);
  const realtimeSyncRef = useRef<RealtimeSync | null>(null);
  const subscriptionsRef = useRef<(() => void)[]>([]);

  // Initialize WebSocket system
  const connect = useCallback(async (config: WebSocketSystemConfig): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isConnecting: true, error: null }));

      wsSystemRef.current = WebSocketSystem.getInstance();
      const components = await wsSystemRef.current.initialize(config);

      wsManagerRef.current = components.wsManager;
      crudConnectorRef.current = components.crudConnector;
      realtimeSyncRef.current = components.realtimeSync;

      // Subscribe to connection state changes
      const unsubscribe = wsManagerRef.current.subscribe('connection:*', () => {
        updateConnectionState();
      });
      subscriptionsRef.current.push(unsubscribe);

      updateConnectionState();
      
      setState(prev => ({ 
        ...prev, 
        isInitialized: true, 
        isConnecting: false,
        isConnected: true 
      }));

      return true;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setState(prev => ({ 
        ...prev, 
        isConnecting: false, 
        error: error instanceof Error ? error.message : 'Connection failed' 
      }));
      return false;
    }
  }, []);

  // Quick connection
  const quickConnect = useCallback(async (url: string, userId?: string): Promise<boolean> => {
    const config: WebSocketSystemConfig = {
      websocket: { url },
      realtime: {
        autoSync: true,
        enableRealtime: true,
        conflictResolution: 'manual'
      },
      userId
    };

    return await connect(config);
  }, [connect]);

  // Disconnect
  const disconnect = useCallback(async (): Promise<void> => {
    try {
      // Unsubscribe from all events
      subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
      subscriptionsRef.current = [];

      if (wsSystemRef.current) {
        await wsSystemRef.current.shutdown();
      }

      wsSystemRef.current = null;
      wsManagerRef.current = null;
      crudConnectorRef.current = null;
      realtimeSyncRef.current = null;

      setState({
        isInitialized: false,
        isConnected: false,
        isConnecting: false,
        connectionState: null,
        syncStats: null,
        pendingConflicts: [],
        error: null
      });
    } catch (error) {
      console.error('Error disconnecting WebSocket:', error);
    }
  }, []);

    // Update connection state
  const updateConnectionState = useCallback(() => {
    if (wsSystemRef.current) {
      const status = wsSystemRef.current.getSystemStatus();
      const conflicts = wsSystemRef.current.getPendingConflicts();
      
      setState(prev => ({
        ...prev,
        isConnected: status.isConnected,
        connectionState: status.connectionState,
        syncStats: status.syncStats,
        pendingConflicts: conflicts
      }));
    }
  }, []);

  // Periodic update of connection state
  useEffect(() => {
    const interval = setInterval(updateConnectionState, 5000);
    return () => clearInterval(interval);
  }, [updateConnectionState]);

  // CRUD operations for projects
  const createProject = useCallback(async (projectData: Omit<ProjectData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.createProject(projectData);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const getProject = useCallback(async (projectId: string) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.getProject(projectId);
  }, []);

  const updateProject = useCallback(async (projectId: string, updates: Partial<ProjectData>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.updateProject(projectId, updates);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const deleteProject = useCallback(async (projectId: string) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.deleteProject(projectId);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const listProjects = useCallback(async (filters?: any) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.listProjects(filters);
  }, []);

  // CRUD operations for collections
  const createCollection = useCallback(async (collectionData: Omit<CollectionData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.createCollection(collectionData);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const getCollection = useCallback(async (collectionId: string) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.getCollection(collectionId);
  }, []);

  const updateCollection = useCallback(async (collectionId: string, updates: Partial<CollectionData>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.updateCollection(collectionId, updates);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const deleteCollection = useCallback(async (collectionId: string) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.deleteCollection(collectionId);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const listCollections = useCallback(async (filters?: any) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.listCollections(filters);
  }, []);

  // CRUD operations for themes
  const createTheme = useCallback(async (themeData: Omit<ThemeData, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.createTheme(themeData);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const getTheme = useCallback(async (themeId: string) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.getTheme(themeId);
  }, []);

  const updateTheme = useCallback(async (themeId: string, updates: Partial<ThemeData>) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.updateTheme(themeId, updates);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  const listThemes = useCallback(async (filters?: any) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    return await crudConnectorRef.current.listThemes(filters);
  }, []);

  // Synchronization
  const forceSync = useCallback(async () => {
    if (!wsSystemRef.current) throw new Error('WebSocket system not initialized');
    await wsSystemRef.current.forceSync();
    updateConnectionState();
  }, [updateConnectionState]);

  const resolveConflict = useCallback(async (conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: any) => {
    if (!crudConnectorRef.current) throw new Error('WebSocket not connected');
    const response = await crudConnectorRef.current.resolveSyncConflict(conflictId, resolution, mergedData);
    updateConnectionState();
    return response;
  }, [updateConnectionState]);

  // Migration
  const migrateToDevice = useCallback(async (targetUserId: string, resourceTypes?: ('project' | 'collection' | 'theme')[]) => {
    if (!wsSystemRef.current) throw new Error('WebSocket system not initialized');
    const result = await wsSystemRef.current.migrateToDevice(targetUserId, resourceTypes);
    updateConnectionState();
    return result;
  }, [updateConnectionState]);

  // Real-time Canvas
  const updateCanvasRealtime = useCallback(async (canvasData: any) => {
    if (!wsSystemRef.current) throw new Error('WebSocket system not initialized');
    await wsSystemRef.current.updateCanvasRealtime(canvasData);
  }, []);

  const subscribeToCanvasUpdates = useCallback((callback: (data: any) => void) => {
    if (!crudConnectorRef.current) return null;
    
    const unsubscribe = crudConnectorRef.current.subscribeToEvents('canvas:update', callback);
    subscriptionsRef.current.push(unsubscribe);
    
    return () => {
      const index = subscriptionsRef.current.indexOf(unsubscribe);
      if (index > -1) {
        subscriptionsRef.current.splice(index, 1);
        unsubscribe();
      }
    };
  }, []);

  // Set user
  const setUserId = useCallback((userId: string) => {
    if (wsSystemRef.current) {
      wsSystemRef.current.setUserId(userId);
    }
  }, []);

  // Subscribe to events
  const subscribeToEvents = useCallback((eventType: string, callback: (data: any) => void) => {
    if (!crudConnectorRef.current) return null;
    
    const unsubscribe = crudConnectorRef.current.subscribeToEvents(eventType, callback);
    subscriptionsRef.current.push(unsubscribe);
    
    return () => {
      const index = subscriptionsRef.current.indexOf(unsubscribe);
      if (index > -1) {
        subscriptionsRef.current.splice(index, 1);
        unsubscribe();
      }
    };
  }, []);

  // Clean up when unmounting
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    // State
    ...state,
    
    // Actions
    connect,
    quickConnect,
    disconnect,
    
    // CRUD projects
    createProject,
    getProject,
    updateProject,
    deleteProject,
    listProjects,
    
    // CRUD collections
    createCollection,
    getCollection,
    updateCollection,
    deleteCollection,
    listCollections,
    
    // CRUD themes
    createTheme,
    getTheme,
    updateTheme,
    listThemes,
    
    // Synchronization
    forceSync,
    resolveConflict,
    
    // Migration
    migrateToDevice,
    
    // Real-time
    updateCanvasRealtime,
    subscribeToCanvasUpdates,
    
    // Utilities
    setUserId,
    subscribeToEvents
  };
}