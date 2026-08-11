import { Injectable } from '@nestjs/common';
import { AATAvatarRegistryService } from './aat-avatar-registry.service';
import {
  AATPresentationRequest,
  AATPresentationResponse,
} from '../interfaces/aat-presentation.interface';

@Injectable()
export class AATPresentationService {
  constructor(
    private readonly registry: AATAvatarRegistryService,
  ) {}

  prepare(
    request: AATPresentationRequest,
  ): AATPresentationResponse {
    const avatar = this.registry.get(request.avatarId);

    return {
      avatarId: avatar.id,
      action: request.action,
      content: request.content ?? null,
      voiceTimed: avatar.voiceTimed,
      lipSyncEnabled: avatar.lipSyncEnabled,
      movementEnabled: avatar.movementEnabled,
      whiteboardEnabled: avatar.whiteboardEnabled,
      notesCaptureEnabled: avatar.notesCaptureEnabled,
      saveAsNote: request.saveAsNote ?? false,
    };
  }
}
