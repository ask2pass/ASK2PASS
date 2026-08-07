import { calculateDailyStars } from './streak.util';

export function evaluateDailyStreak(
  learnerId: string,
  chartDate: string,
  requiredSubjectCount: number,
  completedSubjectCount: number,
  autoLogoutOccurred: boolean,
) {
  const dailyStarEligible = !autoLogoutOccurred;

  const earnedStars = dailyStarEligible
    ? calculateDailyStars(
        completedSubjectCount,
        requiredSubjectCount,
        false,
      )
    : 0;

  return {
    learnerId,
    chartDate,
    requiredSubjectCount,
    completedSubjectCount,
    autoLogoutOccurred,
    dailyStarEligible,
    earnedStars,
  };
}
