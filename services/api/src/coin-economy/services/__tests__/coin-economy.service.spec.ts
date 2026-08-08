import { ConflictException, NotFoundException } from '@nestjs/common';
import { CoinEconomyService } from '../coin-economy.service';
import { CoinMovementType } from '../../enums/coin-movement-type.enum';
import { WalletTransactionType } from '../../../wallet/enums/wallet-transaction-type.enum';
import { WalletTransactionSource } from '../../../common/enums/wallet-transaction-source.enum';
import { WalletTransactionType as LedgerTransactionType } from '../../../common/enums/wallet-transaction-type.enum';

describe('CoinEconomyService', () => {
  let service: CoinEconomyService;
  let manager: any;
  let dataSource: any;
  let walletRepository: any;
  let transactionRepository: any;
  let ledgerRepository: any;

  beforeEach(() => {
    walletRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    transactionRepository = {
      findOne: jest.fn(),
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => ({
        ...value,
        id: 'transaction-1',
      })),
    };

    ledgerRepository = {
      findOne: jest.fn(),
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => ({
        ...value,
        id: 'ledger-1',
      })),
    };

    manager = {
      getRepository: jest.fn((entity: unknown) => {
        if (entity === require('../../../wallet/entities/wallet.entity').Wallet) {
          return walletRepository;
        }

        if (
          entity ===
          require('../../../wallet/entities/wallet-transaction.entity')
            .WalletTransaction
        ) {
          return transactionRepository;
        }

        return ledgerRepository;
      }),
    };

    dataSource = {
      transaction: jest.fn(async (callback: any) => callback(manager)),
    };

    service = new CoinEconomyService(dataSource);
  });

  it('credits coins and updates the wallet atomically', async () => {
    const wallet = {
      id: 'wallet-1',
      totalCoins: 10,
      balance: 100,
      active: true,
    };

    walletRepository.findOne.mockResolvedValue(wallet);
    ledgerRepository.findOne.mockResolvedValue(null);

    const result = await service.transact(
      'wallet-1',
      5,
      CoinMovementType.CREDIT,
      'SUB-001',
      'Subscription allocation',
    );

    expect(result).toEqual({
      transactionId: 'transaction-1',
      ledgerId: 'ledger-1',
      walletId: 'wallet-1',
      coins: 5,
      balanceAfter: 150,
      idempotent: false,
    });

    expect(wallet.totalCoins).toBe(15);
    expect(wallet.balance).toBe(150);
    expect(transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        type: WalletTransactionType.CREDIT,
        coins: 5,
        reference: 'SUB-001',
      }),
    );
    expect(ledgerRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        transactionType: LedgerTransactionType.SUBSCRIPTION_ALLOCATION,
        transactionSource: WalletTransactionSource.SUBSCRIPTION,
        amount: 50,
        balanceAfter: 150,
        reference: 'SUB-001',
      }),
    );
  });

  it('debits coins and blocks insufficient balance', async () => {
    walletRepository.findOne.mockResolvedValue({
      id: 'wallet-1',
      totalCoins: 2,
      balance: 20,
      active: true,
    });

    ledgerRepository.findOne.mockResolvedValue(null);

    await expect(
      service.transact(
        'wallet-1',
        3,
        CoinMovementType.DEBIT,
        'LEARN-001',
        'Learning consumption',
      ),
    ).rejects.toThrow(ConflictException);

    expect(transactionRepository.save).not.toHaveBeenCalled();
    expect(ledgerRepository.save).not.toHaveBeenCalled();
  });

  it('rejects a missing wallet', async () => {
    walletRepository.findOne.mockResolvedValue(null);
    ledgerRepository.findOne.mockResolvedValue(null);

    await expect(
      service.transact(
        'missing-wallet',
        1,
        CoinMovementType.DEBIT,
        'LEARN-002',
        'Learning consumption',
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('returns the original result for an identical reference retry', async () => {
    const wallet = {
      id: 'wallet-1',
      totalCoins: 10,
      balance: 100,
      active: true,
    };

    ledgerRepository.findOne.mockResolvedValue({
      id: 'ledger-1',
      wallet,
      transactionType: LedgerTransactionType.LEARNING_CONSUMPTION,
      amount: 20,
      balanceAfter: 80,
    });

    transactionRepository.findOne.mockResolvedValue({
      id: 'transaction-1',
      wallet,
      reference: 'LEARN-003',
      type: WalletTransactionType.DEBIT,
      coins: 2,
    });

    const result = await service.transact(
      'wallet-1',
      2,
      CoinMovementType.DEBIT,
      'LEARN-003',
      'Learning consumption',
    );

    expect(result.idempotent).toBe(true);
    expect(result.transactionId).toBe('transaction-1');
    expect(result.ledgerId).toBe('ledger-1');
    expect(result.coins).toBe(-2);
    expect(result.balanceAfter).toBe(80);
    expect(walletRepository.findOne).not.toHaveBeenCalled();
  });

  it('rejects reuse of a reference with different coin semantics', async () => {
    const wallet = {
      id: 'wallet-1',
      totalCoins: 10,
      balance: 100,
      active: true,
    };

    ledgerRepository.findOne.mockResolvedValue({
      id: 'ledger-1',
      wallet,
      transactionType: LedgerTransactionType.LEARNING_CONSUMPTION,
      amount: 20,
      balanceAfter: 80,
    });

    transactionRepository.findOne.mockResolvedValue({
      id: 'transaction-1',
      wallet,
      reference: 'LEARN-004',
      type: WalletTransactionType.DEBIT,
      coins: 2,
    });

    await expect(
      service.transact(
        'wallet-1',
        3,
        CoinMovementType.DEBIT,
        'LEARN-004',
        'Learning consumption',
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('rejects inactive wallets', async () => {
    walletRepository.findOne.mockResolvedValue({
      id: 'wallet-1',
      totalCoins: 10,
      balance: 100,
      active: false,
    });

    ledgerRepository.findOne.mockResolvedValue(null);

    await expect(
      service.transact(
        'wallet-1',
        1,
        CoinMovementType.DEBIT,
        'LEARN-005',
        'Learning consumption',
      ),
    ).rejects.toThrow(ConflictException);
  });
});
