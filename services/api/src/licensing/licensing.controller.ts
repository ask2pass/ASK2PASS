import { Controller, Param, Post } from '@nestjs/common';
import { LicensingService } from './licensing.service';

@Controller('licensing')
export class LicensingController {
  constructor(
    private readonly licensingService: LicensingService,
  ) {}

  @Post(':type/:ownerId')
  async createLicense(
    @Param('type') type: string,
    @Param('ownerId') ownerId: string,
  ) {
    return {
      message: 'License creation endpoint scaffolded',
      ownerId,
      type,
    };
  }
}
