import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subscription } from './entities/subscription.entity';
import { SubscriptionPlan } from './entities/subscription-plan.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,

    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  getSubscriptionRepository(): Repository<Subscription> {
    return this.subscriptionRepository;
  }

  getSubscriptionPlanRepository(): Repository<SubscriptionPlan> {
    return this.subscriptionPlanRepository;
  }
}
