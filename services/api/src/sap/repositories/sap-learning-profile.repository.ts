import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SAPLearningProfileEntity } from '../entities/sap-learning-profile.entity';

@Injectable()
export class SAPLearningProfileRepository {
  constructor(
    @InjectRepository(SAPLearningProfileEntity)
    private readonly repository: Repository<SAPLearningProfileEntity>,
  ) {}

  async find(
    learnerId: string,
    subject: string,
    topic: string,
  ): Promise<SAPLearningProfileEntity | null> {
    return this.repository.findOne({
      where: {
        learnerId,
        subject,
        topic,
      },
    });
  }

  async save(
    data: Partial<SAPLearningProfileEntity>,
  ): Promise<SAPLearningProfileEntity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }
}
