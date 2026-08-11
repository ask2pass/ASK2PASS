
import { Module } from '@nestjs/common';
import { LearningDeliveryController } from './controllers/learning-delivery.controller';
import { LearningDeliveryService } from './services/learning-delivery.service';
import { AATVideoPresentationService } from './services/aat-video-presentation.service';

@Module({
  controllers: [LearningDeliveryController],
  providers: [LearningDeliveryService, AATVideoPresentationService],
  exports: [LearningDeliveryService, AATVideoPresentationService],
})
export class LearningDeliveryModule {}
