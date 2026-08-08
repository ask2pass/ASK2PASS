import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum AatAcademicPowerDimension {
  CONCEPT = 'CONCEPT',
  PURPOSE = 'PURPOSE',
  APPLICATION = 'APPLICATION',
}

export enum AatAcademicPowerOutcome {
  MASTERED = 'MASTERED',
  DEVELOPING = 'DEVELOPING',
  NEEDS_REMEDIATION = 'NEEDS_REMEDIATION',
}

export enum AatPtdmMode {
  MASTERY = 'MASTERY',
  DRILL = 'DRILL',
  DEEPEN = 'DEEPEN',
  EXTENSION = 'EXTENSION',
}

export class AatAcademicPowerQuestionDto {
  @IsInt()
  @Min(1)
  @Max(15)
  questionNumber: number;

  @IsEnum(AatAcademicPowerDimension)
  dimension: AatAcademicPowerDimension;

  @IsString()
  question: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsString()
  correctAnswer: string;

  @IsString()
  conceptTarget: string;

  @IsString()
  purposeTarget: string;

  @IsString()
  applicationTarget: string;
}

export class AatAcademicPowerAssessmentDto {
  @IsUUID()
  learnerId: string;

  @IsUUID()
  sessionId: string;

  @IsString()
  subject: string;

  @IsString()
  module: string;

  @IsString()
  lessonContext: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AatAcademicPowerQuestionDto)
  questions: AatAcademicPowerQuestionDto[];

  @IsOptional()
  @IsBoolean()
  lessonCompleted?: boolean;
}

export class AatAcademicPowerAnswerDto {
  @IsInt()
  @Min(1)
  @Max(15)
  questionNumber: number;

  @IsString()
  answer: string;
}

export class AatAcademicPowerAssessmentResultDto {
  learnerId: string;
  sessionId: string;
  subject: string;
  module: string;
  lessonContext: string;

  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  scorePercentage: number;

  dimensionScores: {
    concept: number;
    purpose: number;
    application: number;
  };

  outcome: AatAcademicPowerOutcome;

  masteryDiagnosis: {
    strengths: string[];
    gaps: string[];
    recommendedFocus: string[];
  };

  ptdmContinuation: {
    eligible: boolean;
    mode: AatPtdmMode;
    reason: string;
    source: 'LESSON_CBT';
    preserveLessonContext: boolean;
  };
}

export const AAT_ACADEMIC_POWER_CBT_QUESTION_COUNT = 15;

export const AAT_ACADEMIC_POWER_DIMENSIONS = [
  AatAcademicPowerDimension.CONCEPT,
  AatAcademicPowerDimension.PURPOSE,
  AatAcademicPowerDimension.APPLICATION,
] as const;
