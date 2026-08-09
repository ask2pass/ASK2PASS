import { Module } from '@nestjs/common';
import { AssessmentPathController } from './controllers/assessment-path.controller';
import { AssessmentPathService } from './services/assessment-path.service';
import { ExaminationController } from './controllers/examination.controller';
import { ExaminationService } from './services/examination.service';

@Module({
  controllers: [
    ExaminationController,
    AssessmentPathController,
  ],
  providers: [
    ExaminationService,
    AssessmentPathService,
  ],
  exports: [
    ExaminationService,
    AssessmentPathService,
  ],
})
export class AssessmentEngineModule {}
