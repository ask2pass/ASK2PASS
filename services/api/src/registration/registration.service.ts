import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { IdentityService } from '../identity/identity.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { WalletService } from '../wallet/wallet.service';
import { WalletLedgerService } from '../wallet-ledger/wallet-ledger.service';

import { UserRole } from '../common/enums/user-role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly identityService: IdentityService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly walletService: WalletService,
    private readonly walletLedgerService: WalletLedgerService,
  ) {}

  async register(dto: RegisterUserDto) {
    const repository = this.userService.getRepository();

    const existing = await repository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const identity = this.identityService.generateIdentity(dto);

    const user = repository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      residentialAddress: dto.residentialAddress,
      passwordHash: await this.authService.hashPassword(dto.password),
      role: UserRole.STUDENT,
      status: AccountStatus.PENDING,
    });

    const savedUser = await repository.save(user);

    const wallet = await this.walletService.createWallet(savedUser);

    const ledger =
      await this.walletLedgerService.createInitialEntry(wallet);

    return {
      message: 'Registration successful',
      userId: savedUser.id,
      identity,
      walletId: wallet.id,
      ledgerId: ledger.id,
      token: this.authService.generateToken(savedUser),
    };
  }
}
