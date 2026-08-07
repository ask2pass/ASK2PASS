import {
  IsDateString,
  IsInt,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateDailySubjectChartDto {
  @IsUUID()
  learnerId: string;

  @IsUUID()
  learningPathId: string;

  @IsUUID()
  academicTermId: string;

  @IsDateString()
  chartDate: string;

  @IsOptional()
  @IsInt()
  @Min(4)
  @Max(12)
  requestedSubjectCount?: number;
}
