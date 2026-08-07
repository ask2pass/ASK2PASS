export interface RecoveryTermContext {
  academicTermId: string;
  termStartDate: string;
  termEndDate: string;
  currentDate: string;
  remainingTermDays: number;
  missedLearningDays: number;
  outstandingRecoverySubjects: number;
}
