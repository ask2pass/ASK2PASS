import {
  IsInt,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class RequestRecoverySpreadDto {
  @IsUUID()
  learnerId: string;

  @IsUUID()
  academicTermId: string;

  @IsInt()
  @Min(1)
  @Max(365)
  spreadDays: number;
}
