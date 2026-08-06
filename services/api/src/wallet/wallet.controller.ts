import { Controller, Param, Post } from '@nestjs/common';

@Controller('wallet')
export class WalletController {
  @Post(':userId')
  async createWallet(
    @Param('userId') userId: string,
  ) {
    return {
      message: 'Wallet creation endpoint scaffolded',
      userId,
    };
  }

  @Post(':userId/balance')
  async getBalance(
    @Param('userId') userId: string,
  ) {
    return {
      userId,
      balance: 0,
      totalCoins: 0,
    };
  }
}
