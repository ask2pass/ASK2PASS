import { LearningFlowState } from '../enums/learning-flow-state.enum';

export interface LearningOrchestrationContext {

  learnerId: string;

  classLevel: string;

  subject: string;

  tccTopic: string;

  dscScheduled: boolean;

  contentLoaded: boolean;

  lessonCompleted: boolean;

  cbtCompleted: boolean;

  lessonPosition: number;

  state: LearningFlowState;

  offlineAvailable: boolean;

  starsEligible: boolean;

}
