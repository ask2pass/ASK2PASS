import { LearningRuntimeController } from '../learning-runtime.controller';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeController - session lifecycle', () => {
  let controller: LearningRuntimeController;
  let sessionService: any;
  let runtimeService: any;

  beforeEach(() => {
    sessionService = {
      resumeSession: jest.fn().mockResolvedValue({
        id: 'session-1',
        learnerId: 'learner-1',
        status: LearningSessionStatus.IN_PROGRESS,
      }),
      pauseSession: jest.fn().mockResolvedValue({
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

  it('routes resume requests to the persistence service', async () => {
    const result = await controller.resumeLearningSession({
      sessionId: 'session-1',
      learnerId: 'learner-1',
    });

    expect(sessionService.resumeSession).toHaveBeenCalledWith(
      'session-1',
      'learner-1',
    );
    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
  });

  it('routes pause requests to the persistence service', async () => {
    const result = await controller.pauseLearningSession({
      sessionId: 'session-1',
      learnerId: 'learner-1',
    });

    expect(sessionService.pauseSession).toHaveBeenCalledWith(
      'session-1',
      'learner-1',
    );
    expect(result.status).toBe(LearningSessionStatus.PAUSED);
  });
});
