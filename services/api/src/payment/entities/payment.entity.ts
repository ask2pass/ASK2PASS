import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity('payments')
export class Payment extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({ unique: true })
  reference!: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount!: number;

  @Column()
  currency!: string;

  @Column()
  provider!: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @Column({ nullable: true })
  providerReference?: string;
}
