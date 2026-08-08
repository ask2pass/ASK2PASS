import { LearningSessionService } from '../learning-session.service';
import { LearningSessionStatus } from '../../enums/learning-session-status.enum';

describe('LearningSessionService - AAT lesson protection', () => {
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

  it('classifies a lesson-critical clarification for brief answer and continuation', () => {
    const result = service.classifyLessonQuestion(
      'Why did you get this answer?',
      'mathematics',
    );

    expect(result.classification).toBe('LESSON_CRITICAL');
    expect(result.recommendation).toBe('ANSWER_AND_CONTINUE');
  });

  it('routes extended exploration toward PTDM', () => {
    const result = service.classifyLessonQuestion(
      'Give me more examples and practice this',
      'mathematics',
    );

    expect(result.classification).toBe('EXTENDED');
    expect(result.recommendation).toBe('ANSWER_AND_OFFER_PTDM');
  });

  it('routes unrelated questions toward PTDM', () => {
    const result = service.classifyLessonQuestion(
      'Tell me something completely unrelated',
      'mathematics',
    );

    expect(result.classification).toBe('UNRELATED');
    expect(result.recommendation).toBe('ANSWER_AND_OFFER_PTDM');
  });

  it('creates the same familiarity context for lesson entry', () => {
    const result = service.getAatFamiliarityContext(
      'learner-1',
      'Mathematics',
      'JSS2 Algebra',
      'LESSON',
    );

    expect(result.familiarity).toBe(true);
    expect(result.continuity).toBe(true);
    expect(result.greetingMode).toBe('BRIEF');
    expect(result.origin).toBe('LESSON');
  });

  it('creates the same familiarity context for PTDM', () => {
    const result = service.getAatFamiliarityContext(
      'learner-1',
      'Mathematics',
      'JSS2 Algebra',
      'PTDM',
    );

    expect(result.familiarity).toBe(true);
    expect(result.continuity).toBe(true);
    expect(result.greetingMode).toBe('BRIEF');
    expect(result.origin).toBe('PTDM');
  });

  it('pauses an active lesson before entering PTDM', async () => {
    const session = {
      id: 'session-1',
      learnerId: 'learner-1',
      status: LearningSessionStatus.IN_PROGRESS,
    };

    repository.findOne.mockResolvedValueOnce(session);

    const result = await service.enterPtdm(
      'session-1',
      'learner-1',
    );

    expect(result.status).toBe(LearningSessionStatus.PAUSED);
    expect(repository.save).toHaveBeenCalledWith(session);
  });
});
