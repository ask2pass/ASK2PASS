import { Injectable } from '@nestjs/common';
import { LearningPathService } from '../../learning-path/services/learning-path.service';
import { LearningRuntimeDirectiveService } from '../../learning-path/services/learning-runtime-directive.service';
import { LearningProgressEntity } from '../entities/learning-progress.entity';
import { RecordLearningResultDto } from '../dto/record-learning-result.dto';
import { LearningProgressRepository } from '../repositories/learning-progress.repository';
import {
  LearningProgressSnapshot,
  MasteryAction,
} from '../interfaces/learning-progress.interface';

@Injectable()
export class LearningProgressService {
  constructor(
    private readonly repository: LearningProgressRepository,
    private readonly learningPathService: LearningPathService,
    private readonly runtimeDirectiveService: LearningRuntimeDirectiveService,
  ) {}

  async recordResult(
    dto: RecordLearningResultDto,
  ): Promise<LearningProgressSnapshot> {
    let progress = await this.repository.findByLearnerTopic(
      dto.learnerId,
      dto.subjectId,
      dto.topicId,
    );

    const previousMastery = progress
      ? Number(progress.masteryPercent)
      : 0;

    if (!progress) {
      progress = new LearningProgressEntity();
      progress.learnerId = dto.learnerId;
      progress.examinationType = dto.examinationType;
      progress.subjectId = dto.subjectId;
      progress.topicId = dto.topicId;
      progress.masteryPercent = 0;
      progress.attempts = 0;
      progress.correctAttempts = 0;
      progress.completed = false;
      progress.recommendedAction = 'LEARN';
    }

    progress.examinationType = dto.examinationType;
    progress.attempts += 1;

    if (dto.correct) {
      progress.correctAttempts += 1;
      progress.masteryPercent = Math.min(
        100,
        Number(progress.masteryPercent) + dto.masteryDelta,
      );
    } else {
      progress.masteryPercent = Math.max(
        0,
        Number(progress.masteryPercent) - Math.min(dto.masteryDelta, 10),
      );
    }

    progress.masteryPercent = Number(
      Number(progress.masteryPercent).toFixed(2),
    );

    progress.completed = progress.masteryPercent >= 90;
    progress.recommendedAction =
      this.resolveAction(progress.masteryPercent);

    const saved = await this.repository.save(progress);

    return {
      learnerId: saved.learnerId,
      examinationType: saved.examinationType,
      subjectId: saved.subjectId,
      topicId: saved.topicId,
      masteryPercent: Number(saved.masteryPercent),
      previousMasteryPercent: previousMastery,
      attempts: saved.attempts,
      correctAttempts: saved.correctAttempts,
      completed: saved.completed,
      recommendedAction:
        saved.recommendedAction as MasteryAction,
      updatedAt: saved.updatedAt?.toISOString() ?? new Date().toISOString(),
    };
  }

  async getLearnerProgress(
    learnerId: string,
  ): Promise<LearningProgressSnapshot[]> {
    const rows = await this.repository.findByLearner(learnerId);

    return rows.map((row) => ({
      learnerId: row.learnerId,
      examinationType: row.examinationType,
      subjectId: row.subjectId,
      topicId: row.topicId,
      masteryPercent: Number(row.masteryPercent),
      previousMasteryPercent: Number(row.masteryPercent),
      attempts: row.attempts,
      correctAttempts: row.correctAttempts,
      completed: row.completed,
      recommendedAction:
        row.recommendedAction as MasteryAction,
      updatedAt: row.updatedAt?.toISOString() ?? new Date().toISOString(),
    }));
  }

  private resolveAction(mastery: number): MasteryAction {
    if (mastery < 40) return 'LEARN';
    if (mastery < 65) return 'PRACTICE';
    if (mastery < 80) return 'DRILL';
    if (mastery < 90) return 'ASSESS';
    return 'REVIEW';
  }

  /*
   * Explicit integration boundary.
   *
   * The progress engine owns learner state.
   * The existing Sprint-26 learning-path engine remains the
   * authoritative path-generation mechanism.
   *
   * This method converts persisted progress into the exact
   * Sprint-26 runtime directive contract.
   */
  buildRuntimeDirective(
    learnerId: string,
    examinationType: string,
    subjects: {
      subjectId: string;
      topics: {
        topicId: string;
        masteryPercent: number;
      }[];
    }[],
  ) {
    const path = this.learningPathService.generate({
      learnerId,
      examinationType,
      subjects,
    });

    return this.runtimeDirectiveService.create({
      learningPath: path,
    });
  }
}
