
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OfflineOperationEntity } from './entities/offline-operation.entity';
import { OfflineContinuityController } from './controllers/offline-continuity.controller';
import { OfflineOperationRepository } from './repositories/offline-operation.repository';
import { OfflineContinuityService } from './services/offline-continuity.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfflineOperationEntity]),
  ],
  controllers: [
    OfflineContinuityController,
  ],
  providers: [
    OfflineOperationRepository,
    OfflineContinuityService,
  ],
  exports: [
    OfflineContinuityService,
  ],
})
export class OfflineContinuityModule {}
