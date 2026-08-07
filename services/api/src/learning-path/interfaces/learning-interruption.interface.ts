export interface LearningInterruption {
  sessionId: string;
  learnerId: string;
  learnerFirstName: string;
  occurredAt: Date;
  reason: string | null;
  distractionDescription: string | null;
  autoLoggedOut: boolean;
}
