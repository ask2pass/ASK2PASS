import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { LearningRuntimeService } from './learning-runtime.service';
import type { LearningRuntimeRequest } from './learning-runtime.interface';
import type { LearningRuntimeResult } from './learning-runtime.interface';

@Controller('learning-path/runtime')
export class LearningRuntimeController {
  constructor(
    private readonly learningRuntimeService: LearningRuntimeService,
  ) {}

  @Post('run')
  run(
    @Body() body: LearningRuntimeRequest,
  ): LearningRuntimeResult {
    return this.learningRuntimeService.run(body);
  }
}
