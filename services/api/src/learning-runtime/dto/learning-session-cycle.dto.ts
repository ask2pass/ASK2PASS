import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class LearningSessionCycleDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  module?: string;

  @IsOptional()
  @IsString()
  lessonContext?: string;
}

export enum LearningCycleStage {
  LESSON = 'LESSON',
  REVISION_RECAP = 'REVISION_RECAP',
  CBT_QUIZ = 'CBT_QUIZ',
  COMPLETED = 'COMPLETED',
}

export const LEARNING_CYCLE_DURATION_MINUTES = 40;
export const LESSON_DURATION_MINUTES = 25;
export const REVISION_RECAP_DURATION_MINUTES = 5;
export const CBT_QUIZ_DURATION_MINUTES = 10;
export const CBT_QUESTIONS_PER_LESSON = 15;
