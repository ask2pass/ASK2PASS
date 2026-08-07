import { EngagementStatus } from '../enums/engagement-status.enum';
import { SessionPhase } from '../enums/session-phase.enum';

export interface SessionEngagementState {
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
}
