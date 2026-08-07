import { Module } from '@nestjs/common';

import { ExaminationController } from './controllers/examination.controller';
import { ExaminationService } from './services/examination.service';


@Module({

controllers:[
ExaminationController,
],

providers:[
ExaminationService,
],

exports:[
ExaminationService,
],

})
export class AssessmentEngineModule {}
