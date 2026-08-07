import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningEngineService } from '../services/learning-engine.service';

@Controller('learning-engine')
export class LearningEngineController {

  constructor(
    private readonly service: LearningEngineService,
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
    return this.service.activate(body.context);
  }

  @Post('position')
  updatePosition(@Body() body: any) {
    return this.service.updatePosition(
      body.context,
      body.position,
    );
  }

  @Post('question-mode')
  questionMode(@Body() body: any) {
    return this.service.enterQuestionMode(
      body.context,
    );
  }

  @Post('return-to-lesson')
  returnToLesson(@Body() body: any) {
    return this.service.returnToLesson(
      body.context,
    );
  }

  @Post('complete-lesson')
  completeLesson(@Body() body: any) {
    return this.service.completeLesson(
      body.context,
    );
  }

  @Post('begin-cbt')
  beginCBT(@Body() body: any) {
    return this.service.beginCBT(
      body.context,
    );
  }

  @Post('complete-cbt')
  completeCBT(@Body() body: any) {
    return this.service.completeCBT(
      body.context,
    );
  }

  @Post('resume')
  resume(@Body() body: any) {
    return this.service.resume(
      body.context,
    );
  }

  @Post('complete')
  complete(@Body() body: any) {
    return this.service.complete(
      body.context,
    );
  }

  @Post('result')
  result(@Body() body: any) {
    return this.service.result(
      body.context,
      body.success ?? true,
      body.persisted ?? false,
      body.reason ?? null,
    );
  }
}
