
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateLearningDeliveryDto {
  @IsString()
  learnerId!: string;

  @IsString()
  examinationType!: string;

  @IsString()
  subjectId!: string;

  @IsOptional()
  @IsString()
  topicId?: string;

  @IsIn(['LEARN', 'PRACTICE', 'DRILL', 'ASSESS', 'REVIEW'])
  action!: 'LEARN' | 'PRACTICE' | 'DRILL' | 'ASSESS' | 'REVIEW';

  @IsNumber()
  @Min(0)
  coinCost!: number;

  @IsOptional()
  @IsString()
  resumeSessionId?: string;
}
