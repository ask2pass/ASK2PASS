import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LearnerProfile } from './entities/learner-profile.entity';
import { LearnerProfileController } from './learner-profile.controller';
import { LearnerProfileService } from './learner-profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearnerProfile,
    ]),
  ],
  controllers: [LearnerProfileController],
  providers: [LearnerProfileService],
  exports: [LearnerProfileService],
})
export class LearnerProfileModule {}
