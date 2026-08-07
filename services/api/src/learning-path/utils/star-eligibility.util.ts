export function isDailyStarEligible(
  autoLogoutOccurred: boolean,
): boolean {
  return !autoLogoutOccurred;
}
