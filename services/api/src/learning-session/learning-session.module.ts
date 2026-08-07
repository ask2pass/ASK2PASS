import { Module } from '@nestjs/common';

import { LearningSessionController } from './controllers/learning-session.controller';
import { LearningSessionService } from './services/learning-session.service';

@Module({
  controllers: [
    LearningSessionController,
  ],

  providers: [
    LearningSessionService,
  ],

  exports: [
    LearningSessionService,
  ],
})
export class LearningSessionModule {}
