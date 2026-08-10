
export interface LearningPathTopic {
  topicId: string;
  subjectId: string;
  sequence: number;
  masteryPercent: number;
  priority: 'FOUNDATION' | 'REINFORCEMENT' | 'PROGRESSION' | 'MASTERY';
  recommendedAction:
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW';
}

export interface LearningPathSubject {
  subjectId: string;
  masteryPercent: number;
  status: 'STARTING' | 'DEVELOPING' | 'READY_FOR_ASSESSMENT' | 'MASTERED';
  topics: LearningPathTopic[];
}

export interface LearningPath {
  learnerId: string;
  examinationType: string;
  generatedAt: string;
  version: number;
  currentSubjectId: string;
  currentTopicId: string | null;
  completionPercent: number;
  nextAction:
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW';
  subjects: LearningPathSubject[];
}
