import { Test, TestingModule } from '@nestjs/testing';
import { WalletLedgerService } from './wallet-ledger.service';

describe('WalletLedgerService', () => {
  let service: WalletLedgerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletLedgerService,
        {
          provide: 'WalletLedgerRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<WalletLedgerService>(WalletLedgerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
