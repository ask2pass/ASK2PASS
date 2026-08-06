import { Controller, Get, Param } from '@nestjs/common';

@Controller('wallet-ledger')
export class WalletLedgerController {
  @Get(':walletId')
  async getLedger(
    @Param('walletId') walletId: string,
  ) {
    return {
      walletId,
      entries: [],
      totalEntries: 0,
    };
  }
}
