import { LearningRuntimeService } from '../learning-runtime.service';

describe('LearningRuntimeService - session delivery', () => {
  let service: LearningRuntimeService;
  let orchestrateLearningSession: jest.Mock;

  beforeEach(() => {
    orchestrateLearningSession = jest.fn().mockResolvedValue({
      authorized: true,
      transactionId: 'transaction-session-1',
      ledgerId: 'ledger-session-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: 'LEARNING_SESSION_ORCHESTRATED',
    });

    service = new LearningRuntimeService({
      consume: jest.fn(),
    } as any);

    service.orchestrateLearningSession = orchestrateLearningSession;
  });

  it('delivers an authorized learning session through the orchestration boundary', async () => {
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

    const result = await service.deliverLearningSession(request);

    expect(orchestrateLearningSession).toHaveBeenCalledWith(request);
    expect(result).toEqual({
      authorized: true,
      transactionId: 'transaction-session-1',
      ledgerId: 'ledger-session-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: 'LEARNING_SESSION_ORCHESTRATED',
    });
  });

  it('blocks delivery when orchestration is not authorized', async () => {
    orchestrateLearningSession.mockResolvedValueOnce({
      authorized: false,
      transactionId: null,
      ledgerId: null,
      walletId: 'wallet-1',
      coinsConsumed: 0,
      balanceAfter: 0,
      idempotent: false,
      reason: 'INSUFFICIENT_COIN_BALANCE',
    });

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

    const result = await service.deliverLearningSession(request);

    expect(result.authorized).toBe(false);
    expect(result.reason).toBe('INSUFFICIENT_COIN_BALANCE');
    expect(orchestrateLearningSession).toHaveBeenCalledWith(request);
  });
});
