export type AATVoiceGender = 'MALE' | 'FEMALE';

export type AATVoiceStyle =
  | 'CAPTIVATING'
  | 'FIRM'
  | 'COMFORTING'
  | 'ENCOURAGING'
  | 'EXAM_FOCUS'
  | 'CALM';

export interface AATAvatarProfile {
  id: string;
  name: string;
  role: string;
  specialty?: string;
  imageAsset: string;
  voiceAsset?: string | null;
  voiceGender: AATVoiceGender;
  voiceStyles: AATVoiceStyle[];
  voiceTimed: boolean;
  lipSyncEnabled: boolean;
  whiteboardEnabled: boolean;
  movementEnabled: boolean;
  demonstrationsEnabled: boolean;
  notesCaptureEnabled: boolean;
}
