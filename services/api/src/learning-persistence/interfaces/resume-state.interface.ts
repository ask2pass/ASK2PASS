import { SessionState } from '../../learning-session/enums/session-state.enum';

export interface ResumeState {
  sessionId: string;

  learnerId: string;

  lessonId: string;

  state: SessionState;

  lessonPosition: number;

  questionModeActive: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  canResume: boolean;

  offlineAvailable: boolean;

  snapshotId: string | null;

  updatedAt: Date | null;
}
