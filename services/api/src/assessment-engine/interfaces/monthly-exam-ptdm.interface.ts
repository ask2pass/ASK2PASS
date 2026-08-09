import { AssessmentResponseType } from '../enums/assessment-response-type.enum';

export interface MonthlyExamPTDMContext {
  assessmentId: string;
  learnerId: string;
  responseType: AssessmentResponseType;
  source: 'MONTHLY_EXAM';
  correctionRequired: boolean;
  explanationRequired: boolean;
  remediationRequired: boolean;
  improvementStrategyRequired: boolean;
  retakeSupported: boolean;
}
