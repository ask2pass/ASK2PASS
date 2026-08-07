import { Injectable } from '@nestjs/common';
import { CONTENT_CONSTANTS } from '../constants/content.constants';

@Injectable()
export class ContentEngineService {

  getCurriculumStructure(){
    return {
      classLevels:
        CONTENT_CONSTANTS.CLASS_LEVELS,

      terms:
        CONTENT_CONSTANTS.TERMS_PER_SESSION,

      monthsPerTerm:
        CONTENT_CONSTANTS.MONTHS_PER_TERM,

      offlineContent:
        CONTENT_CONSTANTS.OFFLINE_CONTENT_ENABLED,
    };
  }


  lessonStateFlow(){

    return {
      states:
        CONTENT_CONSTANTS.LESSON_STATES,

      questionMode:
        'Pause lesson, interact with AI tutor, return to lesson position.',
    };

  }

}
