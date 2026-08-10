import {
  IsBoolean,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class RecordLearningResultDto {
  @IsString()
  learnerId!: string;

  @IsString()
  examinationType!: string;

  @IsString()
  subjectId!: string;

  @IsString()
  topicId!: string;

  @IsBoolean()
  correct!: boolean;

  @IsNumber()
  @Min(0)
  @Max(100)
  masteryDelta!: number;
}
