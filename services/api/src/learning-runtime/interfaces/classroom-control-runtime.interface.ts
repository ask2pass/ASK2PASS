import { ClassroomControl } from '../classroom-controls/classroom-control.enum';
import type { LearningModule } from '../classroom-controls/classroom-control-context.interface';

export interface ClassroomControlRuntimeRequest {
  control: ClassroomControl;
  sessionId?: string | null;
  learningPath: string;
  module: LearningModule;
  question?: string;
  position?: number;
}

export interface ClassroomControlRuntimeResult {
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
