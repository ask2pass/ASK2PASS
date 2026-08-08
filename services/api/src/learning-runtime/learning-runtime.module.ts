import { Module } from '@nestjs/common';
import { CoinEconomyModule } from '../coin-economy/coin-economy.module';
import { LearningRuntimeCoinService } from './services/learning-runtime-coin.service';

import { LearningRuntimeController } from './controllers/learning-runtime.controller';

import { LearningRuntimeService } from './services/learning-runtime.service';

@Module({
  imports: [CoinEconomyModule],
  controllers: [
    LearningRuntimeController,
  ],

  providers: [
    LearningRuntimeService,
    LearningRuntimeCoinService,
  ],

  exports: [
    LearningRuntimeService,
    LearningRuntimeCoinService,
  ],
})
export class LearningRuntimeModule {}
