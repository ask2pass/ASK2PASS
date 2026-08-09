import { Injectable } from '@nestjs/common';
import { AssessmentResponseType } from '../enums/assessment-response-type.enum';
import { MEDMAccessContext } from '../interfaces/medm-access.interface';
import { MonthlyExamPTDMContext } from '../interfaces/monthly-exam-ptdm.interface';

@Injectable()
export class AssessmentPathService {
  buildMonthlyExamPTDMContext(
    assessmentId: string,
    learnerId: string,
    responseType: AssessmentResponseType,
  ): MonthlyExamPTDMContext {
    return {
      assessmentId,
      learnerId,
      responseType,
      source: 'MONTHLY_EXAM',
      correctionRequired: true,
      explanationRequired: true,
      remediationRequired: true,
      improvementStrategyRequired: true,
      retakeSupported: true,
    };
  }

  buildMEDMAccessContext(learnerId: string): MEDMAccessContext {
    return {
      learnerId,
      accessible: true,
      thresholdRequired: false,
      identityRestricted: false,
      purpose: 'MASTERY_DIAGNOSTIC_AND_IMPROVEMENT',
    };
  }
}
