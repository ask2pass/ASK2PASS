import { LearningRuntimeController } from '../learning-runtime.controller';

describe('LearningRuntimeController - session execution', () => {
  let controller: LearningRuntimeController;
  let learningRuntimeService: any;

  beforeEach(() => {
    learningRuntimeService = {
      executeLearningSession: jest.fn().mockResolvedValue({
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

    controller = new LearningRuntimeController(learningRuntimeService);
  });

  it('routes session execution to the production runtime service', async () => {
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

    const result = await controller.executeLearningSession(request as any);

    expect(learningRuntimeService.executeLearningSession)
      .toHaveBeenCalledWith(request);

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
