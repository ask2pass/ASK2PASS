import { Module } from '@nestjs/common';

import { LearningCrossBindingController } from './controllers/learning-cross-binding.controller';

import { LearningCrossBindingService } from './services/learning-cross-binding.service';

@Module({
  controllers: [
    LearningCrossBindingController,
  ],

  providers: [
    LearningCrossBindingService,
  ],

  exports: [
    LearningCrossBindingService,
  ],
})
export class LearningCrossBindingModule {}
