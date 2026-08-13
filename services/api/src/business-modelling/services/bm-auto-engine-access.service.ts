import { Injectable } from '@nestjs/common';
import { BMUserRole } from '../enums/bm-user-role.enum';

@Injectable()
export class BMAutoEngineAccessService {
  canUse(input: {
    role: BMUserRole;
    subscriber?: boolean;
  }) {
    const subscribed = input.subscriber !== false;

    return {
      allowed: subscribed,
      reason: subscribed
        ? 'SUBSCRIBER_ACCESS'
        : 'SUBSCRIPTION_REQUIRED',
      bmLearningGate: false,
      sapCertificationGate: false,
      role: input.role,
    };
  }
}
