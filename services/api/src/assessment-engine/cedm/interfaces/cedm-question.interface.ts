import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMQuestionType } from '../enums/cedm-question-type.enum';

export interface CEDMQuestion {
  questionId: string;
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicId: string;
  year?: number;
  questionType: CEDMQuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  sourceType: CEDMQuestionSourceType;
  licensed: boolean;
  sourceVerified: boolean;
  generated: boolean;
}
