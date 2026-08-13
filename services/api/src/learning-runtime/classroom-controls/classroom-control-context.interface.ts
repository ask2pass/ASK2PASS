import { ClassroomControl } from './classroom-control.enum';

export interface ClassroomControlContext {
  control: ClassroomControl;
  sessionId: string | null;
  learningPath: string;
  questionModeActive: boolean;
  paused: boolean;
  playable: boolean;
  questionRouting: 'PTDM' | 'LOCAL_LESSON' | 'NONE';
}
