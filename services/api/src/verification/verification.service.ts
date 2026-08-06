import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';

import { User } from '../user/entities/user.entity';
import { VerificationCode } from './entities/verification-code.entity';
import { VerificationType } from './enums/verification-type.enum';
import { VerificationStatus } from './enums/verification-status.enum';

@Injectable()
export class VerificationService {
  private static readonly CODE_LENGTH = 6;
  private static readonly EXPIRY_MINUTES = 10;
  private static readonly MAX_ATTEMPTS = 5;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(VerificationCode)
    private readonly verificationRepository: Repository<VerificationCode>,
  ) {}

  async generateEmailVerification(userId: string) {
    return this.generate(userId, VerificationType.EMAIL);
  }

  async generatePhoneVerification(userId: string) {
    return this.generate(userId, VerificationType.PHONE);
  }

  async verifyEmail(userId: string, code: string) {
    return this.verify(userId, VerificationType.EMAIL, code);
  }

  async verifyPhone(userId: string, code: string) {
    return this.verify(userId, VerificationType.PHONE, code);
  }  private async generate(
    userId: string,
    type: VerificationType,
  ): Promise<VerificationCode> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.verificationRepository.update(
      {
        userId,
        type,
        status: VerificationStatus.PENDING,
      },
      {
        status: VerificationStatus.EXPIRED,
      },
    );

    const code = this.generateCode();

    const expiresAt = new Date();
    expiresAt.setMinutes(
      expiresAt.getMinutes() + VerificationService.EXPIRY_MINUTES,
    );

    const verification = this.verificationRepository.create({
      userId,
      type,
      code,
      expiresAt,
      attempts: 0,
      status: VerificationStatus.PENDING,
    });

    return this.verificationRepository.save(verification);
  }  private async verify(
    userId: string,
    type: VerificationType,
    code: string,
  ): Promise<boolean> {
    const record = await this.verificationRepository.findOne({
      where: {
        userId,
        type,
        status: VerificationStatus.PENDING,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!record) {
      throw new BadRequestException(
        'Verification code not found.',
      );
    }

    if (record.expiresAt.getTime() < Date.now()) {
      record.status = VerificationStatus.EXPIRED;
      await this.verificationRepository.save(record);

      throw new BadRequestException(
        'Verification code has expired.',
      );
    }

    if (record.attempts >= VerificationService.MAX_ATTEMPTS) {
      record.status = VerificationStatus.FAILED;
      await this.verificationRepository.save(record);

      throw new BadRequestException(
        'Maximum verification attempts exceeded.',
      );
    }

    record.attempts++;

    if (record.code !== code) {
      await this.verificationRepository.save(record);

      throw new BadRequestException(
        'Invalid verification code.',
      );
    }

    record.status = VerificationStatus.VERIFIED;
    await this.verificationRepository.save(record);    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (type === VerificationType.EMAIL) {
      user.emailVerified = true;
    }

    if (type === VerificationType.PHONE) {
      user.phoneVerified = true;
    }

    await this.userRepository.save(user);

    return true;
  }

  private generateCode(): string {
    const min = 10 ** (VerificationService.CODE_LENGTH - 1);
    const max = 10 ** VerificationService.CODE_LENGTH;

    return randomInt(min, max).toString();
  }
}
