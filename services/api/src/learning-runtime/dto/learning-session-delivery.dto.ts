import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class LearningSessionDeliveryDto {
  @IsUUID()
  walletId: string;

  @IsUUID()
  learnerId: string;

  @IsUUID()
  sessionId: string;

  @IsUUID()
  lessonId: string;

  @IsInt()
  @Min(1)
  coins: number;

  @IsString()
  @IsNotEmpty()
  reference: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  offline?: boolean;
}
