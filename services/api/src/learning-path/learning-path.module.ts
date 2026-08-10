
import { Module } from '@nestjs/common';
import { LearningPathController } from './controllers/learning-path.controller';
import { LearningRuntimeDirectiveController } from './controllers/learning-runtime-directive.controller';
import { LearningPathService } from './services/learning-path.service';
import { LearningRuntimeDirectiveService } from './services/learning-runtime-directive.service';

@Module({
  controllers: [
    LearningPathController,
    LearningRuntimeDirectiveController,
  ],
  providers: [
    LearningPathService,
    LearningRuntimeDirectiveService,
  ],
  exports: [
    LearningPathService,
    LearningRuntimeDirectiveService,
  ],
})
export class LearningPathModule {}
