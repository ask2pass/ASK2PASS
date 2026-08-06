import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Membership } from './entities/membership/membership';
import { MembershipStatus } from './enums/membership-status.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  async createTrial(user: User): Promise<Membership> {
    const start = new Date();
    const expiry = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

    const membership = this.membershipRepository.create({
      user,
      status: MembershipStatus.TRIAL,
      accessGranted: true,
      accessStartedAt: start,
      accessExpiresAt: expiry,
      lifetime: false,
      renewalCount: 0,
    });

    return this.membershipRepository.save(membership);
  }

  async getAccessStatus(userId: string) {
    const membership = await this.membershipRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    const now = new Date();

    if (!membership.lifetime && membership.accessExpiresAt < now) {
      membership.accessGranted = false;
      membership.status = MembershipStatus.EXPIRED;
      await this.membershipRepository.save(membership);
    }

    return {
      status: membership.status,
      accessGranted: membership.accessGranted,
      accessExpiresAt: membership.accessExpiresAt,
    };
  }
}
