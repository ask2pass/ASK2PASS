import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/entities/user.entity';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async complete(
    userId: string,
    dto: CompleteOnboardingDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.residentialAddress) {
      user.residentialAddress = dto.residentialAddress;
    }

    if (dto.addressOfOrigin) {
      user.addressOfOrigin = dto.addressOfOrigin;
    }

    user.profileCompleted = true;

    return this.userRepository.save(user);
  }
}
