import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { WalletTransactionType } from '../../common/enums/wallet-transaction-type.enum';
import { WalletTransactionSource } from '../../common/enums/wallet-transaction-source.enum';

@Entity('wallet_ledger')
export class WalletLedger extends BaseEntity {
  @ManyToOne(() => Wallet, { nullable: false })
  wallet!: Wallet;

  @Column()
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
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  amount!: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  balanceAfter!: number;

  @Column()
  description!: string;
}
