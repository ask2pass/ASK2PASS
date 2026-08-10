import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class CEDMPersistence1761000000000
  implements MigrationInterface
{
  name = 'CEDMPersistence1761000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasQuestions = await queryRunner.hasTable('cedm_questions');

    if (!hasQuestions) {
      await queryRunner.createTable(
        new Table({
          name: 'cedm_questions',
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
              name: 'questionType',
              type: 'varchar',
            },
            {
              name: 'questionText',
              type: 'text',
            },
            {
              name: 'options',
              type: 'jsonb',
              isNullable: true,
            },
            {
              name: 'correctAnswer',
              type: 'text',
            },
            {
              name: 'explanation',
              type: 'text',
            },
            {
              name: 'sourceType',
              type: 'varchar',
            },
            {
              name: 'licensed',
              type: 'boolean',
              default: false,
            },
            {
              name: 'sourceVerified',
              type: 'boolean',
              default: false,
            },
            {
              name: 'generated',
              type: 'boolean',
              default: false,
            },
            {
              name: 'year',
              type: 'integer',
              isNullable: true,
            },
          ],
        }),
        true,
      );

      await queryRunner.createIndex(
        'cedm_questions',
        new TableIndex({
          name: 'IDX_CEDM_QUESTIONS_SUBJECT_TOPIC',
          columnNames: ['subjectId', 'topicId'],
        }),
      );

      await queryRunner.createIndex(
        'cedm_questions',
        new TableIndex({
          name: 'IDX_CEDM_QUESTIONS_EXAM_SOURCE',
          columnNames: ['examinationType', 'sourceType'],
        }),
      );
    }

    const hasSessions = await queryRunner.hasTable('cedm_sessions');

    if (!hasSessions) {
      await queryRunner.createTable(
        new Table({
          name: 'cedm_sessions',
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
              name: 'topicIds',
              type: 'jsonb',
            },
            {
              name: 'adaptiveMode',
              type: 'varchar',
            },
            {
              name: 'questionSourceType',
              type: 'varchar',
            },
            {
              name: 'status',
              type: 'varchar',
            },
            {
              name: 'currentTopicIndex',
              type: 'integer',
              default: 0,
            },
            {
              name: 'scorePercent',
              type: 'decimal',
              precision: 5,
              scale: 2,
              default: 0,
            },
            {
              name: 'masteryThresholdPercent',
              type: 'decimal',
              precision: 5,
              scale: 2,
              default: 65,
            },
            {
              name: 'continuationRequired',
              type: 'boolean',
              default: true,
            },
          ],
        }),
        true,
      );

      await queryRunner.createIndex(
        'cedm_sessions',
        new TableIndex({
          name: 'IDX_CEDM_SESSIONS_LEARNER_STATUS',
          columnNames: ['learnerId', 'status'],
        }),
      );

      await queryRunner.createIndex(
        'cedm_sessions',
        new TableIndex({
          name: 'IDX_CEDM_SESSIONS_SUBJECT_EXAM',
          columnNames: ['subjectId', 'examinationType'],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('cedm_sessions')) {
      await queryRunner.dropTable('cedm_sessions', true);
    }

    if (await queryRunner.hasTable('cedm_questions')) {
      await queryRunner.dropTable('cedm_questions', true);
    }
  }
}
