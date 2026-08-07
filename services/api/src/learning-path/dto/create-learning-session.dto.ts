import { IsBoolean, IsEnum, IsUUID } from 'class-validator';
import { AITutor } from '../enums/ai-tutor.enum';

export class CreateLearningSessionDto {
  @IsUUID()
  learnerId: string;

  @IsUUID()
  dailySubjectChartId: string;

  @IsUUID()
  subjectId: string;

  @IsUUID()
  lessonId: string;

  @IsBoolean()
  recoveryLesson: boolean;

  @IsEnum(AITutor)
  aiTutor: AITutor;
}
