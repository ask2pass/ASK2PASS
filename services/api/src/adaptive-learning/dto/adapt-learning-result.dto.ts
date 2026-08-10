
import {
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AdaptLearningResultDto {
  @IsString()
  learnerId!: string;

  @IsString()
  examinationType!: string;

  @IsString()
  subjectId!: string;

  @IsString()
  topicId!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  masteryPercent!: number;
}
