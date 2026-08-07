import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SAPAssessmentEntity } from '../entities/sap-assessment.entity';
import { AssessmentSyncStatus } from '../enums/assessment-sync-status.enum';

@Injectable()
export class SAPAssessmentRepository {
  constructor(
    @InjectRepository(SAPAssessmentEntity)
    private readonly repository: Repository<SAPAssessmentEntity>,
  ) {}

  async create(
    data: Partial<SAPAssessmentEntity>,
  ): Promise<SAPAssessmentEntity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findByLearner(
    learnerId: string,
  ): Promise<SAPAssessmentEntity[]> {
    return this.repository.find({
      where: { learnerId },
      order: { createdAt: 'ASC' },
    });
  }

  async findPendingSync(
    learnerId: string,
  ): Promise<SAPAssessmentEntity[]> {
    return this.repository.find({
      where: {
        learnerId,
        syncStatus: AssessmentSyncStatus.SYNC_PENDING,
      },
      order: { createdAt: 'ASC' },
    });
  }

  async markSynced(
    assessmentId: string,
  ): Promise<SAPAssessmentEntity | null> {
    const entity = await this.repository.findOne({
      where: { id: assessmentId },
    });

    if (!entity) {
      return null;
    }

    entity.syncStatus = AssessmentSyncStatus.SYNCED;
    return this.repository.save(entity);
  }
}
