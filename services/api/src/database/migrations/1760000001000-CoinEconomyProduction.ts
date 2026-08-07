import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoinEconomyProduction1760000001000
  implements MigrationInterface
{
  name = 'CoinEconomyProduction1760000001000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('wallet_ledger');

    if (table && !table.indices.some((index) => index.name === 'IDX_wallet_ledger_reference')) {
      await queryRunner.query(
        `CREATE UNIQUE INDEX "IDX_wallet_ledger_reference" ON "wallet_ledger" ("reference")`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_wallet_ledger_reference"`,
    );
  }
}
