import { Module } from '@nestjs/common';
import { SchedulingController } from './controllers/scheduling.controller';
import { WorkloadSchedulingService } from './services/workload-scheduling.service';

@Module({
  controllers: [SchedulingController],
  providers: [WorkloadSchedulingService],
  exports: [WorkloadSchedulingService],
})
export class SchedulingModule {}
