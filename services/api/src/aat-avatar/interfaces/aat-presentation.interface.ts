export type AATPresentationAction =
  | 'SPEAK'
  | 'WRITE'
  | 'DRAW'
  | 'DEMONSTRATE'
  | 'MOVE'
  | 'HIGHLIGHT'
  | 'PAUSE';

export interface AATPresentationRequest {
  avatarId: string;
  action: AATPresentationAction;
  content?: string;
  durationMs?: number;
  saveAsNote?: boolean;
}

export interface AATPresentationResponse {
  avatarId: string;
  action: AATPresentationAction;
  content: string | null;
  voiceTimed: boolean;
  lipSyncEnabled: boolean;
  movementEnabled: boolean;
  whiteboardEnabled: boolean;
  notesCaptureEnabled: boolean;
  saveAsNote: boolean;
}
