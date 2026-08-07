import { Module } from '@nestjs/common';

import { LearningRuntimeController } from './controllers/learning-runtime.controller';

import { LearningRuntimeService } from './services/learning-runtime.service';

@Module({
  controllers: [
    LearningRuntimeController,
  ],

  providers: [
    LearningRuntimeService,
  ],

  exports: [
    LearningRuntimeService,
  ],
})
export class LearningRuntimeModule {}
