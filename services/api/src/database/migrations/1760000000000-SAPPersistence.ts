import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class SAPPersistence1760000000000 implements MigrationInterface {
  name = 'SAPPersistence1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('sap_assessments'))) {
      await queryRunner.createTable(
        new Table({
          name: 'sap_assessments',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'gen_random_uuid()',
            },
            { name: 'learnerId', type: 'uuid' },
            { name: 'sessionId', type: 'varchar' },
            { name: 'lessonId', type: 'varchar' },
            { name: 'classLevel', type: 'varchar' },
            { name: 'subject', type: 'varchar' },
            { name: 'topic', type: 'varchar' },
            { name: 'assessmentType', type: 'varchar' },
            { name: 'score', type: 'numeric' },
            { name: 'maxScore', type: 'numeric' },
            { name: 'percentage', type: 'numeric' },
            { name: 'completed', type: 'boolean', default: 'false' },
            { name: 'offline', type: 'boolean', default: 'false' },
            {
              name: 'syncStatus',
              type: 'varchar',
              default: "'SYNC_PENDING'",
            },
            {
              name: 'createdAt',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
        true,
      );

      await queryRunner.createIndex(
        'sap_assessments',
        new TableIndex({
          name: 'IDX_sap_assessments_learner',
          columnNames: ['learnerId'],
        }),
      );

      await queryRunner.createIndex(
        'sap_assessments',
        new TableIndex({
          name: 'IDX_sap_assessments_sync',
          columnNames: ['learnerId', 'syncStatus'],
        }),
      );
    }

    if (!(await queryRunner.hasTable('sap_learning_profiles'))) {
      await queryRunner.createTable(
        new Table({
          name: 'sap_learning_profiles',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'gen_random_uuid()',
            },
            { name: 'learnerId', type: 'uuid' },
            { name: 'classLevel', type: 'varchar' },
            { name: 'subject', type: 'varchar' },
            { name: 'topic', type: 'varchar' },
            { name: 'baselineScore', type: 'numeric' },
            { name: 'latestScore', type: 'numeric' },
            { name: 'masteryScore', type: 'numeric' },
            { name: 'masteryStatus', type: 'varchar' },
            { name: 'competencyLevel', type: 'varchar' },
            { name: 'learningGapScore', type: 'numeric' },
            {
              name: 'interventionRequired',
              type: 'boolean',
              default: 'false',
            },
            {
              name: 'personalizedPathRequired',
              type: 'boolean',
              default: 'false',
            },
            { name: 'assessmentCount', type: 'integer', default: 0 },
            {
              name: 'createdAt',
              type: 'timestamp with time zone',
              default: 'now()',
            },
            {
              name: 'updatedAt',
              type: 'timestamp with time zone',
              default: 'now()',
            },
          ],
        }),
        true,
      );

      await queryRunner.createIndex(
        'sap_learning_profiles',
        new TableIndex({
          name: 'IDX_sap_learning_profiles_lookup',
          columnNames: ['learnerId', 'subject', 'topic'],
          isUnique: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('sap_learning_profiles')) {
      await queryRunner.dropTable('sap_learning_profiles', true);
    }

    if (await queryRunner.hasTable('sap_assessments')) {
      await queryRunner.dropTable('sap_assessments', true);
    }
  }
}
