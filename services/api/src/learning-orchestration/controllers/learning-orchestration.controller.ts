import { Body, Controller, Get, Post } from '@nestjs/common';
import { LearningOrchestrationService } from '../services/learning-orchestration.service';

@Controller('learning-orchestration')
export class LearningOrchestrationController {
  constructor(
    private readonly service: LearningOrchestrationService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('next-state')
  nextState(@Body() body: any) {
    return {
      state: this.service.resolveNextState(body),
    };
  }

  @Post('validate-transition')
  validateTransition(@Body() body: any) {
    return this.service.validateTransition(
      body.currentState,
      body.nextState,
    );
  }
}
