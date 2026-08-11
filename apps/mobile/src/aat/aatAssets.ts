export type AATId = 'mr-ray' | 'mrs-ud' | 'mr-yoms';

export interface AATAssetProfile {
  id: AATId;
  name: string;
  role: string;
  specialty?: string;
  image: any;
  voice: any | null;
  voiceTimed: boolean;
  lipSyncEnabled: boolean;
  whiteboardEnabled: boolean;
  movementEnabled: boolean;
  demonstrationsEnabled: boolean;
  notesCaptureEnabled: boolean;
}

export const AAT_ASSETS: Record<AATId, AATAssetProfile> = {
  'mr-ray': {
    id: 'mr-ray',
    name: 'Mr. Ray',
    role: 'AI Academic Tutor',
    image: require('../../assets/aat/mr-ray/mr-ray.png'),
    voice: require('../../assets/aat/mr-ray/mr-ray-voice.m4a'),
    voiceTimed: true,
    lipSyncEnabled: true,
    whiteboardEnabled: true,
    movementEnabled: true,
    demonstrationsEnabled: true,
    notesCaptureEnabled: true,
  },

  'mrs-ud': {
    id: 'mrs-ud',
    name: 'Mrs. UD',
    role: 'SAP Instructor / Facilitator',
    image: require('../../assets/aat/mrs-ud/mrs-ud.png'),
    voice: require('../../assets/aat/mrs-ud/mrs-ud-voice.m4a'),
    voiceTimed: true,
    lipSyncEnabled: true,
    whiteboardEnabled: true,
    movementEnabled: true,
    demonstrationsEnabled: true,
    notesCaptureEnabled: true,
  },

  'mr-yoms': {
    id: 'mr-yoms',
    name: 'Mr. Yoms',
    role: 'Biology Teacher / Specialist',
    specialty: 'Biology',
    image: require('../../assets/aat/mr-yoms/mr-yoms.png'),
    voice: null,
    voiceTimed: true,
    lipSyncEnabled: true,
    whiteboardEnabled: true,
    movementEnabled: true,
    demonstrationsEnabled: true,
    notesCaptureEnabled: true,
  },
};
