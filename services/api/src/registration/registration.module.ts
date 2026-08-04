import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { IdentityModule } from '../identity/identity.module';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { WalletLedgerModule } from '../wallet-ledger/wallet-ledger.module';
import { SubscriptionModule } from '../subscription/subscription.module';

import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';

@Module({
  imports: [
    AuthModule,
    IdentityModule,
    UserModule,
    WalletModule,
    WalletLedgerModule,
    SubscriptionModule,
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
