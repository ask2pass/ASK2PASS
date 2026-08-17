import { ClassroomControl } from './classroom-control.enum';

export type LearningModule =
  | 'SCLA'
  | 'PTDM'
  | 'CEDM'
  | 'MEDM'
  | 'SAP'
  | 'BM'
  | 'AEM';

export interface ClassroomControlContext {
  control: ClassroomControl;
  sessionId: string | null;
  learningPath: string;
  module: LearningModule;
  questionModeActive: boolean;
  paused: boolean;
  playable: boolean;
  stopped: boolean;
  position: number;
  questionRouting: 'PTDM' | 'LOCAL_LESSON' | 'NONE';
}
