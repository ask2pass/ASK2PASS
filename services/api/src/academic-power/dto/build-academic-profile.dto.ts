
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

export class AcademicSubjectInput {
  @IsString()
  subjectId!: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  masteryPercent!: number;
}

export class BuildAcademicProfileDto {
  @IsString()
  learnerId!: string;

  @IsString()
  examinationType!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcademicSubjectInput)
  subjects!: AcademicSubjectInput[];

  @IsOptional()
  @IsString()
  activeSubjectId?: string;

  @IsOptional()
  @IsString()
  activeTopicId?: string;

  @IsOptional()
  @IsString()
  nextAction?:
    | 'LEARN'
    | 'PRACTICE'
    | 'DRILL'
    | 'ASSESS'
    | 'REVIEW';
}
