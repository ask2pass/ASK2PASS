export interface DSCGenerationRequest {
  classLevel: string;
  term: 'FIRST' | 'SECOND' | 'THIRD';
  academicSession: string;

  startDate: string;
  subjects: string[];

  completedTopics?: string[];
  recoveryTopics?: string[];
}

export interface GeneratedDailySubjectChart {
  classLevel: string;
  term: string;
  academicSession: string;

  days: {
    day: number;
    subjects: {
      subject: string;
      topic: string;
      lessonMinutes: number;
      revisionMinutes: number;
      cbtMinutes: number;
    }[];
  }[];
}
