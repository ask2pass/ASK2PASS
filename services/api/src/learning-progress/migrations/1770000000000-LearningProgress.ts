import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class LearningProgress1770000000000
  implements MigrationInterface
{
  name = 'LearningProgress1770000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('learning_progress'))) {
      await queryRunner.createTable(
        new Table({
          name: 'learning_progress',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
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
            {
              name: 'learnerId',
              type: 'varchar',
            },
            {
              name: 'examinationType',
              type: 'varchar',
            },
            {
              name: 'subjectId',
              type: 'varchar',
            },
            {
              name: 'topicId',
              type: 'varchar',
            },
            {
              name: 'masteryPercent',
              type: 'decimal',
              precision: 5,
              scale: 2,
              default: 0,
            },
            {
              name: 'attempts',
              type: 'integer',
              default: 0,
            },
            {
              name: 'correctAttempts',
              type: 'integer',
              default: 0,
            },
            {
              name: 'completed',
              type: 'boolean',
              default: false,
            },
            {
              name: 'recommendedAction',
              type: 'varchar',
              default: "'LEARN'",
            },
          ],
        }),
        true,
      );
    }

    const table = await queryRunner.getTable('learning_progress');

    if (
      table &&
      !table.indices.some(
        (index) =>
          index.name === 'IDX_LEARNING_PROGRESS_LEARNER_TOPIC',
      )
    ) {
      await queryRunner.createIndex(
        'learning_progress',
        new TableIndex({
          name: 'IDX_LEARNING_PROGRESS_LEARNER_TOPIC',
          columnNames: ['learnerId', 'subjectId', 'topicId'],
          isUnique: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('learning_progress')) {
      await queryRunner.dropTable('learning_progress', true);
    }
  }
}
