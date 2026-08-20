export type ScheduleActivityType =
  | 'LESSON'
  | 'EXAMINATION';

export interface SchedulingSubject {
  subject: string;

  /**
   * Relative curriculum workload.
   * Higher workload permits greater scheduling frequency.
   */
  workloadWeight?: number;
}

export interface WorkloadScheduleRequest {
  classLevel: string;

  term: 'FIRST' | 'SECOND' | 'THIRD';

  academicSession: string;

  subjects: SchedulingSubject[];

  examinationWeek?: boolean;

  examinationSubjects?: string[];
}

export interface ScheduledActivity {
  subject: string;

  activityType: ScheduleActivityType;

  day: number;

  sequence: number;
}

export interface WorkloadSchedule {
  classLevel: string;

  term: 'FIRST' | 'SECOND' | 'THIRD';

  academicSession: string;

  days: {
    day: number;
    activities: ScheduledActivity[];
  }[];
}
