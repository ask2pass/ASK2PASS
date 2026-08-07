import { Module } from '@nestjs/common';
import { LearningOrchestrationController } from './controllers/learning-orchestration.controller';
import { LearningOrchestrationService } from './services/learning-orchestration.service';

@Module({
  controllers: [
    LearningOrchestrationController,
  ],
  providers: [
    LearningOrchestrationService,
  ],
  exports: [
    LearningOrchestrationService,
  ],
})
export class LearningOrchestrationModule {}
