import { RuntimeState } from '../enums/runtime-state.enum';

export interface LearningRuntimeContext {
  learnerId: string;

  sessionId: string;

  lessonId: string;

  classLevel: string;

  subject: string;

  topic: string;

  state: RuntimeState;

  lessonPosition: number;

  questionModeActive: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  offlineAvailable: boolean;

  snapshotId: string | null;
}
