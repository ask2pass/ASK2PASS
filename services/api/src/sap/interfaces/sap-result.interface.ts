import { SAPState } from '../enums/sap-state.enum';
import { MasteryStatus } from '../enums/mastery-status.enum';

export interface SAPResult {
  success: boolean;

  state: SAPState;

  learnerId: string;

  assessmentId: string | null;

  score: number;

  percentage: number;

  masteryScore: number;

  masteryStatus: MasteryStatus;

  competencyLevel: number;

  learningGapScore: number;

  interventionRequired: boolean;

  personalizedPathRequired: boolean;

  assessmentCount: number;

  offlineAvailable: boolean;

  syncPending: boolean;

  reason: string | null;

  updatedAt: Date;
}
