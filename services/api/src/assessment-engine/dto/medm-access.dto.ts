import { IsString } from 'class-validator';

export class MEDMAccessDto {
  @IsString()
  learnerId!: string;
}
