import { Module } from '@nestjs/common';
import { CurriculumControlController } from './controllers/curriculum-control.controller';
import { CurriculumControlService } from './services/curriculum-control.service';
import { TCCEngineModule } from './tcc/tcc-engine.module';
import { DSCGenerationModule } from './dsc/dsc-generation.module';

@Module({
 controllers:[CurriculumControlController],
 providers:[CurriculumControlService],
 exports:[CurriculumControlService],
})
export class CurriculumControlModule {}
