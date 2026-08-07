import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { WalletTransaction } from '../../wallet/entities/wallet-transaction.entity';
import { WalletTransactionType } from '../../wallet/enums/wallet-transaction-type.enum';
import { WalletLedger } from '../../wallet-ledger/entities/wallet-ledger.entity';
import { WalletTransactionSource } from '../../common/enums/wallet-transaction-source.enum';
import { WalletTransactionType as LedgerTransactionType } from '../../common/enums/wallet-transaction-type.enum';
import { CoinMovementType } from '../enums/coin-movement-type.enum';
import { CoinTransactionResult } from '../interfaces/coin-transaction-result.interface';

const COIN_VALUE_NGN = 10;

@Injectable()
export class CoinEconomyService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async transact(
    walletId: string,
    coins: number,
    movementType: CoinMovementType,
    reference: string,
    description: string,
  ): Promise<CoinTransactionResult> {
    if (!Number.isInteger(coins) || coins <= 0) {
      throw new BadRequestException('Coin amount must be a positive integer.');
    }

    if (!reference?.trim()) {
      throw new BadRequestException('Transaction reference is required.');
    }

    return this.dataSource.transaction(async (manager) => {
      const walletRepository = manager.getRepository(Wallet);
      const transactionRepository = manager.getRepository(WalletTransaction);
      const ledgerRepository = manager.getRepository(WalletLedger);

      const existing = await ledgerRepository.findOne({
        where: { reference },
        relations: ['wallet'],
      });

      if (existing) {
        if (existing.wallet.id !== walletId) {
          throw new ConflictException(
            'Transaction reference already belongs to another wallet.',
          );
        }

        const existingTransaction = await transactionRepository.findOne({
          where: { id: existing.id },
        });

        return {
          transactionId: existingTransaction?.id ?? existing.id,
          ledgerId: existing.id,
          walletId,
          coins:
            movementType === CoinMovementType.DEBIT
              ? -coins
              : coins,
          balanceAfter: Number(existing.balanceAfter),
          idempotent: true,
        };
      }

      const wallet = await walletRepository.findOne({
        where: { id: walletId },
      });

      if (!wallet) {
        throw new NotFoundException('Wallet not found.');
      }

      if (!wallet.active) {
        throw new ConflictException('Wallet is inactive.');
      }

      const currentCoins = Number(wallet.totalCoins);

      const isDebit = movementType === CoinMovementType.DEBIT;
      const signedCoins = isDebit ? -coins : coins;
      const nextCoins = currentCoins + signedCoins;

      if (nextCoins < 0) {
        throw new ConflictException('Insufficient A2P Coin balance.');
      }

      const nextBalance = nextCoins * COIN_VALUE_NGN;

      const walletTransaction = transactionRepository.create({
        wallet,
        type:
          movementType === CoinMovementType.REFUND
            ? WalletTransactionType.REFUND
            : isDebit
              ? WalletTransactionType.DEBIT
              : WalletTransactionType.CREDIT,
        coins,
        description,
      });

      const savedTransaction = await transactionRepository.save(
        walletTransaction,
      );

      const ledger = ledgerRepository.create({
        wallet,
        reference,
        transactionType:
          movementType === CoinMovementType.REFUND
            ? LedgerTransactionType.MANUAL_ADJUSTMENT_CREDIT
            : isDebit
              ? LedgerTransactionType.LEARNING_CONSUMPTION
              : LedgerTransactionType.SUBSCRIPTION_ALLOCATION,
        transactionSource:
          isDebit
            ? WalletTransactionSource.LEARNING
            : WalletTransactionSource.SUBSCRIPTION,
        amount: coins * COIN_VALUE_NGN,
        balanceAfter: nextBalance,
        description,
      });

      const savedLedger = await ledgerRepository.save(ledger);

      wallet.totalCoins = nextCoins;
      wallet.balance = nextBalance;
      await walletRepository.save(wallet);

      return {
        transactionId: savedTransaction.id,
        ledgerId: savedLedger.id,
        walletId: wallet.id,
        coins: signedCoins,
        balanceAfter: nextBalance,
        idempotent: false,
      };
    });
  }
}
