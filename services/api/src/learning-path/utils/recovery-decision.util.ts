import { LEARNING_CONSTANTS } from '../constants/learning.constants';
import { buildRecoverySpread } from './recovery-spread.util';
import { isRecoverySpreadWithinTerm } from './recovery-term.util';

export function calculateOutstandingRecoverySubjects(
  previouslyOutstandingSubjects: number,
  completedRecoverySubjects: number,
  newlyMissedDays: number,
): number {
  const remainingPrevious = Math.max(
    previouslyOutstandingSubjects -
      completedRecoverySubjects,
    0,
  );

  const newlyMissedSubjects =
    Math.max(newlyMissedDays, 0) *
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS;

  return remainingPrevious + newlyMissedSubjects;
}

export function makeRecoveryDecision(
  remainingRecoverySubjects: number,
  spreadDays: number,
  remainingTermDays: number,
): {
  approved: boolean;
  reason: string | null;
  recoverySubjectsPerDay: number[];
  totalSubjectsPerDay: number[];
} {
  if (remainingRecoverySubjects <= 0) {
    return {
      approved: true,
      reason: null,
      recoverySubjectsPerDay: [],
      totalSubjectsPerDay: [],
    };
  }

  if (
    !isRecoverySpreadWithinTerm(
      spreadDays,
      remainingTermDays,
    )
  ) {
    return {
      approved: false,
      reason:
        'Recovery spread exceeds the remaining days of the current academic term.',
      recoverySubjectsPerDay: [],
      totalSubjectsPerDay: [],
    };
  }

  const distribution = buildRecoverySpread(
    remainingRecoverySubjects,
    spreadDays,
  );

  if (distribution.length === 0) {
    return {
      approved: false,
      reason:
        'The selected recovery spread would exceed the maximum daily DSC load.',
      recoverySubjectsPerDay: [],
      totalSubjectsPerDay: [],
    };
  }

  return {
    approved: true,
    reason: null,
    recoverySubjectsPerDay: distribution,
    totalSubjectsPerDay: distribution.map(
      (recoverySubjects) =>
        LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS +
        recoverySubjects,
    ),
  };
}
