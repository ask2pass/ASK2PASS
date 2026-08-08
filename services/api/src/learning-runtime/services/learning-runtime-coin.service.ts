import { BadRequestException, Injectable } from '@nestjs/common';
import { LearningCoinConsumptionService } from '../../coin-economy/services/learning-coin-consumption.service';
import {
  LearningRuntimeConsumptionRequest,
  LearningRuntimeConsumptionResult,
} from '../interfaces/learning-runtime-consumption.interface';

@Injectable()
export class LearningRuntimeCoinService {
  constructor(
    private readonly consumption: LearningCoinConsumptionService,
  ) {}

  async consume(
    request: LearningRuntimeConsumptionRequest,
  ): Promise<LearningRuntimeConsumptionResult> {
    if (!request.walletId?.trim()) {
      throw new BadRequestException('Learning wallet ID is required.');
    }

    if (!request.reference?.trim()) {
      throw new BadRequestException(
        'Learning runtime consumption reference is required.',
      );
    }

    const result = await this.consumption.consume({
      walletId: request.walletId,
      learnerId: request.learnerId,
      sessionId: request.sessionId,
      lessonId: request.lessonId,
      coins: request.coins,
      reference: request.reference,
      description: request.description,
    });

    return {
      authorized: result.authorized,
      transactionId: result.transactionId,
      ledgerId: result.ledgerId,
      walletId: result.walletId,
      coinsConsumed: result.coinsConsumed,
      balanceAfter: result.balanceAfter,
      idempotent: result.idempotent,
      reason: result.reason,
    };
  }
}
