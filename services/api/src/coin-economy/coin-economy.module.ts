import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletTransaction } from '../wallet/entities/wallet-transaction.entity';
import { WalletLedger } from '../wallet-ledger/entities/wallet-ledger.entity';
import { CoinEconomyService } from './services/coin-economy.service';
import { LearningCoinConsumptionService } from './services/learning-coin-consumption.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wallet,
      WalletTransaction,
      WalletLedger,
    ]),
  ],
  providers: [CoinEconomyService, LearningCoinConsumptionService],
  exports: [CoinEconomyService, LearningCoinConsumptionService],
})
export class CoinEconomyModule {}
