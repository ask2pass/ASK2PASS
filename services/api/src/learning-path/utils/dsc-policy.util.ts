import { LEARNING_CONSTANTS } from '../constants/learning.constants';
import { DSCPolicyResult } from '../interfaces/dsc-policy-result.interface';

export function isValidDSCSubjectCount(
  subjectCount: number,
): boolean {
  return LEARNING_CONSTANTS.VALID_DSC_SUBJECTS.includes(
    subjectCount,
  );
}

export function getRecoverySubjectCapacity(
  missedDays: number,
): number {
  if (missedDays <= 0) {
    return 0;
  }

  return Math.min(
    missedDays *
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
    LEARNING_CONSTANTS.MAX_DSC_SUBJECTS -
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
  );
}

export function getEffectiveDSCSubjectCount(
  missedDays: number,
  requestedSubjectCount?: number,
): number {
  const recoveryCapacity =
    getRecoverySubjectCapacity(missedDays);

  const minimumRequired =
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS +
    Math.min(
      recoveryCapacity,
      LEARNING_CONSTANTS.MAX_DSC_SUBJECTS -
        LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
    );

  if (
    requestedSubjectCount &&
    isValidDSCSubjectCount(requestedSubjectCount)
  ) {
    return Math.max(
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
      Math.min(
        requestedSubjectCount,
        minimumRequired,
        LEARNING_CONSTANTS.MAX_DSC_SUBJECTS,
      ),
    );
  }

  if (minimumRequired <= 4) {
    return 4;
  }

  return (
    LEARNING_CONSTANTS.VALID_DSC_SUBJECTS.find(
      (count) => count >= minimumRequired,
    ) ?? LEARNING_CONSTANTS.MAX_DSC_SUBJECTS
  );
}

export function validateDSCRequest(
  requestedSubjectCount: number,
): DSCPolicyResult {
  const valid =
    isValidDSCSubjectCount(requestedSubjectCount);

  return {
    requestedSubjectCount,
    approvedSubjectCount: valid
      ? requestedSubjectCount
      : LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
    defaultSubjectCount:
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
    recoverySubjectCount: Math.max(
      requestedSubjectCount -
        LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
      0,
    ),
    recoveryActive:
      requestedSubjectCount >
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
    valid,
    reason: valid
      ? null
      : 'DSC subject count must be an even value between 4 and 12.',
  };
}
