export type MasteryAction =
  | 'LEARN'
  | 'PRACTICE'
  | 'DRILL'
  | 'ASSESS'
  | 'REVIEW';

export interface LearningProgressSnapshot {
  learnerId: string;
  examinationType: string;
  subjectId: string;
  topicId: string;
  masteryPercent: number;
  previousMasteryPercent: number;
  attempts: number;
  correctAttempts: number;
  completed: boolean;
  recommendedAction: MasteryAction;
  updatedAt: string;
}
