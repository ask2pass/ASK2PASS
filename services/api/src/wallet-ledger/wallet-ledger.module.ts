import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletLedger } from './entities/wallet-ledger.entity';
import { WalletLedgerController } from './wallet-ledger.controller';
import { WalletLedgerService } from './wallet-ledger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WalletLedger]),
  ],
  controllers: [WalletLedgerController],
  providers: [WalletLedgerService],
  exports: [WalletLedgerService],
})
export class WalletLedgerModule {}
