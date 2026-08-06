import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { SubscriptionPlan } from './subscription-plan.entity';

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user!: User;

  @ManyToOne(() => SubscriptionPlan, { nullable: false })
  plan!: SubscriptionPlan;

  @Column({ type: 'timestamptz' })
  startDate!: Date;

  @Column({ type: 'timestamptz' })
  endDate!: Date;

  @Column({ type: 'timestamptz' })
  accessExpiresAt!: Date;

  @Column({
    default: true,
  })
  active!: boolean;

  @Column({
    default: 0,
  })
  renewalCount!: number;
}
