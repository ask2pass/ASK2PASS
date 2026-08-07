import { Injectable } from '@nestjs/common';
import { TCC_CONSTANTS } from '../constants/tcc.constants';

@Injectable()
export class TCCEngineService {


  getTermStructure(){

    return {

      terms:
        TCC_CONSTANTS.TERMS_PER_SESSION,

      monthsPerTerm:
        TCC_CONSTANTS.MONTHS_PER_TERM,

      weeksPerTerm:
        TCC_CONSTANTS.WEEKS_PER_TERM_APPROX,

      curriculumCompliance:
        TCC_CONSTANTS.CURRICULUM_COMPLIANCE_REQUIRED,

      topicSkipping:
        TCC_CONSTANTS.TOPIC_SKIP_ALLOWED,

    };

  }


  generateDSCRule(){

    return {

      lessonMinutes:
        TCC_CONSTANTS.LESSON_MINUTES,

      revisionMinutes:
        TCC_CONSTANTS.REVISION_MINUTES,

      quizMinutes:
        TCC_CONSTANTS.CBT_MINUTES,

      balancedDistribution:
        true,

    };

  }

}
