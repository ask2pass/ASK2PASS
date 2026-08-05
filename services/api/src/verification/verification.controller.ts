import { Controller, Post, Body, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller('verification')
export class VerificationController {
  constructor(
    private readonly verificationService: VerificationService,
  ) {}

  @Post('email/generate/:userId')
  async generateEmail(
    @Param('userId') userId: string,
  ) {
    return this.verificationService.generateEmailVerification(userId);
  }

  @Post('phone/generate/:userId')
  async generatePhone(
    @Param('userId') userId: string,
  ) {
    return this.verificationService.generatePhoneVerification(userId);
  }  @Post('email/verify/:userId')
  async verifyEmail(
    @Param('userId') userId: string,
    @Body('code') code: string,
  ) {
    return this.verificationService.verifyEmail(userId, code);
  }

  @Post('phone/verify/:userId')
  async verifyPhone(
    @Param('userId') userId: string,
    @Body('code') code: string,
  ) {
    return this.verificationService.verifyPhone(userId, code);
  }
}
