import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPathModule } from '../learning-path/learning-path.module';
import { LearningProgressController } from './controllers/learning-progress.controller';
import { LearningProgressEntity } from './entities/learning-progress.entity';
import { LearningProgressRepository } from './repositories/learning-progress.repository';
import { LearningProgressService } from './services/learning-progress.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LearningProgressEntity]),
    LearningPathModule,
  ],
  controllers: [LearningProgressController],
  providers: [
    LearningProgressRepository,
    LearningProgressService,
  ],
  exports: [
    LearningProgressRepository,
    LearningProgressService,
  ],
})
export class LearningProgressModule {}
