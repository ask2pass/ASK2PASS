import { SessionPhase } from '../enums/session-phase.enum';

export interface SessionProgress {
  sessionId: string;
  phase: SessionPhase;
  lessonElapsedSeconds: number;
  revisionElapsedSeconds: number;
  quizElapsedSeconds: number;
  quizCompleted: boolean;
  lessonCompleted: boolean;
  sessionCompleted: boolean;
  autoLoggedOut: boolean;
}
