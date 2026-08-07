import { DSCSubject } from './dsc-subject.interface';

export interface DSCGenerationResult {
  chartDate: string;
  defaultSubjectCount: number;
  recoverySubjectCount: number;
  totalSubjectCount: number;
  subjects: DSCSubject[];
  recoveryActive: boolean;
}
