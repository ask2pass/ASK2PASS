import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';

import { IdentityService } from '../identity/identity.service';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { WalletLedgerService } from '../wallet-ledger/wallet-ledger.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly identityService: IdentityService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly walletLedgerService: WalletLedgerService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const identity = this.identityService.generateIdentity(registerUserDto);

    return {
      message: 'Registration workflow initialized.',
      identity,
      data: registerUserDto,
    };
  }
}
