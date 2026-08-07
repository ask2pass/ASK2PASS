import { SAPContext } from '../../sap/interfaces/sap-context.interface';
import { LearningEngineContext } from '../../learning-engine/interfaces/learning-engine-context.interface';

export interface SAPLearningContext {
  sap: SAPContext;
  learning: LearningEngineContext;
  bindingValid: boolean;
  blockedAt: string | null;
  reason: string | null;
}
