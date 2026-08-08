import { LearningSessionService } from '../learning-session.service';

describe('LearningSessionService - 40 minute learning cycle', () => {
  let service: LearningSessionService;

  beforeEach(() => {
    const repository: any = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(async (value) => value),
    };

    service = new LearningSessionService(repository);
  });

  it('defines exactly 40 minutes per lesson cycle', () => {
    const result = service.getFortyMinuteLearningCycle(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.totalDurationMinutes).toBe(40);
    expect(
      result.stages.reduce(
        (total, stage) => total + stage.durationMinutes,
        0,
      ),
    ).toBe(40);
  });

  it('allocates 25 minutes to the core lesson', () => {
    const result = service.getFortyMinuteLearningCycle(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
    );

    expect(result.stages[0].stage).toBe('LESSON');
    expect(result.stages[0].durationMinutes).toBe(25);
  });

  it('allocates 5 minutes to revision and recap', () => {
    const result = service.getFortyMinuteLearningCycle(
      'learner-1',
      'session-1',
    );

    expect(result.stages[1].stage).toBe('REVISION_RECAP');
    expect(result.stages[1].durationMinutes).toBe(5);
  });

  it('allocates 10 minutes and exactly 15 questions to CBT', () => {
    const result = service.getFortyMinuteLearningCycle(
      'learner-1',
      'session-1',
    );

    expect(result.stages[2].stage).toBe('CBT_QUIZ');
    expect(result.stages[2].durationMinutes).toBe(10);
    expect(result.stages[2].questionCount).toBe(15);
    expect(result.quiz.questionCount).toBe(15);
  });

  it('preserves AAT familiarity and session continuity across the cycle', () => {
    const result = service.getFortyMinuteLearningCycle(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.familiarity).toBe(true);
    expect(result.continuity).toBe(true);
    expect(result.preserveSession).toBe(true);
    expect(result.preserveLessonContext).toBe(true);
    expect(result.ptdmCompatible).toBe(true);
  });

  it('enforces exactly 15 CBT questions per lesson', () => {
    expect(service.validateCbtQuestionCount(15)).toEqual({
      valid: true,
      questionCount: 15,
      durationMinutes: 10,
    });
  });

  it('rejects a CBT assessment that does not contain exactly 15 questions', () => {
    expect(() => service.validateCbtQuestionCount(10)).toThrow(
      'Each lesson CBT assessment must contain exactly 15 questions',
    );
  });

  it('keeps the stage sequence lesson -> recap -> CBT -> completed', () => {
    expect(service.getLearningCycleStage('LESSON').nextStage).toBe(
      'REVISION_RECAP',
    );
    expect(service.getLearningCycleStage('REVISION_RECAP').nextStage).toBe(
      'CBT_QUIZ',
    );
    expect(service.getLearningCycleStage('CBT_QUIZ').nextStage).toBe(
      'COMPLETED',
    );
  });
});
