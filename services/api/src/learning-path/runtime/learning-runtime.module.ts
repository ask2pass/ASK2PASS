import { Module } from '@nestjs/common';

import { LearningRuntimeController } from './learning-runtime.controller';
import { LearningRuntimeService } from './learning-runtime.service';

@Module({
  controllers: [LearningRuntimeController],
  providers: [LearningRuntimeService],
  exports: [LearningRuntimeService],
})
export class LearningRuntimeModule {}
