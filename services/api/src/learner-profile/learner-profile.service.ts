import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LearnerProfile } from './entities/learner-profile.entity';
import { EducationLevel } from './enums/education-level.enum';
import { LearnerProfileSummary } from './interfaces/learner-profile-summary.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LearnerProfileService {
  constructor(
    @InjectRepository(LearnerProfile)
    private readonly learnerProfileRepository: Repository<LearnerProfile>,
  ) {}

  async createProfile(
    user: User,
    educationLevel: EducationLevel,
    programme: string,
    classLevel: string,
  ): Promise<LearnerProfileSummary> {
    const profile = this.learnerProfileRepository.create({
      user,
      educationLevel,
      programme,
      classLevel,
      preferredLanguage: 'English',
      adaptiveMode: 'DIFFICULT',
      active: true,
    });

    const saved = await this.learnerProfileRepository.save(profile);

    return {
      profileId: saved.id,
      educationLevel: saved.educationLevel,
      programme: saved.programme,
      classLevel: saved.classLevel,
      preferredLanguage: saved.preferredLanguage,
      adaptiveMode: saved.adaptiveMode,
      active: saved.active,
    };
  }
}
