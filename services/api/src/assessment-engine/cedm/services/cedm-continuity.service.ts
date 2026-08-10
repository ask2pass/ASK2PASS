import { BadRequestException, Injectable } from '@nestjs/common';
import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';
import { CEDMContinuityState } from '../interfaces/cedm-continuity.interface';

@Injectable()
export class CEDMContinuityService {
  private readonly states = new Map<string, CEDMContinuityState>();

  save(
    state: CEDMContinuityState,
  ): CEDMContinuityState {
    this.states.set(state.sessionId, {
      ...state,
      status: CEDMSessionStatus.PAUSED,
      resumable: true,
      lastActivityAt: new Date(),
    });

    return this.states.get(state.sessionId)!;
  }

  resume(
    sessionId: string,
    learnerId: string,
  ): CEDMContinuityState {
    const state = this.states.get(sessionId);

    if (!state || state.learnerId !== learnerId) {
      throw new BadRequestException('No resumable CEDM session was found.');
    }

    if (state.status === CEDMSessionStatus.COMPLETED) {
      throw new BadRequestException('Completed CEDM sessions cannot be resumed.');
    }

    const resumed = {
      ...state,
      status: CEDMSessionStatus.ACTIVE,
      lastActivityAt: new Date(),
    };

    this.states.set(sessionId, resumed);
    return resumed;
  }
}
