import { LearningSessionService } from '../learning-session.service';

describe('Universal AAT - Academic Power CBT', () => {
  let service: LearningSessionService;

  beforeEach(() => {
    service = new LearningSessionService({
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(async (value) => value),
    } as any);
  });

  it('requires exactly 15 lesson-anchored CBT questions', () => {
    const result = service.getAcademicPowerCbtContract(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.questionCount).toBe(15);
    expect(result.source.type).toBe('JUST_CONCLUDED_LESSON');
    expect(result.assessmentRules.exactlyFifteenQuestions).toBe(true);
    expect(result.assessmentRules.lessonAnchored).toBe(true);
  });

  it('targets concept, purpose and application', () => {
    const result = service.getAcademicPowerCbtContract(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.dimensions.map((item) => item.dimension)).toEqual([
      'CONCEPT',
      'PURPOSE',
      'APPLICATION',
    ]);
  });

  it('rejects a CBT question without lesson context', () => {
    expect(() =>
      service.getAcademicPowerCbtQuestionContract(
        1,
        '',
        'CONCEPT',
      ),
    ).toThrow(
      'CBT questions must be anchored to the lesson just concluded',
    );
  });

  it('rejects an invalid CBT dimension', () => {
    expect(() =>
      service.getAcademicPowerCbtQuestionContract(
        1,
        'Linear equations',
        'RANDOM',
      ),
    ).toThrow(
      'CBT dimension must be CONCEPT, PURPOSE, or APPLICATION',
    );
  });

  it('creates PTDM continuation from a CBT learning result', () => {
    const result = service.getPtdmContinuationFromCbt(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
      7,
      'NEEDS_REMEDIATION',
    );

    expect(result.destination).toBe('PTDM');
    expect(result.origin).toBe('CBT');
    expect(result.questionNumber).toBe(7);
    expect(result.lessonContext).toBe('Linear equations');
    expect(result.purpose).toBe('MASTERY');
    expect(result.continuity.continueFromLesson).toBe(true);
    expect(result.continuity.continueFromCbt).toBe(true);
    expect(result.ptdm.masteryOriented).toBe(true);
    expect(result.ptdm.learnerDirected).toBe(true);
  });
});
