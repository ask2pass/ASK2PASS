import { LearningRuntimeController } from '../learning-runtime.controller';

describe('LearningRuntimeController - 40 minute learning cycle', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;
  let runtimeService: any;

  beforeEach(() => {
    sessionService = {
      getFortyMinuteLearningCycle: jest.fn().mockReturnValue({
        totalDurationMinutes: 40,
        stages: [
          {
            stage: 'LESSON',
            durationMinutes: 25,
          },
          {
            stage: 'REVISION_RECAP',
            durationMinutes: 5,
          },
          {
            stage: 'CBT_QUIZ',
            durationMinutes: 10,
            questionCount: 15,
          },
        ],
        quiz: {
          questionCount: 15,
          durationMinutes: 10,
        },
        familiarity: true,
        continuity: true,
        preserveSession: true,
        preserveLessonContext: true,
        ptdmCompatible: true,
      }),
      getLearningCycleStage: jest.fn().mockReturnValue({
        stage: 'CBT_QUIZ',
        durationMinutes: 10,
        questionCount: 15,
        nextStage: 'COMPLETED',
      }),
      validateCbtQuestionCount: jest.fn().mockReturnValue({
        valid: true,
        questionCount: 15,
        durationMinutes: 10,
      }),
    };

    runtimeService = {
      orchestrateLearningSession: jest.fn(),
      deliverLearningSession: jest.fn(),
      getLearningSessionState: jest.fn(),
    };

    controller = new LearningRuntimeController(
      runtimeService,
      sessionService,
    );
  });

  it('exposes the complete 40 minute lesson cycle', () => {
    const result = controller.learningCycle({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
    });

    expect(
      sessionService.getFortyMinuteLearningCycle,
    ).toHaveBeenCalledWith(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
    );

    expect(result.totalDurationMinutes).toBe(40);
    expect(result.stages).toHaveLength(3);
    expect(result.quiz.questionCount).toBe(15);
  });

  it('keeps AAT continuity attached to the complete cycle', () => {
    const result = controller.learningCycle({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
    });

    expect(result.familiarity).toBe(true);
    expect(result.continuity).toBe(true);
    expect(result.preserveSession).toBe(true);
    expect(result.preserveLessonContext).toBe(true);
    expect(result.ptdmCompatible).toBe(true);
  });

  it('exposes the CBT stage with exactly 15 questions', () => {
    const result = controller.learningCycleStage({
      stage: 'CBT_QUIZ',
    });

    expect(
      sessionService.getLearningCycleStage,
    ).toHaveBeenCalledWith('CBT_QUIZ');

    expect(result.stage).toBe('CBT_QUIZ');
    expect(result.durationMinutes).toBe(10);
    expect(result.questionCount).toBe(15);
  });

  it('validates the mandatory 15-question CBT contract', () => {
    const result = controller.validateCbtQuestionCount({
      questionCount: 15,
    });

    expect(
      sessionService.validateCbtQuestionCount,
    ).toHaveBeenCalledWith(15);

    expect(result.valid).toBe(true);
    expect(result.questionCount).toBe(15);
  });
});
