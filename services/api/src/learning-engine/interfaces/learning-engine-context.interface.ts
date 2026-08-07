import { LearningEngineState } from '../enums/learning-engine-state.enum';

export interface LearningEngineContext {
  learnerId: string;
  sessionId: string;
  lessonId: string;

  classLevel: string;
  subject: string;
  topic: string;

  state: LearningEngineState;

  lessonPosition: number;

  questionModeActive: boolean;
  lessonCompleted: boolean;
  cbtCompleted: boolean;
  starsEligible: boolean;

  offlineAvailable: boolean;

  snapshotId: string | null;

  deliveryReady: boolean;
  orchestrationReady: boolean;
  sessionReady: boolean;
  persistenceReady: boolean;
  runtimeReady: boolean;
  fullyBound: boolean;

  updatedAt: Date;
}
