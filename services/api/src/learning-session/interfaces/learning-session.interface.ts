import { SessionState } from '../enums/session-state.enum';

export interface LearningSession {
  sessionId: string;
  learnerId: string;
  lessonId: string;
  classLevel: string;
  subject: string;
  topic: string;

  state: SessionState;

  lessonPosition: number;

  previousLessonPosition: number;

  questionModeActive: boolean;

  returnToLessonPosition: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  offlineAvailable: boolean;

  lastUpdatedAt: Date;
}
