import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscription } from './entities/subscription.entity';
import { SubscriptionPlan } from './entities/subscription-plan.entity';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      SubscriptionPlan,
    ]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService, TypeOrmModule],
})
export class SubscriptionModule {}
