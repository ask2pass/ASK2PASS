export interface AATFollowUp {
  sessionId: string;
  learnerId: string;
  learnerFirstName: string;
  checkNumber: number;
  checkIntervalSeconds: number;
  responseRequired: boolean;
  autoLogoutAfterThisCheck: boolean;
}
