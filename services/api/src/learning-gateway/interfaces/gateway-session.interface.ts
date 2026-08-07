import { GatewayState } from '../enums/gateway-state.enum';

export interface GatewaySession {
  sessionId: string;

  learnerId: string;

  lessonId: string;

  classLevel: string;

  subject: string;

  topic: string;

  state: GatewayState;

  lessonPosition: number;

  questionModeActive: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  starsEligible: boolean;

  offlineAvailable: boolean;

  snapshotId: string | null;
}
