import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class TCCMonthlyExam1762000000000 implements MigrationInterface {
  name = 'TCCMonthlyExam1762000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('tcc_monthly_exam')) return;

    await queryRunner.createTable(
      new Table({
        name: 'tcc_monthly_exam',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'academicSession', type: 'varchar', length: '50' },
          { name: 'monthKey', type: 'varchar', length: '20' },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            default: "'DRAFT'",
          },
          {
            name: 'publishedAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          { name: 'subjects', type: 'jsonb' },
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
      'tcc_monthly_exam',
      new TableIndex({
        name: 'UQ_tcc_monthly_exam_session_month',
        columnNames: ['academicSession', 'monthKey'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('tcc_monthly_exam')) {
      await queryRunner.dropTable('tcc_monthly_exam', true);
    }
  }
}
