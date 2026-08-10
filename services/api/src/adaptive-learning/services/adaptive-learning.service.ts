
import { Injectable } from '@nestjs/common';

import {
  AdaptiveLearningAction,
  AdaptiveLearningDecision,
} from '../interfaces/adaptive-learning.interface';

@Injectable()
export class AdaptiveLearningService {
  private readonly version = 1;

  decide(
    learnerId: string,
    examinationType: string,
    subjectId: string,
    topicId: string,
    masteryPercent: number,
  ): AdaptiveLearningDecision {
    let action: AdaptiveLearningAction;
    let reason: string;

    if (masteryPercent < 40) {
      action = 'LEARN';
      reason =
        'Mastery is below 40%; the learner needs foundation learning before progression.';
    } else if (masteryPercent < 65) {
      action = 'PRACTICE';
      reason =
        'Mastery is developing but below the reinforcement threshold; targeted practice is recommended.';
    } else if (masteryPercent < 80) {
      action = 'DRILL';
      reason =
        'The learner has developing mastery; focused drills should strengthen retention and fluency.';
    } else if (masteryPercent < 90) {
      action = 'ASSESS';
      reason =
        'The learner is approaching mastery; an assessment should verify readiness.';
    } else {
      action = 'REVIEW';
      reason =
        'The learner has reached mastery; review should preserve retention.';
    }

    return {
      learnerId,
      examinationType,
      subjectId,
      topicId,
      action,
      masteryPercent,
      reason,
      generatedAt: new Date().toISOString(),
      version: this.version,
    };
  }
}
