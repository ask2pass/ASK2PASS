import { Module } from '@nestjs/common';
import { CEDMService } from './cedm/services/cedm.service';
import { CEDMController } from './cedm/controllers/cedm.controller';
import { AssessmentPathController } from './controllers/assessment-path.controller';
import { AssessmentPathService } from './services/assessment-path.service';
import { ExaminationController } from './controllers/examination.controller';
import { ExaminationService } from './services/examination.service';

@Module({
  controllers: [
    CEDMController,
    ExaminationController,
    AssessmentPathController,
  ],
  providers: [
    CEDMService,
    ExaminationService,
    AssessmentPathService,
  ],
  exports: [
    CEDMService,
    ExaminationService,
    AssessmentPathService,
  ],
})
export class AssessmentEngineModule {}
