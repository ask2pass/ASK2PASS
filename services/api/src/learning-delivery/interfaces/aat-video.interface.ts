export type AATVoiceGender = 'MALE' | 'FEMALE';

export type AATVideoMode =
  | 'LESSON'
  | 'REVISION'
  | 'PTDM'
  | 'CEDM'
  | 'MEDM'
  | 'FEEDBACK';

export interface AATVideoPresentationRequest {
  learnerId: string;
  tutorId: string;
  tutorName: string;
  voiceGender: AATVoiceGender;
  mode: AATVideoMode;
  text: string;
  imageAsset?: string | null;
  voiceAsset?: string | null;
  durationSeconds?: number;
}

export interface AATVideoPresentationPlan {
  enabled: boolean;
  tutorId: string;
  tutorName: string;
  mode: AATVideoMode;
  imageAsset: string | null;
  voiceAsset: string | null;
  synchronization: 'VOICE_TIMED';
  lipSyncRequired: boolean;
  durationSeconds: number | null;
  generatedAt: string;
}
