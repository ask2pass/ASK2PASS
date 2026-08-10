
import { Body, Controller, Post } from '@nestjs/common';
import { GenerateLearningPathDto } from '../dto/generate-learning-path.dto';
import { LearningPathService } from '../services/learning-path.service';

@Controller('learning-path')
export class LearningPathController {
  constructor(
    private readonly learningPathService: LearningPathService,
  ) {}

  @Post('generate')
  generate(@Body() dto: GenerateLearningPathDto) {
    return this.learningPathService.generate(dto);
  }
}
