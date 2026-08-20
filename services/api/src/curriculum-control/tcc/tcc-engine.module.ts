import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TCCEngineController } from './controllers/tcc-engine.controller';
import { TCCMonthlyExamController } from './controllers/tcc-monthly-exam.controller';

import { TCCEngineService } from './services/tcc-engine.service';
import { TCCMonthlyExamService } from './services/tcc-monthly-exam.service';

import { TCCMonthlyExam } from './entities/tcc-monthly-exam.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TCCMonthlyExam]),
  ],
  controllers: [
    TCCEngineController,
    TCCMonthlyExamController,
  ],
  providers: [
    TCCEngineService,
    TCCMonthlyExamService,
  ],
  exports: [
    TCCEngineService,
    TCCMonthlyExamService,
  ],
})
export class TCCEngineModule {}
