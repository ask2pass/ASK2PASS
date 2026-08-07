import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningCrossBindingService } from '../services/learning-cross-binding.service';

@Controller('learning-cross-binding')
export class LearningCrossBindingController {

  constructor(
    private readonly service: LearningCrossBindingService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('context')
  context(@Body() body: any) {
    return this.service.createContext(body);
  }

  @Post('evaluate')
  evaluate(@Body() body: any) {
    return this.service.evaluate(
      body.context,
    );
  }

  @Post('bind')
  bind(@Body() body: any) {
    return this.service.bind(
      body.context,
    );
  }

  @Post('engine-state')
  engineState(@Body() body: any) {
    return this.service.updateEngineState(
      body.context,
      body.updates,
    );
  }

  @Post('validate-persistence')
  validatePersistence(@Body() body: any) {
    return this.service.validatePersistenceRequirement(
      body.context,
    );
  }
}
