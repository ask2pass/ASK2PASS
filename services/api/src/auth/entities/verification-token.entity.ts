import {
  Column,
  Entity,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity('verification_tokens')
export class VerificationToken extends BaseEntity {
  @Index({ unique: true })
  @Column({
    length: 255,
  })
  token!: string;

  @Index()
  @Column({
    length: 255,
  })
  email!: string;

  @Column({
    default: false,
  })
  used!: boolean;

  @Column({
    type: 'timestamptz',
  })
  expiresAt!: Date;
}
