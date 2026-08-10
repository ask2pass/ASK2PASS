import { ArrayMinSize, IsArray, IsEnum, IsString } from 'class-validator';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';

export class StartCEDMDto {
  @IsString()
  learnerId!: string;

  @IsEnum(CEDMExaminationType)
  examinationType!: CEDMExaminationType;

  @IsString()
  subjectId!: string;

  @IsArray()
  @ArrayMinSize(5)
  @IsString({ each: true })
  topicIds!: string[];

  @IsEnum(CEDMAdaptiveMode)
  adaptiveMode!: CEDMAdaptiveMode;

  @IsEnum(CEDMQuestionSourceType)
  questionSourceType!: CEDMQuestionSourceType;
}
