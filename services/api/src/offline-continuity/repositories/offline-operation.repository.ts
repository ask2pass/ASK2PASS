
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OfflineOperationEntity } from '../entities/offline-operation.entity';
import { OfflineOperationStatus } from '../interfaces/offline-continuity.interface';

@Injectable()
export class OfflineOperationRepository {
  constructor(
    @InjectRepository(OfflineOperationEntity)
    private readonly repository: Repository<OfflineOperationEntity>,
  ) {}

  async findByOperationId(operationId: string) {
    return this.repository.findOne({
      where: { operationId },
    });
  }

  async save(entity: OfflineOperationEntity) {
    return this.repository.save(entity);
  }

  async findPending(learnerId: string) {
    return this.repository.find({
      where: [
        { learnerId, status: 'QUEUED' as OfflineOperationStatus },
        { learnerId, status: 'CONFLICT' as OfflineOperationStatus },
        { learnerId, status: 'FAILED' as OfflineOperationStatus },
      ],
      order: {
        occurredAt: 'ASC',
      },
    });
  }
}
