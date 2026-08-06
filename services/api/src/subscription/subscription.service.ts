import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscription } from './entities/subscription.entity';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { User } from '../user/entities/user.entity';
import { SubscriptionActivationSummary } from './interfaces/subscription-activation-summary.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async activateSubscription(
    user: User,
    planId: string,
  ): Promise<SubscriptionActivationSummary> {
    const plan = await this.subscriptionPlanRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException('Subscription plan not found');
    }

    const start = new Date();
    const end = new Date(
      start.getTime() + plan.durationDays * 24 * 60 * 60 * 1000,
    );

    const subscription = this.subscriptionRepository.create({
      user,
      plan,
      startDate: start,
      endDate: end,
      accessExpiresAt: end,
      active: true,
      renewalCount: 0,
    });

    const saved = await this.subscriptionRepository.save(subscription);

    return {
      subscriptionId: saved.id,
      active: saved.active,
      accessExpiresAt: saved.accessExpiresAt,
    };
  }
}
