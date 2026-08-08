import { BadRequestException } from '@nestjs/common';
import { LearningRuntimeCoinService } from '../learning-runtime-coin.service';

describe('LearningRuntimeCoinService', () => {
  let service: LearningRuntimeCoinService;
  let consumption: any;

  beforeEach(() => {
    consumption = {
      consume: jest.fn().mockResolvedValue({
        authorized: true,
        transactionId: 'transaction-1',
        ledgerId: 'ledger-1',
        walletId: 'wallet-1',
        coinsConsumed: 2,
        balanceAfter: 8,
        idempotent: false,
        reason: null,
      }),
    };

    service = new LearningRuntimeCoinService(consumption);
  });

  it('routes learning runtime consumption through the authoritative coin boundary', async () => {
    const result = await service.consume({
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning runtime lesson consumption',
    });

    expect(consumption.consume).toHaveBeenCalledWith({
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning runtime lesson consumption',
    });

    expect(result).toEqual({
      authorized: true,
      transactionId: 'transaction-1',
      ledgerId: 'ledger-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: null,
    });
  });

  it('requires a wallet ID before invoking the coin boundary', async () => {
    await expect(
      service.consume({
        walletId: '',
        learnerId: 'learner-1',
        sessionId: 'session-1',
        lessonId: 'lesson-1',
        coins: 2,
        reference: 'LEARN-invalid-wallet',
        description: 'Learning runtime consumption',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(consumption.consume).not.toHaveBeenCalled();
  });

  it('requires a consumption reference before invoking the coin boundary', async () => {
    await expect(
      service.consume({
        walletId: 'wallet-1',
        learnerId: 'learner-1',
        sessionId: 'session-1',
        lessonId: 'lesson-1',
        coins: 2,
        reference: '',
        description: 'Learning runtime consumption',
      }),
    ).rejects.toThrow(BadRequestException);

    expect(consumption.consume).not.toHaveBeenCalled();
  });
});
