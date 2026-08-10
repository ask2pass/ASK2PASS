import { Module } from '@nestjs/common';
import { CEDMGenerationService } from './cedm/services/cedm-generation.service';
import { CEDMContinuityService } from './cedm/services/cedm-continuity.service';
import { CEDMQuestionService } from './cedm/services/cedm-question.service';
import { CEDMContinuityController } from './cedm/controllers/cedm-continuity.controller';
import { CEDMQuestionController } from './cedm/controllers/cedm-question.controller';
import { CEDMService } from './cedm/services/cedm.service';
import { CEDMPersistenceModule } from './cedm/cedm-persistence.module';
import { CEDMPersistenceRepository } from './cedm/repositories/cedm-persistence.repository';
import { CEDMController } from './cedm/controllers/cedm.controller';
import { AssessmentPathController } from './controllers/assessment-path.controller';
import { AssessmentPathService } from './services/assessment-path.service';
import { ExaminationController } from './controllers/examination.controller';
import { ExaminationService } from './services/examination.service';

@Module({
  imports: [CEDMPersistenceModule],
  controllers: [
    CEDMContinuityController,
    CEDMQuestionController,
    CEDMController,
    ExaminationController,
    AssessmentPathController,
  ],
  providers: [
    CEDMPersistenceRepository,
    CEDMPersistenceRepository,
    CEDMGenerationService,
    CEDMContinuityService,
    CEDMQuestionService,
    CEDMService,
    ExaminationService,
    AssessmentPathService,
  ],
  exports: [
    CEDMGenerationService,
    CEDMContinuityService,
    CEDMQuestionService,
    CEDMService,
    ExaminationService,
    AssessmentPathService,
  ],
})
export class AssessmentEngineModule {}
