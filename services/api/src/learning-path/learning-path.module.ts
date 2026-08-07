import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearningPathController } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';

import { LearningPath } from './entities/learning-path.entity';
import { DailySubjectChart } from './entities/daily-subject-chart.entity';
import { LearningSession } from './entities/learning-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearningPath,
      DailySubjectChart,
      LearningSession,
    ]),
  ],
  controllers: [LearningPathController],
  providers: [LearningPathService],
  exports: [LearningPathService],
})
export class LearningPathModule {}
