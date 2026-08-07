import { LearningEngineState } from '../enums/learning-engine-state.enum';

export interface LearningEngineResult {
  success: boolean;

  state: LearningEngineState;

  sessionId: string;

  lessonId: string;

  lessonPosition: number;

  questionModeActive: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  offlineAvailable: boolean;

  snapshotId: string | null;

  persisted: boolean;

  reason: string | null;

  updatedAt: Date;
}
