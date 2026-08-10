
import { OfflineContinuityService } from './offline-continuity.service';

describe('OfflineContinuityService', () => {
  const repository: any = {
    findByOperationId: jest.fn(),
    save: jest.fn(async (value: any) => value),
    findPending: jest.fn(),
  };

  const service = new OfflineContinuityService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('queues an offline operation', async () => {
    repository.findByOperationId.mockResolvedValue(null);

    const result = await service.queue({
      learnerId: 'learner-1',
      operationId: 'op-1',
      operationType: 'LEARNING_RESULT',
      occurredAt: new Date().toISOString(),
      clientVersion: 1,
      payload: { score: 80 },
    });

    expect(result.operationId).toBe('op-1');
    expect(result.status).toBe('QUEUED');
    expect(repository.save).toHaveBeenCalled();
  });

  it('is idempotent for an existing operation', async () => {
    const existing = {
      operationId: 'op-1',
      status: 'SYNCED',
      serverVersion: 2,
    };

    repository.findByOperationId.mockResolvedValue(existing);

    const result = await service.sync('learner-1', [
      {
        learnerId: 'learner-1',
        operationId: 'op-1',
        operationType: 'LEARNING_RESULT',
        occurredAt: new Date().toISOString(),
        clientVersion: 1,
        payload: {},
      },
    ]);

    expect(result.synced).toBe(1);
    expect(result.results[0].replayed).toBe(true);
  });

  it('detects stale-version conflicts', async () => {
    repository.findByOperationId.mockResolvedValue({
      operationId: 'op-2',
      learnerId: 'learner-1',
      operationType: 'LEARNING_RESULT',
      status: 'QUEUED',
      serverVersion: 5,
      clientVersion: 5,
      payload: {},
      occurredAt: new Date(),
      syncedAt: null,
      error: null,
    });

    const result = await service.sync('learner-1', [
      {
        learnerId: 'learner-1',
        operationId: 'op-2',
        operationType: 'LEARNING_RESULT',
        occurredAt: new Date().toISOString(),
        clientVersion: 3,
        payload: {},
      },
    ]);

    expect(result.conflicts).toBe(1);
    expect(result.results[0].status).toBe('CONFLICT');
  });

  it('synchronizes a queued operation', async () => {
    repository.findByOperationId.mockResolvedValue(null);

    const result = await service.sync('learner-1', [
      {
        learnerId: 'learner-1',
        operationId: 'op-3',
        operationType: 'LEARNING_PROGRESS',
        occurredAt: new Date().toISOString(),
        clientVersion: 1,
        payload: { masteryPercent: 72 },
      },
    ]);

    expect(result.processed).toBe(1);
    expect(result.synced).toBe(1);
    expect(result.conflicts).toBe(0);
    expect(result.failed).toBe(0);
  });

  it('recovers pending operations', async () => {
    repository.findPending.mockResolvedValue([
      {
        operationId: 'op-4',
        learnerId: 'learner-1',
        operationType: 'LEARNING_PROGRESS',
        clientVersion: 1,
        payload: { masteryPercent: 60 },
        occurredAt: new Date(),
        status: 'FAILED',
      },
    ]);

    repository.findByOperationId.mockResolvedValue(null);

    const result = await service.recover('learner-1');

    expect(result.processed).toBe(1);
    expect(result.synced).toBe(1);
  });
});
