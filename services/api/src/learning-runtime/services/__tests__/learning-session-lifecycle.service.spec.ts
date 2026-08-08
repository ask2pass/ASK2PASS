import { LearningSessionService } from '../learning-session.service';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningSessionService - lifecycle and resume', () => {
  let service: LearningSessionService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(async (value) => value),
    };

    service = new LearningSessionService(repository);
  });

  it('resumes a paused session into IN_PROGRESS', async () => {
    const session = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.PAUSED,
    };

    repository.findOne.mockResolvedValueOnce(session);

    const result = await service.resumeSession(
      'session-1',
      'learner-1',
    );

    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
    expect(repository.save).toHaveBeenCalledWith(session);
  });

  it('resumes an in-progress session idempotently', async () => {
    const session = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
    };

    repository.findOne.mockResolvedValueOnce(session);

    const result = await service.resumeSession(
      'session-1',
      'learner-1',
    );

    expect(result).toBe(session);
    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
    expect(repository.save).toHaveBeenCalledWith(session);
  });

  it('pauses an in-progress session', async () => {
    const session = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
    };

    repository.findOne.mockResolvedValueOnce(session);

    const result = await service.pauseSession(
      'session-1',
      'learner-1',
    );

    expect(result.status).toBe(LearningSessionStatus.PAUSED);
    expect(repository.save).toHaveBeenCalledWith(session);
  });
});
