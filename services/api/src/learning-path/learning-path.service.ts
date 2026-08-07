import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LearningPath } from './entities/learning-path.entity';
import { DailySubjectChart } from './entities/daily-subject-chart.entity';
import { LearningSession } from './entities/learning-session.entity';

import { SessionPhase } from './enums/session-phase.enum';
import { SessionStatus } from './enums/session-status.enum';
import { EngagementStatus } from './enums/engagement-status.enum';

import { getSessionPhase } from './utils/session-progress.util';
import { isDailyStarEligible } from './utils/star-eligibility.util';
import { shouldAutoLogout } from './utils/aat-engagement.util';
import { evaluateDailyStreak } from './utils/streak-evaluation.util';
import { buildAATInterruptionResponse } from './utils/aat-interruption.util';
import { buildSessionEngagementState } from './utils/session-engagement.util';
import { buildDSCOrchestration } from './utils/dsc-orchestration.util';
import { makeRecoveryDecision } from './utils/recovery-decision.util';
import { isEligibleForAward } from './utils/award-eligibility.util';
import { LEARNING_CONSTANTS } from './constants/learning.constants';

import { SessionProgress } from './interfaces/session-progress.interface';
import { AATEngagementResult } from './interfaces/aat-engagement-result.interface';
import { StreakEvaluation } from './interfaces/streak-evaluation.interface';
import { AATInterruptionResponse } from './interfaces/aat-interruption-response.interface';

@Injectable()
export class LearningPathService {
  constructor(
    @InjectRepository(LearningPath)
    private readonly learningPathRepository: Repository<LearningPath>,

    @InjectRepository(DailySubjectChart)
    private readonly dailySubjectChartRepository: Repository<DailySubjectChart>,

    @InjectRepository(LearningSession)
    private readonly learningSessionRepository: Repository<LearningSession>,
  ) {}

  async getLearningPath(
    learnerId: string,
    academicTermId: string,
  ): Promise<LearningPath> {
    const learningPath =
      await this.learningPathRepository.findOne({
        where: {
          learnerId,
          academicTermId,
          active: true,
        },
      });

    if (!learningPath) {
      throw new NotFoundException(
        'Active learning path not found for learner and academic term.',
      );
    }

    return learningPath;
  }

  async getDailySubjectChart(
    chartId: string,
  ): Promise<DailySubjectChart> {
    const chart =
      await this.dailySubjectChartRepository.findOne({
        where: { id: chartId },
      });

    if (!chart) {
      throw new NotFoundException(
        `Daily Subject Chart ${chartId} not found.`,
      );
    }

    return chart;
  }

  async getLearningSession(
    sessionId: string,
  ): Promise<LearningSession> {
    const session =
      await this.learningSessionRepository.findOne({
        where: { id: sessionId },
      });

    if (!session) {
      throw new NotFoundException(
        `Learning session ${sessionId} not found.`,
      );
    }

    return session;
  }

  async updateProgress(
    sessionId: string,
    lessonElapsedSeconds: number,
    revisionElapsedSeconds: number,
    quizCompleted: boolean,
  ): Promise<SessionProgress> {
    const session =
      await this.getLearningSession(sessionId);

    const safeLessonElapsedSeconds = Math.max(
      0,
      lessonElapsedSeconds,
    );

    const safeRevisionElapsedSeconds = Math.max(
      0,
      revisionElapsedSeconds,
    );

    const phase = getSessionPhase(
      safeLessonElapsedSeconds,
      safeRevisionElapsedSeconds,
      quizCompleted,
    );

    session.status =
      phase === SessionPhase.LESSON
        ? SessionStatus.IN_PROGRESS
        : phase === SessionPhase.REVISION
          ? SessionStatus.REVISION
          : phase === SessionPhase.CBT_QUIZ
            ? SessionStatus.QUIZ
            : phase === SessionPhase.COMPLETED
              ? SessionStatus.COMPLETED
              : SessionStatus.INTERRUPTED;

    if (
      phase === SessionPhase.COMPLETED &&
      !session.completedAt
    ) {
      session.completedAt = new Date();
    }

    await this.learningSessionRepository.save(session);

    return {
      sessionId: session.id,
      phase,
      lessonElapsedSeconds: safeLessonElapsedSeconds,
      revisionElapsedSeconds: safeRevisionElapsedSeconds,
      quizElapsedSeconds: quizCompleted ? 600 : 0,
      quizCompleted,
      lessonCompleted:
        safeLessonElapsedSeconds >= 25 * 60,
      sessionCompleted:
        phase === SessionPhase.COMPLETED,
      autoLoggedOut: false,
    };
  }

  async processEngagement(
    sessionId: string,
    consecutiveMissedChecks: number,
  ): Promise<AATEngagementResult> {
    const session =
      await this.getLearningSession(sessionId);

    const missedChecks = Math.max(
      0,
      consecutiveMissedChecks,
    );

    session.missedEngagementChecks = missedChecks;

    const autoLoggedOut =
      shouldAutoLogout(missedChecks);

    if (autoLoggedOut) {
      session.status = SessionStatus.INTERRUPTED;

      await this.learningSessionRepository.save(
        session,
      );

      return {
        sessionId: session.id,
        status: EngagementStatus.AUTO_LOGGED_OUT,
        consecutiveMissedChecks: missedChecks,
        autoLoggedOut: true,
        dailyStarEligible:
          isDailyStarEligible(true),
      };
    }

    await this.learningSessionRepository.save(
      session,
    );

    return {
      sessionId: session.id,
      status:
        missedChecks > 0
          ? EngagementStatus.FOLLOW_UP
          : EngagementStatus.RESPONSIVE,
      consecutiveMissedChecks: missedChecks,
      autoLoggedOut: false,
      dailyStarEligible: true,
    };
  }


  buildEngagementState(
    sessionId: string,
    learnerId: string,
    learnerFirstName: string,
    phase: SessionPhase,
    consecutiveMissedChecks: number,
  ) {
    return buildSessionEngagementState(
      sessionId,
      learnerId,
      learnerFirstName,
      phase,
      consecutiveMissedChecks,
    );
  }

  buildDSC(
    learnerId: string,
    academicTermId: string,
    chartDate: string,
    defaultSubjects: any[],
    recoverySubjects: any[],
    requestedSubjectCount: number,
    remainingTermDays: number,
    outstandingRecoverySubjects: number,
    spreadDays: number,
  ) {
    return buildDSCOrchestration(
      learnerId,
      academicTermId,
      chartDate,
      defaultSubjects,
      recoverySubjects,
      requestedSubjectCount,
      remainingTermDays,
      outstandingRecoverySubjects,
      spreadDays,
    );
  }

  decideRecoverySpread(
    remainingRecoverySubjects: number,
    spreadDays: number,
    remainingTermDays: number,
  ) {
    return makeRecoveryDecision(
      remainingRecoverySubjects,
      spreadDays,
      remainingTermDays,
    );
  }

  evaluateAwardEligibility(
    academicPerformancePercent: number,
  ): boolean {
    return isEligibleForAward(academicPerformancePercent);
  }

  getLearningPolicy() {
    return {
      defaultDailySubjects:
        LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
      allowedDailySubjectCounts:
        LEARNING_CONSTANTS.VALID_DSC_SUBJECTS,
      maximumDailySubjects:
        LEARNING_CONSTANTS.MAX_DSC_SUBJECTS,
      lessonDurationMinutes:
        LEARNING_CONSTANTS.LESSON_DURATION_MINUTES,
      revisionDurationMinutes:
        LEARNING_CONSTANTS.REVISION_DURATION_MINUTES,
      quizDurationMinutes:
        LEARNING_CONSTANTS.QUIZ_DURATION_MINUTES,
      engagementCheckIntervalSeconds: 300,
      followUpCheckIntervalSeconds: 10,
      autoLogoutAfterMissedChecks: 3,
      starForfeitOnAutoLogout: true,
      minimumAwardAcademicScorePercent: 80,
    };
  }

  evaluateStreak(
    learnerId: string,
    chartDate: string,
    requiredSubjectCount: number,
    completedSubjectCount: number,
    autoLogoutOccurred: boolean,
  ): StreakEvaluation {
    return evaluateDailyStreak(
      learnerId,
      chartDate,
      requiredSubjectCount,
      completedSubjectCount,
      autoLogoutOccurred,
    );
  }

  buildInterruptionResponse(
    sessionId: string,
    learnerId: string,
    learnerFirstName: string,
    autoLoggedOut: boolean,
  ): AATInterruptionResponse {
    return buildAATInterruptionResponse(
      sessionId,
      learnerId,
      learnerFirstName,
      autoLoggedOut,
    );
  }
}
