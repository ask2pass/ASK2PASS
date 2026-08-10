
import {
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { QueueOfflineOperationDto } from '../dto/queue-offline-operation.dto';
import { SyncOfflineOperationsDto } from '../dto/sync-offline-operations.dto';
import { OfflineContinuityService } from '../services/offline-continuity.service';

@Controller('offline-continuity')
export class OfflineContinuityController {
  constructor(
    private readonly service: OfflineContinuityService,
  ) {}

  @Post('queue')
  queue(@Body() dto: QueueOfflineOperationDto) {
    return this.service.queue(dto);
  }

  @Post('sync')
  sync(@Body() dto: SyncOfflineOperationsDto) {
    return this.service.sync(dto.learnerId, dto.operations);
  }

  @Post('recover/:learnerId')
  recover(@Param('learnerId') learnerId: string) {
    return this.service.recover(learnerId);
  }
}
