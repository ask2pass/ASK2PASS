import { Module } from '@nestjs/common';

import { LearningIntegrationController } from './controllers/learning-integration.controller';

import { LearningIntegrationService } from './services/learning-integration.service';


@Module({

controllers:[
LearningIntegrationController,
],

providers:[
LearningIntegrationService,
],

exports:[
LearningIntegrationService,
],

})

export class LearningIntegrationModule {}
