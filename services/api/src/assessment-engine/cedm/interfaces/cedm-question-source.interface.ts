import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

export interface CEDMQuestionSource {
  questionId: string;
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicId: string;
  examinationYear?: number;
  sourceType: CEDMQuestionSourceType;
  licensed: boolean;
  sourceVerified: boolean;
  generated: boolean;
}
