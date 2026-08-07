import { SessionState } from '../enums/session-state.enum';

export interface SessionTransitionResult {
  valid: boolean;
  currentState: SessionState;
  nextState: SessionState;
  lessonPosition: number;
  questionModeActive: boolean;
  returnToLessonPosition: boolean;
}
