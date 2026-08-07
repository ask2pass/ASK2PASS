import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { AssessmentType } from '../enums/assessment-type.enum';

import { SAPService } from '../services/sap.service';

@Controller('sap')
export class SAPController {
  constructor(
    private readonly service: SAPService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('initialize')
  initialize(@Body() body: any) {
    return this.service.initialize(
      body,
    );
  }

  @Post('baseline')
  baseline(@Body() body: any) {
    return this.service.prepareBaseline(
      body.context,
    );
  }

  @Post('start-assessment')
  startAssessment(@Body() body: any) {
    return this.service.startAssessment(
      body.context,
    );
  }

  @Post('assessment')
  assessment(@Body() body: any) {
    return this.service.recordAssessment(
      body.context,
      body.score,
      body.maxScore,
      body.assessmentType ??
        AssessmentType.FORMATIVE,
    );
  }

  @Post('complete-assessment')
  completeAssessment(@Body() body: any) {
    return this.service.completeAssessment(
      body.context,
    );
  }

  @Get('profile/:learnerId')
  profile(
    @Body('learnerId') learnerId: string,
  ) {
    return this.service.getProfile(
      learnerId,
    );
  }

  @Post('profile')
  profilePost(@Body() body: any) {
    return this.service.getProfile(
      body.learnerId,
    );
  }

  @Post('assessments')
  assessments(@Body() body: any) {
    return this.service.getAssessments(
      body.learnerId,
    );
  }

  @Post('mastery')
  mastery(@Body() body: any) {
    return this.service.evaluateMastery(
      body.context,
    );
  }

  @Post('result')
  result(@Body() body: any) {
    return this.service.result(
      body.context,
      body.assessmentId ?? null,
      body.success ?? true,
      body.reason ?? null,
    );
  }

  @Post('sync')
  sync(@Body() body: any) {
    return this.service.markSynced(
      body.learnerId,
      body.assessmentId,
    );
  }
}
