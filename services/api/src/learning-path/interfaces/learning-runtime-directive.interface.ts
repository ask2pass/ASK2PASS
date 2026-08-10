import type { LearningPath } from './learning-path.interface';

export interface LearningRuntimeDirective {
  learnerId: string;
  examinationType: string;
  subjectId: string;
  topicId: string | null;
  action:
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW';
  pathVersion: number;
  generatedAt: string;
}

export interface LearningRuntimeDirectiveInput {
  learningPath: LearningPath;
}
