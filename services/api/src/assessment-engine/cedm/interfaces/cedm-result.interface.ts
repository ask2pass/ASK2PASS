import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

export interface CEDMTopicResult {
  topicId: string;
  attempted: number;
  correct: number;
  scorePercent: number;
  masteryReached: boolean;
}

export interface CEDMResult {
  sessionId: string;
  learnerId: string;
  examinationType: string;
  subjectId: string;
  questionSourceType: CEDMQuestionSourceType;
  topics: CEDMTopicResult[];
  overallScorePercent: number;
  masteryThresholdPercent: 65;
  progressionAllowed: boolean;
  adaptiveInterventionUsed: boolean;
  weakTopics: string[];
  completed: boolean;
}
