import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('wallets')
export class Wallet extends BaseEntity {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user!: User;

  @Column({
    type: 'integer',
    default: 10,
  })
  balance!: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  active!: boolean;
}
