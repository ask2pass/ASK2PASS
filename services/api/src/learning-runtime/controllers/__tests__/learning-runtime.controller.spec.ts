import { LearningRuntimeController } from '../learning-runtime.controller';

describe('LearningRuntimeController', () => {
  let controller: LearningRuntimeController;
  let learningRuntimeService: any;

  beforeEach(() => {
    learningRuntimeService = {
      consumeLearningCoins: jest.fn().mockResolvedValue({
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

    controller = new LearningRuntimeController(learningRuntimeService);
  });

  it('routes learning coin consumption to the production runtime service', async () => {
    const request = {
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning runtime lesson consumption',
    };

    const result = await controller.consumeLearningCoins(request as any);

    expect(learningRuntimeService.consumeLearningCoins)
      .toHaveBeenCalledWith(request);

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
