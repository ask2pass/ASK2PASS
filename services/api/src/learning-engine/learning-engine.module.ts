import { Module } from '@nestjs/common';

import { LearningEngineController } from './controllers/learning-engine.controller';
import { LearningEngineService } from './services/learning-engine.service';

@Module({
  controllers: [
    LearningEngineController,
  ],

  providers: [
    LearningEngineService,
  ],

  exports: [
    LearningEngineService,
  ],
})
export class LearningEngineModule {}
