import { Injectable, NotFoundException } from '@nestjs/common';
import { AATAvatarProfile } from '../interfaces/aat-avatar-profile.interface';

@Injectable()
export class AATAvatarRegistryService {
  private readonly profiles: AATAvatarProfile[] = [
    {
      id: 'mr-ray',
      name: 'Mr. Ray',
      role: 'AI Academic Tutor',
      imageAsset: 'assets/aat/mr-ray/mr-ray.png',
      voiceAsset: 'assets/aat/mr-ray/mr-ray-voice.m4a',
      voiceGender: 'MALE',
      voiceStyles: ['CAPTIVATING', 'FIRM', 'COMFORTING', 'ENCOURAGING', 'EXAM_FOCUS'],
      voiceTimed: true,
      lipSyncEnabled: true,
      whiteboardEnabled: true,
      movementEnabled: true,
      demonstrationsEnabled: true,
      notesCaptureEnabled: true,
    },
    {
      id: 'mrs-ud',
      name: 'Mrs. UD',
      role: 'SAP Instructor / Facilitator',
      imageAsset: 'assets/aat/mrs-ud/mrs-ud.png',
      voiceAsset: 'assets/aat/mrs-ud/mrs-ud-finetuned.m4a',
      voiceGender: 'FEMALE',
      voiceStyles: ['CAPTIVATING', 'FIRM', 'COMFORTING', 'ENCOURAGING', 'EXAM_FOCUS'],
      voiceTimed: true,
      lipSyncEnabled: true,
      whiteboardEnabled: true,
      movementEnabled: true,
      demonstrationsEnabled: true,
      notesCaptureEnabled: true,
    },
    {
      id: 'mr-yoms',
      name: 'Mr. Yoms',
      role: 'Biology Teacher / Specialist',
      specialty: 'Biology',
      imageAsset: 'assets/aat/mr-yoms/mr-yoms.png',
      voiceAsset: null,
      voiceGender: 'MALE',
      voiceStyles: ['CAPTIVATING', 'FIRM', 'COMFORTING', 'ENCOURAGING'],
      voiceTimed: true,
      lipSyncEnabled: true,
      whiteboardEnabled: true,
      movementEnabled: true,
      demonstrationsEnabled: true,
      notesCaptureEnabled: true,
    },
  ];

  list(): AATAvatarProfile[] {
    return this.profiles;
  }

  get(id: string): AATAvatarProfile {
    const profile = this.profiles.find((profile) => profile.id === id);
    if (!profile) {
      throw new NotFoundException(`AAT avatar profile not found: ${id}`);
    }
    return profile;
  }
}
