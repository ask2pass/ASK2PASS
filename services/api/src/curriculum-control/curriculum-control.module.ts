import { Module } from '@nestjs/common';
import { CurriculumControlController } from './controllers/curriculum-control.controller';
import { CurriculumControlService } from './services/curriculum-control.service';
import { TCCEngineModule } from './tcc/tcc-engine.module';
import { DSCGenerationModule } from './dsc/dsc-generation.module';
import { SchedulingModule } from './scheduling/scheduling.module';

@Module({
  imports: [
    TCCEngineModule,
    DSCGenerationModule,
    SchedulingModule,
  ],
  controllers: [
    CurriculumControlController,
  ],
  providers: [
    CurriculumControlService,
  ],
  exports: [
    CurriculumControlService,
  ],
})
export class CurriculumControlModule {}
