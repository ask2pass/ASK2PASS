import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionProvenance } from '../enums/cedm-provenance.enum';

export interface CEDMGeneratedQuestion {
  questionId: string;
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'EASY' | 'STANDARD' | 'ADVANCED';
  provenance: CEDMQuestionProvenance;
  licensed: boolean;
  sourceVerified: boolean;
  generated: boolean;
  sourceQuestionId?: string;
  sourceYear?: number;
}
