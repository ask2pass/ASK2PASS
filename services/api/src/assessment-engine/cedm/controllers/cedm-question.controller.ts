import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AnswerCEDMQuestionDto } from '../dto/answer-cedm-question.dto';
import { CEDMQuestionService } from '../services/cedm-question.service';

@Controller('assessment/cedm/questions')
export class CEDMQuestionController {
  constructor(
    private readonly questionService: CEDMQuestionService,
  ) {}

  @Get(':questionId')
  getQuestion(@Param('questionId') questionId: string) {
    return this.questionService.getQuestion(questionId);
  }

  @Post(':questionId/answer')
  answer(
    @Param('questionId') questionId: string,
    @Body() dto: AnswerCEDMQuestionDto,
  ) {
    return this.questionService.answerQuestion(
      questionId,
      dto.selectedAnswer,
    );
  }
}
