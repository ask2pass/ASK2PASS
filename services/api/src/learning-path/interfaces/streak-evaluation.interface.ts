export interface StreakEvaluation {
  learnerId: string;
  chartDate: string;
  requiredSubjectCount: number;
  completedSubjectCount: number;
  autoLogoutOccurred: boolean;
  dailyStarEligible: boolean;
  earnedStars: number;
}
