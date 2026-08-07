import { EngineBindingState } from '../enums/engine-binding-state.enum';

export interface BindingResult {
  valid: boolean;

  state: EngineBindingState;

  deliveryReady: boolean;

  orchestrationReady: boolean;

  sessionReady: boolean;

  persistenceReady: boolean;

  runtimeReady: boolean;

  offlineAvailable: boolean;

  blockedAt: string | null;

  reason: string | null;
}
