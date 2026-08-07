export interface TCCTopic {
  classLevel: string;
  subject: string;
  term: 'FIRST' | 'SECOND' | 'THIRD';

  month: number;
  week: number;

  topic: string;
  subTopic: string;

  lessonCount: number;
  lessonDurationMinutes: number;
}
