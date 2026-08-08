import { LearningRuntimeController } from '../learning-runtime.controller';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeController - AAT continuity and PTDM return', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;
  let runtimeService: any;

  beforeEach(() => {
    sessionService = {
      returnFromPtdm: jest.fn().mockResolvedValue({
        id: 'session-1',
        learnerId: 'learner-1',
        status: LearningSessionStatus.IN_PROGRESS,
      }),
      getSessionContinuityContext: jest.fn().mockImplementation(
        (
          learnerId: string,
          sessionId: string,
          subject?: string,
          module?: string,
          lessonContext?: string,
          origin: 'LESSON' | 'PTDM' = 'LESSON',
        ) => ({
          learnerId,
          sessionId,
          subject: subject || null,
          module: module || null,
          lessonContext: lessonContext || null,
          origin,
          familiarity: true,
          continuity: true,
          preserveSession: true,
          preserveLessonContext: true,
        }),
      ),
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

  it('returns the learner from PTDM to the existing lesson session', async () => {
    const result = await controller.returnFromPtdm({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
    });

    expect(sessionService.returnFromPtdm).toHaveBeenCalledWith(
      'session-1',
      'learner-1',
    );

    expect(result.destination).toBe('LESSON');
    expect(result.lessonResumed).toBe(true);
    expect(result.session.status).toBe(
      LearningSessionStatus.IN_PROGRESS,
    );
    expect(result.familiarity.origin).toBe('LESSON');
    expect(result.familiarity.sessionId).toBe('session-1');
  });

  it('preserves the same session identity through continuity', () => {
    const result = controller.continuity({
      sessionId: 'session-1',
      learnerId: 'learner-1',
      subject: 'Mathematics',
      module: 'JSS2 Algebra',
      lessonContext: 'Linear equations',
    });

    expect(
      sessionService.getSessionContinuityContext,
    ).toHaveBeenCalledWith(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
      'LESSON',
    );

    expect(result.sessionId).toBe('session-1');
    expect(result.continuity).toBe(true);
    expect(result.preserveSession).toBe(true);
  });
});
