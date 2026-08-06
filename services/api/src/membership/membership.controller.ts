import { Controller, Get, Param } from '@nestjs/common';
import { MembershipService } from './membership.service';

@Controller('membership')
export class MembershipController {
  constructor(
    private readonly membershipService: MembershipService,
  ) {}

  @Get('access/:userId')
  async getAccess(@Param('userId') userId: string) {
    return this.membershipService.getAccessStatus(userId);
  }
}
