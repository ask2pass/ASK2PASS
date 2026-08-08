import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningRuntimeService } from '../services/learning-runtime.service';
import { LearningSessionConsumptionDto } from '../dto/learning-session-consumption.dto';
import { LearningSessionExecutionDto } from '../dto/learning-session-execution.dto';
import { LearningSessionOrchestrationDto } from '../dto/learning-session-orchestration.dto';
import { LearningSessionDeliveryDto } from '../dto/learning-session-delivery.dto';
import { LearningSessionStateDto } from '../dto/learning-session-state.dto';
import { LearningSessionTransitionDto } from '../dto/learning-session-transition.dto';
import { LearningSessionLifecycleDto } from '../dto/learning-session-lifecycle.dto';
import { LearningSessionAatInteractionDto } from '../dto/learning-session-aat-interaction.dto';
import { LearningSessionContinuityDto } from '../dto/learning-session-continuity.dto';
import { LearningSessionCycleDto } from '../dto/learning-session-cycle.dto';
import { AatAcademicPowerCbtDto } from '../dto/aat-academic-power-cbt.dto';
import { LearningSessionService } from '../services/learning-session.service';

@Controller('learning-runtime')
export class LearningRuntimeController {

  @Post('aat/question-policy')
  questionPolicy(@Body() request: LearningSessionAatInteractionDto) {
    return this.sessionService.classifyLessonQuestion(
      request.question,
      request.lessonContext,
    );
  }

  @Post('aat/familiarity')
  familiarity(@Body() request: LearningSessionAatInteractionDto) {
    return this.sessionService.getAatFamiliarityContext(
      request.learnerId,
      request.subject,
      request.module,
      'LESSON',
    );
  }

  @Post('academic-power-cbt')
  academicPowerCbt(@Body() request: AatAcademicPowerCbtDto) {
    return this.sessionService.getAcademicPowerCbtContract(
      request.learnerId,
      request.sessionId,
      request.subject,
      request.module,
      request.lessonContext,
    );
  }

  @Post('academic-power-cbt/question')
  academicPowerCbtQuestion(
    @Body()
    request: {
      questionNumber: number;
      lessonContext: string;
      dimension: string;
    },
  ) {
    return this.sessionService.getAcademicPowerCbtQuestionContract(
      request.questionNumber,
      request.lessonContext,
      request.dimension,
    );
  }

  @Post('academic-power-cbt/ptdm-continuation')
  academicPowerCbtPtdmContinuation(
    @Body()
    request: {
      learnerId: string;
      sessionId: string;
      subject: string;
      module: string;
      lessonContext: string;
      questionNumber: number;
      outcome: string;
    },
  ) {
    return this.sessionService.getPtdmContinuationFromCbt(
      request.learnerId,
      request.sessionId,
      request.subject,
      request.module,
      request.lessonContext,
      request.questionNumber,
      request.outcome,
    );
  }

  @Post('learning-cycle')
  learningCycle(@Body() request: LearningSessionCycleDto) {
    return this.sessionService.getFortyMinuteLearningCycle(
      request.learnerId,
      request.sessionId,
      request.subject,
      request.module,
      request.lessonContext,
    );
  }

  @Post('learning-cycle/stage')
  learningCycleStage(@Body() request: { stage: string }) {
    return this.sessionService.getLearningCycleStage(request.stage);
  }

  @Post('learning-cycle/cbt-validation')
  validateCbtQuestionCount(@Body() request: { questionCount: number }) {
    return this.sessionService.validateCbtQuestionCount(
      request.questionCount,
    );
  }

  @Post('return-from-ptdm')
  async returnFromPtdm(
    @Body() request: LearningSessionContinuityDto,
  ) {
    const session = await this.sessionService.returnFromPtdm(
      request.sessionId,
      request.learnerId,
    );

    return {
      session,
      destination: 'LESSON',
      lessonResumed: true,
      familiarity: this.sessionService.getSessionContinuityContext(
        request.learnerId,
        request.sessionId,
        request.subject,
        request.module,
        request.lessonContext,
        'LESSON',
      ),
    };
  }

  @Post('continuity')
  continuity(@Body() request: LearningSessionContinuityDto) {
    return this.sessionService.getSessionContinuityContext(
      request.learnerId,
      request.sessionId,
      request.subject,
      request.module,
      request.lessonContext,
      'LESSON',
    );
  }

  @Post('enter-ptdm')
  async enterPtdm(@Body() request: LearningSessionAatInteractionDto) {
    const session = await this.sessionService.enterPtdm(
      request.sessionId,
      request.learnerId,
    );

    return {
      session,
      destination: 'PTDM',
      lessonPaused: true,
      familiarity: this.sessionService.getAatFamiliarityContext(
        request.learnerId,
        request.subject,
        request.module,
        'PTDM',
      ),
    };
  }

  @Post('resume-session')
  async resumeLearningSession(
    @Body() request: LearningSessionLifecycleDto,
  ) {
    return this.sessionService.resumeSession(
      request.sessionId,
      request.learnerId,
    );
  }

  @Post('pause-session')
  async pauseLearningSession(
    @Body() request: LearningSessionLifecycleDto,
  ) {
    return this.sessionService.pauseSession(
      request.sessionId,
      request.learnerId,
    );
  }

  @Post('transition-session')
  async transitionLearningSession(
    @Body() request: LearningSessionTransitionDto,
  ) {
    return this.sessionService.transition(
      request.sessionId,
      request.learnerId,
      request.status,
      request.description,
    );
  }


  @Post('session-state')
  async getLearningSessionState(
    @Body() request: LearningSessionStateDto,
  ) {
    return this.service.getLearningSessionState(request);
  }


  @Post('deliver-session')
  async deliverLearningSession(
    @Body() request: LearningSessionDeliveryDto,
  ) {
    return this.service.deliverLearningSession(request);
  }


  @Post('orchestrate-session')
  async orchestrateLearningSession(
    @Body() request: LearningSessionOrchestrationDto,
  ) {
    return this.service.orchestrateLearningSession(request);
  }


  @Post('execute-session')
  async executeLearningSession(
    @Body() request: LearningSessionExecutionDto,
  ) {
    return this.service.executeLearningSession(request);
  }



  @Post('consume-coins')
  async consumeLearningCoins(
    @Body() request: LearningSessionConsumptionDto,
  ) {
    return this.service.consumeLearningCoins(request);
  }


  constructor(
    private readonly service: LearningRuntimeService,
    private readonly sessionService: LearningSessionService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('create')
  create(@Body() body: any) {
    return this.service.createRuntimeContext(body);
  }

  @Post('transition')
  transition(@Body() body: any) {
    return this.service.transition(
      body.context,
      body.nextState,
    );
  }

  @Post('resume')
  resume(@Body() body: any) {
    return this.service.resume(
      body.context,
    );
  }

  @Post('position')
  updatePosition(@Body() body: any) {
    return this.service.updatePosition(
      body.context,
      body.position,
    );
  }
}
