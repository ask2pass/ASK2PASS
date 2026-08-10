
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class OfflineContinuity1780000000000
  implements MigrationInterface
{
  name = 'OfflineContinuity1780000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('offline_operations'))) {
      await queryRunner.createTable(
        new Table({
          name: 'offline_operations',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'operationId',
              type: 'varchar',
              length: '160',
            },
            {
              name: 'learnerId',
              type: 'varchar',
              length: '160',
            },
            {
              name: 'operationType',
              type: 'varchar',
              length: '40',
            },
            {
              name: 'status',
              type: 'varchar',
              length: '20',
              default: "'QUEUED'",
            },
            {
              name: 'clientVersion',
              type: 'integer',
              default: 1,
            },
            {
              name: 'serverVersion',
              type: 'integer',
              default: 0,
            },
            {
              name: 'payload',
              type: 'jsonb',
            },
            {
              name: 'occurredAt',
              type: 'timestamp',
            },
            {
              name: 'syncedAt',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'error',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );
    }

    let table = await queryRunner.getTable('offline_operations');

    if (
      table &&
      !table.indices.some(
        (index) =>
          index.name === 'IDX_OFFLINE_OPERATIONS_OPERATION_ID',
      )
    ) {
      await queryRunner.createIndex(
        'offline_operations',
        new TableIndex({
          name: 'IDX_OFFLINE_OPERATIONS_OPERATION_ID',
          columnNames: ['operationId'],
          isUnique: true,
        }),
      );
    }

    table = await queryRunner.getTable('offline_operations');

    if (
      table &&
      !table.indices.some(
        (index) =>
          index.name === 'IDX_OFFLINE_OPERATIONS_LEARNER_STATUS',
      )
    ) {
      await queryRunner.createIndex(
        'offline_operations',
        new TableIndex({
          name: 'IDX_OFFLINE_OPERATIONS_LEARNER_STATUS',
          columnNames: ['learnerId', 'status'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('offline_operations')) {
      await queryRunner.dropTable('offline_operations', true);
    }
  }
}
