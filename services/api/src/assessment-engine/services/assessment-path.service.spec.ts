import { AssessmentPathService } from './assessment-path.service';
import { AssessmentResponseType } from '../enums/assessment-response-type.enum';

describe('AssessmentPathService', () => {
  let service: AssessmentPathService;

  beforeEach(() => {
    service = new AssessmentPathService();
  });

  it('routes monthly CBT examinations into PTDM improvement processing', () => {
    const result = service.buildMonthlyExamPTDMContext(
      'assessment-1',
      'learner-1',
      AssessmentResponseType.CBT,
    );

    expect(result.source).toBe('MONTHLY_EXAM');
    expect(result.responseType).toBe(AssessmentResponseType.CBT);
    expect(result.correctionRequired).toBe(true);
    expect(result.explanationRequired).toBe(true);
    expect(result.remediationRequired).toBe(true);
    expect(result.improvementStrategyRequired).toBe(true);
    expect(result.retakeSupported).toBe(true);
  });

  it('routes monthly Essay examinations into PTDM improvement processing', () => {
    const result = service.buildMonthlyExamPTDMContext(
      'assessment-2',
      'learner-2',
      AssessmentResponseType.ESSAY,
    );

    expect(result.source).toBe('MONTHLY_EXAM');
    expect(result.responseType).toBe(AssessmentResponseType.ESSAY);
    expect(result.correctionRequired).toBe(true);
    expect(result.explanationRequired).toBe(true);
    expect(result.remediationRequired).toBe(true);
    expect(result.improvementStrategyRequired).toBe(true);
  });

  it('makes MEDM universally accessible without a score threshold', () => {
    const result = service.buildMEDMAccessContext('learner-3');

    expect(result.accessible).toBe(true);
    expect(result.thresholdRequired).toBe(false);
    expect(result.identityRestricted).toBe(false);
  });
});
