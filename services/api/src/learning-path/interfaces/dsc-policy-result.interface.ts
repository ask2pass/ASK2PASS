export interface DSCPolicyResult {
  requestedSubjectCount: number;
  approvedSubjectCount: number;
  defaultSubjectCount: number;
  recoverySubjectCount: number;
  recoveryActive: boolean;
  valid: boolean;
  reason: string | null;
}
