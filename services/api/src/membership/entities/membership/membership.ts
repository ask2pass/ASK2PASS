import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../../user/entities/user.entity';
import { MembershipStatus } from '../../enums/membership-status.enum';

@Entity('memberships')
export class Membership extends BaseEntity {
  @OneToOne(() => User, { nullable: false })
  @JoinColumn()
  user!: User;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.TRIAL,
  })
  status!: MembershipStatus;

  @Column({ default: true })
  accessGranted!: boolean;

  @Column({ type: 'timestamptz' })
  accessStartedAt!: Date;

  @Column({ type: 'timestamptz' })
  accessExpiresAt!: Date;

  @Column({ default: false })
  lifetime!: boolean;

  @Column({ default: 0 })
  renewalCount!: number;
}
