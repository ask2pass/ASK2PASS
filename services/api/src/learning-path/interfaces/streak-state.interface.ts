export interface StreakState {
  learnerId: string;
  streakDate: string;
  completedSubjectCount: number;
  requiredSubjectCount: number;
  autoLogoutOccurred: boolean;
  dailyStarEligible: boolean;
  earnedStars: number;
}
