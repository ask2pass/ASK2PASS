import { Injectable } from '@nestjs/common';

import { RegisterUserDto } from '../registration/dto/register-user.dto';
import { IdentityResult } from './interfaces/identity-result.interface';
import { IdentityGenerator } from './utils/identity-generator.util';

@Injectable()
export class IdentityService {
  generateIdentity(
    registerUserDto: RegisterUserDto,
  ): IdentityResult {
    return {
      id: IdentityGenerator.generate(),
      stateCode: registerUserDto.stateOfResidence,
      lgaCode: registerUserDto.lgaOfResidence,
      gbaCode: '',
      onboardingChannel: registerUserDto.onboardingChannel,
      referralCode: '',
      referralLink: '',
    };
  }
}
