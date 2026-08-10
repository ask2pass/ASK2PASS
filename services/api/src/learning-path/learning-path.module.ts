
import { Module } from '@nestjs/common';
import { LearningPathController } from './controllers/learning-path.controller';
import { LearningPathService } from './services/learning-path.service';

@Module({
  controllers: [LearningPathController],
  providers: [LearningPathService],
  exports: [LearningPathService],
})
export class LearningPathModule {}
