import { Module } from '@nestjs/common';
import { LearningCrossBindingModule } from '../learning-cross-binding/learning-cross-binding.module';
import { LearningRuntimeModule } from '../learning-runtime/learning-runtime.module';
import { LearningEngineModule } from '../learning-engine/learning-engine.module';

import { BusinessModellingController } from './controllers/business-modelling.controller';
import { BMLearningService } from './services/bm-learning.service';
import { BMAssessmentService } from './services/bm-assessment.service';
import { BMCompetencyService } from './services/bm-competency.service';
import { BMAutoEngineService } from './services/bm-auto-engine.service';
import { BMSAPGateService } from './services/bm-sap-gate.service';
import { BMAutoEngineAccessService } from './services/bm-auto-engine-access.service';
import { BMProgressService } from './services/bm-progress.service';

@Module({
  imports: [
    LearningCrossBindingModule,
    LearningRuntimeModule,
    LearningEngineModule,
  ],
  controllers: [BusinessModellingController],
  providers: [
    BMLearningService,
    BMAssessmentService,
    BMCompetencyService,
    BMAutoEngineService,
    BMSAPGateService,
    BMAutoEngineAccessService,
    BMProgressService,
  ],
  exports: [
    BMLearningService,
    BMAssessmentService,
    BMCompetencyService,
    BMAutoEngineService,
    BMSAPGateService,
    BMAutoEngineAccessService,
    BMProgressService,
  ],
})
export class BusinessModellingModule {}
