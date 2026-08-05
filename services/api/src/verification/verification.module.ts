import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';

import { VerificationCode } from './entities/verification-code.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VerificationCode,
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
