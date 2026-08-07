import { Injectable } from '@nestjs/common';

import { ORCHESTRATION_CONSTANTS } from '../constants/orchestration.constants';

import { LearningFlowState } from '../enums/learning-flow-state.enum';

import { LearningOrchestrationContext } from '../interfaces/learning-orchestration.interface';

@Injectable()
export class LearningOrchestrationService {

  getPolicy() {

    return {

      curriculum: {
        tccRequired:
          ORCHESTRATION_CONSTANTS.TCC_REQUIRED,

        dscRequired:
          ORCHESTRATION_CONSTANTS.DSC_REQUIRED,
      },

      content: {
        required:
          ORCHESTRATION_CONSTANTS.CONTENT_REQUIRED,
      },

      lesson: {
        requiredBeforeCBT:
          ORCHESTRATION_CONSTANTS.LESSON_REQUIRED_BEFORE_CBT,
      },

      assessment: {
        requiredBeforeStars:
          ORCHESTRATION_CONSTANTS.CBT_REQUIRED_BEFORE_STARS,
      },

      questionMode: {
        enabled:
          ORCHESTRATION_CONSTANTS.QUESTION_MODE_RETURN_ENABLED,
      },

      offline:
        ORCHESTRATION_CONSTANTS.OFFLINE_FLOW_SUPPORTED,

    };

  }

  resolveNextState(
    context: LearningOrchestrationContext,
  ): LearningFlowState {

    if (!context.tccTopic) {

      return LearningFlowState.TCC_PENDING;

    }

    if (!context.dscScheduled) {

      return LearningFlowState.DSC_PENDING;

    }

    if (!context.contentLoaded) {

      return LearningFlowState.CONTENT_PENDING;

    }

    if (
      !context.lessonCompleted &&
      context.state !== LearningFlowState.QUESTION_MODE
    ) {

      if (
        context.state === LearningFlowState.LESSON_IN_PROGRESS
      ) {

        return LearningFlowState.LESSON_IN_PROGRESS;

      }

      return LearningFlowState.LESSON_READY;

    }

    if (!context.lessonCompleted) {

      return LearningFlowState.QUESTION_MODE;

    }

    if (!context.cbtCompleted) {

      if (
        context.state === LearningFlowState.CBT_IN_PROGRESS
      ) {

        return LearningFlowState.CBT_IN_PROGRESS;

      }

      return LearningFlowState.CBT_READY;

    }

    return LearningFlowState.STARS_ELIGIBLE;

  }

  validateTransition(
    currentState: LearningFlowState,
    nextState: LearningFlowState,
  ) {

    const allowed: Record<
      LearningFlowState,
      LearningFlowState[]
    > = {

      [LearningFlowState.TCC_PENDING]: [
        LearningFlowState.TCC_READY,
      ],

      [LearningFlowState.TCC_READY]: [
        LearningFlowState.DSC_PENDING,
        LearningFlowState.DSC_READY,
      ],

      [LearningFlowState.DSC_PENDING]: [
        LearningFlowState.DSC_READY,
      ],

      [LearningFlowState.DSC_READY]: [
        LearningFlowState.CONTENT_PENDING,
        LearningFlowState.CONTENT_READY,
      ],

      [LearningFlowState.CONTENT_PENDING]: [
        LearningFlowState.CONTENT_READY,
      ],

      [LearningFlowState.CONTENT_READY]: [
        LearningFlowState.LESSON_READY,
      ],

      [LearningFlowState.LESSON_READY]: [
        LearningFlowState.LESSON_IN_PROGRESS,
        LearningFlowState.QUESTION_MODE,
      ],

      [LearningFlowState.LESSON_IN_PROGRESS]: [
        LearningFlowState.QUESTION_MODE,
        LearningFlowState.LESSON_COMPLETED,
      ],

      [LearningFlowState.QUESTION_MODE]: [
        LearningFlowState.LESSON_IN_PROGRESS,
        LearningFlowState.LESSON_COMPLETED,
      ],

      [LearningFlowState.LESSON_COMPLETED]: [
        LearningFlowState.CBT_READY,
      ],

      [LearningFlowState.CBT_READY]: [
        LearningFlowState.CBT_IN_PROGRESS,
      ],

      [LearningFlowState.CBT_IN_PROGRESS]: [
        LearningFlowState.CBT_COMPLETED,
      ],

      [LearningFlowState.CBT_COMPLETED]: [
        LearningFlowState.STARS_ELIGIBLE,
        LearningFlowState.COMPLETED,
      ],

      [LearningFlowState.STARS_ELIGIBLE]: [
        LearningFlowState.COMPLETED,
      ],

      [LearningFlowState.COMPLETED]: [],

    };

    return {

      valid:
        allowed[currentState]?.includes(nextState) ?? false,

      currentState,

      nextState,

    };

  }

}
