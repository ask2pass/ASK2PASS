export interface RecoveryDecision {
  approved: boolean;
  reason: string | null;
  remainingRecoverySubjects: number;
  spreadDays: number;
  recoverySubjectsPerDay: number[];
  totalSubjectsPerDay: number[];
}
