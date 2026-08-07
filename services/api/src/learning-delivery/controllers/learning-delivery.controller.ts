import { Controller, Get } from '@nestjs/common';
import { LearningDeliveryService } from '../services/learning-delivery.service';

@Controller('learning-delivery')
export class LearningDeliveryController {

constructor(
private readonly service: LearningDeliveryService,
){}

@Get('policy')
policy(){
return this.service.getDeliveryPolicy();
}

}
