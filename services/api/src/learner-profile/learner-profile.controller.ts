import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('learner-profile')
export class LearnerProfileController {
  @Post(':userId')
  async createProfile(
    @Param('userId') userId: string,
  ) {
    return {
      message: 'Learner profile creation endpoint scaffolded',
      userId,
    };
  }

  @Get(':userId')
  async getProfile(
    @Param('userId') userId: string,
  ) {
    return {
      userId,
      educationLevel: 'PRIMARY',
      programme: 'School Learning',
      classLevel: 'Primary 1',
      preferredLanguage: 'English',
      adaptiveMode: 'DIFFICULT',
      active: true,
    };
  }
}
