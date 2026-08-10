import { IsString } from 'class-validator';

export class AnswerCEDMQuestionDto {
  @IsString()
  sessionId!: string;

  @IsString()
  questionId!: string;

  @IsString()
  selectedAnswer!: string;
}
