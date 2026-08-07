import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningGatewayService } from '../services/learning-gateway.service';

@Controller('learning-gateway')
export class LearningGatewayController {

  constructor(
    private readonly service: LearningGatewayService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('initialize')
  initialize(@Body() body: any) {
    return this.service.initialize(body);
  }

  @Post('delivery')
  delivery(@Body() body: any) {
    return this.service.beginDelivery(body.session);
  }

  @Post('start-lesson')
  startLesson(@Body() body: any) {
    return this.service.startLesson(body.session);
  }

  @Post('question-mode')
  questionMode(@Body() body: any) {
    return this.service.enterQuestionMode(body.session);
  }

  @Post('return-to-lesson')
  returnToLesson(@Body() body: any) {
    return this.service.returnToLesson(body.session);
  }

  @Post('complete-lesson')
  completeLesson(@Body() body: any) {
    return this.service.completeLesson(body.session);
  }

  @Post('begin-cbt')
  beginCBT(@Body() body: any) {
    return this.service.beginCBT(body.session);
  }

  @Post('complete-cbt')
  completeCBT(@Body() body: any) {
    return this.service.completeCBT(body.session);
  }

  @Post('complete')
  complete(@Body() body: any) {
    return this.service.complete(body.session);
  }

  @Post('position')
  updatePosition(@Body() body: any) {
    return this.service.updatePosition(
      body.session,
      body.position,
    );
  }

  @Post('resume')
  resume(@Body() body: any) {
    return this.service.resume(body.session);
  }
}
