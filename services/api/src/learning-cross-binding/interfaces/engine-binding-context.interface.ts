import { EngineBindingState } from '../enums/engine-binding-state.enum';

export interface EngineBindingContext {
  learnerId: string;

  sessionId: string;

  lessonId: string;

  classLevel: string;

  subject: string;

  topic: string;

  deliveryReady: boolean;

  orchestrationReady: boolean;

  sessionReady: boolean;

  persistenceReady: boolean;

  runtimeReady: boolean;

  offlineAvailable: boolean;

  state: EngineBindingState;

  lessonPosition: number;

  questionModeActive: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  snapshotId: string | null;
}
