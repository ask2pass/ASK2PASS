import { Module } from '@nestjs/common';
import { LearnerProfileService } from './learner-profile.service';
import { LearnerProfileController } from './learner-profile.controller';

@Module({
  providers: [LearnerProfileService],
  controllers: [LearnerProfileController]
})
export class LearnerProfileModule {}
