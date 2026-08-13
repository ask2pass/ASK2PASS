import { BMUserRole } from '../enums/bm-user-role.enum';

export interface BMProfile {
  learnerId: string;
  role: BMUserRole;
  enrolled: boolean;
  activitiesCompleted: number;
  activitiesRequired: number;
  examPassed: boolean;
  competencyScore: number;
  certificationEligible: boolean;
  autoEngineAvailable: boolean;
}
