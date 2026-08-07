import { LEARNING_CONSTANTS } from '../constants/learning.constants';

export function buildRecoverySpread(
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

export function buildTotalDSCPerDay(
  recoveryDistribution: number[],
): number[] {
  return recoveryDistribution.map(
    (recoverySubjects) =>
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS +
      recoverySubjects,
  );
}
