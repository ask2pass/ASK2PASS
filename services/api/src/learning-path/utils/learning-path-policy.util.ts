import { LEARNING_CONSTANTS } from '../constants/learning.constants';

export function isSupportedDailySubjectCount(
  count: number,
): boolean {
  return LEARNING_CONSTANTS.VALID_DSC_SUBJECTS.includes(count);
}

export function calculateStarBlocks(
  completedSubjects: number,
): number {
  if (completedSubjects < LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS) {
    return 0;
  }

  return Math.floor(
    completedSubjects /
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
  );
}

export function calculateStarsFromSubjectBlocks(
  completedSubjects: number,
): number {
  return (
    calculateStarBlocks(completedSubjects) *
    LEARNING_CONSTANTS.STARS_PER_FOUR_SUBJECTS
  );
}
