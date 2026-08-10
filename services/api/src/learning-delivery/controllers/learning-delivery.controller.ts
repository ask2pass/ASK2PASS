
import { Body, Controller, Post } from '@nestjs/common';
import { CreateLearningDeliveryDto } from '../dto/create-learning-delivery.dto';
import { LearningDeliveryService } from '../services/learning-delivery.service';

@Controller('learning-delivery')
export class LearningDeliveryController {
  constructor(
    private readonly learningDeliveryService: LearningDeliveryService,
  ) {}

  @Post('prepare')
  prepare(@Body() dto: CreateLearningDeliveryDto) {
    return this.learningDeliveryService.prepare({
      ...dto,
      topicId: dto.topicId ?? null,
      resumeSessionId: dto.resumeSessionId ?? null,
    });
  }
}
