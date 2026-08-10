import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CEDMGenerationMode } from '../enums/cedm-generation-mode.enum';
import { CEDMQuestionProvenance } from '../enums/cedm-provenance.enum';
import { CEDMGeneratedQuestion } from '../interfaces/cedm-generated-question.interface';
import { CEDMGenerationRequest } from '../interfaces/cedm-generation-request.interface';
import { CEDMGenerationResult } from '../interfaces/cedm-generation-result.interface';

@Injectable()
export class CEDMGenerationService {
  private readonly minimumQuestionCount = 1;
  private readonly maximumQuestionCount = 200;

  resolveGenerationMode(
    requested: CEDMGenerationMode,
    licensedBankAvailable: boolean,
  ): CEDMGenerationMode {
    if (
      requested === CEDMGenerationMode.LICENSED_ONLY &&
      !licensedBankAvailable
    ) {
      throw new BadRequestException(
        'Licensed CEDM question bank is unavailable for the requested licensed-only session.',
      );
    }

    if (
      requested === CEDMGenerationMode.HYBRID &&
      !licensedBankAvailable
    ) {
      return CEDMGenerationMode.SIMULATED_ONLY;
    }

    return requested;
  }

  validateRequest(request: CEDMGenerationRequest): void {
    if (
      request.questionCount < this.minimumQuestionCount ||
      request.questionCount > this.maximumQuestionCount
    ) {
      throw new BadRequestException(
        `CEDM question count must be between ${this.minimumQuestionCount} and ${this.maximumQuestionCount}.`,
      );
    }

    if (!request.learnerId?.trim()) {
      throw new BadRequestException('Learner ID is required.');
    }

    if (!request.subjectId?.trim()) {
      throw new BadRequestException('Subject ID is required.');
    }

    if (!request.topicId?.trim()) {
      throw new BadRequestException('Topic ID is required.');
    }
  }

  generate(
    request: CEDMGenerationRequest,
    licensedQuestions: CEDMGeneratedQuestion[] = [],
  ): CEDMGenerationResult {
    this.validateRequest(request);

    const mode = this.resolveGenerationMode(
      request.generationMode,
      request.licensedBankAvailable,
    );

    const usableLicensed = licensedQuestions.filter(
      (question) =>
        question.licensed === true &&
        question.sourceVerified === true &&
        question.generated === false &&
        question.examinationType === request.examinationType &&
        question.subjectId === request.subjectId &&
        question.topicId === request.topicId,
    );

    const questions: CEDMGeneratedQuestion[] = [];

    if (
      mode === CEDMGenerationMode.LICENSED_ONLY ||
      mode === CEDMGenerationMode.HYBRID
    ) {
      questions.push(...usableLicensed.slice(0, request.questionCount));
    }

    const remaining = request.questionCount - questions.length;

    if (
      remaining > 0 &&
      (mode === CEDMGenerationMode.SIMULATED_ONLY ||
        mode === CEDMGenerationMode.HYBRID)
    ) {
      for (let index = 0; index < remaining; index += 1) {
        questions.push(
          this.createSimulatedQuestion(
            request,
            index + 1,
          ),
        );
      }
    }

    if (questions.length !== request.questionCount) {
      throw new BadRequestException(
        'CEDM could not satisfy the requested question count from the permitted source mode.',
      );
    }

    const licensedQuestionCount = questions.filter(
      (question) =>
        question.provenance === CEDMQuestionProvenance.LICENSED_PAST_QUESTION,
    ).length;

    const simulatedQuestionCount = questions.filter(
      (question) =>
        question.provenance === CEDMQuestionProvenance.AI_SIMULATED,
    ).length;

    const hybridQuestionCount = questions.filter(
      (question) =>
        question.provenance === CEDMQuestionProvenance.HYBRID_DERIVED,
    ).length;

    let provenance = CEDMQuestionProvenance.AI_SIMULATED;

    if (licensedQuestionCount > 0 && simulatedQuestionCount > 0) {
      provenance = CEDMQuestionProvenance.HYBRID_DERIVED;
    } else if (licensedQuestionCount > 0) {
      provenance = CEDMQuestionProvenance.LICENSED_PAST_QUESTION;
    }

    return {
      questions,
      provenance,
      licensedQuestionCount,
      simulatedQuestionCount,
      hybridQuestionCount,
      sourceIntegrityVerified: questions.every(
        (question) =>
          question.sourceVerified === true &&
          (
            question.provenance ===
              CEDMQuestionProvenance.LICENSED_PAST_QUESTION
              ? question.licensed === true && question.generated === false
              : question.generated === true
          ),
      ),
    };
  }

  private createSimulatedQuestion(
    request: CEDMGenerationRequest,
    sequence: number,
  ): CEDMGeneratedQuestion {
    return {
      questionId: randomUUID(),
      examinationType: request.examinationType,
      subjectId: request.subjectId,
      topicId: request.topicId,
      questionText:
        `Simulated ${request.examinationType} ${request.difficulty} ` +
        `practice question ${sequence} for topic ${request.topicId}.`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D',
      ],
      correctAnswer: 'Option A',
      explanation:
        'This simulated question is generated for structured practice. ' +
        'The final production generator must populate the curriculum-grounded ' +
        'question, verified answer, rationale, and difficulty metadata.',
      difficulty: request.difficulty,
      provenance: CEDMQuestionProvenance.AI_SIMULATED,
      licensed: false,
      sourceVerified: true,
      generated: true,
    };
  }
}
