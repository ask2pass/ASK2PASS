import { Module } from '@nestjs/common';
import { LearningSessionService } from './services/learning-session.service';
import { LearningSession } from './entities/learning-session.entity';
import { CoinEconomyModule } from '../coin-economy/coin-economy.module';
import { LearningRuntimeCoinService } from './services/learning-runtime-coin.service';

import { LearningRuntimeController } from './controllers/learning-runtime.controller';

import { LearningRuntimeService } from './services/learning-runtime.service';
import { LearningSessionAcademicPowerService } from './services/learning-session-academic-power.service';

@Module({
  imports: [CoinEconomyModule],
  controllers: [
    LearningRuntimeController,
  ],

  providers: [
    LearningSessionAcademicPowerService,
LearningSessionService,
    LearningRuntimeService,
    LearningRuntimeCoinService,
  ],

  exports: [
    LearningSessionAcademicPowerService,
LearningRuntimeService,
    LearningRuntimeCoinService,
  ],
})
export class LearningRuntimeModule {}
