import { Module } from '@nestjs/common';
import { CurriculumControlController } from './controllers/curriculum-control.controller';
import { CurriculumControlService } from './services/curriculum-control.service';

@Module({
 controllers:[CurriculumControlController],
 providers:[CurriculumControlService],
 exports:[CurriculumControlService],
})
export class CurriculumControlModule {}
