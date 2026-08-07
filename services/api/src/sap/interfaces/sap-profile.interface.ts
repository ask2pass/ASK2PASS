import { MasteryStatus } from '../enums/mastery-status.enum';

export interface SAPLearningProfile {
  learnerId: string;

  classLevel: string;

  subject: string;

  topic: string;

  baselineScore: number | null;

  latestScore: number | null;

  masteryScore: number;

  masteryStatus: MasteryStatus;

  competencyLevel: number;

  learningGapScore: number;

  interventionRequired: boolean;

  personalizedPathRequired: boolean;

  assessmentCount: number;

  updatedAt: Date;
}
