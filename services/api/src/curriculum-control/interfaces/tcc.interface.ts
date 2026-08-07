export interface TermCurriculumChart {
  classLevel: string;
  term: 'FIRST' | 'SECOND' | 'THIRD';
  academicSession: string;

  subjects: {
    subjectName: string;
    weeklyTopics: {
      week: number;
      topic: string;
      lessonHours: number;
    }[];
  }[];
}
