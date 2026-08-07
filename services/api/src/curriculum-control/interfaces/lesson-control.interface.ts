export interface LessonControlState {
  sessionId: string;
  learnerId: string;

  lessonPlaying: boolean;
  paused: boolean;

  fastForwardAllowed: boolean;
  replayAllowed: boolean;

  exited: boolean;
  starsEarned: boolean;
}
