import { LearningRuntimeController } from '../learning-runtime.controller';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeController - AAT lesson protection', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;
  let runtimeService: any;

  beforeEach(() => {
    sessionService = {
      classifyLessonQuestion: jest.fn().mockReturnValue({
        classification: 'EXTENDED',
        recommendation: 'ANSWER_AND_OFFER_PTDM',
      }),
      getAatFamiliarityContext: jest.fn().mockImplementation(
      (
        learnerId: string,
        subject?: string,
        module?: string,
        origin: 'LESSON' | 'PTDM' = 'LESSON',
      ) => ({
        learnerId,
        subject: subject || null,
        module: module || null,
        familiarity: true,
        continuity: true,
        greetingMode: 'BRIEF',
        origin,
      }),
    ),
    enterPtdm: jest.fn().mockResolvedValue({
        id: 'session-1',
        learnerId: 'learner-1',
        status: LearningSessionStatus.PAUSED,
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

  it('routes lesson questions through the AAT protection policy', () => {
    const result = controller.questionPolicy({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      question: 'Give me more examples',
      lessonContext: 'mathematics',
    });

    expect(sessionService.classifyLessonQuestion)
      .toHaveBeenCalledWith(
        'Give me more examples',
        'mathematics',
      );

    expect(result.recommendation).toBe('ANSWER_AND_OFFER_PTDM');
  });

  it('returns the same familiarity layer for lesson entry', () => {
    const result = controller.familiarity({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      question: 'hello',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
    });

    expect(sessionService.getAatFamiliarityContext)
      .toHaveBeenCalledWith(
        'learner-1',
        'Mathematics',
        'JSS2 Algebra',
        'LESSON',
      );

    expect(result.familiarity).toBe(true);
  });

  it('pauses the lesson and establishes PTDM familiarity on diversion', async () => {
    const result = await controller.enterPtdm({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      question: 'Give me more examples',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
    });

    expect(sessionService.enterPtdm)
      .toHaveBeenCalledWith(
        'session-1',
        'learner-1',
      );

    expect(result.destination).toBe('PTDM');
    expect(result.lessonPaused).toBe(true);
    expect(result.familiarity.origin).toBe('PTDM');
  });
});
