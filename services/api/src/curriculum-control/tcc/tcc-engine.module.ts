import { Module } from '@nestjs/common';
import { TCCEngineController } from './controllers/tcc-engine.controller';
import { TCCEngineService } from './services/tcc-engine.service';

@Module({

controllers:[
 TCCEngineController
],

providers:[
 TCCEngineService
],

exports:[
 TCCEngineService
],

})
export class TCCEngineModule {}
