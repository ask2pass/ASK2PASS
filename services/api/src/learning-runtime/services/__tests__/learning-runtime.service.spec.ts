import { LearningRuntimeService } from '../learning-runtime.service';

describe('LearningRuntimeService', () => {
  let service: LearningRuntimeService;
  let learningRuntimeCoin: any;

  beforeEach(() => {
    learningRuntimeCoin = {
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

    service = new LearningRuntimeService(learningRuntimeCoin);
  });

  it('executes learning coin consumption through the production runtime boundary', async () => {
    const request = {
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning runtime lesson consumption',
    };

    const result = await service.consumeLearningCoins(request);

    expect(learningRuntimeCoin.consume).toHaveBeenCalledWith(request);
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
});
