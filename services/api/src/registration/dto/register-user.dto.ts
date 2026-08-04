import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsString()
  stateOfResidence!: string;

  @IsOptional()
  @IsString()
  lgaOfResidence?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  residentialAddress?: string;

  @IsOptional()
  @IsString()
  addressOfOrigin?: string;

  @IsString()
  onboardingChannel!: string;

  @IsOptional()
  @IsString()
  referralCode?: string;

  @IsString()
  subscriptionPlan!: string;
}
