import { LEARNING_CONSTANTS } from '../constants/learning.constants';

export function calculateDailyStarBlocks(
  completedSubjectCount: number,
  requiredSubjectCount: number,
  autoLogoutOccurred: boolean,
): number {
  if (
    autoLogoutOccurred ||
    completedSubjectCount < requiredSubjectCount ||
    requiredSubjectCount <= 0
  ) {
    return 0;
  }

  return Math.floor(
    requiredSubjectCount /
      LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
  );
}

export function calculateDailyStars(
  completedSubjectCount: number,
  requiredSubjectCount: number,
  autoLogoutOccurred: boolean,
): number {
  return (
    calculateDailyStarBlocks(
      completedSubjectCount,
      requiredSubjectCount,
      autoLogoutOccurred,
    ) *
    LEARNING_CONSTANTS.STARS_PER_FOUR_SUBJECTS
  );
}
