import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { LearningPathService } from './learning-path.service';
import { CreateDailySubjectChartDto } from './dto/create-daily-subject-chart.dto';
import { CreateLearningSessionDto } from './dto/create-learning-session.dto';
import { RecordLearningInterruptionDto } from './dto/record-learning-interruption.dto';
import { RequestRecoverySpreadDto } from './dto/request-recovery-spread.dto';
import { SessionProgress } from './interfaces/session-progress.interface';
import type { AATInterruptionResponse } from './interfaces/aat-interruption-response.interface';

@Controller('learning-path')
export class LearningPathController {
  constructor(
    private readonly learningPathService: LearningPathService,
  ) {}

  @Get('policy')
  getLearningPolicy() {
    return this.learningPathService.getLearningPolicy();
  }

  @Post('engagement/state')
  buildEngagementState(
    @Body()
    body: {
      sessionId: string;
      learnerId: string;
      learnerFirstName: string;
      phase: any;
      consecutiveMissedChecks: number;
    },
  ) {
    return this.learningPathService.buildEngagementState(
      body.sessionId,
      body.learnerId,
      body.learnerFirstName,
      body.phase,
      body.consecutiveMissedChecks,
    );
  }

  @Post('recovery/decision')
  decideRecoverySpread(
    @Body()
    body: {
      remainingRecoverySubjects: number;
      spreadDays: number;
      remainingTermDays: number;
    },
  ) {
    return this.learningPathService.decideRecoverySpread(
      body.remainingRecoverySubjects,
      body.spreadDays,
      body.remainingTermDays,
    );
  }

  @Post('award/eligibility')
  evaluateAwardEligibility(
    @Body()
    body: { academicPerformancePercent: number },
  ) {
    return {
      eligible:
        this.learningPathService.evaluateAwardEligibility(
          body.academicPerformancePercent,
        ),
    };
  }

  @Get('path/:learnerId/:academicTermId')
  getLearningPath(
    @Param('learnerId') learnerId: string,
    @Param('academicTermId') academicTermId: string,
  ) {
    return this.learningPathService.getLearningPath(
      learnerId,
      academicTermId,
    );
  }

  @Get('dsc/:chartId')
  getDailySubjectChart(
    @Param('chartId') chartId: string,
  ) {
    return this.learningPathService.getDailySubjectChart(chartId);
  }

  @Get('session/:sessionId')
  getLearningSession(
    @Param('sessionId') sessionId: string,
  ) {
    return this.learningPathService.getLearningSession(sessionId);
  }

  @Post('session/:sessionId/progress')
  updateProgress(
    @Param('sessionId') sessionId: string,
    @Body()
    body: {
      lessonElapsedSeconds: number;
      revisionElapsedSeconds: number;
      quizCompleted: boolean;
    },
  ): Promise<SessionProgress> {
    return this.learningPathService.updateProgress(
      sessionId,
      body.lessonElapsedSeconds,
      body.revisionElapsedSeconds,
      body.quizCompleted,
    );
  }

  @Post('session/:sessionId/engagement')
  processEngagement(
    @Param('sessionId') sessionId: string,
    @Body()
    body: {
      consecutiveMissedChecks: number;
    },
  ) {
    return this.learningPathService.processEngagement(
      sessionId,
      body.consecutiveMissedChecks,
    );
  }

  @Post('streak/evaluate')
  evaluateStreak(
    @Body()
    body: {
      learnerId: string;
      chartDate: string;
      requiredSubjectCount: number;
      completedSubjectCount: number;
      autoLogoutOccurred: boolean;
    },
  ) {
    return this.learningPathService.evaluateStreak(
      body.learnerId,
      body.chartDate,
      body.requiredSubjectCount,
      body.completedSubjectCount,
      body.autoLogoutOccurred,
    );
  }

  @Post('interruption/response')
  buildInterruptionResponse(
    @Body() body: RecordLearningInterruptionDto,
  ): AATInterruptionResponse {
    return this.learningPathService.buildInterruptionResponse(
      body.sessionId,
      body.learnerId,
      body.learnerFirstName,
      true,
    );
  }
}
