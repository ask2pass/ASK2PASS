import { Injectable } from '@nestjs/common';
import { BMActivityType } from '../enums/bm-activity-type.enum';
import { BMLearningService } from './bm-learning.service';
import { BMLearningProgress } from '../interfaces/bm-learning-progress.interface';

@Injectable()
export class BMProgressService {
  private readonly progress = new Map<string, BMLearningProgress>();

  constructor(private readonly learning: BMLearningService) {}

  private create(learnerId: string, sapUser: boolean): BMLearningProgress {
    return {
      learnerId,
      sapUser,
      enrolled: true,
      completedActivities: [],
      activitiesRequired: this.learning.getRequiredSAPActivities(),
      practicalPassed: false,
      examScore: null,
      examPassed: false,
      certified: false,
      competencyScore: 0,
      autoEngineAvailable: true,
    };
  }

  get(learnerId: string, sapUser = false): BMLearningProgress {
    let current = this.progress.get(learnerId);

    if (!current) {
      current = this.create(learnerId, sapUser);
      this.progress.set(learnerId, current);
    }

    return current;
  }

  completeActivity(
    learnerId: string,
    activity: BMActivityType,
    sapUser = false,
  ) {
    const current = this.get(learnerId, sapUser);

    if (!current.completedActivities.includes(activity)) {
      current.completedActivities.push(activity);
    }

    this.recalculate(current);
    return current;
  }

  completePractical(
    learnerId: string,
    passed: boolean,
    sapUser = false,
  ) {
    const current = this.get(learnerId, sapUser);
    current.practicalPassed = passed;
    this.recalculate(current);
    return current;
  }

  recordExam(
    learnerId: string,
    score: number,
    sapUser = false,
  ) {
    const current = this.get(learnerId, sapUser);
    current.examScore = score;
    current.examPassed = score >= 70;
    this.recalculate(current);
    return current;
  }

  private recalculate(current: BMLearningProgress) {
    const required = current.activitiesRequired.length;
    const completed = current.completedActivities.filter(
      activity => current.activitiesRequired.includes(activity),
    ).length;

    const activityScore =
      required > 0 ? (completed / required) * 70 : 0;

    const practicalScore = current.practicalPassed ? 15 : 0;
    const examScore =
      current.examScore !== null ? (current.examScore / 100) * 15 : 0;

    current.competencyScore = Math.min(
      100,
      Math.round(activityScore + practicalScore + examScore),
    );

    const activityComplete =
      completed >= required && required > 0;

    current.certified =
      !current.sapUser ||
      (
        activityComplete &&
        current.practicalPassed &&
        current.examPassed
      );
  }
}
