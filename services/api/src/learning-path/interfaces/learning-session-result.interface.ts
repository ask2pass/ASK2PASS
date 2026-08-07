import { SessionStatus } from '../enums/session-status.enum';

export interface LearningSessionResult {
  sessionId: string;
  status: SessionStatus;
  completed: boolean;
  eligibleForStreak: boolean;
  eligibleStarBlocks: number;
}
