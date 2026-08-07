import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Wallet } from './wallet.entity';
import { WalletTransactionType } from '../enums/wallet-transaction-type.enum';

@Entity('wallet_transactions')
export class WalletTransaction extends BaseEntity {
  @ManyToOne(() => Wallet, { nullable: false })
  wallet!: Wallet;

  @Column({
    type: 'enum',
    enum: WalletTransactionType,
  })
  type!: WalletTransactionType;

  @Column({
    type: 'integer',
  })
  coins!: number;

  @Column({ nullable: true })
  reference?: string;

  @Column()
  description!: string;
}
