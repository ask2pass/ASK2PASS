import { Body, Controller, Post } from '@nestjs/common';
import type { LearningPath } from '../interfaces/learning-path.interface';
import { LearningRuntimeDirectiveService } from '../services/learning-runtime-directive.service';

@Controller('learning-path/runtime')
export class LearningRuntimeDirectiveController {
  constructor(
    private readonly directiveService: LearningRuntimeDirectiveService,
  ) {}

  @Post('next')
  next(@Body() path: LearningPath) {
    return this.directiveService.create({
      learningPath: path,
    });
  }
}
