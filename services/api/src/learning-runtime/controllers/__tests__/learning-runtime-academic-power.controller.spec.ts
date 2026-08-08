import { LearningRuntimeController } from '../learning-runtime.controller';

describe('Universal AAT Academic Power Controller', () => {
  let controller: LearningRuntimeController;
  let academicPowerService: any;

  beforeEach(() => {
    academicPowerService = {
      getUniversalAssessmentContract: jest.fn().mockReturnValue({
        questionCount: 15,
        purpose: 'ACADEMIC_POWER_BUILDING',
      }),
      validateAssessment: jest.fn().mockReturnValue({
        valid: true,
        questionCount: 15,
      }),
      assess: jest.fn().mockReturnValue({
        totalQuestions: 15,
        outcome: 'NEEDS_REMEDIATION',
        ptdmContinuation: {
          eligible: true,
          mode: 'MASTERY',
        },
      }),
      getPtdmMasteryContract: jest.fn().mockReturnValue({
        universalAatBehaviour: true,
        scope: {
          subjectRestricted: false,
          topicRestricted: false,
          lessonTimeRestricted: false,
        },
      }),
    };

    controller = new LearningRuntimeController(
    {} as any,
    {} as any,
    academicPowerService
  );
  });

  it('exposes the universal 15-question academic-power contract', () => {
    const result = controller.academicPowerAssessmentContract({
      learnerId: 'learner-1',
      sessionId: 'session-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
    });

    expect(result.questionCount).toBe(15);
    expect(result.purpose).toBe('ACADEMIC_POWER_BUILDING');
  });

  it('returns CBT assessment diagnosis and PTDM continuation', () => {
    const result = controller.assessAcademicPower({
      assessment: {} as any,
      answers: [],
    });

    expect(result.totalQuestions).toBe(15);
    expect(result.ptdmContinuation.eligible).toBe(true);
  });

  it('exposes unrestricted PTDM mastery mode', () => {
    const result = controller.getPtdmMasteryContract({
      learnerId: 'learner-1',
    });

    expect(result.universalAatBehaviour).toBe(true);
    expect(result.scope.subjectRestricted).toBe(false);
    expect(result.scope.topicRestricted).toBe(false);
    expect(result.scope.lessonTimeRestricted).toBe(false);
  });
});
