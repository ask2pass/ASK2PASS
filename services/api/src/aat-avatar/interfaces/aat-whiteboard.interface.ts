export type AATWhiteboardAction =
  | 'WRITE'
  | 'DRAW'
  | 'ERASE'
  | 'CLEAR'
  | 'HIGHLIGHT';

export interface AATWhiteboardEvent {
  avatarId: string;
  action: AATWhiteboardAction;
  content?: string;
  coordinates?: number[];
  saveAsNote: boolean;
  timestamp: string;
}

export interface AATStudentNote {
  avatarId: string;
  title: string;
  content: string;
  source: 'AAT_WHITEBOARD';
  createdAt: string;
}
