export interface AATInterruptionResponse {
  sessionId: string;
  learnerId: string;
  learnerFirstName: string;
  autoLoggedOut: boolean;
  dailyStarEligible: boolean;
  askReason: boolean;
  askDistraction: boolean;
  messageKey: string;
}
