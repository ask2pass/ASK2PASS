
import { AdaptiveLearningService } from './adaptive-learning.service';

describe('Adaptive Learning Loop integration contract', () => {
  it('converts a completed learning result into the next action', () => {
    const service = new AdaptiveLearningService();

    const result = service.decide(
      'learner-1',
      'WASSCE',
      'mathematics',
      'quadratic-equations',
      78,
    );

    expect(result).toEqual(
      expect.objectContaining({
        learnerId: 'learner-1',
        examinationType: 'WASSCE',
        subjectId: 'mathematics',
        topicId: 'quadratic-equations',
        masteryPercent: 78,
        action: 'DRILL',
      }),
    );
  });
});
