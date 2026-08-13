import { BMModelInput, BMModelOutput } from './bm-model.interface';
import { BMUserRole } from '../enums/bm-user-role.enum';

export interface BMAutoEngineRequest {
  learnerId: string;
  role: BMUserRole;
  subscriber?: boolean;
  model: BMModelInput;
  scenario?: string;
}

export interface BMAutoEngineResult {
  learnerId: string;
  scenario: string;
  output: BMModelOutput;
  generatedAt: Date;
}
