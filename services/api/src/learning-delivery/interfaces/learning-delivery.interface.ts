
export type LearningDeliveryAction =
  | 'LEARN'
  | 'PRACTICE'
  | 'DRILL'
  | 'ASSESS'
  | 'REVIEW';

export type LearningDeliveryStatus =
  | 'READY'
  | 'BLOCKED'
  | 'DELIVERED'
  | 'RESUME';

export interface LearningDeliveryRequest {
  learnerId: string;
  examinationType: string;
  subjectId: string;
  topicId: string | null;
  action: LearningDeliveryAction;
  coinCost: number;
  resumeSessionId?: string | null;
}

export interface LearningDeliveryPlan {
  learnerId: string;
  examinationType: string;
  subjectId: string;
  topicId: string | null;
  action: LearningDeliveryAction;
  coinCost: number;
  status: LearningDeliveryStatus;
  runtimeDirective: string;
  assessmentRequired: boolean;
  resumeSessionId: string | null;
  reason: string;
  version: number;
  generatedAt: string;
}
