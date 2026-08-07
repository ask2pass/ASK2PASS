import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { SAPLearningIntegrationService } from '../services/sap-learning-integration.service';

@Controller('sap-learning')
export class SAPLearningIntegrationController {
  constructor(
    private readonly service: SAPLearningIntegrationService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('initialize')
  initialize(@Body() body: any) {
    return this.service.initialize(body);
  }

  @Post('activate')
  activate(@Body() body: any) {
    return this.service.activate(body);
  }

  @Post('begin-assessment')
  beginAssessment(@Body() body: any) {
    return this.service.beginAssessment(body);
  }

  @Post('assessment')
  assessment(@Body() body: any) {
    return this.service.recordAssessment(body);
  }

  @Post('complete-lesson')
  completeLesson(@Body() body: any) {
    return this.service.completeLesson(body);
  }

  @Post('mastery')
  mastery(@Body() body: any) {
    return this.service.evaluateMastery(body);
  }

  @Post('begin-cbt')
  beginCBT(@Body() body: any) {
    return this.service.beginCBT(body);
  }

  @Post('complete-cbt')
  completeCBT(@Body() body: any) {
    return this.service.completeCBT(body);
  }

  @Post('complete')
  complete(@Body() body: any) {
    return this.service.complete(body);
  }
}
