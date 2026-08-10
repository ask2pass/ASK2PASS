import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';

export interface CEDMSimulationProfile {
  examinationType: CEDMExaminationType;
  subjectId: string;
  topicId: string;
  objective: string;
  difficulty: 'EASY' | 'STANDARD' | 'ADVANCED';
  questionCount: number;
  timeLimitMinutes?: number;
  examinationStandard: string;
}
