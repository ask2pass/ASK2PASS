import {
  Column,
  Entity,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Index()
  @Column({
    length: 100,
  })
  action!: string;

  @Index()
  @Column({
    type: 'uuid',
    nullable: true,
  })
  userId?: string;

  @Column({
    length: 255,
    nullable: true,
  })
  ipAddress?: string;

  @Column({
    length: 255,
    nullable: true,
  })
  userAgent?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata?: Record<string, unknown>;
}
