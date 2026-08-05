import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuditModule,
  ],
  controllers: [
    OnboardingController,
  ],
  providers: [
    OnboardingService,
  ],
  exports: [
    OnboardingService,
  ],
})
export class OnboardingModule {}
