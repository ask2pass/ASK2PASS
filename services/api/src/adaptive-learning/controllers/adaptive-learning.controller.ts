
import { Body, Controller, Post } from '@nestjs/common';
import { AdaptLearningResultDto } from '../dto/adapt-learning-result.dto';
import { AdaptiveLearningService } from '../services/adaptive-learning.service';

@Controller('adaptive-learning')
export class AdaptiveLearningController {
  constructor(
    private readonly adaptiveLearningService: AdaptiveLearningService,
  ) {}

  @Post('decide')
  decide(@Body() dto: AdaptLearningResultDto) {
    return this.adaptiveLearningService.decide(
      dto.learnerId,
      dto.examinationType,
      dto.subjectId,
      dto.topicId,
      dto.masteryPercent,
    );
  }
}
