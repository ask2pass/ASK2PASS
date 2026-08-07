import { SAPState } from '../enums/sap-state.enum';

export interface SAPContext {
  learnerId: string;

  sessionId: string | null;

  lessonId: string | null;

  classLevel: string;

  subject: string;

  topic: string;

  state: SAPState;

  baselineScore: number | null;

  latestScore: number | null;

  masteryScore: number;

  competencyLevel: number;

  learningGapScore: number;

  interventionRequired: boolean;

  personalizedPathRequired: boolean;

  assessmentCount: number;

  offlineAvailable: boolean;

  persistenceReady: boolean;

  learningEngineBound: boolean;

  sessionBound: boolean;

  syncPending: boolean;

  updatedAt: Date;
}
