import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { WalletTransactionSource } from '../../common/enums/wallet-transaction-source.enum';
import { WalletTransactionType } from '../../common/enums/wallet-transaction-type.enum';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity('wallet_ledger')
export class WalletLedger extends BaseEntity {
  @ManyToOne(() => Wallet, { nullable: false })
  @JoinColumn()
  wallet!: Wallet;

  @Column({ unique: true })
  reference!: string;

  @Column({
    type: 'enum',
    enum: WalletTransactionType,
  })
  transactionType!: WalletTransactionType;

  @Column({
    type: 'enum',
    enum: WalletTransactionSource,
  })
  transactionSource!: WalletTransactionSource;

  @Column({
    type: 'integer',
  })
  amount!: number;

  @Column({
    type: 'integer',
  })
  balanceAfter!: number;

  @Column({
    nullable: true,
  })
  description?: string;
}
