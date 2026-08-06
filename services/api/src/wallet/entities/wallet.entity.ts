import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('wallets')
export class Wallet extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  balance!: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  totalCoins!: number;

  @Column({
    default: true,
  })
  active!: boolean;
}
