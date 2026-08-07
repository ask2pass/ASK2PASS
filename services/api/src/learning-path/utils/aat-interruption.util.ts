import { AAT_INTERACTION_CONSTANTS } from '../constants/aat-interaction.constants';

export function buildAATInterruptionResponse(
  sessionId: string,
  learnerId: string,
  learnerFirstName: string,
  autoLoggedOut: boolean,
) {
  return {
    sessionId,
    learnerId,
    learnerFirstName,
    autoLoggedOut,
    dailyStarEligible: !autoLoggedOut,
    askReason:
      autoLoggedOut &&
      AAT_INTERACTION_CONSTANTS.ASK_REASON_AFTER_AUTO_LOGOUT,
    askDistraction:
      autoLoggedOut &&
      AAT_INTERACTION_CONSTANTS.ASK_DISTRACTION_AFTER_AUTO_LOGOUT,
    messageKey: autoLoggedOut
      ? 'AAT_AUTO_LOGOUT_REASON_AND_DISTRACTION'
      : 'AAT_LEARNING_CHECK_IN',
  };
}
