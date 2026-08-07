import {
Body,
Controller,
Get,
Post,
} from '@nestjs/common';

import { ExaminationService } from '../services/examination.service';

@Controller('assessment')
export class ExaminationController {

constructor(
private readonly service: ExaminationService,
){}


@Get('policy')
policy(){

return this.service.getExamPolicy();

}


@Post('term-grade')
termGrade(
@Body() body:any,
){

return this.service.calculateTermGrade(
body.examScores,
body.assignment,
);

}

}
