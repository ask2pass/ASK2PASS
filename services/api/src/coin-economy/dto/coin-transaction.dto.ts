import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { CoinMovementType } from '../enums/coin-movement-type.enum';

export class CoinTransactionDto {
  @IsInt()
  @Min(1)
  coins!: number;

  @IsEnum(CoinMovementType)
  movementType!: CoinMovementType;

  @IsString()
  @IsNotEmpty()
  reference!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
