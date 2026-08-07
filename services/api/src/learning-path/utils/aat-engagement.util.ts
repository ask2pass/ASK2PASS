import { ENGAGEMENT_CONSTANTS } from '../constants/engagement.constants';

export function getAATCheckIntervalSeconds(
  consecutiveMissedChecks: number,
): number {
  return consecutiveMissedChecks === 0
    ? ENGAGEMENT_CONSTANTS.REGULAR_CHECK_INTERVAL_SECONDS
    : ENGAGEMENT_CONSTANTS.FOLLOW_UP_CHECK_INTERVAL_SECONDS;
}

export function shouldAutoLogout(
  consecutiveMissedChecks: number,
): boolean {
  return (
    consecutiveMissedChecks >=
    ENGAGEMENT_CONSTANTS.MAX_CONSECUTIVE_MISSED_CHECKS
  );
}

export function getNextAATCheckNumber(
  consecutiveMissedChecks: number,
): number {
  return Math.min(
    consecutiveMissedChecks + 1,
    ENGAGEMENT_CONSTANTS.MAX_CONSECUTIVE_MISSED_CHECKS,
  );
}
