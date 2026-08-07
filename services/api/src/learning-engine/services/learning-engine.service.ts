import { Injectable } from '@nestjs/common';

import { LEARNING_ENGINE_CONSTANTS } from '../constants/engine.constants';
import { LearningEngineState } from '../enums/learning-engine-state.enum';
import { LearningEngineContext } from '../interfaces/learning-engine-context.interface';
import { LearningEngineResult } from '../interfaces/learning-engine-result.interface';

@Injectable()
export class LearningEngineService {

  getPolicy() {
    return {
      deliveryRequired:
        LEARNING_ENGINE_CONSTANTS.DELIVERY_REQUIRED,

      orchestrationRequired:
        LEARNING_ENGINE_CONSTANTS.ORCHESTRATION_REQUIRED,

      sessionRequired:
        LEARNING_ENGINE_CONSTANTS.SESSION_REQUIRED,

      persistenceRequired:
        LEARNING_ENGINE_CONSTANTS.PERSISTENCE_REQUIRED,

      runtimeRequired:
        LEARNING_ENGINE_CONSTANTS.RUNTIME_REQUIRED,

      crossBindingRequired:
        LEARNING_ENGINE_CONSTANTS.CROSS_BINDING_REQUIRED,

      createSessionBeforeLearning:
        LEARNING_ENGINE_CONSTANTS.CREATE_SESSION_BEFORE_LEARNING,

      loadStateBeforeResume:
        LEARNING_ENGINE_CONSTANTS.LOAD_STATE_BEFORE_RESUME,

      persistStateAfterTransition:
        LEARNING_ENGINE_CONSTANTS.PERSIST_STATE_AFTER_TRANSITION,

      persistPositionUpdates:
        LEARNING_ENGINE_CONSTANTS.PERSIST_POSITION_UPDATES,

      persistQuestionMode:
        LEARNING_ENGINE_CONSTANTS.PERSIST_QUESTION_MODE,

      persistLessonCompletion:
        LEARNING_ENGINE_CONSTANTS.PERSIST_LESSON_COMPLETION,

      persistCBTCompletion:
        LEARNING_ENGINE_CONSTANTS.PERSIST_CBT_COMPLETION,

      offlineFirst:
        LEARNING_ENGINE_CONSTANTS.OFFLINE_FIRST_EXECUTION,
    };
  }

  initialize(
    data: Partial<LearningEngineContext>,
  ): LearningEngineContext {

    const now = new Date();

    return {
      learnerId:
        data.learnerId ?? '',

      sessionId:
        data.sessionId ?? `engine-${Date.now()}`,

      lessonId:
        data.lessonId ?? '',

      classLevel:
        data.classLevel ?? '',

      subject:
        data.subject ?? '',

      topic:
        data.topic ?? '',

      state:
        LearningEngineState.INITIALIZING,

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

      deliveryReady:
        false,

      orchestrationReady:
        false,

      sessionReady:
        false,

      persistenceReady:
        false,

      runtimeReady:
        false,

      fullyBound:
        false,

      updatedAt:
        now,
    };
  }

  activate(
    context: LearningEngineContext,
  ): LearningEngineContext {

    const fullyReady =
      context.deliveryReady &&
      context.orchestrationReady &&
      context.sessionReady &&
      context.persistenceReady &&
      context.runtimeReady &&
      context.fullyBound;

    if (!fullyReady) {
      return {
        ...context,
        state: LearningEngineState.BLOCKED,
        updatedAt: new Date(),
      };
    }

    return {
      ...context,
      state: LearningEngineState.LEARNING_ACTIVE,
      updatedAt: new Date(),
    };
  }

  updatePosition(
    context: LearningEngineContext,
    position: number,
  ): LearningEngineContext {

    return {
      ...context,

      lessonPosition:
        Math.max(
          0,
          Math.min(
            100,
            Number(position) || 0,
          ),
        ),

      updatedAt:
        new Date(),
    };
  }

  enterQuestionMode(
    context: LearningEngineContext,
  ): LearningEngineContext {

    return {
      ...context,

      state:
        LearningEngineState.QUESTION_MODE,

      questionModeActive:
        true,

      updatedAt:
        new Date(),
    };
  }

  returnToLesson(
    context: LearningEngineContext,
  ): LearningEngineContext {

    return {
      ...context,

      state:
        LearningEngineState.LEARNING_ACTIVE,

      questionModeActive:
        false,

      updatedAt:
        new Date(),
    };
  }

  completeLesson(
    context: LearningEngineContext,
  ): LearningEngineContext {

    return {
      ...context,

      state:
        LearningEngineState.LESSON_COMPLETED,

      lessonCompleted:
        true,

      updatedAt:
        new Date(),
    };
  }

  beginCBT(
    context: LearningEngineContext,
  ): LearningEngineContext {

    if (!context.lessonCompleted) {
      return {
        ...context,
        state: LearningEngineState.BLOCKED,
        updatedAt: new Date(),
      };
    }

    return {
      ...context,

      state:
        LearningEngineState.CBT_ACTIVE,

      updatedAt:
        new Date(),
    };
  }

  completeCBT(
    context: LearningEngineContext,
  ): LearningEngineContext {

    if (!context.lessonCompleted) {
      return {
        ...context,
        state: LearningEngineState.BLOCKED,
        updatedAt: new Date(),
      };
    }

    return {
      ...context,

      state:
        LearningEngineState.CBT_COMPLETED,

      cbtCompleted:
        true,

      starsEligible:
        true,

      updatedAt:
        new Date(),
    };
  }

  resume(
    context: LearningEngineContext,
  ): LearningEngineContext {

    if (
      context.state === LearningEngineState.COMPLETED
    ) {
      return context;
    }

    return {
      ...context,

      state:
        LearningEngineState.RESUMING,

      updatedAt:
        new Date(),
    };
  }

  complete(
    context: LearningEngineContext,
  ): LearningEngineContext {

    if (!context.cbtCompleted) {
      return {
        ...context,
        state: LearningEngineState.BLOCKED,
        updatedAt: new Date(),
      };
    }

    return {
      ...context,

      state:
        LearningEngineState.COMPLETED,

      starsEligible:
        true,

      updatedAt:
        new Date(),
    };
  }

  result(
    context: LearningEngineContext,
    success = true,
    persisted = false,
    reason: string | null = null,
  ): LearningEngineResult {

    return {
      success,

      state:
        context.state,

      sessionId:
        context.sessionId,

      lessonId:
        context.lessonId,

      lessonPosition:
        context.lessonPosition,

      questionModeActive:
        context.questionModeActive,

      lessonCompleted:
        context.lessonCompleted,

      cbtCompleted:
        context.cbtCompleted,

      starsEligible:
        context.starsEligible,

      offlineAvailable:
        context.offlineAvailable,

      snapshotId:
        context.snapshotId,

      persisted,

      reason,

      updatedAt:
        context.updatedAt,
    };
  }
}
