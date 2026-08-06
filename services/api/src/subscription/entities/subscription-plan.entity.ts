import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('subscription_plans')
export class SubscriptionPlan extends BaseEntity {
  @Column({ unique: true })
  name!: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  price!: number;

  @Column({
    type: 'integer',
  })
  durationDays!: number;

  @Column({
    type: 'integer',
    default: 10,
  })
  defaultCoins!: number;

  @Column({
    default: true,
  })
  active!: boolean;

  @Column({
    default: 'STUDENT',
  })
  audienceType!: string;
}
