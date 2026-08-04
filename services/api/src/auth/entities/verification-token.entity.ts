import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('verification_tokens')
export class VerificationToken extends BaseEntity {
  @Column()
  userId!: string;

  @Column({ unique: true })
  token!: string;

  @Column()
  type!: string;

  @Column({
    default: false,
  })
  used!: boolean;

  @Column({
    type: 'timestamptz',
  })
  expiresAt!: Date;
}
