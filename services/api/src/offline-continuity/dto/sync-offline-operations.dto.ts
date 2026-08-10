
import {
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { QueueOfflineOperationDto } from './queue-offline-operation.dto';

export class SyncOfflineOperationsDto {
  @IsString()
  learnerId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QueueOfflineOperationDto)
  operations!: QueueOfflineOperationDto[];
}
