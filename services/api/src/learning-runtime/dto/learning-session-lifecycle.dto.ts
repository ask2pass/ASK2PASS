import { IsUUID } from 'class-validator';

export class LearningSessionLifecycleDto {
  @IsUUID()
  sessionId: string;

  @IsUUID()
  learnerId: string;
}
