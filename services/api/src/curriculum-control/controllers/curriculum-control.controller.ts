import { Controller, Get, Post } from '@nestjs/common';
import { CurriculumControlService } from '../services/curriculum-control.service';

@Controller('curriculum-control')
export class CurriculumControlController {

constructor(
 private readonly service: CurriculumControlService,
){}

@Get('lesson-policy')
lessonPolicy(){
 return this.service.getLessonPolicy();
}

@Get('exam-policy')
examPolicy(){
 return this.service.getExamPolicy();
}

@Post('exit')
exitLesson(){
 return this.service.exitLesson();
}

}
