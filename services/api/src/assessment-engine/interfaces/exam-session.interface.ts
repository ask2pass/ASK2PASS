export interface ExamSessionPolicy {

  durationMinutes: number;

  pauseAllowed: boolean;

  exitAllowed: boolean;

  replayAllowed: boolean;

  autoSubmitOnTimeout: boolean;

  antiCheatEnabled: boolean;

}
