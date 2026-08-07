import { Module } from '@nestjs/common';

import { LearningCrossBindingModule } from '../learning-cross-binding/learning-cross-binding.module';
import { LearningEngineModule } from '../learning-engine/learning-engine.module';
import { SAPModule } from '../sap/sap.module';

import { SAPLearningIntegrationController } from './controllers/sap-learning-integration.controller';
import { SAPLearningIntegrationService } from './services/sap-learning-integration.service';

@Module({
  imports: [
    SAPModule,
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
