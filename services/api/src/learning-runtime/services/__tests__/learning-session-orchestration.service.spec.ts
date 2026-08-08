import { LearningRuntimeService } from '../learning-runtime.service';

describe('LearningRuntimeService - session orchestration', () => {
  let service: LearningRuntimeService;
  let executeLearningSession: jest.Mock;

  beforeEach(() => {
    executeLearningSession = jest.fn().mockResolvedValue({
      authorized: true,
      transactionId: 'transaction-session-1',
      ledgerId: 'ledger-session-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: 'LEARNING_SESSION_EXECUTED',
    });

    service = new LearningRuntimeService({
      consume: jest.fn(),
    } as any);

    service.executeLearningSession = executeLearningSession;
  });

  it('orchestrates an authorized learning session through execution', async () => {
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

    const result = await service.orchestrateLearningSession(request);

    expect(executeLearningSession).toHaveBeenCalledWith(request);
    expect(result).toEqual({
      authorized: true,
      transactionId: 'transaction-session-1',
      ledgerId: 'ledger-session-1',
      walletId: 'wallet-1',
      coinsConsumed: 2,
      balanceAfter: 8,
      idempotent: false,
      reason: 'LEARNING_SESSION_EXECUTED',
    });
  });

  it('stops orchestration when execution is not authorized', async () => {
    executeLearningSession.mockResolvedValueOnce({
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
      description: 'Learning session orchestration',
      offline: true,
    };

    const result = await service.orchestrateLearningSession(request);

    expect(result.authorized).toBe(false);
    expect(result.reason).toBe('INSUFFICIENT_COIN_BALANCE');
    expect(executeLearningSession).toHaveBeenCalledWith(request);
  });
});
