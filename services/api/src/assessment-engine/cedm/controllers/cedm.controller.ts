import { Body, Controller, Post } from '@nestjs/common';
import { StartCEDMDto } from '../dto/start-cedm.dto';
import { CEDMService } from '../services/cedm.service';

@Controller('assessment/cedm')
export class CEDMController {
  constructor(private readonly cedmService: CEDMService) {}

  @Post('start')
  start(@Body() dto: StartCEDMDto) {
    return this.cedmService.startSession(
      dto.learnerId,
      dto.examinationType,
      dto.subjectId,
      dto.topicIds,
      dto.adaptiveMode,
      dto.questionSourceType,
    );
  }
}
