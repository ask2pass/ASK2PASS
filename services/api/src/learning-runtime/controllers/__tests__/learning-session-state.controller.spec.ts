import { LearningRuntimeController } from '../learning-runtime.controller';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeController - session state', () => {
  let controller: LearningRuntimeController;
  let learningRuntimeService: any;

  beforeEach(() => {
    learningRuntimeService = {
      getLearningSessionState: jest.fn().mockResolvedValue({
        sessionId: 'session-1',
        learnerId: 'learner-1',
        status: LearningSessionStatus.IN_PROGRESS,
        description: 'Active learning session',
      }),
    };

    controller = new LearningRuntimeController(
      learningRuntimeService,
    );
  });

  it('routes session state to the production runtime service', async () => {
    const request = {
      sessionId: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
      description: 'Active learning session',
    };

    const result = await controller.getLearningSessionState(
      request as any,
    );

    expect(
      learningRuntimeService.getLearningSessionState,
    ).toHaveBeenCalledWith(request);

    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
  });
});
