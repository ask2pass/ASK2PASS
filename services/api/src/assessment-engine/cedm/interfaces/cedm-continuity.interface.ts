import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';

export interface CEDMContinuityState {
  sessionId: string;
  learnerId: string;
  status: CEDMSessionStatus;
  currentTopicIndex: number;
  currentQuestionIndex: number;
  answeredQuestionIds: string[];
  scorePercent: number;
  lastActivityAt: Date;
  resumable: true;
}
