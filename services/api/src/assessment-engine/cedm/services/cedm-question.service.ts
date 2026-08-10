import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMQuestionType } from '../enums/cedm-question-type.enum';
import { CEDMQuestion } from '../interfaces/cedm-question.interface';
import { CEDMAnswerResult } from '../interfaces/cedm-answer-result.interface';

@Injectable()
export class CEDMQuestionService {
  private readonly questions = new Map<string, CEDMQuestion>();

  generateSimulationQuestion(
    examinationType: CEDMExaminationType,
    subjectId: string,
    topicId: string,
    objective: string,
    options: string[],
    correctAnswer: string,
    explanation: string,
  ): CEDMQuestion {
    if (options.length < 2) {
      throw new BadRequestException('A CEDM objective question requires at least two options.');
    }

    if (!options.includes(correctAnswer)) {
      throw new BadRequestException('Correct answer must exist in the supplied options.');
    }

    const question: CEDMQuestion = {
      questionId: randomUUID(),
      examinationType,
      subjectId,
      topicId,
      questionType: CEDMQuestionType.OBJECTIVE,
      questionText: objective,
      options,
      correctAnswer,
      explanation,
      sourceType: CEDMQuestionSourceType.AI_SIMULATED,
      licensed: false,
      sourceVerified: true,
      generated: true,
    };

    this.questions.set(question.questionId, question);
    return question;
  }

  registerLicensedQuestion(question: CEDMQuestion): CEDMQuestion {
    if (
      question.sourceType !== CEDMQuestionSourceType.LICENSED_PAST_QUESTION ||
      question.licensed !== true ||
      question.generated !== false ||
      question.sourceVerified !== true ||
      question.year === undefined ||
      question.year < 2018 ||
      question.year > 2026
    ) {
      throw new BadRequestException(
        'Licensed CEDM past questions must be verified questions from 2018 through 2026.',
      );
    }

    this.questions.set(question.questionId, question);
    return question;
  }

  getQuestion(questionId: string): CEDMQuestion {
    const question = this.questions.get(questionId);

    if (!question) {
      throw new BadRequestException('CEDM question was not found.');
    }

    return question;
  }

  answerQuestion(
    questionId: string,
    selectedAnswer: string,
  ): CEDMAnswerResult {
    const question = this.getQuestion(questionId);

    const correct = selectedAnswer === question.correctAnswer;

    return {
      questionId,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      correct,
      scorePercent: correct ? 100 : 0,
      explanation: question.explanation,
    };
  }
}
