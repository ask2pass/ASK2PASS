import { LearningSessionStatus } from '../enums/learning-session-status.enum';
import { Injectable } from '@nestjs/common';
import { LearningRuntimeCoinService } from './learning-runtime-coin.service';
import {
  LearningRuntimeConsumptionRequest,
  LearningRuntimeConsumptionResult,
} from '../interfaces/learning-runtime-consumption.interface';

import { RUNTIME_CONSTANTS } from '../constants/runtime.constants';

import { RuntimeState } from '../enums/runtime-state.enum';

import { LearningRuntimeContext } from '../interfaces/runtime-context.interface';

@Injectable()
export class LearningRuntimeService {
  constructor(
    private readonly learningRuntimeCoin: LearningRuntimeCoinService,
  ) {
  }


  getPolicy() {
    return {
      deliveryRequired:
        RUNTIME_CONSTANTS.DELIVERY_REQUIRED,

      orchestrationRequired:
        RUNTIME_CONSTANTS.ORCHESTRATION_REQUIRED,

      sessionRequired:
        RUNTIME_CONSTANTS.SESSION_REQUIRED,

      persistenceRequired:
        RUNTIME_CONSTANTS.PERSISTENCE_REQUIRED,

      autoSnapshotOnStateChange:
        RUNTIME_CONSTANTS.AUTO_SNAPSHOT_ON_STATE_CHANGE,

      resumeFromPersistedState:
        RUNTIME_CONSTANTS.RESUME_FROM_PERSISTED_STATE,

      questionModePersistence:
        RUNTIME_CONSTANTS.QUESTION_MODE_PERSISTENCE_REQUIRED,

      cbtCompletionPersistence:
        RUNTIME_CONSTANTS.CBT_COMPLETION_PERSISTENCE_REQUIRED,

      starsEligibilityPersistence:
        RUNTIME_CONSTANTS.STARS_ELIGIBILITY_PERSISTENCE_REQUIRED,

      offlineRuntime:
        RUNTIME_CONSTANTS.OFFLINE_RUNTIME_SUPPORTED,
    };
  }

  createRuntimeContext(
    data: Partial<LearningRuntimeContext>,
  ): LearningRuntimeContext {

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

      state:
        data.state ?? RuntimeState.READY,

      lessonPosition:
        Number(data.lessonPosition) || 0,

      questionModeActive:
        data.questionModeActive ?? false,

      lessonCompleted:
        data.lessonCompleted ?? false,

      cbtCompleted:
        data.cbtCompleted ?? false,

      starsEligible:
        data.starsEligible ?? false,

      offlineAvailable:
        data.offlineAvailable ?? true,

      snapshotId:
        data.snapshotId ?? null,
    };
  }

  transition(
    context: LearningRuntimeContext,
    nextState: RuntimeState,
  ): LearningRuntimeContext {

    return {
      ...context,

      state: nextState,

      questionModeActive:
        nextState === RuntimeState.QUESTION_MODE,

      lessonCompleted:
        context.lessonCompleted ||
        nextState === RuntimeState.LESSON_COMPLETED,

      cbtCompleted:
        context.cbtCompleted ||
        nextState === RuntimeState.CBT_COMPLETED,

      starsEligible:
        context.starsEligible ||
        nextState === RuntimeState.CBT_COMPLETED ||
        nextState === RuntimeState.COMPLETED,
    };
  }

  resume(
    context: LearningRuntimeContext,
  ): LearningRuntimeContext {

    return {
      ...context,

      state: RuntimeState.RESUMED,
    };
  }

  updatePosition(
    context: LearningRuntimeContext,
    position: number,
  ): LearningRuntimeContext {

    return {
      ...context,

      lessonPosition:
        Math.max(0, Math.min(100, Number(position) || 0)),
    };
  }

  async getLearningSessionState(
    request: {
      sessionId: string;
      learnerId: string;
      status: LearningSessionStatus;
      description?: string;
    },
  ): Promise<{
    sessionId: string;
    learnerId: string;
    status: LearningSessionStatus;
    description?: string;
  }> {
    return {
      sessionId: request.sessionId,
      learnerId: request.learnerId,
      status: request.status,
      description: request.description,
    };
  }


  async deliverLearningSession(
    request: LearningRuntimeConsumptionRequest,
  ): Promise<LearningRuntimeConsumptionResult> {
    const orchestration = await this.orchestrateLearningSession(request);

    if (!orchestration.authorized) {
      return orchestration;
    }

    return {
      ...orchestration,
      reason: orchestration.reason ?? 'LEARNING_SESSION_DELIVERED',
    };
  }

  async orchestrateLearningSession(
    request: LearningRuntimeConsumptionRequest,
  ): Promise<LearningRuntimeConsumptionResult> {
    const execution = await this.executeLearningSession(request);

    if (!execution.authorized) {
      return execution;
    }

    return {
      ...execution,
      reason: execution.reason ?? 'LEARNING_SESSION_ORCHESTRATED',
    };
  }


  async executeLearningSession(
    request: LearningRuntimeConsumptionRequest,
  ): Promise<LearningRuntimeConsumptionResult> {
    const result = await this.learningRuntimeCoin.consume(request);

    if (!result.authorized) {
      return result;
    }

    return {
      ...result,
      reason: result.reason ?? 'LEARNING_SESSION_EXECUTED',
    };
  }

  async consumeLearningCoins(
    request: LearningRuntimeConsumptionRequest,
  ): Promise<LearningRuntimeConsumptionResult> {
    return this.learningRuntimeCoin.consume(request);
  }
}
