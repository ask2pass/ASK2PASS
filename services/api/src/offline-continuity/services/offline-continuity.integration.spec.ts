
import { OfflineContinuityService } from './offline-continuity.service';

describe('Offline-first continuity integration contract', () => {
  it('supports queue -> sync -> idempotent replay', async () => {
    const store = new Map<string, any>();

    const repository: any = {
      findByOperationId: jest.fn(
        async (id: string) => store.get(id) ?? null,
      ),
      save: jest.fn(async (entity: any) => {
        store.set(entity.operationId, {
          ...entity,
        });
        return entity;
      }),
      findPending: jest.fn(async () => [...store.values()]),
    };

    const service = new OfflineContinuityService(repository);

    const operation = {
      learnerId: 'learner-1',
      operationId: 'offline-op-1',
      operationType: 'LEARNING_RESULT' as const,
      occurredAt: new Date().toISOString(),
      clientVersion: 1,
      payload: {
        subjectId: 'mathematics',
        topicId: 'algebra',
        masteryPercent: 75,
      },
    };

    const first = await service.sync(
      'learner-1',
      [operation],
    );

    expect(first.synced).toBe(1);

    const second = await service.sync(
      'learner-1',
      [operation],
    );

    expect(second.synced).toBe(1);
    expect(second.results[0].replayed).toBe(true);
  });
});
