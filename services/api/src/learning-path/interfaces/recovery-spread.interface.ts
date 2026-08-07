export interface RecoverySpread {
  learnerId: string;
  academicTermId: string;
  remainingRecoverySubjects: number;
  spreadDays: number;
  recoverySubjectsPerDay: number[];
  totalSubjectsPerDay: number[];
}
