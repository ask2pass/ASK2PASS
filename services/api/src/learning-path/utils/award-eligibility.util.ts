import { STAR_CONSTANTS } from '../constants/star.constants';

export function isEligibleForAward(
  academicPerformancePercent: number,
): boolean {
  return (
    academicPerformancePercent >=
    STAR_CONSTANTS.MINIMUM_AWARD_ACADEMIC_SCORE_PERCENT
  );
}
