import { Controller, Get } from '@nestjs/common';
import { ContentEngineService } from '../services/content-engine.service';

@Controller('curriculum-content')
export class ContentEngineController {

constructor(
 private readonly service: ContentEngineService,
){}

@Get('structure')
structure(){
 return this.service.getCurriculumStructure();
}

@Get('lesson-flow')
lessonFlow(){
 return this.service.lessonStateFlow();
}

}
