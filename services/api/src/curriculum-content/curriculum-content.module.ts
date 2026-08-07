import { Module } from '@nestjs/common';

import { ContentEngineController } from './controllers/content-engine.controller';
import { ContentEngineService } from './services/content-engine.service';

@Module({
controllers:[
 ContentEngineController,
],

providers:[
 ContentEngineService,
],

exports:[
 ContentEngineService,
],

})
export class CurriculumContentModule {}
