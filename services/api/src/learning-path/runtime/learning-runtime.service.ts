import { Injectable } from '@nestjs/common';

import { SessionPhase } from '../enums/session-phase.enum';
import { buildSessionEngagementState } from '../utils/session-engagement.util';
import { evaluateDailyStreak } from '../utils/streak-evaluation.util';
import { makeRecoveryDecision } from '../utils/recovery-decision.util';
import { AAT_INTERACTION_CONSTANTS } from '../constants/aat-interaction.constants';

import {
  LearningRuntimeRequest,
  LearningRuntimeResult,
} from './learning-runtime.interface';

@Injectable()
export class LearningRuntimeService {
  run(
    request: LearningRuntimeRequest,
  ): LearningRuntimeResult {
    const missedChecks = Math.max(
      0,
      request.consecutiveMissedChecks,
    );

    const engagement = buildSessionEngagementState(
      request.sessionId,
      request.learnerId,
      request.learnerFirstName,
      request.phase,
      missedChecks,
    );

    const remainingRecoverySubjects = Math.max(
      0,
      request.outstandingRecoverySubjects ?? 0,
    );

    const spreadDays = Math.max(
      0,
      request.spreadDays ?? 0,
    );

    const remainingTermDays = Math.max(
      0,
      request.remainingTermDays ?? 0,
    );

    const recoveryDecision =
      remainingRecoverySubjects > 0
        ? makeRecoveryDecision(
            remainingRecoverySubjects,
            spreadDays,
            remainingTermDays,
          )
        : {
            approved: true,
            reason: null,
            recoverySubjectsPerDay: [],
            totalSubjectsPerDay: [],
          };

    const streak = evaluateDailyStreak(
      request.learnerId,
      request.chartDate,
      request.requiredSubjectCount,
      request.completedSubjectCount,
      request.autoLogoutOccurred || engagement.autoLoggedOut,
    );

    const interruptionRequired =
      engagement.autoLoggedOut &&
      AAT_INTERACTION_CONSTANTS.ASK_REASON_AFTER_AUTO_LOGOUT;

    const messageKey = interruptionRequired
      ? 'AAT_AUTO_LOGOUT_REASON_AND_DISTRACTION'
      : 'AAT_LEARNING_CHECK_IN';

    const message = interruptionRequired
      ? `Hi ${request.learnerFirstName}, we noticed you left your learning session. What happened, and what distracted you from your learning?`
      : `Hi ${request.learnerFirstName}, are you ready to continue your learning session?`;

    return {
      learnerId: request.learnerId,
      learnerFirstName: request.learnerFirstName,
      academicTermId: request.academicTermId,
      chartDate: request.chartDate,
      sessionId: request.sessionId,
      phase: request.phase,
      engagement: {
        consecutiveMissedChecks:
          engagement.consecutiveMissedChecks,
        autoLoggedOut: engagement.autoLoggedOut,
        dailyStarEligible:
          engagement.dailyStarEligible,
        requiresInterruptionResponse:
          interruptionRequired,
        nextCheckInSeconds:
          engagement.nextCheckInSeconds,
      },
      recovery: {
        active: remainingRecoverySubjects > 0,
        approved: recoveryDecision.approved,
        remainingRecoverySubjects,
        spreadDays,
        reason: recoveryDecision.reason,
      },
      streak: {
        requiredSubjectCount:
          streak.requiredSubjectCount,
        completedSubjectCount:
          streak.completedSubjectCount,
        autoLogoutOccurred:
          streak.autoLogoutOccurred,
        dailyStarEligible:
          streak.dailyStarEligible,
        earnedStars:
          streak.earnedStars,
      },
      aat: {
        personalized: true,
        messageKey,
        message,
        asksReason:
          interruptionRequired &&
          AAT_INTERACTION_CONSTANTS.ASK_REASON_AFTER_AUTO_LOGOUT,
        asksDistraction:
          interruptionRequired &&
          AAT_INTERACTION_CONSTANTS.ASK_DISTRACTION_AFTER_AUTO_LOGOUT,
      },
    };
  }
}
