import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { VerificationType } from '../enums/verification-type.enum';
import { VerificationStatus } from '../enums/verification-status.enum';

@Entity('verification_codes')
export class VerificationCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: VerificationType,
  })
  type: VerificationType;

  @Column()
  code: string;

  @Column({
    type: 'timestamp',
  })
  expiresAt: Date;

  @Column({
    default: 0,
  })
  attempts: number;

  @Column({
    type: 'enum',
    enum: VerificationStatus,
    default: VerificationStatus.PENDING,
  })
  status: VerificationStatus;

  @CreateDateColumn()
  createdAt: Date;
}
