import { LearningRuntimeController } from '../learning-runtime.controller';

describe('Universal AAT - Academic Power CBT Controller', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;

  beforeEach(() => {
    sessionService = {
      getAcademicPowerCbtContract: jest.fn().mockReturnValue({
        questionCount: 15,
        purpose: 'ACADEMIC_POWER_BUILDING',
        source: { type: 'JUST_CONCLUDED_LESSON' },
      }),
      getAcademicPowerCbtQuestionContract: jest.fn().mockReturnValue({
        questionNumber: 1,
        totalQuestions: 15,
        dimension: 'CONCEPT',
        lessonAnchored: true,
      }),
      getPtdmContinuationFromCbt: jest.fn().mockReturnValue({
        origin: 'CBT',
        destination: 'PTDM',
        purpose: 'MASTERY',
        lessonContext: 'Linear equations',
      }),
    };

    controller = new LearningRuntimeController(
      {} as any,
      sessionService,
    );
  });

  it('exposes the universal 15-question academic-power CBT contract', () => {
    const result = controller.academicPowerCbt({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
      questionNumber: 1,
      dimension: 'CONCEPT',
    });

    expect(result.questionCount).toBe(15);
    expect(result.purpose).toBe('ACADEMIC_POWER_BUILDING');
    expect(result.source.type).toBe('JUST_CONCLUDED_LESSON');
  });

  it('supports CBT-to-PTDM mastery continuation', () => {
    const result = controller.academicPowerCbtPtdmContinuation({
      learnerId: 'learner-1',
      sessionId: 'session-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
      questionNumber: 7,
      outcome: 'NEEDS_REMEDIATION',
    });

    expect(result.destination).toBe('PTDM');
    expect(result.purpose).toBe('MASTERY');
    expect(result.lessonContext).toBe('Linear equations');
  });
});
