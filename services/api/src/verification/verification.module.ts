import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

import { VerificationToken } from '../auth/entities/verification-token.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VerificationToken,
      User,
    ]),
  ],
  controllers: [
    VerificationController,
  ],
  providers: [
    VerificationService,
  ],
  exports: [
    VerificationService,
  ],
})
export class VerificationModule {}
