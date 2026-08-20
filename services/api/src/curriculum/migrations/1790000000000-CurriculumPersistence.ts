import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class CurriculumPersistence1790000000000
  implements MigrationInterface
{
  name = 'CurriculumPersistence1790000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('curriculum')) {
      return;
    }

    await queryRunner.createTable(
      new Table({
        name: 'curriculum',
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
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'programmeCategory',
            type: 'varchar',
          },
          {
            name: 'examination',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'programme',
            type: 'varchar',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'topic',
            type: 'varchar',
          },
          {
            name: 'lessonTitle',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'curriculum',
      new TableIndex({
        name: 'IDX_curriculum_programme_subject',
        columnNames: ['programme', 'subject'],
      }),
    );

    await queryRunner.createIndex(
      'curriculum',
      new TableIndex({
        name: 'IDX_curriculum_examination',
        columnNames: ['examination'],
      }),
    );

    await queryRunner.createIndex(
      'curriculum',
      new TableIndex({
        name: 'IDX_curriculum_active',
        columnNames: ['active'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('curriculum')) {
      await queryRunner.dropTable('curriculum', true);
    }
  }
}
