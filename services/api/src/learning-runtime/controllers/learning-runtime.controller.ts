import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningRuntimeService } from '../services/learning-runtime.service';
import { LearningSessionConsumptionDto } from '../dto/learning-session-consumption.dto';

@Controller('learning-runtime')
export class LearningRuntimeController {

  @Post('consume-coins')
  async consumeLearningCoins(
    @Body() request: LearningSessionConsumptionDto,
  ) {
    return this.service.consumeLearningCoins(request);
  }


  constructor(
    private readonly service: LearningRuntimeService,
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
