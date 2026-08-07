import { Injectable } from '@nestjs/common';
import { INTEGRATION_CONSTANTS } from '../constants/integration.constants';

@Injectable()
export class LearningIntegrationService {

getLearningFlowPolicy(){

return {

curriculum:{
tccRequired:
INTEGRATION_CONSTANTS.TCC_TOPIC_REQUIRED,

dscCompliance:
INTEGRATION_CONSTANTS.DSC_MUST_FOLLOW_TCC,
},

lesson:{
contentRequired:
INTEGRATION_CONSTANTS.CONTENT_REQUIRED_BEFORE_LESSON,
},

assessment:{
lessonRequiredBeforeCBT:
INTEGRATION_CONSTANTS.LESSON_COMPLETION_REQUIRED_FOR_CBT,
},

awards:{
cbtRequiredBeforeStars:
INTEGRATION_CONSTANTS.CBT_COMPLETION_REQUIRED_FOR_STARS,
},

questionMode:
INTEGRATION_CONSTANTS.QUESTION_MODE_RETURN_ENABLED,

};

}

}
