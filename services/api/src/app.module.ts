import { Module } from '@nestjs/common';
import { CurriculumContentModule } from './curriculum-content/curriculum-content.module';
import { AssessmentEngineModule } from './assessment-engine/assessment-engine.module';
import { CurriculumControlModule } from './curriculum-control/curriculum-control.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { WalletLedgerModule } from './wallet-ledger/wallet-ledger.module';
import { RegistrationModule } from './registration/registration.module';
import { IdentityModule } from './identity/identity.module';
import { RolesModule } from './roles/roles.module';
import { AuditModule } from './audit/audit.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { VerificationModule } from './verification/verification.module';
import { MembershipModule } from './membership/membership.module';
import { PaymentModule } from './payment/payment.module';
import { LicensingModule } from './licensing/licensing.module';
import { LearnerProfileModule } from './learner-profile/learner-profile.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { LearningPathModule } from './learning-path/learning-path.module';

@Module({
  imports: [
CurriculumContentModule,
AssessmentEngineModule,
CurriculumControlModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),

    TypeOrmModule.forRootAsync({
      imports: [
CurriculumContentModule,
AssessmentEngineModule,
CurriculumControlModule,ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.getOrThrow<string>('database.host'),
          port: config.getOrThrow<number>('database.port'),
          username: config.getOrThrow<string>('database.username'),
          password: config.getOrThrow<string>('database.password'),
          database: config.getOrThrow<string>('database.name'),
          schema: config.getOrThrow<string>('database.schema'),
          synchronize: config.getOrThrow<boolean>('database.synchronize'),
          logging: config.getOrThrow<boolean>('database.logging'),
          autoLoadEntities: true,
        };
      },
    }),

    UserModule,

    AuthModule,

    WalletModule,

    SubscriptionModule,

    WalletLedgerModule,

    RegistrationModule,

    IdentityModule,


    RolesModule,

    AuditModule,

    DatabaseModule,

    CommonModule,

    OnboardingModule,

    VerificationModule,

    MembershipModule,

    PaymentModule,

    LicensingModule,

    LearnerProfileModule,

    CurriculumModule,

    LearningPathModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
