import { CEDMGeneratedQuestion } from './cedm-generated-question.interface';
import { CEDMQuestionProvenance } from '../enums/cedm-provenance.enum';

export interface CEDMGenerationResult {
  questions: CEDMGeneratedQuestion[];
  provenance: CEDMQuestionProvenance;
  licensedQuestionCount: number;
  simulatedQuestionCount: number;
  hybridQuestionCount: number;
  sourceIntegrityVerified: boolean;
}
