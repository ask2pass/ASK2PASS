import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuditService } from '../audit/audit.service';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly userService: UserService,
    private readonly auditService: AuditService,
  ) {}

  async complete(userId: string, dto: CompleteOnboardingDto) {
    const repository = this.userService.getRepository();

    const user = await repository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.residentialAddress =
      dto.residentialAddress ?? user.residentialAddress;

    user.addressOfOrigin =
      dto.addressOfOrigin ?? user.addressOfOrigin;

    user.profileCompleted = true;

    const savedUser = await repository.save(user);

    await this.auditService.log(
      'ONBOARDING_COMPLETED',
      savedUser.id,
      {
        profileCompleted: true,
      },
    );

    return {
      message: 'Onboarding completed successfully',
      userId: savedUser.id,
      profileCompleted: savedUser.profileCompleted,
    };
  }
}
