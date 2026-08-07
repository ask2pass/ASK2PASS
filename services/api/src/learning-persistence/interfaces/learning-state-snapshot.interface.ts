import { SessionState } from '../../learning-session/enums/session-state.enum';
import { SnapshotStatus } from '../enums/snapshot-status.enum';

export interface LearningStateSnapshot {
  snapshotId: string;

  sessionId: string;

  learnerId: string;

  lessonId: string;

  state: SessionState;

  lessonPosition: number;

  previousLessonPosition: number;

  questionModeActive: boolean;

  returnToLessonPosition: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  offlineAvailable: boolean;

  status: SnapshotStatus;

  createdAt: Date;

  updatedAt: Date;
}
