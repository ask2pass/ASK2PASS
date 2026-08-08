import { LearningSessionService } from '../learning-session.service';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningSessionService - persistence and transitions', () => {
  let service: LearningSessionService;
  let repository: any;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => ({
        id: value.id ?? 'session-1',
        ...value,
      })),
    };

    service = new LearningSessionService(repository);
  });

  it('creates a new learning session in CREATED state', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    const result = await service.createSession({
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning session',
      offline: true,
    });

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        learnerId: 'learner-1',
        lessonId: 'lesson-1',
        status: LearningSessionStatus.CREATED,
      }),
    );
    expect(repository.save).toHaveBeenCalled();
    expect(result.status).toBe(LearningSessionStatus.CREATED);
  });

  it('returns an existing session for an idempotent reference', async () => {
    const existing = {
      id: 'session-1',
      reference: 'LEARN-session-1-lesson-1',
      status: LearningSessionStatus.AUTHORIZED,
    };

    repository.findOne.mockResolvedValueOnce(existing);

    const result = await service.createSession({
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning session',
    });

    expect(result).toBe(existing);
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('transitions an existing session to the requested state', async () => {
    const existing = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.CREATED,
      description: 'Learning session',
    };

    repository.findOne.mockResolvedValueOnce(existing);

    const result = await service.transition(
      'session-1',
      'learner-1',
      LearningSessionStatus.IN_PROGRESS,
      'Session started',
    );

    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
    expect(result.description).toBe('Session started');
    expect(repository.save).toHaveBeenCalledWith(existing);
  });
});
