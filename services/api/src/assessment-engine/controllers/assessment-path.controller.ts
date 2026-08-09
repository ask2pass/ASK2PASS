import { Body, Controller, Post } from '@nestjs/common';
import { AssessmentPathService } from '../services/assessment-path.service';
import { MonthlyExamPTDMDto } from '../dto/monthly-exam-ptdm.dto';
import { MEDMAccessDto } from '../dto/medm-access.dto';

@Controller('assessment')
export class AssessmentPathController {
  constructor(
    private readonly assessmentPathService: AssessmentPathService,
  ) {}

  @Post('monthly-exam/ptdm')
  routeMonthlyExamToPTDM(@Body() dto: MonthlyExamPTDMDto) {
    return this.assessmentPathService.buildMonthlyExamPTDMContext(
      dto.assessmentId,
      dto.learnerId,
      dto.responseType,
    );
  }

  @Post('medm/access')
  accessMEDM(@Body() dto: MEDMAccessDto) {
    return this.assessmentPathService.buildMEDMAccessContext(dto.learnerId);
  }
}
