
import { Module } from '@nestjs/common';
import { AcademicPowerController } from './controllers/academic-power.controller';
import { AcademicPowerService } from './services/academic-power.service';

@Module({
  controllers: [AcademicPowerController],
  providers: [AcademicPowerService],
  exports: [AcademicPowerService],
})
export class AcademicPowerModule {}
