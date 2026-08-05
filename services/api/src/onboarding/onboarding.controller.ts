import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { OnboardingService } from './onboarding.service';
import { CompleteOnboardingDto } from './dto/complete-onboarding.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(
    private readonly onboardingService: OnboardingService,
  ) {}

  @Post('complete/:userId')
  async complete(
    @Param('userId') userId: string,
    @Body() dto: CompleteOnboardingDto,
  ) {
    return this.onboardingService.complete(userId, dto);
  }
}
