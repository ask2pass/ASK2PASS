import { AssessmentType } from '../enums/assessment-type.enum';
import { AssessmentSyncStatus } from '../enums/assessment-sync-status.enum';

export interface SAPAssessment {
  assessmentId: string;

  learnerId: string;

  sessionId: string | null;

  lessonId: string | null;

  classLevel: string;

  subject: string;

  topic: string;

  assessmentType: AssessmentType;

  score: number;

  maxScore: number;

  percentage: number;

  completed: boolean;

  offline: boolean;

  syncStatus: AssessmentSyncStatus;

  createdAt: Date;

  updatedAt: Date;
}
