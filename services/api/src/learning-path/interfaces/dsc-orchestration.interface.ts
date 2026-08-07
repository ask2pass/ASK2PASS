import { DSCSubject } from './dsc-subject.interface';
import { RecoveryDecision } from './recovery-decision.interface';

export interface DSCOrchestrationResult {
  learnerId: string;
  academicTermId: string;
  chartDate: string;
  defaultSubjectCount: number;
  recoverySubjectCount: number;
  totalSubjectCount: number;
  subjects: DSCSubject[];
  recoveryDecision: RecoveryDecision | null;
  recoveryActive: boolean;
}
