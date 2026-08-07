import { MigrationInterface, QueryRunner } from 'typeorm';

export class WalletTransactionReference1760000002000
  implements MigrationInterface
{
  name = 'WalletTransactionReference1760000002000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wallet_transactions" ADD COLUMN IF NOT EXISTS "reference" character varying`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_wallet_transactions_reference" ON "wallet_transactions" ("reference") WHERE "reference" IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_wallet_transactions_reference"`,
    );

    await queryRunner.query(
      `ALTER TABLE "wallet_transactions" DROP COLUMN IF EXISTS "reference"`,
    );
  }
}
