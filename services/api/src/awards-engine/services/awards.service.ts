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

return AWARDS_CONSTANTS.PRIMARY_AWARDS;

}


}
