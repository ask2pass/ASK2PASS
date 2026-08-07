import { Injectable } from '@nestjs/common';

import { CROSS_BINDING_CONSTANTS } from '../constants/cross-binding.constants';

import { EngineBindingState } from '../enums/engine-binding-state.enum';

import { EngineBindingContext } from '../interfaces/engine-binding-context.interface';

import { BindingResult } from '../interfaces/binding-result.interface';

@Injectable()
export class LearningCrossBindingService {

  getPolicy() {
    return {
      deliveryEngineRequired:
        CROSS_BINDING_CONSTANTS.DELIVERY_ENGINE_REQUIRED,

      orchestrationEngineRequired:
        CROSS_BINDING_CONSTANTS.ORCHESTRATION_ENGINE_REQUIRED,

      sessionEngineRequired:
        CROSS_BINDING_CONSTANTS.SESSION_ENGINE_REQUIRED,

      persistenceEngineRequired:
        CROSS_BINDING_CONSTANTS.PERSISTENCE_ENGINE_REQUIRED,

      runtimeEngineRequired:
        CROSS_BINDING_CONSTANTS.RUNTIME_ENGINE_REQUIRED,

      deliveryBeforeOrchestration:
        CROSS_BINDING_CONSTANTS.DELIVERY_BEFORE_ORCHESTRATION,

      orchestrationBeforeSession:
        CROSS_BINDING_CONSTANTS.ORCHESTRATION_BEFORE_SESSION,

      sessionBeforeRuntime:
        CROSS_BINDING_CONSTANTS.SESSION_BEFORE_RUNTIME,

      runtimeStatePersistence:
        CROSS_BINDING_CONSTANTS.RUNTIME_STATE_PERSISTENCE_REQUIRED,

      questionModePersistence:
        CROSS_BINDING_CONSTANTS.QUESTION_MODE_STATE_PERSISTENCE_REQUIRED,

      lessonCompletionPersistence:
        CROSS_BINDING_CONSTANTS.LESSON_COMPLETION_STATE_PERSISTENCE_REQUIRED,

      cbtCompletionPersistence:
        CROSS_BINDING_CONSTANTS.CBT_COMPLETION_STATE_PERSISTENCE_REQUIRED,

      starsEligibilityPersistence:
        CROSS_BINDING_CONSTANTS.STARS_ELIGIBILITY_STATE_PERSISTENCE_REQUIRED,

      offlineChain:
        CROSS_BINDING_CONSTANTS.OFFLINE_CHAIN_SUPPORTED,
    };
  }

  createContext(
    data: Partial<EngineBindingContext>,
  ): EngineBindingContext {

    return {
      learnerId:
        data.learnerId ?? '',

      sessionId:
        data.sessionId ?? '',

      lessonId:
        data.lessonId ?? '',

      classLevel:
        data.classLevel ?? '',

      subject:
        data.subject ?? '',

      topic:
        data.topic ?? '',

      deliveryReady:
        data.deliveryReady ?? false,

      orchestrationReady:
        data.orchestrationReady ?? false,

      sessionReady:
        data.sessionReady ?? false,

      persistenceReady:
        data.persistenceReady ?? false,

      runtimeReady:
        data.runtimeReady ?? false,

      offlineAvailable:
        data.offlineAvailable ?? true,

      state:
        EngineBindingState.UNBOUND,

      lessonPosition:
        Math.max(
          0,
          Math.min(
            100,
            Number(data.lessonPosition) || 0,
          ),
        ),

      questionModeActive:
        data.questionModeActive ?? false,

      lessonCompleted:
        data.lessonCompleted ?? false,

      cbtCompleted:
        data.cbtCompleted ?? false,

      starsEligible:
        data.starsEligible ?? false,

      snapshotId:
        data.snapshotId ?? null,
    };
  }

  evaluate(
    context: EngineBindingContext,
  ): BindingResult {

    if (!context.deliveryReady) {
      return this.blocked(
        context,
        'DELIVERY_ENGINE',
        'Delivery engine is not ready.',
      );
    }

    if (
      CROSS_BINDING_CONSTANTS.DELIVERY_BEFORE_ORCHESTRATION &&
      !context.orchestrationReady
    ) {
      return this.blocked(
        context,
        'ORCHESTRATION_ENGINE',
        'Orchestration engine must be ready after delivery.',
      );
    }

    if (
      CROSS_BINDING_CONSTANTS.ORCHESTRATION_BEFORE_SESSION &&
      !context.sessionReady
    ) {
      return this.blocked(
        context,
        'SESSION_ENGINE',
        'Session engine must be ready after orchestration.',
      );
    }

    if (!context.persistenceReady) {
      return this.blocked(
        context,
        'PERSISTENCE_ENGINE',
        'Persistence engine is not ready.',
      );
    }

    if (
      CROSS_BINDING_CONSTANTS.SESSION_BEFORE_RUNTIME &&
      !context.runtimeReady
    ) {
      return this.blocked(
        context,
        'RUNTIME_ENGINE',
        'Runtime engine must be ready after session initialization.',
      );
    }

    return {
      valid: true,

      state:
        EngineBindingState.FULLY_BOUND,

      deliveryReady:
        context.deliveryReady,

      orchestrationReady:
        context.orchestrationReady,

      sessionReady:
        context.sessionReady,

      persistenceReady:
        context.persistenceReady,

      runtimeReady:
        context.runtimeReady,

      offlineAvailable:
        context.offlineAvailable,

      blockedAt: null,

      reason: null,
    };
  }

  bind(
    context: EngineBindingContext,
  ): EngineBindingContext {

    const result =
      this.evaluate(context);

    if (!result.valid) {
      return {
        ...context,

        state:
          EngineBindingState.BLOCKED,
      };
    }

    return {
      ...context,

      state:
        EngineBindingState.FULLY_BOUND,
    };
  }

  updateEngineState(
    context: EngineBindingContext,
    updates: Partial<
      Pick<
        EngineBindingContext,
        | 'deliveryReady'
        | 'orchestrationReady'
        | 'sessionReady'
        | 'persistenceReady'
        | 'runtimeReady'
      >
    >,
  ): EngineBindingContext {

    const updated = {
      ...context,
      ...updates,
    };

    return {
      ...updated,

      state:
        this.evaluate(updated).valid
          ? EngineBindingState.FULLY_BOUND
          : this.resolvePartialState(updated),
    };
  }

  validatePersistenceRequirement(
    context: EngineBindingContext,
  ): BindingResult {

    if (
      CROSS_BINDING_CONSTANTS.RUNTIME_STATE_PERSISTENCE_REQUIRED &&
      !context.persistenceReady
    ) {
      return this.blocked(
        context,
        'PERSISTENCE_ENGINE',
        'Runtime state cannot proceed without persistence.',
      );
    }

    if (
      context.questionModeActive &&
      CROSS_BINDING_CONSTANTS.QUESTION_MODE_STATE_PERSISTENCE_REQUIRED &&
      !context.persistenceReady
    ) {
      return this.blocked(
        context,
        'QUESTION_MODE_PERSISTENCE',
        'Question mode requires persisted state.',
      );
    }

    if (
      context.lessonCompleted &&
      CROSS_BINDING_CONSTANTS.LESSON_COMPLETION_STATE_PERSISTENCE_REQUIRED &&
      !context.persistenceReady
    ) {
      return this.blocked(
        context,
        'LESSON_COMPLETION_PERSISTENCE',
        'Lesson completion requires persisted state.',
      );
    }

    if (
      context.cbtCompleted &&
      CROSS_BINDING_CONSTANTS.CBT_COMPLETION_STATE_PERSISTENCE_REQUIRED &&
      !context.persistenceReady
    ) {
      return this.blocked(
        context,
        'CBT_COMPLETION_PERSISTENCE',
        'CBT completion requires persisted state.',
      );
    }

    if (
      context.starsEligible &&
      CROSS_BINDING_CONSTANTS.STARS_ELIGIBILITY_STATE_PERSISTENCE_REQUIRED &&
      !context.persistenceReady
    ) {
      return this.blocked(
        context,
        'STARS_ELIGIBILITY_PERSISTENCE',
        'Stars eligibility requires persisted state.',
      );
    }

    return this.evaluate(context);
  }

  private resolvePartialState(
    context: EngineBindingContext,
  ): EngineBindingState {

    if (!context.deliveryReady) {
      return EngineBindingState.UNBOUND;
    }

    if (!context.orchestrationReady) {
      return EngineBindingState.DELIVERY_BOUND;
    }

    if (!context.sessionReady) {
      return EngineBindingState.ORCHESTRATION_BOUND;
    }

    if (!context.persistenceReady) {
      return EngineBindingState.SESSION_BOUND;
    }

    if (!context.runtimeReady) {
      return EngineBindingState.PERSISTENCE_BOUND;
    }

    return EngineBindingState.RUNTIME_BOUND;
  }

  private blocked(
    context: EngineBindingContext,
    blockedAt: string,
    reason: string,
  ): BindingResult {

    return {
      valid: false,

      state:
        EngineBindingState.BLOCKED,

      deliveryReady:
        context.deliveryReady,

      orchestrationReady:
        context.orchestrationReady,

      sessionReady:
        context.sessionReady,

      persistenceReady:
        context.persistenceReady,

      runtimeReady:
        context.runtimeReady,

      offlineAvailable:
        context.offlineAvailable,

      blockedAt,

      reason,
    };
  }
}
