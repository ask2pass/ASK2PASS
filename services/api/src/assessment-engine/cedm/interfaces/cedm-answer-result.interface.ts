export interface CEDMAnswerResult {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
  scorePercent: number;
  explanation: string;
}
