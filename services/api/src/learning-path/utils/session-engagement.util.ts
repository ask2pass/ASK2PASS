import { ENGAGEMENT_CONSTANTS } from '../constants/engagement.constants';
import { AAT_INTERACTION_CONSTANTS } from '../constants/aat-interaction.constants';
import { EngagementStatus } from '../enums/engagement-status.enum';
import { SessionPhase } from '../enums/session-phase.enum';
import { shouldAutoLogout } from './aat-engagement.util';

export function buildSessionEngagementState(
  sessionId: string,
  learnerId: string,
  learnerFirstName: string,
  phase: SessionPhase,
  consecutiveMissedChecks: number,
): {
  sessionId: string;
  learnerId: string;
  learnerFirstName: string;
  phase: SessionPhase;
  engagementStatus: EngagementStatus;
  consecutiveMissedChecks: number;
  nextCheckInSeconds: number;
  autoLoggedOut: boolean;
  dailyStarEligible: boolean;
  requiresInterruptionResponse: boolean;
} {
  const autoLoggedOut =
    shouldAutoLogout(consecutiveMissedChecks);

  const engagementStatus = autoLoggedOut
    ? EngagementStatus.AUTO_LOGGED_OUT
    : consecutiveMissedChecks > 0
      ? EngagementStatus.FOLLOW_UP
      : EngagementStatus.RESPONSIVE;

  return {
    sessionId,
    learnerId,
    learnerFirstName,
    phase,
    engagementStatus,
    consecutiveMissedChecks,
    nextCheckInSeconds:
      consecutiveMissedChecks === 0
        ? ENGAGEMENT_CONSTANTS.REGULAR_CHECK_INTERVAL_SECONDS
        : ENGAGEMENT_CONSTANTS.FOLLOW_UP_CHECK_INTERVAL_SECONDS,
    autoLoggedOut,
    dailyStarEligible: !autoLoggedOut,
    requiresInterruptionResponse:
      autoLoggedOut &&
      AAT_INTERACTION_CONSTANTS.ASK_REASON_AFTER_AUTO_LOGOUT,
  };
}
