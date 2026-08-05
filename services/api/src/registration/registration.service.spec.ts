import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationService } from './registration.service';
import { AuditService } from '../audit/audit.service';
import { WalletLedgerService } from '../wallet-ledger/wallet-ledger.service';
import { WalletService } from '../wallet/wallet.service';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { IdentityService } from '../identity/identity.service';

describe('RegistrationService', () => {
  let service: RegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationService,
        { provide: IdentityService, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: WalletService, useValue: {} },
        { provide: WalletLedgerService, useValue: {} },
        { provide: AuditService, useValue: {} },
      ],
    }).compile();

    service = module.get<RegistrationService>(RegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
