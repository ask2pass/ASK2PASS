import { LEARNING_CONSTANTS } from '../constants/learning.constants';
import { SessionPhase } from '../enums/session-phase.enum';

export function getSessionPhase(
  lessonElapsedSeconds: number,
  revisionElapsedSeconds: number,
  quizCompleted: boolean,
): SessionPhase {
  if (quizCompleted) {
    return SessionPhase.COMPLETED;
  }

  if (
    lessonElapsedSeconds <
    LEARNING_CONSTANTS.LESSON_DURATION_MINUTES * 60
  ) {
    return SessionPhase.LESSON;
  }

  if (
    revisionElapsedSeconds <
    LEARNING_CONSTANTS.REVISION_DURATION_MINUTES * 60
  ) {
    return SessionPhase.REVISION;
  }

  return SessionPhase.CBT_QUIZ;
}
