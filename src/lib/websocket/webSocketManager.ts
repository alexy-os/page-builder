// WebSocket Manager - main manager for managing WebSocket connection

import type { 
  WebSocketConfig, 
  WebSocketMessage, 
  WebSocketConnectionState,
  SyncState 
} from './types';
import { WebSocketMessageType } from './types';

export class WebSocketManager {
  private static instance: WebSocketManager;
  private socket: WebSocket | null = null;
  private config: WebSocketConfig;
  private connectionState: WebSocketConnectionState;
  private syncState: SyncState;
  private messageHandlers: Map<string, Set<(message: WebSocketMessage) => void>>;
  private pendingRequests: Map<string, {
    resolve: (value: any) => void;
    reject: (error: any) => void;
    timeout: NodeJS.Timeout;
  }>;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  private constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      heartbeatInterval: 30000,
      timeout: 10000,
      protocols: [],
      ...config
    };

    this.connectionState = {
      status: 'disconnected',
      reconnectAttempts: 0
    };

    this.syncState = {
      isConnected: false,
      isReconnecting: false,
      lastSync: null,
      pendingOperations: [],
      subscriptions: new Set(),
      syncConflicts: []
    };

    this.messageHandlers = new Map();
    this.pendingRequests = new Map();
  }

  static getInstance(config?: WebSocketConfig): WebSocketManager {
    if (!WebSocketManager.instance) {
      if (!config) {
        throw new Error('WebSocket config is required for first initialization');
      }
      WebSocketManager.instance = new WebSocketManager(config);
    }
    return WebSocketManager.instance;
  }

  // Connecting to the WebSocket server
  async connect(): Promise<void> {
    if (this.connectionState.status === 'connected') {
      console.log('WebSocket already connected');
      return;
    }

    this.connectionState.status = 'connecting';
    this.connectionState.error = undefined;

    try {
      this.socket = new WebSocket(this.config.url, this.config.protocols);
      
      await new Promise<void>((resolve, reject) => {
        if (!this.socket) {
          reject(new Error('Failed to create WebSocket'));
          return;
        }

        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, this.config.timeout);

        this.socket.onopen = () => {
          clearTimeout(timeout);
          this.onOpen();
          resolve();
        };

        this.socket.onerror = (error) => {
          clearTimeout(timeout);
          this.onError(error);
          reject(error);
        };

        this.socket.onmessage = (event) => {
          this.onMessage(event);
        };

        this.socket.onclose = (event) => {
          this.onClose(event);
        };
      });

    } catch (error) {
      this.connectionState.status = 'error';
      this.connectionState.error = error instanceof Error ? error.message : 'Connection failed';
      throw error;
    }
  }

  // Disconnecting from the WebSocket server
  disconnect(): void {
    if (this.socket) {
      this.socket.close(1000, 'Manual disconnect');
    }
    this.clearTimers();
    this.connectionState.status = 'disconnected';
    this.syncState.isConnected = false;
  }

  // Sending a message
  async sendMessage<T = any>(message: Omit<WebSocketMessage, 'id' | 'timestamp'>): Promise<T> {
    if (!this.isConnected()) {
      throw new Error('WebSocket is not connected');
    }

    const fullMessage: WebSocketMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: Date.now()
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(fullMessage.id);
        reject(new Error('Request timeout'));
      }, this.config.timeout);

      this.pendingRequests.set(fullMessage.id, {
        resolve,
        reject,
        timeout
      });

      try {
        this.socket!.send(JSON.stringify(fullMessage));
      } catch (error) {
        this.pendingRequests.delete(fullMessage.id);
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  // Sending a message without waiting for a response
  sendMessageNoResponse(message: Omit<WebSocketMessage, 'id' | 'timestamp'>): void {
    if (!this.isConnected()) {
      console.warn('WebSocket is not connected, message not sent');
      return;
    }

    const fullMessage: WebSocketMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: Date.now()
    };

    try {
      this.socket!.send(JSON.stringify(fullMessage));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  // Subscription to messages of a specific type
  subscribe(type: string, handler: (message: WebSocketMessage) => void): () => void {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, new Set());
    }
    this.messageHandlers.get(type)!.add(handler);

    // Returning the unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(type);
      if (handlers) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.messageHandlers.delete(type);
        }
      }
    };
  }

  // Getting the connection state
  getConnectionState(): WebSocketConnectionState {
    return { ...this.connectionState };
  }

  // Getting the synchronization state
  getSyncState(): SyncState {
    return {
      ...this.syncState,
      subscriptions: new Set(this.syncState.subscriptions)
    };
  }

  // Checking the connection
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  // Handling the opening of the connection
  private onOpen(): void {
    console.log('WebSocket connected');
    this.connectionState.status = 'connected';
    this.connectionState.reconnectAttempts = 0;
    this.syncState.isConnected = true;
    this.syncState.isReconnecting = false;

    this.startHeartbeat();
    this.processPendingOperations();
    this.emitConnectionEvent('connected');
  }

  // Handling messages
  private onMessage(event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Handling heartbeat
      if (message.type === WebSocketMessageType.HEARTBEAT) {
        this.handleHeartbeat(message);
        return;
      }

      // Handling responses to requests
      if (message.type === WebSocketMessageType.RESPONSE && this.pendingRequests.has(message.id)) {
        const request = this.pendingRequests.get(message.id)!;
        this.pendingRequests.delete(message.id);
        clearTimeout(request.timeout);

        if (message.error) {
          request.reject(new Error(message.error));
        } else {
          request.resolve(message.data);
        }
        return;
      }

      // Handling events
      this.emitMessage(message);

    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }

  // Handling errors
  private onError(error: Event): void {
    console.error('WebSocket error:', error);
    this.connectionState.status = 'error';
    this.connectionState.error = 'Connection error';
    this.syncState.isConnected = false;
    this.emitConnectionEvent('error', error);
  }

  // Handling the closing of the connection
  private onClose(event: CloseEvent): void {
    console.log('WebSocket disconnected:', event.code, event.reason);
    this.connectionState.status = 'disconnected';
    this.syncState.isConnected = false;
    this.clearTimers();

    // Attempting to reconnect
    if (event.code !== 1000 && this.connectionState.reconnectAttempts < this.config.maxReconnectAttempts!) {
      this.scheduleReconnect();
    }

    this.emitConnectionEvent('disconnected', event);
  }

  // Scheduling reconnection
  private scheduleReconnect(): void {
    if (this.reconnectTimeout) return;

    this.connectionState.status = 'reconnecting';
    this.connectionState.reconnectAttempts++;
    this.syncState.isReconnecting = true;

    console.log(`Reconnecting in ${this.config.reconnectInterval}ms (attempt ${this.connectionState.reconnectAttempts})`);

    this.reconnectTimeout = setTimeout(async () => {
      this.reconnectTimeout = null;
      try {
        await this.connect();
      } catch (error) {
        console.error('Reconnection failed:', error);
        this.scheduleReconnect();
      }
    }, this.config.reconnectInterval);
  }

  // Starting heartbeat
  private startHeartbeat(): void {
    if (this.heartbeatInterval) return;

    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected()) {
        this.sendMessageNoResponse({
          type: WebSocketMessageType.HEARTBEAT,
          action: 'ping' as any,
          resource: 'system' as any
        });
        this.connectionState.lastHeartbeat = Date.now();
      }
    }, this.config.heartbeatInterval);
  }

  // Handling heartbeat
  private handleHeartbeat(_message: WebSocketMessage): void {
    if (this.connectionState.lastHeartbeat) {
      this.connectionState.latency = Date.now() - this.connectionState.lastHeartbeat;
    }
  }

  // Clearing timers
  private clearTimers(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  // Handling pending operations
  private processPendingOperations(): void {
    const operations = [...this.syncState.pendingOperations];
    this.syncState.pendingOperations = [];

    operations.forEach(operation => {
      this.sendMessageNoResponse(operation);
    });
  }

  // Generating a message ID
  private generateMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Emitting messages to subscribers
  private emitMessage(message: WebSocketMessage): void {
    const type = `${message.resource}:${message.action}`;
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Error in message handler:', error);
        }
      });
    }

    // General handlers
    const allHandlers = this.messageHandlers.get('*');
    if (allHandlers) {
      allHandlers.forEach(handler => {
        try {
          handler(message);
        } catch (error) {
          console.error('Error in general message handler:', error);
        }
      });
    }
  }

  // Emitting connection events
  private emitConnectionEvent(event: string, data?: any): void {
    const handlers = this.messageHandlers.get(`connection:${event}`);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler({
            id: this.generateMessageId(),
            type: WebSocketMessageType.EVENT,
            action: event as any,
            resource: 'connection' as any,
            data,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('Error in connection event handler:', error);
        }
      });
    }
  }

  // Adding an operation to the queue
  addPendingOperation(message: WebSocketMessage): void {
    this.syncState.pendingOperations.push(message);
  }

  // Updating the configuration
  updateConfig(newConfig: Partial<WebSocketConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}