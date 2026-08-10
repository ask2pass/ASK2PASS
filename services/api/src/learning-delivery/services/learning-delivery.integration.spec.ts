
import { LearningDeliveryService } from './learning-delivery.service';

describe('Complete Learning Delivery Integration Contract', () => {
  it('represents the final vertical handoff into runtime delivery', () => {
    const service = new LearningDeliveryService();

    const result = service.prepare({
      learnerId: 'learner-1',
      examinationType: 'WASSCE',
      subjectId: 'mathematics',
      topicId: 'quadratic-equations',
      action: 'DRILL',
      coinCost: 1,
    });

    expect(result).toEqual(
      expect.objectContaining({
        learnerId: 'learner-1',
        examinationType: 'WASSCE',
        subjectId: 'mathematics',
        topicId: 'quadratic-equations',
        action: 'DRILL',
        coinCost: 1,
        runtimeDirective: 'DELIVER_MASTERY_DRILL',
        status: 'READY',
      }),
    );
  });
});
