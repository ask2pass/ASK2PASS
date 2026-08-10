
export type OfflineOperationType =
  | 'LEARNING_RESULT'
  | 'LEARNING_PROGRESS'
  | 'LEARNING_DELIVERY'
  | 'ADAPTIVE_DECISION';

export type OfflineOperationStatus =
  | 'QUEUED'
  | 'SYNCING'
  | 'SYNCED'
  | 'CONFLICT'
  | 'FAILED';

export interface OfflineOperationPayload {
  learnerId: string;
  operationId: string;
  operationType: OfflineOperationType;
  occurredAt: string;
  clientVersion: number;
  payload: Record<string, unknown>;
}

export interface OfflineQueueRecord {
  id: string;
  operationId: string;
  learnerId: string;
  operationType: OfflineOperationType;
  status: OfflineOperationStatus;
  clientVersion: number;
  serverVersion: number;
  payload: Record<string, unknown>;
  occurredAt: string;
  syncedAt: string | null;
  error: string | null;
}

export interface OfflineSyncResult {
  operationId: string;
  status: OfflineOperationStatus;
  serverVersion: number;
  conflict: boolean;
  replayed: boolean;
  message: string;
}

export interface OfflineSyncResponse {
  learnerId: string;
  processed: number;
  synced: number;
  conflicts: number;
  failed: number;
  results: OfflineSyncResult[];
  generatedAt: string;
  version: number;
}
