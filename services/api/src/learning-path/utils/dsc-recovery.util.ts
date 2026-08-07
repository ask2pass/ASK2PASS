import { LEARNING_CONSTANTS } from '../constants/learning.constants';

export function calculateNewMissedWorkload(
  newlyMissedDays: number,
): number {
  if (newlyMissedDays <= 0) {
    return 0;
  }

  return (
    newlyMissedDays *
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS
  );
}

export function calculateRemainingRecovery(
  outstandingRecoverySubjects: number,
  completedRecoverySubjects: number,
  newlyMissedDays: number,
): number {
  const remainingExistingRecovery = Math.max(
    outstandingRecoverySubjects - completedRecoverySubjects,
    0,
  );

  const newlyMissedWorkload =
    calculateNewMissedWorkload(newlyMissedDays);

  return remainingExistingRecovery + newlyMissedWorkload;
}

export function calculateRecoverySpread(
  remainingRecoverySubjects: number,
  spreadDays: number,
): number[] {
  if (
    remainingRecoverySubjects <= 0 ||
    spreadDays <= 0
  ) {
    return [];
  }

  const maximumRecoveryPerDay =
    LEARNING_CONSTANTS.MAX_DSC_SUBJECTS -
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS;

  if (
    Math.ceil(
      remainingRecoverySubjects / spreadDays,
    ) > maximumRecoveryPerDay
  ) {
    return [];
  }

  const base =
    Math.floor(
      remainingRecoverySubjects / spreadDays,
    );

  const remainder =
    remainingRecoverySubjects % spreadDays;

  return Array.from(
    { length: spreadDays },
    (_, index) =>
      base + (index < remainder ? 1 : 0),
  );
}

export function getRecoveryDailySubjectCount(
  recoverySubjects: number,
): number {
  return (
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS +
    recoverySubjects
  );
}

export function recoveryIsCleared(
  remainingRecoverySubjects: number,
): boolean {
  return remainingRecoverySubjects <= 0;
}
