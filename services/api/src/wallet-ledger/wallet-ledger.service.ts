import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WalletLedger } from './entities/wallet-ledger.entity';

@Injectable()
export class WalletLedgerService {
  constructor(
    @InjectRepository(WalletLedger)
    private readonly walletLedgerRepository: Repository<WalletLedger>,
  ) {}

  getRepository(): Repository<WalletLedger> {
    return this.walletLedgerRepository;
  }
}
