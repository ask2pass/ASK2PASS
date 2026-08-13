import { ClassroomControl } from '../classroom-controls/classroom-control.enum';

export interface ClassroomControlRuntimeRequest {
  control: ClassroomControl;
  sessionId?: string | null;
  learningPath: string;
  question?: string;
}

export interface ClassroomControlRuntimeResult {
  control: ClassroomControl;
  sessionId: string | null;
  learningPath: string;
  questionModeActive: boolean;
  paused: boolean;
  playable: boolean;
  questionRouting: 'PTDM' | 'LOCAL_LESSON' | 'NONE';
}
