import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletLedger } from './entities/wallet-ledger.entity';
import { Wallet } from '../wallet/entities/wallet.entity';
import { WalletLedgerEntry } from './interfaces/wallet-ledger-entry.interface';
import { WalletTransactionType } from '../common/enums/wallet-transaction-type.enum';
import { WalletTransactionSource } from '../common/enums/wallet-transaction-source.enum';

@Injectable()
export class WalletLedgerService {
  constructor(
    @InjectRepository(WalletLedger)
    private readonly walletLedgerRepository: Repository<WalletLedger>,
  ) {}

  async createInitialEntry(wallet: Wallet): Promise<WalletLedgerEntry> {
    const ledger = this.walletLedgerRepository.create({
      wallet,
      reference: `REG-${Date.now()}`,
      transactionType: WalletTransactionType.WALLET_FUNDING,
      transactionSource: WalletTransactionSource.USER,
      amount: 0,
      balanceAfter: wallet.balance,
      description: 'Initial wallet creation',
    });

    const saved = await this.walletLedgerRepository.save(ledger);

    return {
      id: saved.id,
      transactionId: saved.id,
      walletId: wallet.id,
      coins: 0,
      balanceAfter: Number(saved.balanceAfter),
    };
  }
}
