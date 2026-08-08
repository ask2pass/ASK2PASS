import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { LearningSessionStatus } from '../enums/learning-session-status.enum';

export class LearningSessionStateDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;

  @IsEnum(LearningSessionStatus)
  status: LearningSessionStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
