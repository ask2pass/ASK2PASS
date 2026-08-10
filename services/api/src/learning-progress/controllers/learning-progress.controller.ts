import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecordLearningResultDto } from '../dto/record-learning-result.dto';
import { LearningProgressService } from '../services/learning-progress.service';

@Controller('learning-progress')
export class LearningProgressController {
  constructor(
    private readonly progressService: LearningProgressService,
  ) {}

  @Post('result')
  recordResult(@Body() dto: RecordLearningResultDto) {
    return this.progressService.recordResult(dto);
  }

  @Get(':learnerId')
  getLearnerProgress(@Param('learnerId') learnerId: string) {
    return this.progressService.getLearnerProgress(learnerId);
  }
}
