import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('notification_logs')
export class NotificationLog extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column()
  type!: string;

  @Column({ default: false })
  delivered!: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  deliveredAt?: Date;
}
