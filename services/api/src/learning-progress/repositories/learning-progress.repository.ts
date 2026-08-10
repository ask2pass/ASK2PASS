import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningProgressEntity } from '../entities/learning-progress.entity';

@Injectable()
export class LearningProgressRepository {
  constructor(
    @InjectRepository(LearningProgressEntity)
    private readonly repository: Repository<LearningProgressEntity>,
  ) {}

  async findByLearnerTopic(
    learnerId: string,
    subjectId: string,
    topicId: string,
  ): Promise<LearningProgressEntity | null> {
    return this.repository.findOne({
      where: { learnerId, subjectId, topicId },
    });
  }

  async findByLearner(
    learnerId: string,
  ): Promise<LearningProgressEntity[]> {
    return this.repository.find({
      where: { learnerId },
      order: { updatedAt: 'ASC' },
    });
  }

  async save(
    progress: LearningProgressEntity,
  ): Promise<LearningProgressEntity> {
    return this.repository.save(progress);
  }
}
