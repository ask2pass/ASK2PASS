import {
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class RecordLearningInterruptionDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;

  @IsString()
  @MaxLength(100)
  learnerFirstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  distractionDescription?: string;
}
