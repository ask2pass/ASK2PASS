import { Body, Controller, Post } from '@nestjs/common';
import { ResumeCEDMDto } from '../dto/resume-cedm.dto';
import { CEDMContinuityService } from '../services/cedm-continuity.service';

@Controller('assessment/cedm/continuity')
export class CEDMContinuityController {
  constructor(
    private readonly continuityService: CEDMContinuityService,
  ) {}

  @Post('resume')
  resume(@Body() dto: ResumeCEDMDto) {
    return this.continuityService.resume(
      dto.sessionId,
      dto.learnerId,
    );
  }
}
