import { BadRequestException } from '@nestjs/common';
import { LearningCoinConsumptionService } from '../learning-coin-consumption.service';
import { CoinMovementType } from '../../enums/coin-movement-type.enum';

describe('LearningCoinConsumptionService', () => {
  let service: LearningCoinConsumptionService;
  let coinEconomy: any;

  beforeEach(() => {
    coinEconomy = {
      transact: jest.fn().mockResolvedValue({
        transactionId: 'transaction-1',
        ledgerId: 'ledger-1',
        walletId: 'wallet-1',
        coins: -2,
        balanceAfter: 80,
        idempotent: false,
      }),
    };

    service = new LearningCoinConsumptionService(coinEconomy);
  });

  it('consumes coins through the authoritative Coin Economy service', async () => {
    const result = await service.consume({
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Lesson consumption',
    });

    expect(coinEconomy.transact).toHaveBeenCalledWith(
      'wallet-1',
      2,
      CoinMovementType.DEBIT,
      'LEARN-session-1-lesson-1',
      'Lesson consumption',
    );

    expect(result).toEqual({
      authorized: true,
      transactionId: 'transaction-1',
      ledgerId: 'ledger-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 80,
      idempotent: false,
      reason: null,
    });
  });

  it('rejects invalid coin amounts before touching the wallet', async () => {
    await expect(
      service.consume({
        walletId: 'wallet-1',
        learnerId: 'learner-1',
        sessionId: 'session-1',
        lessonId: 'lesson-1',
        coins: 0,
        reference: 'LEARN-invalid',
        description: 'Invalid consumption',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(coinEconomy.transact).not.toHaveBeenCalled();
  });

  it('requires the learning session identity', async () => {
    await expect(
      service.consume({
        walletId: 'wallet-1',
        learnerId: 'learner-1',
        sessionId: '',
        lessonId: 'lesson-1',
        coins: 1,
        reference: 'LEARN-invalid-session',
        description: 'Learning consumption',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(coinEconomy.transact).not.toHaveBeenCalled();
  });
});
