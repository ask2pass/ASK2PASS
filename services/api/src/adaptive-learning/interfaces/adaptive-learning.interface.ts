
export type AdaptiveLearningAction =
  | 'LEARN'
  | 'PRACTICE'
  | 'DRILL'
  | 'ASSESS'
  | 'REVIEW';

export interface AdaptiveLearningDecision {
  learnerId: string;
  examinationType: string;
  subjectId: string;
  topicId: string | null;
  action: AdaptiveLearningAction;
  masteryPercent: number;
  reason: string;
  generatedAt: string;
  version: number;
}
