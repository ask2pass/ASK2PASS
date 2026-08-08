import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export enum AatCbtDimension {
  CONCEPT = 'CONCEPT',
  PURPOSE = 'PURPOSE',
  APPLICATION = 'APPLICATION',
}

export enum AatCbtOutcome {
  MASTERED = 'MASTERED',
  DEVELOPING = 'DEVELOPING',
  NEEDS_REMEDIATION = 'NEEDS_REMEDIATION',
}

export class AatAcademicPowerCbtDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;

  @IsString()
  subject: string;

  @IsString()
  module: string;

  @IsString()
  lessonContext: string;

  @IsInt()
  @Min(1)
  @Max(15)
  questionNumber: number;

  @IsString()
  dimension: AatCbtDimension;

  @IsOptional()
  @IsString()
  concept?: string;

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsString()
  applicationContext?: string;
}

export const AAT_CBT_QUESTIONS_PER_LESSON = 15;

export const AAT_CBT_DIMENSIONS: AatCbtDimension[] = [
  AatCbtDimension.CONCEPT,
  AatCbtDimension.PURPOSE,
  AatCbtDimension.APPLICATION,
];
