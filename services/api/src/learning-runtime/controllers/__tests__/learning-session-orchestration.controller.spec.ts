import { LearningRuntimeController } from '../learning-runtime.controller';

describe('LearningRuntimeController - session orchestration', () => {
  let controller: LearningRuntimeController;
  let learningRuntimeService: any;

  beforeEach(() => {
    learningRuntimeService = {
      orchestrateLearningSession: jest.fn().mockResolvedValue({
        authorized: true,
        transactionId: 'transaction-session-1',
        ledgerId: 'ledger-session-1',
        walletId: 'wallet-1',
        coinsConsumed: 2,
        balanceAfter: 8,
        idempotent: false,
        reason: 'LEARNING_SESSION_EXECUTED',
      }),
    };

    controller = new LearningRuntimeController(learningRuntimeService);
  });

  it('routes orchestration to the production runtime service', async () => {
    const request = {
      walletId: 'wallet-1',
      learnerId: 'learner-1',
      sessionId: 'session-1',
      lessonId: 'lesson-1',
      coins: 2,
      reference: 'LEARN-session-1-lesson-1',
      description: 'Learning session orchestration',
      offline: true,
    };

    const result = await controller.orchestrateLearningSession(request as any);

    expect(
      learningRuntimeService.orchestrateLearningSession,
    ).toHaveBeenCalledWith(request);

    expect(result.authorized).toBe(true);
    expect(result.reason).toBe('LEARNING_SESSION_EXECUTED');
  });
});
