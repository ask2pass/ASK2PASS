import { IsOptional, IsString } from 'class-validator';

export class CompleteOnboardingDto {
  @IsOptional()
  @IsString()
  residentialAddress?: string;

  @IsOptional()
  @IsString()
  addressOfOrigin?: string;
}
