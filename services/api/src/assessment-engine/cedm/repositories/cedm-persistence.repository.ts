import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CEDMQuestionEntity } from '../entities/cedm-question.entity';
import { CEDMSessionEntity } from '../entities/cedm-session.entity';

@Injectable()
export class CEDMPersistenceRepository {
  constructor(
    @InjectRepository(CEDMQuestionEntity)
    private readonly questionRepository: Repository<CEDMQuestionEntity>,
    @InjectRepository(CEDMSessionEntity)
    private readonly sessionRepository: Repository<CEDMSessionEntity>,
  ) {}

  async saveQuestion(
    question: Partial<CEDMQuestionEntity>,
  ): Promise<CEDMQuestionEntity> {
    return this.questionRepository.save(
      this.questionRepository.create(question),
    );
  }

  async findQuestion(questionId: string): Promise<CEDMQuestionEntity | null> {
    return this.questionRepository.findOne({
      where: { id: questionId },
    });
  }

  async saveSession(
    session: Partial<CEDMSessionEntity>,
  ): Promise<CEDMSessionEntity> {
    return this.sessionRepository.save(
      this.sessionRepository.create(session),
    );
  }

  async findSession(sessionId: string): Promise<CEDMSessionEntity | null> {
    return this.sessionRepository.findOne({
      where: { id: sessionId },
    });
  }

  async findResumableSession(
    sessionId: string,
    learnerId: string,
  ): Promise<CEDMSessionEntity | null> {
    return this.sessionRepository.findOne({
      where: {
        id: sessionId,
        learnerId,
      },
    });
  }

  async findLearnerSessions(
    learnerId: string,
  ): Promise<CEDMSessionEntity[]> {
    return this.sessionRepository.find({
      where: { learnerId },
      order: { createdAt: 'DESC' },
    });
  }
}
