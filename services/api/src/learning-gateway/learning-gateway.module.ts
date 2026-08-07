import { Module } from '@nestjs/common';

import { LearningGatewayController } from './controllers/learning-gateway.controller';

import { LearningGatewayService } from './services/learning-gateway.service';

@Module({
  controllers: [
    LearningGatewayController,
  ],

  providers: [
    LearningGatewayService,
  ],

  exports: [
    LearningGatewayService,
  ],
})
export class LearningGatewayModule {}
