
import { QueueOfflineOperationDto } from '../dto/queue-offline-operation.dto';
import {
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { OfflineOperationEntity } from '../entities/offline-operation.entity';
import { OfflineOperationRepository } from '../repositories/offline-operation.repository';

import {
  OfflineSyncResponse,
  OfflineSyncResult,
} from '../interfaces/offline-continuity.interface';

@Injectable()
export class OfflineContinuityService {
  private readonly logger = new Logger(OfflineContinuityService.name);
  private readonly version = 1;

  constructor(
    private readonly repository: OfflineOperationRepository,
  ) {}

  async queue(dto: QueueOfflineOperationDto): Promise<OfflineOperationEntity> {
    const existing = await this.repository.findByOperationId(dto.operationId);

    // Idempotency:
    // Re-submitting an already-known operation never creates a duplicate.
    if (existing) {
      return existing;
    }

    const entity = new OfflineOperationEntity();

    entity.operationId = dto.operationId;
    entity.learnerId = dto.learnerId;
    entity.operationType = dto.operationType;
    entity.status = 'QUEUED';
    entity.clientVersion = dto.clientVersion;
    entity.serverVersion = 0;
    entity.payload = dto.payload;
    entity.occurredAt = new Date(dto.occurredAt);
    entity.syncedAt = null;
    entity.error = null;

    return this.repository.save(entity);
  }

  async sync(
    learnerId: string,
    operations: QueueOfflineOperationDto[],
  ): Promise<OfflineSyncResponse> {
    const results: OfflineSyncResult[] = [];

    for (const operation of operations) {
      if (operation.learnerId !== learnerId) {
        results.push({
          operationId: operation.operationId,
          status: 'FAILED',
          serverVersion: 0,
          conflict: false,
          replayed: false,
          message: 'Learner identity mismatch.',
        });
        continue;
      }

      const existing = await this.repository.findByOperationId(
        operation.operationId,
      );

      // Idempotent replay.
      if (existing?.status === 'SYNCED') {
        results.push({
          operationId: operation.operationId,
          status: 'SYNCED',
          serverVersion: existing.serverVersion,
          conflict: false,
          replayed: true,
          message: 'Operation already synchronized; duplicate ignored.',
        });
        continue;
      }

      try {
        const entity =
          existing ??
          (await this.queue(operation));

        // Deterministic optimistic-concurrency rule.
        //
        // A client may replay the operation when its version is exactly
        // the next version or when the server has not yet accepted it.
        //
        // A version older than the current server state is a conflict.
        if (
          entity.serverVersion > 0 &&
          operation.clientVersion < entity.serverVersion
        ) {
          entity.status = 'CONFLICT';
          entity.error =
            'Client operation version is older than the synchronized server version.';
          await this.repository.save(entity);

          results.push({
            operationId: operation.operationId,
            status: 'CONFLICT',
            serverVersion: entity.serverVersion,
            conflict: true,
            replayed: false,
            message: entity.error,
          });

          continue;
        }

        entity.status = 'SYNCING';
        await this.repository.save(entity);

        /*
         * The operation is accepted as the canonical synchronization
         * boundary. Existing learning, progress, adaptive and delivery
         * services remain the domain owners of their respective logic.
         *
         * This continuity layer guarantees:
         * - durable queueing
         * - ordering
         * - idempotency
         * - version protection
         * - deterministic recovery
         */

        entity.serverVersion = Math.max(
          entity.serverVersion + 1,
          operation.clientVersion,
        );

        entity.status = 'SYNCED';
        entity.syncedAt = new Date();
        entity.error = null;

        await this.repository.save(entity);

        results.push({
          operationId: operation.operationId,
          status: 'SYNCED',
          serverVersion: entity.serverVersion,
          conflict: false,
          replayed: false,
          message: 'Offline operation synchronized successfully.',
        });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown synchronization error.';

        this.logger.error(
          `Offline synchronization failed for ${operation.operationId}: ${message}`,
        );

        results.push({
          operationId: operation.operationId,
          status: 'FAILED',
          serverVersion: existing?.serverVersion ?? 0,
          conflict: false,
          replayed: false,
          message,
        });
      }
    }

    return {
      learnerId,
      processed: results.length,
      synced: results.filter((r) => r.status === 'SYNCED').length,
      conflicts: results.filter((r) => r.status === 'CONFLICT').length,
      failed: results.filter((r) => r.status === 'FAILED').length,
      results,
      generatedAt: new Date().toISOString(),
      version: this.version,
    };
  }

  async recover(learnerId: string): Promise<OfflineSyncResponse> {
    const pending = await this.repository.findPending(learnerId);

    const operations: QueueOfflineOperationDto[] = pending.map((record) => ({
      learnerId: record.learnerId,
      operationId: record.operationId,
      operationType: record.operationType,
      occurredAt: record.occurredAt.toISOString(),
      clientVersion: record.clientVersion,
      payload: record.payload,
    }));

    return this.sync(learnerId, operations);
  }
}
