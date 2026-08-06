export interface AccessSummary {
  membershipStatus: string;
  accessGranted: boolean;
  accessExpiresAt: Date;
  remainingDays: number;
}
