import { EngagementStatus } from '../enums/engagement-status.enum';

export interface AATEngagementResult {
  sessionId: string;
  status: EngagementStatus;
  consecutiveMissedChecks: number;
  autoLoggedOut: boolean;
  dailyStarEligible: boolean;
}
