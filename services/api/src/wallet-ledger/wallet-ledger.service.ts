import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletLedger } from './entities/wallet-ledger.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletTransactionType } from '../common/enums/wallet-transaction-type.enum';
import { WalletTransactionSource } from '../common/enums/wallet-transaction-source.enum';

@Injectable()
export class WalletLedgerService {
  constructor(
    @InjectRepository(WalletLedger)
    private readonly walletLedgerRepository: Repository<WalletLedger>,
  ) {}

  getRepository(): Repository<WalletLedger> {
    return this.walletLedgerRepository;
  }

  async createInitialEntry(wallet: Wallet): Promise<WalletLedger> {
    const ledger = this.walletLedgerRepository.create({
      wallet,
      reference: `REG-${Date.now()}`,
      transactionType: WalletTransactionType.WALLET_FUNDING,
      transactionSource: WalletTransactionSource.USER,
      amount: 0,
      balanceAfter: wallet.balance,
      description: 'Initial wallet creation',
    });

    return this.walletLedgerRepository.save(ledger);
  }
}
