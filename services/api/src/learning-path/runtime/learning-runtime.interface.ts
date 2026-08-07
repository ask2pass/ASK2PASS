import { SessionPhase } from '../enums/session-phase.enum';

export interface LearningRuntimeRequest {
  learnerId: string;
  learnerFirstName: string;
  academicTermId: string;
  chartDate: string;
  sessionId: string;
  phase: SessionPhase;
  consecutiveMissedChecks: number;
  requiredSubjectCount: number;
  completedSubjectCount: number;
  autoLogoutOccurred: boolean;
  outstandingRecoverySubjects?: number;
  spreadDays?: number;
  remainingTermDays?: number;
}

export interface LearningRuntimeResult {
  learnerId: string;
  learnerFirstName: string;
  academicTermId: string;
  chartDate: string;
  sessionId: string;
  phase: SessionPhase;
  engagement: {
    consecutiveMissedChecks: number;
    autoLoggedOut: boolean;
    dailyStarEligible: boolean;
    requiresInterruptionResponse: boolean;
    nextCheckInSeconds: number;
  };
  recovery: {
    active: boolean;
    approved: boolean;
    remainingRecoverySubjects: number;
    spreadDays: number;
    reason: string | null;
  };
  streak: {
    requiredSubjectCount: number;
    completedSubjectCount: number;
    autoLogoutOccurred: boolean;
    dailyStarEligible: boolean;
    earnedStars: number;
  };
  aat: {
    personalized: boolean;
    messageKey: string;
    message: string;
    asksReason: boolean;
    asksDistraction: boolean;
  };
}
