import { Module } from '@nestjs/common';
import { LearningEngineModule } from '../learning-engine/learning-engine.module';
import { LearningCrossBindingModule } from '../learning-cross-binding/learning-cross-binding.module';

import { SAPController } from './controllers/sap.controller';

import { SAPService } from './services/sap.service';

@Module({
  imports: [LearningEngineModule, LearningCrossBindingModule],
  controllers: [
    SAPController,
  ],

  providers: [
    SAPService,
  ],

  exports: [
    SAPService,
  ],
})
export class SAPModule {}
