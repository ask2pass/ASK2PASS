import { Controller, Param, Post } from '@nestjs/common';
import { LicensingService } from './licensing.service';
import { LicenseType } from './enums/license-type.enum';

@Controller('licensing')
export class LicensingController {
  constructor(
    private readonly licensingService: LicensingService,
  ) {}

  @Post(':type/:ownerId')
  async createLicense(
    @Param('type') type: LicenseType,
    @Param('ownerId') ownerId: string,
  ) {
    return {
      message: 'Licensing service integration ready',
      ownerId,
      licenseType: type,
    };
  }
}
