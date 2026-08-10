import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';
import { CEDMQuestionSource } from '../interfaces/cedm-question-source.interface';
import { CEDMSimulationProfile } from '../interfaces/cedm-simulation-profile.interface';
import { CEDMResult, CEDMTopicResult } from '../interfaces/cedm-result.interface';
import { CEDMSession } from '../interfaces/cedm-session.interface';
import { CEDMPersistenceRepository } from '../repositories/cedm-persistence.repository';
import { Optional } from '@nestjs/common';

@Injectable()
export class CEDMService {
  constructor(
    @Optional()
    private readonly persistence?: CEDMPersistenceRepository,
  ) {}

  private readonly masteryThresholdPercent = 65;
  private readonly minimumTopics = 5;

  validateQuestionSource(source: CEDMQuestionSource): boolean {
    if (source.sourceType === CEDMQuestionSourceType.LICENSED_PAST_QUESTION) {
      return (
        source.licensed === true &&
        source.sourceVerified === true &&
        source.generated === false &&
        source.examinationYear !== undefined &&
        source.examinationYear >= 2018 &&
        source.examinationYear <= 2026
      );
    }

    if (source.sourceType === CEDMQuestionSourceType.AI_SIMULATED) {
      return (
        source.licensed === false &&
        source.generated === true &&
        source.sourceVerified === true
      );
    }

    if (source.sourceType === CEDMQuestionSourceType.HYBRID) {
      return source.sourceVerified === true;
    }

    return false;
  }

  resolveQuestionSource(
    requested: CEDMQuestionSourceType,
    licensedBankAvailable: boolean,
  ): CEDMQuestionSourceType {
    if (
      requested === CEDMQuestionSourceType.LICENSED_PAST_QUESTION &&
      !licensedBankAvailable
    ) {
      return CEDMQuestionSourceType.AI_SIMULATED;
    }

    if (
      requested === CEDMQuestionSourceType.HYBRID &&
      !licensedBankAvailable
    ) {
      return CEDMQuestionSourceType.AI_SIMULATED;
    }

    return requested;
  }

  startSession(
    learnerId: string,
    examinationType: CEDMExaminationType,
    subjectId: string,
    topicIds: string[],
    adaptiveMode: CEDMAdaptiveMode,
    questionSourceType: CEDMQuestionSourceType,
    licensedBankAvailable = false,
  ): CEDMSession {
    const uniqueTopics = [...new Set(topicIds)];

    if (uniqueTopics.length < this.minimumTopics) {
      throw new BadRequestException(
        `CEDM requires a minimum of ${this.minimumTopics} topics per subject.`,
      );
    }

    return {
      sessionId: randomUUID(),
      learnerId,
      examinationType,
      subjectId,
      topicIds: uniqueTopics,
      adaptiveMode,
      questionSourceType: this.resolveQuestionSource(
        questionSourceType,
        licensedBankAvailable,
      ),
      status: CEDMSessionStatus.ACTIVE,
      currentTopicIndex: 0,
      scorePercent: 0,
      masteryThresholdPercent: this.masteryThresholdPercent,
      continuationRequired: true,
    };
  }

  buildSimulationProfile(
    examinationType: CEDMExaminationType,
    subjectId: string,
    topicId: string,
    objective: string,
    difficulty: 'EASY' | 'STANDARD' | 'ADVANCED',
    questionCount: number,
  ): CEDMSimulationProfile {
    if (questionCount <= 0) {
      throw new BadRequestException('Question count must be greater than zero.');
    }

    return {
      examinationType,
      subjectId,
      topicId,
      objective,
      difficulty,
      questionCount,
      examinationStandard: `${examinationType} examination-standard simulation`,
    };
  }

  calculateTopicScore(attempted: number, correct: number): number {
    if (attempted <= 0) return 0;

    if (correct < 0 || correct > attempted) {
      throw new BadRequestException(
        'Correct answers must be within attempted questions.',
      );
    }

    return Number(((correct / attempted) * 100).toFixed(2));
  }

  evaluateMastery(scorePercent: number): boolean {
    return scorePercent > this.masteryThresholdPercent;
  }

  shouldAdapt(
    scorePercent: number,
    adaptiveMode: CEDMAdaptiveMode,
  ): boolean {
    return (
      scorePercent <= this.masteryThresholdPercent &&
      adaptiveMode !== CEDMAdaptiveMode.PROGRESSIVE
    );
  }

  buildTopicResult(
    topicId: string,
    attempted: number,
    correct: number,
  ): CEDMTopicResult {
    const scorePercent = this.calculateTopicScore(attempted, correct);

    return {
      topicId,
      attempted,
      correct,
      scorePercent,
      masteryReached: this.evaluateMastery(scorePercent),
    };
  }

  buildResult(
    session: CEDMSession,
    topics: CEDMTopicResult[],
    adaptiveInterventionUsed: boolean,
  ): CEDMResult {
    const overallScorePercent =
      topics.length === 0
        ? 0
        : Number(
            (
              topics.reduce((sum, topic) => sum + topic.scorePercent, 0) /
              topics.length
            ).toFixed(2),
          );

    const weakTopics = topics
      .filter((topic) => !topic.masteryReached)
      .map((topic) => topic.topicId);

    return {
      sessionId: session.sessionId,
      learnerId: session.learnerId,
      examinationType: session.examinationType,
      subjectId: session.subjectId,
      questionSourceType: session.questionSourceType,
      topics,
      overallScorePercent,
      masteryThresholdPercent: this.masteryThresholdPercent,
      progressionAllowed: this.evaluateMastery(overallScorePercent),
      adaptiveInterventionUsed,
      weakTopics,
      completed: topics.length === session.topicIds.length,
    };
  }


  async persistSession(session: CEDMSession): Promise<void> {
    if (!this.persistence) return;

    await this.persistence.saveSession({
      id: session.sessionId,
      learnerId: session.learnerId,
      examinationType: session.examinationType,
      subjectId: session.subjectId,
      topicIds: session.topicIds,
      adaptiveMode: session.adaptiveMode,
      questionSourceType: session.questionSourceType,
      status: session.status,
      currentTopicIndex: session.currentTopicIndex,
      scorePercent: session.scorePercent,
      masteryThresholdPercent: session.masteryThresholdPercent,
      continuationRequired: session.continuationRequired,
    });
  }

  async loadPersistedSession(sessionId: string): Promise<CEDMSession | null> {
    if (!this.persistence) return null;

    const entity = await this.persistence.findSession(sessionId);
    if (!entity) return null;

    return {
      sessionId: entity.id,
      learnerId: entity.learnerId,
      examinationType: entity.examinationType,
      subjectId: entity.subjectId,
      topicIds: entity.topicIds,
      adaptiveMode: entity.adaptiveMode,
      questionSourceType: entity.questionSourceType,
      status: entity.status,
      currentTopicIndex: entity.currentTopicIndex,
      scorePercent: Number(entity.scorePercent),
      masteryThresholdPercent: Number(entity.masteryThresholdPercent),
      continuationRequired: entity.continuationRequired,
    };
  }

  pauseSession(session: CEDMSession): CEDMSession {
    return {
      ...session,
      status: CEDMSessionStatus.PAUSED,
      continuationRequired: true,
    };
  }

  resumeSession(session: CEDMSession): CEDMSession {
    if (session.status === CEDMSessionStatus.COMPLETED) {
      throw new BadRequestException('Completed CEDM sessions cannot be resumed.');
    }

    return {
      ...session,
      status: CEDMSessionStatus.ACTIVE,
      continuationRequired: true,
    };
  }

  completeSession(session: CEDMSession): CEDMSession {
    return {
      ...session,
      status: CEDMSessionStatus.COMPLETED,
      continuationRequired: true,
    };
  }

  canProgressFromTopic(
    scorePercent: number,
    adaptiveMode: CEDMAdaptiveMode,
  ): boolean {
    if (scorePercent > this.masteryThresholdPercent) {
      return true;
    }

    /*
     * A learner must NOT be permanently trapped at 65%.
     * Adaptive modes intervene below or at the threshold and
     * provide another learning route before progression.
     */
    return adaptiveMode === CEDMAdaptiveMode.GUIDED ||
      adaptiveMode === CEDMAdaptiveMode.REMEDIATION;
  }

  getNextAdaptiveAction(
    scorePercent: number,
    adaptiveMode: CEDMAdaptiveMode,
  ): string {
    if (scorePercent > this.masteryThresholdPercent) {
      return 'PROGRESS_TO_NEXT_TOPIC';
    }

    switch (adaptiveMode) {
      case CEDMAdaptiveMode.GUIDED:
        return 'GUIDED_RETRY_WITH_TARGETED_PRACTICE';

      case CEDMAdaptiveMode.REMEDIATION:
        return 'REMEDIATION_WITH_WEAK_AREA_RETEACHING';

      case CEDMAdaptiveMode.PROGRESSIVE:
        return 'PROGRESSIVE_REASSESSMENT';

      default:
        return 'ADAPTIVE_REASSESSMENT';
    }
  }

  validateTopicSelection(topicIds: string[]): boolean {
    return [...new Set(topicIds)].length >= this.minimumTopics;
  }

  validatePastQuestionYear(year: number): boolean {
    return Number.isInteger(year) && year >= 2018 && year <= 2026;
  }

  isCEDMContinuationRequired(session: CEDMSession): boolean {
    return session.continuationRequired === true &&
      session.status !== CEDMSessionStatus.COMPLETED;
  }

  explainProgressionRule(): string {
    return (
      'CEDM mastery is above 65%. Adaptive remediation, guided practice, ' +
      'and progressive difficulty are available so the learner is not ' +
      'unnecessarily trapped at the 65% boundary.'
    );
  }
}
