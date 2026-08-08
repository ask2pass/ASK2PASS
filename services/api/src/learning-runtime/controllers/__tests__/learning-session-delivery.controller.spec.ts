import { LearningRuntimeController } from '../learning-runtime.controller';

describe('LearningRuntimeController - session delivery', () => {
  let controller: LearningRuntimeController;
  let learningRuntimeService: any;

  beforeEach(() => {
    learningRuntimeService = {
      deliverLearningSession: jest.fn().mockResolvedValue({
        authorized: true,
        transactionId: 'transaction-session-1',
        ledgerId: 'ledger-session-1',
        walletId: 'wallet-1',
        coinsConsumed: 2,
        balanceAfter: 8,
        idempotent: false,
        reason: 'LEARNING_SESSION_ORCHESTRATED',
      }),
    };

    controller = new LearningRuntimeController(
      learningRuntimeService,
    );
  });

  it('routes delivery to the production runtime service', async () => {
    const request = {
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning session delivery',
      offline: true,
    };

    const result = await controller.deliverLearningSession(
      request as any,
    );

    expect(
      learningRuntimeService.deliverLearningSession,
    ).toHaveBeenCalledWith(request);

    expect(result.authorized).toBe(true);
    expect(result.reason).toBe('LEARNING_SESSION_ORCHESTRATED');
  });
});
