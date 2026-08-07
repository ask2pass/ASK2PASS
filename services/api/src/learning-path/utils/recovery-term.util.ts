import { LEARNING_CONSTANTS } from '../constants/learning.constants';

export function calculateRemainingTermDays(
  currentDate: string,
  termEndDate: string,
): number {
  const current = new Date(currentDate);
  const end = new Date(termEndDate);

  if (
    Number.isNaN(current.getTime()) ||
    Number.isNaN(end.getTime()) ||
    end < current
  ) {
    return 0;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.max(
    0,
    Math.floor(
      (end.getTime() - current.getTime()) /
        millisecondsPerDay,
    ) + 1,
  );
}

export function isRecoverySpreadWithinTerm(
  spreadDays: number,
  remainingTermDays: number,
): boolean {
  return (
    spreadDays >= 1 &&
    spreadDays <= remainingTermDays
  );
}

export function getMaximumRecoveryLoadPerDay(): number {
  return (
    LEARNING_CONSTANTS.MAX_DSC_SUBJECTS -
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS
  );
}
