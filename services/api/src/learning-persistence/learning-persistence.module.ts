import { Module } from '@nestjs/common';

import { LearningPersistenceController } from './controllers/learning-persistence.controller';

import { LearningPersistenceService } from './services/learning-persistence.service';

@Module({
  controllers: [
    LearningPersistenceController,
  ],

  providers: [
    LearningPersistenceService,
  ],

  exports: [
    LearningPersistenceService,
  ],
})
export class LearningPersistenceModule {}
