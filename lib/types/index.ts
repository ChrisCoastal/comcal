// Export all types from a single location
export * from './database';
export * from './api';

// Re-export commonly used types for convenience
export type { ApiCommunicationEntry as CommunicationEntry } from './api';
export type { DatabaseCommunicationEntry } from './database';
