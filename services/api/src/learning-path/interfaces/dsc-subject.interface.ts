export interface DSCSubject {
  subjectId: string;
  lessonId: string;
  recoveryLesson: boolean;
  sequence: number;
  prerequisiteLessonIds: string[];
}
