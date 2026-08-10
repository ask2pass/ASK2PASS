
import { AdaptiveLearningService } from './adaptive-learning.service';

describe('AdaptiveLearningService', () => {
  const service = new AdaptiveLearningService();

  it('selects LEARN for foundation mastery', () => {
    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'algebra',
      20,
    );

    expect(result.action).toBe('LEARN');
    expect(result.masteryPercent).toBe(20);
  });

  it('selects PRACTICE for developing mastery', () => {
    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'algebra',
      50,
    );

    expect(result.action).toBe('PRACTICE');
  });

  it('selects DRILL for progressing mastery', () => {
    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'algebra',
      70,
    );

    expect(result.action).toBe('DRILL');
  });

  it('selects ASSESS near mastery', () => {
    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'algebra',
      85,
    );

    expect(result.action).toBe('ASSESS');
  });

  it('selects REVIEW at mastery', () => {
    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'algebra',
      95,
    );

    expect(result.action).toBe('REVIEW');
  });

  it('returns an explainable production decision', () => {
    const result = service.decide(
      'learner-1',
      'BECE',
      'english',
      'comprehension',
      62,
    );

    expect(result).toEqual(
      expect.objectContaining({
        learnerId: 'learner-1',
        examinationType: 'BECE',
        subjectId: 'english',
        topicId: 'comprehension',
        masteryPercent: 62,
        action: 'PRACTICE',
        version: 1,
      }),
    );

    expect(result.reason.length).toBeGreaterThan(20);
    expect(result.generatedAt).toBeDefined();
  });
});
