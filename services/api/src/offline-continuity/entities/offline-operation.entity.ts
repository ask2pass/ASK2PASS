
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type {
  OfflineOperationStatus,
  OfflineOperationType,
} from '../interfaces/offline-continuity.interface';

@Entity('offline_operations')
@Index('IDX_OFFLINE_OPERATIONS_OPERATION_ID', ['operationId'], { unique: true })
@Index('IDX_OFFLINE_OPERATIONS_LEARNER_STATUS', ['learnerId', 'status'])
export class OfflineOperationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 160 })
  operationId!: string;

  @Column({ type: 'varchar', length: 160 })
  learnerId!: string;

  @Column({ type: 'varchar', length: 40 })
  operationType!: OfflineOperationType;

  @Column({ type: 'varchar', length: 20, default: 'QUEUED' })
  status!: OfflineOperationStatus;

  @Column({ type: 'integer', default: 1 })
  clientVersion!: number;

  @Column({ type: 'integer', default: 0 })
  serverVersion!: number;

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>;

  @Column({ type: 'timestamp' })
  occurredAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  syncedAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  error!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
