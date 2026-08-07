import { Injectable } from '@nestjs/common';

import { GATEWAY_CONSTANTS } from '../constants/gateway.constants';

import { GatewayState } from '../enums/gateway-state.enum';

import { GatewaySession } from '../interfaces/gateway-session.interface';

@Injectable()
export class LearningGatewayService {

  getPolicy() {
    return {
      deliveryPolicyRequired:
        GATEWAY_CONSTANTS.DELIVERY_POLICY_REQUIRED,

      orchestrationPolicyRequired:
        GATEWAY_CONSTANTS.ORCHESTRATION_POLICY_REQUIRED,

      sessionStateRequired:
        GATEWAY_CONSTANTS.SESSION_STATE_REQUIRED,

      persistenceRequired:
        GATEWAY_CONSTANTS.PERSISTENCE_REQUIRED,

      createSessionBeforeDelivery:
        GATEWAY_CONSTANTS.CREATE_SESSION_BEFORE_DELIVERY,

      loadPersistedStateOnResume:
        GATEWAY_CONSTANTS.LOAD_PERSISTED_STATE_ON_RESUME,

      snapshotOnPositionUpdate:
        GATEWAY_CONSTANTS.SNAPSHOT_ON_POSITION_UPDATE,

      snapshotOnQuestionMode:
        GATEWAY_CONSTANTS.SNAPSHOT_ON_QUESTION_MODE,

      snapshotOnLessonCompletion:
        GATEWAY_CONSTANTS.SNAPSHOT_ON_LESSON_COMPLETION,

      snapshotOnCBTCompletion:
        GATEWAY_CONSTANTS.SNAPSHOT_ON_CBT_COMPLETION,

      offlineExecution:
        GATEWAY_CONSTANTS.OFFLINE_EXECUTION_SUPPORTED,
    };
  }

  initialize(
    data: Partial<GatewaySession>,
  ): GatewaySession {

    return {
      sessionId:
        data.sessionId ?? `gateway-${Date.now()}`,

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
        GatewayState.SESSION_INITIALIZED,

      lessonPosition:
        Math.max(
          0,
          Math.min(
            100,
            Number(data.lessonPosition) || 0,
          ),
        ),

      questionModeActive:
        false,

      lessonCompleted:
        false,

      cbtCompleted:
        false,

      starsEligible:
        false,

      offlineAvailable:
        data.offlineAvailable ?? true,

      snapshotId:
        data.snapshotId ?? null,
    };
  }

  beginDelivery(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,
      state: GatewayState.DELIVERY_READY,
    };
  }

  startLesson(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,
      state: GatewayState.LESSON_ACTIVE,
    };
  }

  enterQuestionMode(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,

      state:
        GatewayState.QUESTION_MODE,

      questionModeActive:
        true,
    };
  }

  returnToLesson(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,

      state:
        GatewayState.LESSON_ACTIVE,

      questionModeActive:
        false,
    };
  }

  completeLesson(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,

      state:
        GatewayState.LESSON_COMPLETED,

      lessonCompleted:
        true,
    };
  }

  beginCBT(
    session: GatewaySession,
  ): GatewaySession {

    if (!session.lessonCompleted) {
      return session;
    }

    return {
      ...session,
      state: GatewayState.CBT_ACTIVE,
    };
  }

  completeCBT(
    session: GatewaySession,
  ): GatewaySession {

    if (!session.lessonCompleted) {
      return session;
    }

    return {
      ...session,

      state:
        GatewayState.CBT_COMPLETED,

      cbtCompleted:
        true,

      starsEligible:
        true,
    };
  }

  complete(
    session: GatewaySession,
  ): GatewaySession {

    if (!session.cbtCompleted) {
      return session;
    }

    return {
      ...session,

      state:
        GatewayState.COMPLETED,

      starsEligible:
        true,
    };
  }

  updatePosition(
    session: GatewaySession,
    position: number,
  ): GatewaySession {

    return {
      ...session,

      lessonPosition:
        Math.max(
          0,
          Math.min(
            100,
            Number(position) || 0,
          ),
        ),
    };
  }

  resume(
    session: GatewaySession,
  ): GatewaySession {

    return {
      ...session,

      state:
        GatewayState.RESUMED,
    };
  }
}
