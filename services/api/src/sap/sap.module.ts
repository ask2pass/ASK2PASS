import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SAPAssessmentEntity } from './entities/sap-assessment.entity';
import { SAPLearningProfileEntity } from './entities/sap-learning-profile.entity';
import { SAPAssessmentRepository } from './repositories/sap-assessment.repository';
import { SAPLearningProfileRepository } from './repositories/sap-learning-profile.repository';
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
    SAPAssessmentRepository,
    SAPLearningProfileRepository,
  ],

  exports: [
    SAPService,
    SAPAssessmentRepository,
    SAPLearningProfileRepository,
  ],
})
export class SAPModule {}
