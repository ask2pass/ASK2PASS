
import { Injectable } from '@nestjs/common';
import {
  LearningDeliveryPlan,
  LearningDeliveryRequest,
} from '../interfaces/learning-delivery.interface';

@Injectable()
export class LearningDeliveryService {
  private readonly version = 1;

  prepare(
    request: LearningDeliveryRequest,
  ): LearningDeliveryPlan {
    const assessmentRequired = request.action === 'ASSESS';

    const runtimeDirective =
      request.action === 'LEARN'
        ? 'DELIVER_LEARNING_CONTENT'
        : request.action === 'PRACTICE'
          ? 'DELIVER_TARGETED_PRACTICE'
          : request.action === 'DRILL'
            ? 'DELIVER_MASTERY_DRILL'
            : request.action === 'ASSESS'
              ? 'DELIVER_ASSESSMENT'
              : 'DELIVER_REVIEW';

    const resumeSessionId = request.resumeSessionId ?? null;

    return {
      learnerId: request.learnerId,
      examinationType: request.examinationType,
      subjectId: request.subjectId,
      topicId: request.topicId ?? null,
      action: request.action,
      coinCost: request.coinCost,
      status: resumeSessionId ? 'RESUME' : 'READY',
      runtimeDirective,
      assessmentRequired,
      resumeSessionId,
      reason: resumeSessionId
        ? 'Existing learner state is available; delivery should resume from the preserved runtime state.'
        : 'A new learning delivery cycle is ready for runtime execution.',
      version: this.version,
      generatedAt: new Date().toISOString(),
    };
  }
}
