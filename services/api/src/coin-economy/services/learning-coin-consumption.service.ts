import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CoinEconomyService } from './coin-economy.service';
import { CoinMovementType } from '../enums/coin-movement-type.enum';
import {
  LearningCoinConsumptionRequest,
  LearningCoinConsumptionResult,
} from '../interfaces/learning-coin-consumption.interface';

@Injectable()
export class LearningCoinConsumptionService {
  constructor(
    private readonly coinEconomy: CoinEconomyService,
  ) {}

  async consume(
    request: LearningCoinConsumptionRequest,
  ): Promise<LearningCoinConsumptionResult> {
    if (!request.learnerId?.trim()) {
      throw new BadRequestException('Learner ID is required.');
    }

    if (!request.sessionId?.trim()) {
      throw new BadRequestException('Learning session ID is required.');
    }

    if (!request.lessonId?.trim()) {
      throw new BadRequestException('Lesson ID is required.');
    }

    if (!Number.isInteger(request.coins) || request.coins <= 0) {
      throw new BadRequestException(
        'Learning coin consumption must be a positive integer.',
      );
    }

    if (!request.reference?.trim()) {
      throw new BadRequestException(
        'Learning consumption reference is required.',
      );
    }

    const result = await this.coinEconomy.transact(
      request.walletId,
      request.coins,
      CoinMovementType.DEBIT,
      request.reference,
      request.description,
    );

    return {
      authorized: true,
      transactionId: result.transactionId,
      ledgerId: result.ledgerId,
      walletId: result.walletId,
      coinsConsumed: Math.abs(result.coins),
      balanceAfter: result.balanceAfter,
      idempotent: result.idempotent,
      reason: null,
    };
  }
}
