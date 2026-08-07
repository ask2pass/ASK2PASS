import { Controller, Get } from '@nestjs/common';
import { AwardsService } from '../services/awards.service';


@Controller('awards')
export class AwardsController {


constructor(
private readonly service: AwardsService,
){}


@Get('leaderboard-policy')
leaderboard(){

return this.service.getLeaderboardPolicy();

}


@Get('primary-awards')
awards(){

return this.service.getPrimaryAwardStructure();

}

}
