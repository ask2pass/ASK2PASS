export interface RecoveryState {
  learnerId: string;
  academicTermId: string;

  /**
   * Recovery workload still outstanding from previously
   * missed and not yet recovered learning sessions.
   */
  outstandingRecoverySubjects: number;

  /**
   * Number of newly missed learning days detected while
   * the learner is already in recovery.
   */
  newlyMissedDays: number;

  /**
   * Subjects completed specifically as recovery work.
   */
  completedRecoverySubjects: number;

  /**
   * Remaining recovery subjects after completed recovery
   * work has been deducted.
   */
  remainingRecoverySubjects: number;

  /**
   * Days currently selected by the learner for spreading
   * the remaining recovery workload.
   */
  selectedSpreadDays: number | null;

  /**
   * Indicates whether recovery is currently active.
   */
  recoveryActive: boolean;
}
