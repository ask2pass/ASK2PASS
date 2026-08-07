import { Injectable } from '@nestjs/common';
import { DELIVERY_CONSTANTS } from '../constants/delivery.constants';

@Injectable()
export class LearningDeliveryService {

  getDeliveryPolicy(){
    return {
      lessonMinutes:
        DELIVERY_CONSTANTS.LESSON_DURATION_MINUTES,

      revisionMinutes:
        DELIVERY_CONSTANTS.REVISION_DURATION_MINUTES,

      cbtMinutes:
        DELIVERY_CONSTANTS.CBT_DURATION_MINUTES,

      controls:{
        play:
          DELIVERY_CONSTANTS.PLAY_ENABLED,

        pause:
          DELIVERY_CONSTANTS.PAUSE_ENABLED,

        fastForward:
          DELIVERY_CONSTANTS.FAST_FORWARD_ENABLED,

        replay:
          DELIVERY_CONSTANTS.REPLAY_ENABLED_SCHOOL_LESSON,
      },

      questionMode:{
        enabled:
          DELIVERY_CONSTANTS.QUESTION_MODE_ENABLED,

        returnPosition:
          DELIVERY_CONSTANTS.RETURN_TO_LESSON_POSITION,
      },

      offlineAI:
        DELIVERY_CONSTANTS.OFFLINE_AI_CONTENT_ENABLED,
    };
  }

}
