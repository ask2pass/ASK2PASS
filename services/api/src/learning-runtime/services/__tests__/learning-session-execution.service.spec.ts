import { LearningRuntimeService } from '../learning-runtime.service';

describe('LearningRuntimeService - session execution', () => {
  let service: LearningRuntimeService;
  let learningRuntimeCoin: any;

  beforeEach(() => {
    learningRuntimeCoin = {
      consume: jest.fn().mockResolvedValue({
        authorized: true,
        transactionId: 'transaction-session-1',
        ledgerId: 'ledger-session-1',
        walletId: 'wallet-1',
        coinsConsumed: 2,
        balanceAfter: 8,
        idempotent: false,
        reason: null,
      }),
    };

    service = new LearningRuntimeService(learningRuntimeCoin);
  });

  it('executes a learning session through the authoritative coin boundary', async () => {
    const request = {
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning session execution',
      offline: true,
    };

    const result = await service.executeLearningSession(request);

    expect(learningRuntimeCoin.consume).toHaveBeenCalledWith(request);
    expect(result).toEqual({
      authorized: true,
      transactionId: 'transaction-session-1',
      ledgerId: 'ledger-session-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: null,
    });
  });
});
