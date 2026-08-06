import { Controller, Param, Post } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

  @Post('plans/:planId/activate/:userId')
  async activate(
    @Param('planId') planId: string,
    @Param('userId') userId: string,
  ) {
    return {
      message: 'Subscription activation endpoint ready',
      userId,
      planId,
    };
  }
}
