import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BMLearningService } from '../services/bm-learning.service';
import { BMAssessmentService } from '../services/bm-assessment.service';
import { BMCompetencyService } from '../services/bm-competency.service';
import { BMAutoEngineService } from '../services/bm-auto-engine.service';
import { BMSAPGateService } from '../services/bm-sap-gate.service';
import { BMAutoEngineAccessService } from '../services/bm-auto-engine-access.service';
import { BMProgressService } from '../services/bm-progress.service';
import { BMActivityType } from '../enums/bm-activity-type.enum';
import type { BMAutoEngineRequest } from '../interfaces/bm-auto-engine.interface';

@Controller('business-modelling')
export class BusinessModellingController {
  constructor(
    private readonly learning: BMLearningService,
    private readonly assessment: BMAssessmentService,
    private readonly competency: BMCompetencyService,
    private readonly autoEngine: BMAutoEngineService,
    private readonly sapGateService: BMSAPGateService,
    private readonly autoAccess: BMAutoEngineAccessService,
    private readonly progress: BMProgressService,
  ) {}

  @Get('curriculum')
  curriculum() {
    return this.learning.getCurriculum();
  }

  @Get('sap-requirements')
  sapRequirements() {
    return {
      compulsory: true,
      activities: this.learning.getRequiredSAPActivities(),
      assessment: this.assessment.getAssessmentPolicy(),
    };
  }


  @Get('learning/progress/:learnerId')
  learningProgress(@Param('learnerId') learnerId: string) {
    return this.progress.get(learnerId);
  }

  @Post('learning/activity/complete')
  completeActivity(@Body() body: {
    learnerId: string;
    activity: BMActivityType;
    sapUser?: boolean;
  }) {
    return this.progress.completeActivity(
      body.learnerId,
      body.activity,
      body.sapUser ?? false,
    );
  }

  @Post('learning/practical')
  completePractical(@Body() body: {
    learnerId: string;
    passed: boolean;
    sapUser?: boolean;
  }) {
    return this.progress.completePractical(
      body.learnerId,
      body.passed,
      body.sapUser ?? false,
    );
  }

  @Post('learning/exam')
  recordExam(@Body() body: {
    learnerId: string;
    score: number;
    sapUser?: boolean;
  }) {
    return this.progress.recordExam(
      body.learnerId,
      body.score,
      body.sapUser ?? false,
    );
  }

  @Post('assessment/evaluate')
  evaluateAssessment(@Body() body: { score: number }) {
    return this.assessment.evaluate(body.score);
  }

  @Post('competency/evaluate')
  evaluateCompetency(
    @Body()
    body: {
      activitiesCompleted: number;
      activitiesRequired: number;
      examPassed: boolean;
      practicalPassed: boolean;
    },
  ) {
    return this.competency.evaluate(
      body.activitiesCompleted,
      body.activitiesRequired,
      body.examPassed,
      body.practicalPassed,
    );
  }

  @Post('sap-gate')
  sapGate(
    @Body()
    body: {
      sapUser: boolean;
      activitiesCompleted: number;
      activitiesRequired: number;
      examPassed: boolean;
    },
  ) {
    return this.sapGateService.evaluate(body);
  }
  @Post('auto-engine/compare')
  compareAutoEngine(@Body() body: { requests: BMAutoEngineRequest[] }) {
    return {
      allowed: true,
      scenarios: this.autoEngine.compare(body.requests),
    };
  }

  @Post('auto-engine/calculate')
  autoCalculate(@Body() body: BMAutoEngineRequest) {
    const access = this.autoAccess.canUse({
      role: body.role,
      subscriber: body.subscriber,
    });

    if (!access.allowed) {
      return {
        allowed: false,
        reason: access.reason,
        output: null,
      };
    }

    return {
      allowed: true,
      ...this.autoEngine.calculate(body),
    };
  }

}
