import { Injectable } from '@nestjs/common';
import { AWARDS_CONSTANTS } from '../constants/awards.constants';

@Injectable()
export class AwardsService {


getLeaderboardPolicy(){

return {

topRankers:
AWARDS_CONSTANTS.TOP_RANKERS,

classLevels:
AWARDS_CONSTANTS.CLASS_LEVELS,

starSources:
AWARDS_CONSTANTS.STAR_SOURCES,

};

}


getPrimaryAwardStructure(){

return {
      primary: AWARDS_CONSTANTS.PRIMARY_AWARDS,
      jss: AWARDS_CONSTANTS.JSS_AWARDS,
      sss: AWARDS_CONSTANTS.SSS_AWARDS,
    };

}


}
