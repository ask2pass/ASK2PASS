import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningSession } from '../entities/learning-session.entity';
import { LearningSessionStatus } from '../enums/learning-session-status.enum';

@Injectable()
export class LearningSessionService {
  constructor(
    @InjectRepository(LearningSession)
    private readonly repository: Repository<LearningSession>,
  ) {}

  async createSession(request: {
    walletId: string;
    learnerId: string;
    lessonId: string;
    coins: number;
    reference: string;
    description: string;
    offline?: boolean;
  }): Promise<LearningSession> {
    const existing = await this.repository.findOne({
      where: { reference: request.reference },
    });

    if (existing) {
      return existing;
    }

    const session = this.repository.create({
      ...request,
      status: LearningSessionStatus.CREATED,
    });

    return this.repository.save(session);
  }

  async getSession(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.repository.findOne({
      where: { id: sessionId, learnerId },
    });

    if (!session) {
      throw new NotFoundException('Learning session not found');
    }

    return session;
  }

  async transition(
    sessionId: string,
    learnerId: string,
    status: LearningSessionStatus,
    description?: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    session.status = status;

    if (description !== undefined) {
      session.description = description;
    }

    return this.repository.save(session);
  }
}
