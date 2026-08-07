import { Controller, Get } from '@nestjs/common';
import { LearningIntegrationService } from '../services/learning-integration.service';

@Controller('learning-integration')
export class LearningIntegrationController {

constructor(
private readonly service: LearningIntegrationService,
){}

@Get('policy')
policy(){

return this.service.getLearningFlowPolicy();

}

}
