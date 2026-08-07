export interface LearningDeliverySession {
  learnerId: string;
  classLevel: string;
  subject: string;
  topic: string;

  state: string;

  lessonPosition: number;

  starsEligible: boolean;

  offlineAvailable: boolean;
}
