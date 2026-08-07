import { LEARNING_CONSTANTS } from '../constants/learning.constants';
import { DSCSubject } from '../interfaces/dsc-subject.interface';
import { RecoveryDecision } from '../interfaces/recovery-decision.interface';
import { makeRecoveryDecision } from './recovery-decision.util';
import { isValidDSCSubjectCount } from './dsc-policy.util';

export function buildDSCOrchestration(
  learnerId: string,
  academicTermId: string,
  chartDate: string,
  defaultSubjects: DSCSubject[],
  recoverySubjects: DSCSubject[],
  requestedSubjectCount: number,
  remainingTermDays: number,
  outstandingRecoverySubjects: number,
  spreadDays: number,
): {
  learnerId: string;
  academicTermId: string;
  chartDate: string;
  defaultSubjectCount: number;
  recoverySubjectCount: number;
  totalSubjectCount: number;
  subjects: DSCSubject[];
  recoveryDecision: RecoveryDecision | null;
  recoveryActive: boolean;
} {
  const defaultSelection = defaultSubjects.slice(
    0,
    LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
  );

  let recoveryDecision: RecoveryDecision | null = null;

  if (outstandingRecoverySubjects > 0) {
    recoveryDecision = {
      ...makeRecoveryDecision(
        outstandingRecoverySubjects,
        spreadDays,
        remainingTermDays,
      ),
      remainingRecoverySubjects:
        outstandingRecoverySubjects,
      spreadDays,
    };
  }

  const allowedRecoveryCount =
    recoveryDecision?.approved
      ? Math.max(
          0,
          Math.min(
            requestedSubjectCount -
              LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
            LEARNING_CONSTANTS.MAX_DSC_SUBJECTS -
              LEARNING_CONSTANTS.DEFAULT_DSC_SUBJECTS,
          ),
        )
      : 0;

  const selectedRecovery =
    recoverySubjects.slice(0, allowedRecoveryCount);

  const totalSubjects = [
    ...defaultSelection,
    ...selectedRecovery,
  ];

  const validRequestedCount =
    isValidDSCSubjectCount(requestedSubjectCount);

  return {
    learnerId,
    academicTermId,
    chartDate,
    defaultSubjectCount: defaultSelection.length,
    recoverySubjectCount: selectedRecovery.length,
    totalSubjectCount: totalSubjects.length,
    subjects: totalSubjects,
    recoveryDecision,
    recoveryActive: selectedRecovery.length > 0,
  };
}
