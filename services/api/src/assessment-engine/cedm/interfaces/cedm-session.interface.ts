import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';

export interface CEDMSession {
  sessionId: string;
  learnerId: string;
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicIds: string[];
  adaptiveMode: CEDMAdaptiveMode;
  questionSourceType: CEDMQuestionSourceType;
  status: CEDMSessionStatus;
  currentTopicIndex: number;
  scorePercent: number;
  masteryThresholdPercent: number;
  continuationRequired: boolean;
}
