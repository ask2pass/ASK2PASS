import { Module } from '@nestjs/common';

import { WalletLedgerController } from './wallet-ledger.controller';
import { WalletLedgerService } from './wallet-ledger.service';

@Module({
  controllers: [WalletLedgerController],
  providers: [WalletLedgerService],
  exports: [WalletLedgerService],
})
export class WalletLedgerModule {}
