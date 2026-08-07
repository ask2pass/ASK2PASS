import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningSessionService } from '../services/learning-session.service';

@Controller('learning-session')
export class LearningSessionController {

  constructor(
    private readonly service: LearningSessionService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('create')
  create(@Body() body: any) {
    return this.service.createSession(body);
  }

  @Post('position')
  updatePosition(@Body() body: any) {
    return this.service.updatePosition(
      body.session,
      body.position,
    );
  }

  @Post('pause')
  pause(@Body() body: any) {
    return this.service.pauseSession(
      body.session,
    );
  }

  @Post('resume')
  resume(@Body() body: any) {
    return this.service.resumeSession(
      body.session,
    );
  }

  @Post('question-mode')
  questionMode(@Body() body: any) {
    return this.service.enterQuestionMode(
      body.session,
    );
  }

  @Post('return-from-question')
  returnFromQuestion(@Body() body: any) {
    return this.service.returnFromQuestionMode(
      body.session,
    );
  }

  @Post('complete-lesson')
  completeLesson(@Body() body: any) {
    return this.service.completeLesson(
      body.session,
    );
  }

  @Post('complete-cbt')
  completeCBT(@Body() body: any) {
    return this.service.completeCBT(
      body.session,
    );
  }

  @Post('validate-transition')
  validateTransition(@Body() body: any) {
    return this.service.validateTransition(
      body.currentState,
      body.nextState,
    );
  }
}
