import { LearningRuntimeController } from '../learning-runtime.controller';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeController - session transition', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;
  let runtimeService: any;

  beforeEach(() => {
    sessionService = {
      transition: jest.fn().mockResolvedValue({
        id: 'session-1',
        learnerId: 'learner-1',
        status: LearningSessionStatus.IN_PROGRESS,
        description: 'Session started',
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

  it('routes session transition to the persistence service', async () => {
    const request = {
      sessionId: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
      description: 'Session started',
    };

    const result = await controller.transitionLearningSession(request as any);

    expect(sessionService.transition).toHaveBeenCalledWith(
      'session-1',
      'learner-1',
      LearningSessionStatus.IN_PROGRESS,
      'Session started',
    );
    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
  });
});
