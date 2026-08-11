import { Injectable } from '@nestjs/common';
import {
  AATVideoPresentationPlan,
  AATVideoPresentationRequest,
} from '../interfaces/aat-video.interface';

@Injectable()
export class AATVideoPresentationService {
  prepare(
    request: AATVideoPresentationRequest,
  ): AATVideoPresentationPlan {
    return {
      enabled: true,
      tutorId: request.tutorId,
      tutorName: request.tutorName,
      mode: request.mode,
      imageAsset: request.imageAsset ?? null,
      voiceAsset: request.voiceAsset ?? null,
      synchronization: 'VOICE_TIMED',
      lipSyncRequired: true,
      durationSeconds: request.durationSeconds ?? null,
      generatedAt: new Date().toISOString(),
    };
  }
}
