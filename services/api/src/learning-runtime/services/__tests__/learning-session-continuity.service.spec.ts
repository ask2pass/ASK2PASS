import { LearningSessionService } from '../learning-session.service';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningSessionService - AAT continuity and PTDM return', () => {
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

  it('returns a paused PTDM session to IN_PROGRESS', async () => {
    const session = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.PAUSED,
    };

    repository.findOne.mockResolvedValueOnce(session);

    const result = await service.returnFromPtdm(
      'session-1',
      'learner-1',
    );

    expect(result.status).toBe(LearningSessionStatus.IN_PROGRESS);
    expect(repository.save).toHaveBeenCalledWith(session);
  });

  it('preserves learner/session continuity context', () => {
    const result = service.getSessionContinuityContext(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
      'LESSON',
    );

    expect(result.learnerId).toBe('learner-1');
    expect(result.sessionId).toBe('session-1');
    expect(result.subject).toBe('Mathematics');
    expect(result.module).toBe('JSS2 Algebra');
    expect(result.lessonContext).toBe('Linear equations');
    expect(result.origin).toBe('LESSON');
    expect(result.familiarity).toBe(true);
    expect(result.continuity).toBe(true);
    expect(result.preserveSession).toBe(true);
    expect(result.preserveLessonContext).toBe(true);
  });

  it('supports PTDM continuity without creating a new session', () => {
    const result = service.getSessionContinuityContext(
      'learner-1',
      'session-1',
      'Mathematics',
      'JSS2 Algebra',
      'Linear equations',
      'PTDM',
    );

    expect(result.origin).toBe('PTDM');
    expect(result.continuity).toBe(true);
    expect(result.preserveSession).toBe(true);
    expect(result.preserveLessonContext).toBe(true);
  });
});
