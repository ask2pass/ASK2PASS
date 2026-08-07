import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAPAssessmentEntity } from './entities/sap-assessment.entity';
import { SAPLearningProfileEntity } from './entities/sap-learning-profile.entity';
import { LearningEngineModule } from '../learning-engine/learning-engine.module';
import { LearningCrossBindingModule } from '../learning-cross-binding/learning-cross-binding.module';

import { SAPController } from './controllers/sap.controller';

import { SAPService } from './services/sap.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SAPAssessmentEntity, SAPLearningProfileEntity]),
    LearningEngineModule,
    LearningCrossBindingModule,
  ],
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
