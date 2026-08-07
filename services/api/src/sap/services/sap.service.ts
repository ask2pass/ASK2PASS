import { Injectable } from '@nestjs/common';
import { SAPAssessmentRepository } from '../repositories/sap-assessment.repository';
import { SAPLearningProfileRepository } from '../repositories/sap-learning-profile.repository';

import { SAP_CONSTANTS } from '../constants/sap.constants';

import { AssessmentSyncStatus } from '../enums/assessment-sync-status.enum';
import { AssessmentType } from '../enums/assessment-type.enum';
import { MasteryStatus } from '../enums/mastery-status.enum';
import { SAPState } from '../enums/sap-state.enum';

import { SAPAssessment } from '../interfaces/sap-assessment.interface';
import { SAPContext } from '../interfaces/sap-context.interface';
import { SAPLearningProfile } from '../interfaces/sap-profile.interface';
import { SAPLearningProfileEntity } from '../entities/sap-learning-profile.entity';
import { SAPAssessmentEntity } from '../entities/sap-assessment.entity';
import { SAPResult } from '../interfaces/sap-result.interface';

@Injectable()
export class SAPService {
  constructor(
    private readonly assessmentRepository: SAPAssessmentRepository,
    private readonly profileRepository: SAPLearningProfileRepository,
  ) {}

  getPolicy() {
    return {
      sapEnabled:
        SAP_CONSTANTS.SAP_ENABLED,

      offlineFirst:
        SAP_CONSTANTS.OFFLINE_FIRST,

      assessmentRequired:
        SAP_CONSTANTS.ASSESSMENT_REQUIRED,

      baselineAssessmentRequired:
        SAP_CONSTANTS.BASELINE_ASSESSMENT_REQUIRED,

      continuousAssessment:
        SAP_CONSTANTS.CONTINUOUS_ASSESSMENT_SUPPORTED,

      learningProfileRequired:
        SAP_CONSTANTS.LEARNING_PROFILE_REQUIRED,

      competencyTracking:
        SAP_CONSTANTS.COMPETENCY_TRACKING_REQUIRED,

      masteryTracking:
        SAP_CONSTANTS.MASTERY_TRACKING_REQUIRED,

      learningGapAnalysis:
        SAP_CONSTANTS.LEARNING_GAP_ANALYSIS_REQUIRED,

      personalizedPath:
        SAP_CONSTANTS.PERSONALIZED_PATH_REQUIRED,

      intervention:
        SAP_CONSTANTS.INTERVENTION_SUPPORTED,

      progressTracking:
        SAP_CONSTANTS.PROGRESS_TRACKING_REQUIRED,

      reporting:
        SAP_CONSTANTS.REPORTING_REQUIRED,

      persistenceRequired:
        SAP_CONSTANTS.PERSISTENCE_REQUIRED,

      learningEngineBinding:
        SAP_CONSTANTS.LEARNING_ENGINE_BINDING_REQUIRED,

      sessionBinding:
        SAP_CONSTANTS.SESSION_BINDING_REQUIRED,

      cbtBinding:
        SAP_CONSTANTS.CBT_BINDING_SUPPORTED,

      offlineAssessment:
        SAP_CONSTANTS.OFFLINE_ASSESSMENT_SUPPORTED,

      syncPending:
        SAP_CONSTANTS.SYNC_PENDING_SUPPORTED,

      minimumMasteryScore:
        SAP_CONSTANTS.MIN_MASTERY_SCORE,
    };
  }

  initialize(
    data: Partial<SAPContext>,
  ): SAPContext {
    const now = new Date();

    return {
      learnerId:
        data.learnerId ?? '',

      sessionId:
        data.sessionId ?? null,

      lessonId:
        data.lessonId ?? null,

      classLevel:
        data.classLevel ?? '',

      subject:
        data.subject ?? '',

      topic:
        data.topic ?? '',

      state:
        SAPState.INITIALIZED,

      baselineScore:
        data.baselineScore ?? null,

      latestScore:
        data.latestScore ?? null,

      masteryScore:
        Math.max(
          0,
          Math.min(
            100,
            Number(data.masteryScore) || 0,
          ),
        ),

      competencyLevel:
        Math.max(
          0,
          Math.min(
            100,
            Number(data.competencyLevel) || 0,
          ),
        ),

      learningGapScore:
        Math.max(
          0,
          Math.min(
            100,
            Number(data.learningGapScore) || 0,
          ),
        ),

      interventionRequired:
        data.interventionRequired ?? false,

      personalizedPathRequired:
        data.personalizedPathRequired ?? true,

      assessmentCount:
        Math.max(
          0,
          Number(data.assessmentCount) || 0,
        ),

      offlineAvailable:
        data.offlineAvailable ?? true,

      persistenceReady:
        data.persistenceReady ?? false,

      learningEngineBound:
        data.learningEngineBound ?? false,

      sessionBound:
        data.sessionBound ?? false,

      syncPending:
        data.syncPending ?? false,

      updatedAt:
        now,
    };
  }

  prepareBaseline(
    context: SAPContext,
  ): SAPContext {
    if (!context.learnerId) {
      return this.block(
        context,
      );
    }

    return {
      ...context,
      state:
        SAPState.BASELINE_REQUIRED,
      updatedAt:
        new Date(),
    };
  }

  startAssessment(
    context: SAPContext,
  ): SAPContext {
    if (
      !context.learnerId ||
      !context.persistenceReady
    ) {
      return this.block(
        context,
      );
    }

    return {
      ...context,
      state:
        SAPState.ASSESSMENT_ACTIVE,
      updatedAt:
        new Date(),
    };
  }

  recordAssessment(
    context: SAPContext,
    score: number,
    maxScore: number = SAP_CONSTANTS.MAX_ASSESSMENT_SCORE,
    type: AssessmentType = AssessmentType.FORMATIVE,
  ): {
    context: SAPContext;
    assessment: SAPAssessment;
  } {
    const safeMax =
      Math.max(
        1,
        Number(maxScore) || 1,
      );

    const safeScore =
      Math.max(
        0,
        Math.min(
          safeMax,
          Number(score) || 0,
        ),
      );

    const percentage =
      Math.round(
        (safeScore / safeMax) * 100,
      );

    const now = new Date();

    const assessment: SAPAssessment = {
      assessmentId:
        `sap-assessment-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,

      learnerId:
        context.learnerId,

      sessionId:
        context.sessionId,

      lessonId:
        context.lessonId,

      classLevel:
        context.classLevel,

      subject:
        context.subject,

      topic:
        context.topic,

      assessmentType:
        type,

      score:
        safeScore,

      maxScore:
        safeMax,

      percentage,

      completed:
        true,

      offline:
        context.offlineAvailable,

      syncStatus:
        context.offlineAvailable
          ? AssessmentSyncStatus.SYNC_PENDING
          : AssessmentSyncStatus.LOCAL,

      createdAt:
        now,

      updatedAt:
        now,
    };

    void this.assessmentRepository.create({
      learnerId: assessment.learnerId,
      sessionId: assessment.sessionId,
      lessonId: assessment.lessonId,
      classLevel: assessment.classLevel,
      subject: assessment.subject,
      topic: assessment.topic,
      assessmentType: assessment.assessmentType,
      score: assessment.score,
      maxScore: assessment.maxScore,
      percentage: assessment.percentage,
      completed: assessment.completed,
      offline: assessment.offline,
      syncStatus: assessment.syncStatus,
    });

    const nextContext =
      this.applyAssessment(
        context,
        percentage,
        type,
      );

    return {
      context:
        nextContext,

      assessment,
    };
  }

  completeAssessment(
    context: SAPContext,
  ): SAPContext {
    return {
      ...context,

      state:
        SAPState.ASSESSMENT_COMPLETED,

      updatedAt:
        new Date(),
    };
  }

  async getProfile(
    learnerId: string,
    subject?: string,
    topic?: string,
  ): Promise<SAPLearningProfileEntity | null> {
    if (!subject || !topic) {
      return null;
    }

    return this.profileRepository.find(
      learnerId,
      subject,
      topic,
    );
  }

  async getAssessments(
    learnerId: string,
  ): Promise<SAPAssessmentEntity[]> {
    return this.assessmentRepository.findByLearner(
      learnerId,
    );
  }

  evaluateMastery(
    context: SAPContext,
  ): SAPContext {
    const masteryScore =
      context.latestScore ??
      context.masteryScore;

    const masteryStatus =
      this.resolveMasteryStatus(
        masteryScore,
      );

    return {
      ...context,

      masteryScore,

      state:
        masteryStatus === MasteryStatus.MASTERED
          ? SAPState.MASTERY_REACHED
          : SAPState.PROGRESS_TRACKING,

      interventionRequired:
        masteryStatus !== MasteryStatus.MASTERED,

      personalizedPathRequired:
        masteryStatus !== MasteryStatus.MASTERED,

      updatedAt:
        new Date(),
    };
  }

  result(
    context: SAPContext,
    assessmentId: string | null = null,
    success = true,
    reason: string | null = null,
  ): SAPResult {
    const masteryStatus =
      this.resolveMasteryStatus(
        context.masteryScore,
      );

    return {
      success,

      state:
        context.state,

      learnerId:
        context.learnerId,

      assessmentId,

      score:
        context.latestScore ?? 0,

      percentage:
        context.latestScore ?? 0,

      masteryScore:
        context.masteryScore,

      masteryStatus,

      competencyLevel:
        context.competencyLevel,

      learningGapScore:
        context.learningGapScore,

      interventionRequired:
        context.interventionRequired,

      personalizedPathRequired:
        context.personalizedPathRequired,

      assessmentCount:
        context.assessmentCount,

      offlineAvailable:
        context.offlineAvailable,

      syncPending:
        context.syncPending,

      reason,

      updatedAt:
        context.updatedAt,
    };
  }

  async markSynced(
    learnerId: string,
    assessmentId: string,
  ): Promise<SAPAssessmentEntity | null> {
    return this.assessmentRepository.markSynced(
      assessmentId,
    );
  }

  private applyAssessment(
    context: SAPContext,
    percentage: number,
    type: AssessmentType,
  ): SAPContext {
    const previousScore =
      context.latestScore;

    const baselineScore =
      context.baselineScore ??
      (
        type === AssessmentType.BASELINE
          ? percentage
          : null
      );

    const learningGapScore =
      Math.max(
        0,
        100 - percentage,
      );

    const competencyLevel =
      percentage;

    const masteryScore =
      percentage;

    const nextContext: SAPContext = {
      ...context,

      state:
        SAPState.ASSESSMENT_COMPLETED,

      baselineScore,

      latestScore:
        percentage,

      masteryScore,

      competencyLevel,

      learningGapScore,

      interventionRequired:
        percentage <
        SAP_CONSTANTS.MIN_MASTERY_SCORE,

      personalizedPathRequired:
        percentage <
        SAP_CONSTANTS.MIN_MASTERY_SCORE,

      assessmentCount:
        context.assessmentCount + 1,

      syncPending:
        context.offlineAvailable,

      updatedAt:
        new Date(),
    };

    if (
      previousScore !== null &&
      percentage >=
        SAP_CONSTANTS.MIN_MASTERY_SCORE
    ) {
      nextContext.state =
        SAPState.PROGRESS_TRACKING;
    }

    void this.profileRepository.save({
      learnerId: context.learnerId,
      classLevel: context.classLevel,
      subject: context.subject,
      topic: context.topic,
      baselineScore,
      latestScore: percentage,
      masteryScore,
      masteryStatus: this.resolveMasteryStatus(masteryScore),
      competencyLevel,
      learningGapScore,
      interventionRequired: nextContext.interventionRequired,
      personalizedPathRequired: nextContext.personalizedPathRequired,
      assessmentCount: nextContext.assessmentCount,
    });

    return nextContext;
  }

  private resolveMasteryStatus(
    score: number,
  ): MasteryStatus {
    if (
      score >=
      SAP_CONSTANTS.MIN_MASTERY_SCORE
    ) {
      return MasteryStatus.MASTERED;
    }

    if (score >= 60) {
      return MasteryStatus.APPROACHING;
    }

    if (score >= 40) {
      return MasteryStatus.DEVELOPING;
    }

    return MasteryStatus.NOT_ASSESSED;
  }

  private block(
    context: SAPContext,
  ): SAPContext {
    return {
      ...context,

      state:
        SAPState.BLOCKED,

      updatedAt:
        new Date(),
    };
  }
}
