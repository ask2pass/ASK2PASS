
import { LearningPathService } from './learning-path.service';

describe('LearningPathService', () => {
  const service = new LearningPathService();

  it('builds a progressive learner path from mastery state', () => {
    const result = service.generate({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjects: [
        {
          subjectId: 'mathematics',
          topics: [
            { topicId: 't1', masteryPercent: 20 },
            { topicId: 't2', masteryPercent: 50 },
            { topicId: 't3', masteryPercent: 70 },
            { topicId: 't4', masteryPercent: 85 },
            { topicId: 't5', masteryPercent: 95 },
          ],
        },
      ],
    });

    expect(result.learnerId).toBe('learner-1');
    expect(result.examinationType).toBe('WASSCE');
    expect(result.subjects).toHaveLength(1);
    expect(result.subjects[0].topics).toHaveLength(5);

    expect(result.subjects[0].topics[0].recommendedAction).toBe('LEARN');
    expect(result.subjects[0].topics[1].recommendedAction).toBe('PRACTICE');
    expect(result.subjects[0].topics[2].recommendedAction).toBe('DRILL');
    expect(result.subjects[0].topics[3].recommendedAction).toBe('ASSESS');
    expect(result.subjects[0].topics[4].recommendedAction).toBe('REVIEW');

    expect(result.currentTopicId).toBe('t1');
    expect(result.nextAction).toBe('LEARN');
  });

  it('prioritizes the least-mastered subject', () => {
    const result = service.generate({
      learnerId: 'learner-2',
      examinationType: 'BECE',
      subjects: [
        {
          subjectId: 'english',
          topics: [{ topicId: 'e1', masteryPercent: 80 }],
        },
        {
          subjectId: 'mathematics',
          topics: [{ topicId: 'm1', masteryPercent: 30 }],
        },
      ],
    });

    expect(result.currentSubjectId).toBe('mathematics');
    expect(result.currentTopicId).toBe('m1');
    expect(result.nextAction).toBe('LEARN');
  });

  it('calculates topic completion from mastered topics', () => {
    const result = service.generate({
      learnerId: 'learner-3',
      examinationType: 'NECO',
      subjects: [
        {
          subjectId: 'science',
          topics: [
            { topicId: 's1', masteryPercent: 90 },
            { topicId: 's2', masteryPercent: 90 },
            { topicId: 's3', masteryPercent: 50 },
            { topicId: 's4', masteryPercent: 30 },
          ],
        },
      ],
    });

    expect(result.completionPercent).toBe(50);
  });
});
