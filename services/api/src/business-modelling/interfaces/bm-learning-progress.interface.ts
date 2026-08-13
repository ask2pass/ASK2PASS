import { BMActivityType } from '../enums/bm-activity-type.enum';

export interface BMLearningProgress {
  learnerId: string;
  sapUser: boolean;
  enrolled: boolean;
  completedActivities: BMActivityType[];
  activitiesRequired: BMActivityType[];
  practicalPassed: boolean;
  examScore: number | null;
  examPassed: boolean;
  certified: boolean;
  competencyScore: number;
  autoEngineAvailable: boolean;
}
