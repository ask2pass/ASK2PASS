import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { AssessmentResponseType } from '../enums/assessment-response-type.enum';

export class MonthlyExamPTDMDto {
  @IsString()
  assessmentId!: string;

  @IsString()
  learnerId!: string;

  @IsEnum(AssessmentResponseType)
  responseType!: AssessmentResponseType;

  @IsBoolean()
  correctionRequired!: boolean;

  @IsBoolean()
  explanationRequired!: boolean;

  @IsBoolean()
  remediationRequired!: boolean;

  @IsBoolean()
  improvementStrategyRequired!: boolean;
}
