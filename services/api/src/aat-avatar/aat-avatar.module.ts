import { Module } from '@nestjs/common';
import { AATAvatarController } from './controllers/aat-avatar.controller';
import { AATPresentationController } from './controllers/aat-presentation.controller';
import { AATWhiteboardController } from './controllers/aat-whiteboard.controller';
import { AATAvatarRegistryService } from './services/aat-avatar-registry.service';
import { AATPresentationService } from './services/aat-presentation.service';
import { AATWhiteboardService } from './services/aat-whiteboard.service';

@Module({
  controllers: [AATAvatarController, AATPresentationController, AATWhiteboardController],
  providers: [AATAvatarRegistryService, AATPresentationService, AATWhiteboardService],
  exports: [AATAvatarRegistryService, AATPresentationService, AATWhiteboardService],
})
export class AATAvatarModule {}
