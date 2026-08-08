import { LearningRuntimeService } from '../learning-runtime.service';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningRuntimeService - session state', () => {
  let service: LearningRuntimeService;

  beforeEach(() => {
    service = new LearningRuntimeService({} as any);
  });

  it('returns the authoritative learning session state contract', async () => {
    const request = {
      sessionId: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
      description: 'Active learning session',
    };

    const result = await service.getLearningSessionState(request);

    expect(result).toEqual(request);
  });
});
