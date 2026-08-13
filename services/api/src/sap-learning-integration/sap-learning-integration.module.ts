import { BusinessModellingModule } from '../business-modelling/business-modelling.module';
import { Module } from '@nestjs/common';

import { LearningCrossBindingModule } from '../learning-cross-binding/learning-cross-binding.module';
import { LearningRuntimeModule } from '../learning-runtime/learning-runtime.module';
import { LearningEngineModule } from '../learning-engine/learning-engine.module';
import { SAPModule } from '../sap/sap.module';

import { SAPLearningIntegrationController } from './controllers/sap-learning-integration.controller';
import { SAPLearningIntegrationService } from './services/sap-learning-integration.service';

@Module({
  imports: [
    BusinessModellingModule,
    SAPModule,
    LearningRuntimeModule,
    LearningEngineModule,
    LearningCrossBindingModule,
  ],
  controllers: [
    SAPLearningIntegrationController,
  ],
  providers: [
    SAPLearningIntegrationService,
  ],
  exports: [
    SAPLearningIntegrationService,
  ],
})
export class SAPLearningIntegrationModule {}
