import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { LearningPersistenceService } from '../services/learning-persistence.service';

@Controller('learning-persistence')
export class LearningPersistenceController {

  constructor(
    private readonly service: LearningPersistenceService,
  ) {}

  @Get('policy')
  policy() {
    return this.service.getPolicy();
  }

  @Post('snapshot')
  saveSnapshot(@Body() body: any) {
    return this.service.saveSnapshot(
      body,
    );
  }

  @Post('resume')
  resume(@Body() body: any) {
    return this.service.getResumeState(
      body.sessionId,
    );
  }

  @Post('sync')
  sync(@Body() body: any) {
    return this.service.markSnapshotSynced(
      body.sessionId,
      body.snapshotId,
    );
  }

  @Post('pending')
  pending(@Body() body: any) {
    return this.service.getPendingSnapshots(
      body.sessionId,
    );
  }

  @Post('clear')
  clear(@Body() body: any) {
    return {
      cleared:
        this.service.clearSessionSnapshots(
          body.sessionId,
        ),
    };
  }
}
