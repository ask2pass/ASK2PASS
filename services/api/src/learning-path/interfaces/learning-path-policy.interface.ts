export interface LearningPathPolicy {
  defaultDailySubjects: number;
  allowedDailySubjectCounts: number[];
  lessonDurationMinutes: number;
  revisionDurationMinutes: number;
  quizDurationMinutes: number;
  engagementCheckIntervalSeconds: number;
  followUpCheckIntervalSeconds: number;
  autoLogoutAfterMissedChecks: number;
  starEligibleOnAutoLogout: boolean;
}
