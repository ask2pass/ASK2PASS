import { IsOptional, IsString, IsUUID } from 'class-validator';

export class LearningSessionContinuityDto {
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
