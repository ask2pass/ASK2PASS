import { Module } from '@nestjs/common';
import { LearningDeliveryController } from './controllers/learning-delivery.controller';
import { LearningDeliveryService } from './services/learning-delivery.service';

@Module({
controllers:[
LearningDeliveryController,
],

providers:[
LearningDeliveryService,
],

exports:[
LearningDeliveryService,
],

})
export class LearningDeliveryModule {}
