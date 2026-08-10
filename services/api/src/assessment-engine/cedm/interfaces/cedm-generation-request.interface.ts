import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMGenerationMode } from '../enums/cedm-generation-mode.enum';

export interface CEDMGenerationRequest {
  learnerId: string;
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicId: string;
  questionCount: number;
  adaptiveMode: CEDMAdaptiveMode;
  generationMode: CEDMGenerationMode;
  licensedBankAvailable: boolean;
  difficulty: 'EASY' | 'STANDARD' | 'ADVANCED';
}
