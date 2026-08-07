import { DSCSubject } from './dsc-subject.interface';

export interface DSCWeeklyDay {
  date: string;
  defaultSubjects: DSCSubject[];
  recoverySubjects: DSCSubject[];
  totalSubjects: DSCSubject[];
}

export interface DSCWeeklyPlan {
  learnerId: string;
  academicTermId: string;
  days: DSCWeeklyDay[];
}
