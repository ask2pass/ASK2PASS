
import { LearningDeliveryService } from './learning-delivery.service';

describe('LearningDeliveryService', () => {
  const service = new LearningDeliveryService();

  it('prepares LEARN delivery for a new learning cycle', () => {
    const result = service.prepare({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      action: 'LEARN',
      coinCost: 1,
    });

    expect(result.status).toBe('READY');
    expect(result.runtimeDirective).toBe('DELIVER_LEARNING_CONTENT');
    expect(result.assessmentRequired).toBe(false);
    expect(result.resumeSessionId).toBeNull();
  });

  it('prepares ASSESS delivery through the same orchestration boundary', () => {
    const result = service.prepare({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'algebra',
      action: 'ASSESS',
      coinCost: 2,
    });

    expect(result.action).toBe('ASSESS');
    expect(result.runtimeDirective).toBe('DELIVER_ASSESSMENT');
    expect(result.assessmentRequired).toBe(true);
  });

  it('preserves resume state instead of starting a fresh cycle', () => {
    const result = service.prepare({
      learnerId: 'learner-1',
      examinationType: 'BECE',
      subjectId: 'english',
      topicId: 'comprehension',
      action: 'PRACTICE',
      coinCost: 1,
      resumeSessionId: 'session-123',
    });

    expect(result.status).toBe('RESUME');
    expect(result.resumeSessionId).toBe('session-123');
    expect(result.reason).toContain('resume');
  });

  it('supports the full adaptive action vocabulary', () => {
    for (const action of [
      'LEARN',
      'PRACTICE',
      'DRILL',
      'ASSESS',
      'REVIEW',
    ] as const) {
      const result = service.prepare({
        learnerId: 'learner-1',
        examinationType: 'WASSCE',
        subjectId: 'mathematics',
        topicId: 'topic-1',
        action,
        coinCost: 1,
      });

      expect(result.action).toBe(action);
      expect(result.runtimeDirective).toBeDefined();
      expect(result.version).toBe(1);
    }
  });
});
