
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class LearningPathTopicInput {
  @IsString()
  topicId!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  masteryPercent!: number;
}

export class LearningPathSubjectInput {
  @IsString()
  subjectId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearningPathTopicInput)
  topics!: LearningPathTopicInput[];
}

export class GenerateLearningPathDto {
  @IsString()
  learnerId!: string;

  @IsString()
  examinationType!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearningPathSubjectInput)
  subjects!: LearningPathSubjectInput[];

  @IsOptional()
  @IsString()
  currentSubjectId?: string;
}
