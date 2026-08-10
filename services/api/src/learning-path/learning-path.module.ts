
import { Module } from '@nestjs/common';
import { LearningPathController } from './controllers/learning-path.controller';
import { LearningRuntimeDirectiveController } from './controllers/learning-runtime-directive.controller';
import { LearningPathService } from './services/learning-path.service';
import { LearningRuntimeDirectiveService } from './services/learning-runtime-directive.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DailySubjectChart } from './entities/daily-subject-chart.entity';
import { LearningPath } from './entities/learning-path.entity';
import { LearningSession } from './entities/learning-session.entity';
@Module({
  imports: [TypeOrmModule.forFeature([DailySubjectChart, LearningPath, LearningSession])],
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
