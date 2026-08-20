import { Body, Controller, Post } from '@nestjs/common';
import type {
  WorkloadSchedule,
  WorkloadScheduleRequest,
} from '../interfaces/workload-schedule.interface';
import { WorkloadSchedulingService } from '../services/workload-scheduling.service';

@Controller('curriculum-control/scheduling')
export class SchedulingController {
  constructor(
    private readonly service: WorkloadSchedulingService,
  ) {}

  @Post('generate')
  generate(
    @Body() body: WorkloadScheduleRequest,
  ): WorkloadSchedule {
    return this.service.generate(body);
  }
}
