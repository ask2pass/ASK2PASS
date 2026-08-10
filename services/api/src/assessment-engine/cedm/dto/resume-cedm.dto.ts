import { IsString } from 'class-validator';

export class ResumeCEDMDto {
  @IsString()
  sessionId!: string;

  @IsString()
  learnerId!: string;
}
