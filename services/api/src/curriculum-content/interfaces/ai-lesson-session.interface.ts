import { LessonState } from '../enums/lesson-state.enum';

export interface AILessonSession {
  learnerId: string;
  lessonId: string;
  state: LessonState;
  currentPosition: number;
  questionModeActive: boolean;
  returnToLessonPosition: boolean;
}
