import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LearningSessionAatInteractionDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;

  @IsString()
  question: string;

  @IsOptional()
  @IsString()
  lessonContext?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  module?: string;
}
