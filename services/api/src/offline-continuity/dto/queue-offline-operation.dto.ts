
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  Max,
  Min,
} from 'class-validator';

import type { OfflineOperationType } from '../interfaces/offline-continuity.interface';

export class QueueOfflineOperationDto {
  @IsString()
  @IsNotEmpty()
  learnerId!: string;

  @IsString()
  @IsNotEmpty()
  operationId!: string;

  @IsEnum([
    'LEARNING_RESULT',
    'LEARNING_PROGRESS',
    'LEARNING_DELIVERY',
    'ADAPTIVE_DECISION',
  ])
  operationType!: OfflineOperationType;

  @IsISO8601()
  occurredAt!: string;

  @IsNumber()
  @Min(1)
  clientVersion!: number;

  @IsObject()
  payload!: Record<string, unknown>;
}
