import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { IdentityService } from '../identity/identity.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

import { UserRole } from '../common/enums/user-role.enum';
import { AccountStatus } from '../common/enums/account-status.enum';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly identityService: IdentityService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async register(dto: RegisterUserDto) {
    const repository = this.userService.getRepository();

    const existing = await repository.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('User already exists');
    }

    const identity =
      this.identityService.generateIdentity(dto);

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

    const savedUser =
      await repository.save(user);

    return {
      message: 'Registration successful',
      userId: savedUser.id,
      identity,
      token: this.authService.generateToken(savedUser),
    };
  }
}
