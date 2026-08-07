export interface ExamResult {
  learnerId: string;
  subject: string;

  cbtScore: number;
  essayScore: number;
  homeworkScore: number;

  totalScore: number;
  percentage: number;
}

export interface TermGrade {
  learnerId: string;

  examAverage: number;
  assignmentScore: number;

  finalPercentage: number;
}
