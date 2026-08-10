
import { Body, Controller, Post } from '@nestjs/common';
import { BuildAcademicProfileDto } from '../dto/build-academic-profile.dto';
import { AcademicPowerService } from '../services/academic-power.service';

@Controller('academic-power')
export class AcademicPowerController {
  constructor(
    private readonly academicPowerService: AcademicPowerService,
  ) {}

  @Post('profile')
  buildProfile(@Body() dto: BuildAcademicProfileDto) {
    return this.academicPowerService.build(dto);
  }
}
