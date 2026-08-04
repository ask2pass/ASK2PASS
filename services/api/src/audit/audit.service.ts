import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepository: Repository<AuditLog>,
  ) {}

  async log(
    action: string,
    userId?: string,
    metadata?: Record<string, unknown>,
  ): Promise<AuditLog> {
    const audit = this.auditRepository.create({
      action,
      userId,
      metadata,
    });

    return this.auditRepository.save(audit);
  }
}
