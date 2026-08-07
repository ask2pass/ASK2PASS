import { Injectable } from '@nestjs/common';
import { SESSION_CONSTANTS } from '../constants/session.constants';
import { SessionState } from '../enums/session-state.enum';
import { LearningSession } from '../interfaces/learning-session.interface';
import { SessionTransitionResult } from '../interfaces/session-transition.interface';

@Injectable()
export class LearningSessionService {

  getPolicy() {
    return {
      sessionExpiryMinutes:
        SESSION_CONSTANTS.SESSION_EXPIRY_MINUTES,

      autoSave:
        SESSION_CONSTANTS.AUTO_SAVE_ENABLED,

      pausePersistence:
        SESSION_CONSTANTS.PAUSE_STATE_PERSISTENCE_ENABLED,

      questionModePositionPreservation:
        SESSION_CONSTANTS.QUESTION_MODE_POSITION_PRESERVATION,

      resumeFromLastPosition:
        SESSION_CONSTANTS.RESUME_FROM_LAST_POSITION,

      offlineSessionState:
        SESSION_CONSTANTS.OFFLINE_SESSION_STATE_ENABLED,

      positionRange: {
        min: SESSION_CONSTANTS.LESSON_POSITION_MIN,
        max: SESSION_CONSTANTS.LESSON_POSITION_MAX,
      },

      starsEligibleOnCBTCompletion:
        SESSION_CONSTANTS.STAR_ELIGIBILITY_ON_CBT_COMPLETION,
    };
  }

  createSession(data: Partial<LearningSession>): LearningSession {
    const now = new Date();

    return {
      sessionId:
        data.sessionId ?? `session-${Date.now()}`,

      learnerId:
        data.learnerId ?? '',

      lessonId:
        data.lessonId ?? '',

      classLevel:
        data.classLevel ?? '',

      subject:
        data.subject ?? '',

      topic:
        data.topic ?? '',

      state:
        SessionState.CREATED,

      lessonPosition:
        this.normalizePosition(data.lessonPosition ?? 0),

      previousLessonPosition:
        0,

      questionModeActive:
        false,

      returnToLessonPosition:
        true,

      lessonCompleted:
        false,

      cbtCompleted:
        false,

      starsEligible:
        false,

      offlineAvailable:
        data.offlineAvailable ?? true,

      lastUpdatedAt:
        now,
    };
  }

  updatePosition(
    session: LearningSession,
    position: number,
  ): LearningSession {

    const normalized =
      this.normalizePosition(position);

    return {
      ...session,

      previousLessonPosition:
        session.lessonPosition,

      lessonPosition:
        normalized,

      lastUpdatedAt:
        new Date(),
    };
  }

  pauseSession(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.PAUSED,

      lastUpdatedAt:
        new Date(),
    };
  }

  resumeSession(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.PLAYING,

      lessonPosition:
        SESSION_CONSTANTS.RESUME_FROM_LAST_POSITION
          ? session.lessonPosition
          : 0,

      lastUpdatedAt:
        new Date(),
    };
  }

  enterQuestionMode(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.QUESTION_MODE,

      questionModeActive:
        true,

      returnToLessonPosition:
        SESSION_CONSTANTS.QUESTION_MODE_POSITION_PRESERVATION,

      lastUpdatedAt:
        new Date(),
    };
  }

  returnFromQuestionMode(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.PLAYING,

      questionModeActive:
        false,

      lessonPosition:
        SESSION_CONSTANTS.QUESTION_MODE_POSITION_PRESERVATION
          ? session.lessonPosition
          : session.previousLessonPosition,

      lastUpdatedAt:
        new Date(),
    };
  }

  completeLesson(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.CBT_MODE,

      lessonCompleted:
        true,

      lastUpdatedAt:
        new Date(),
    };
  }

  completeCBT(
    session: LearningSession,
  ): LearningSession {

    return {
      ...session,

      state:
        SessionState.COMPLETED,

      cbtCompleted:
        true,

      starsEligible:
        SESSION_CONSTANTS.STAR_ELIGIBILITY_ON_CBT_COMPLETION,

      lastUpdatedAt:
        new Date(),
    };
  }

  validateTransition(
    currentState: SessionState,
    nextState: SessionState,
  ): SessionTransitionResult {

    const allowed: Record<
      SessionState,
      SessionState[]
    > = {

      [SessionState.CREATED]: [
        SessionState.PLAYING,
        SessionState.EXPIRED,
      ],

      [SessionState.PLAYING]: [
        SessionState.PAUSED,
        SessionState.QUESTION_MODE,
        SessionState.REVISION_MODE,
        SessionState.CBT_MODE,
        SessionState.COMPLETED,
        SessionState.EXPIRED,
      ],

      [SessionState.PAUSED]: [
        SessionState.PLAYING,
        SessionState.EXPIRED,
      ],

      [SessionState.QUESTION_MODE]: [
        SessionState.PLAYING,
        SessionState.PAUSED,
      ],

      [SessionState.REVISION_MODE]: [
        SessionState.PLAYING,
        SessionState.PAUSED,
        SessionState.COMPLETED,
      ],

      [SessionState.CBT_MODE]: [
        SessionState.COMPLETED,
        SessionState.PAUSED,
      ],

      [SessionState.COMPLETED]: [],

      [SessionState.EXPIRED]: [
        SessionState.CREATED,
      ],
    };

    const valid =
      allowed[currentState]?.includes(nextState) ?? false;

    return {
      valid,
      currentState,
      nextState,
      lessonPosition: 0,
      questionModeActive:
        nextState === SessionState.QUESTION_MODE,
      returnToLessonPosition:
        SESSION_CONSTANTS.QUESTION_MODE_POSITION_PRESERVATION,
    };
  }

  private normalizePosition(
    position: number,
  ): number {

    return Math.max(
      SESSION_CONSTANTS.LESSON_POSITION_MIN,
      Math.min(
        SESSION_CONSTANTS.LESSON_POSITION_MAX,
        Number(position) || 0,
      ),
    );
  }
}
