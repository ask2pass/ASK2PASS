import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AatAcademicPowerAssessmentDto,
  AatAcademicPowerAnswerDto,
  AatAcademicPowerDimension,
  AatAcademicPowerOutcome,
  AatPtdmMode,
  AAT_ACADEMIC_POWER_CBT_QUESTION_COUNT,
} from '../dto/aat-academic-power-assessment.dto';

@Injectable()
export class LearningSessionAcademicPowerService {

  /**
   * Universal contract for every AAT.
   *
   * The AAT may differ in personality, teaching style, voice or name,
   * but the academic-power assessment contract remains identical.
   */
  getUniversalAssessmentContract(
    learnerId: string,
    sessionId: string,
    subject: string,
    module: string,
    lessonContext: string,
  ) {
    this.requireLessonContext(lessonContext);

    return {
      learnerId,
      sessionId,
      subject,
      module,
      lessonContext,

      questionCount: AAT_ACADEMIC_POWER_CBT_QUESTION_COUNT,

      purpose: 'ACADEMIC_POWER_BUILDING',

      mandatoryAfterLesson: true,
      lessonAnchored: true,

      dimensions: [
        {
          dimension: AatAcademicPowerDimension.CONCEPT,
          objective:
            'Establish that the learner understands the basic ideas, principles, terms and relationships taught.',
        },
        {
          dimension: AatAcademicPowerDimension.PURPOSE,
          objective:
            'Establish that the learner understands why the concepts matter, what they are for and where they are useful.',
        },
        {
          dimension: AatAcademicPowerDimension.APPLICATION,
          objective:
            'Establish that the learner can use the concepts correctly in appropriate academic or real-world situations.',
        },
      ],

      assessmentIntent: [
        'understanding',
        'meaning',
        'purpose',
        'application',
        'reasoning',
        'transfer',
      ],

      excludedIntent: [
        'mere_memorisation_only',
        'random_questions',
        'unrelated_topics',
        'generic_search',
      ],

      continuity: {
        source: 'JUST_CONCLUDED_LESSON',
        destinationOnNeed: 'PTDM',
        preserveLessonContext: true,
        universalAatBehaviour: true,
      },
    };
  }

  /**
   * Validates the 15-question academic-power structure.
   */
  validateAssessment(
    assessment: AatAcademicPowerAssessmentDto,
  ) {
    this.requireLessonContext(assessment.lessonContext);

    if (
      assessment.questions.length !==
      AAT_ACADEMIC_POWER_CBT_QUESTION_COUNT
    ) {
      throw new BadRequestException(
        'Academic-power CBT must contain exactly 15 questions.',
      );
    }

    const numbers = assessment.questions
      .map((question) => question.questionNumber)
      .sort((a, b) => a - b);

    for (let i = 0; i < 15; i++) {
      if (numbers[i] !== i + 1) {
        throw new BadRequestException(
          'Academic-power CBT questions must be numbered sequentially from 1 to 15.',
        );
      }
    }

    const dimensions = new Set(
      assessment.questions.map((question) => question.dimension),
    );

    for (const dimension of Object.values(AatAcademicPowerDimension)) {
      if (!dimensions.has(dimension)) {
        throw new BadRequestException(
          `Academic-power CBT must assess the ${dimension} dimension.`,
        );
      }
    }

    return {
      valid: true,
      questionCount: 15,
      lessonAnchored: true,
      academicPowerTarget: true,
    };
  }

  /**
   * Scores the learner against the lesson.
   *
   * A question is represented by the answer key supplied by the
   * assessment-generation layer. This service only evaluates the
   * academic result and determines the next learning action.
   */
  assess(
    assessment: AatAcademicPowerAssessmentDto,
    answers: AatAcademicPowerAnswerDto[],
  ) {
    this.validateAssessment(assessment);

    const answerMap = new Map(
      answers.map((answer) => [answer.questionNumber, answer.answer]),
    );

    let correct = 0;

    const dimensionTotals = {
      [AatAcademicPowerDimension.CONCEPT]: { total: 0, correct: 0 },
      [AatAcademicPowerDimension.PURPOSE]: { total: 0, correct: 0 },
      [AatAcademicPowerDimension.APPLICATION]: { total: 0, correct: 0 },
    };

    for (const question of assessment.questions) {
      const dimension = question.dimension;
      dimensionTotals[dimension].total++;

      const supplied = answerMap.get(question.questionNumber);

      if (
        supplied !== undefined &&
        this.normalise(supplied) === this.normalise(question.correctAnswer)
      ) {
        correct++;
        dimensionTotals[dimension].correct++;
      }
    }

    const answeredQuestions = answers.length;
    const scorePercentage =
      answeredQuestions === 0
        ? 0
        : Math.round((correct / assessment.questions.length) * 100);

    const dimensionScores = {
      concept: this.percent(
        dimensionTotals[AatAcademicPowerDimension.CONCEPT],
      ),
      purpose: this.percent(
        dimensionTotals[AatAcademicPowerDimension.PURPOSE],
      ),
      application: this.percent(
        dimensionTotals[AatAcademicPowerDimension.APPLICATION],
      ),
    };

    const outcome = this.determineOutcome(
      scorePercentage,
      dimensionScores,
    );

    const diagnosis = this.createDiagnosis(
      dimensionScores,
      outcome,
      assessment,
    );

    return {
      learnerId: assessment.learnerId,
      sessionId: assessment.sessionId,
      subject: assessment.subject,
      module: assessment.module,
      lessonContext: assessment.lessonContext,

      totalQuestions: 15,
      answeredQuestions,
      correctAnswers: correct,
      scorePercentage,

      dimensionScores,

      outcome,

      masteryDiagnosis: diagnosis,

      ptdmContinuation: this.createPtdmContinuation(
        assessment,
        outcome,
        dimensionScores,
      ),
    };
  }

  /**
   * Determines whether the learner has sufficient academic power
   * to move forward or should continue mastery work in PTDM.
   */
  determineOutcome(
    scorePercentage: number,
    dimensionScores: {
      concept: number;
      purpose: number;
      application: number;
    },
  ): AatAcademicPowerOutcome {
    const minimumDimension = Math.min(
      dimensionScores.concept,
      dimensionScores.purpose,
      dimensionScores.application,
    );

    if (scorePercentage >= 80 && minimumDimension >= 70) {
      return AatAcademicPowerOutcome.MASTERED;
    }

    if (scorePercentage >= 50 && minimumDimension >= 40) {
      return AatAcademicPowerOutcome.DEVELOPING;
    }

    return AatAcademicPowerOutcome.NEEDS_REMEDIATION;
  }

  /**
   * Converts the CBT result into an actionable learning diagnosis.
   */
  createDiagnosis(
    dimensionScores: {
      concept: number;
      purpose: number;
      application: number;
    },
    outcome: AatAcademicPowerOutcome,
    assessment: AatAcademicPowerAssessmentDto,
  ) {
    const strengths: string[] = [];
    const gaps: string[] = [];
    const recommendedFocus: string[] = [];

    const dimensions = [
      {
        name: 'concept',
        score: dimensionScores.concept,
        label: 'basic concepts and relationships',
      },
      {
        name: 'purpose',
        score: dimensionScores.purpose,
        label: 'purpose, meaning and usefulness',
      },
      {
        name: 'application',
        score: dimensionScores.application,
        label: 'application and transfer',
      },
    ];

    for (const dimension of dimensions) {
      if (dimension.score >= 80) {
        strengths.push(dimension.label);
      } else if (dimension.score < 70) {
        gaps.push(dimension.label);
        recommendedFocus.push(dimension.label);
      }
    }

    if (
      outcome !== AatAcademicPowerOutcome.MASTERED &&
      recommendedFocus.length === 0
    ) {
      recommendedFocus.push(
        `Further mastery of ${assessment.lessonContext}`,
      );
    }

    return {
      strengths,
      gaps,
      recommendedFocus,
    };
  }

  /**
   * Creates the continuation instruction for PTDM.
   *
   * PTDM is not a timed continuation of the lesson.
   * It is the mastery environment where the learner may continue
   * drilling, learning and deepening understanding without the
   * lesson's time constraint.
   */
  createPtdmContinuation(
    assessment: AatAcademicPowerAssessmentDto,
    outcome: AatAcademicPowerOutcome,
    dimensionScores: {
      concept: number;
      purpose: number;
      application: number;
    },
  ) {
    if (outcome === AatAcademicPowerOutcome.MASTERED) {
      return {
        eligible: true,
        mode: AatPtdmMode.EXTENSION,
        reason:
          'Learner demonstrated sufficient academic power; PTDM may be used for deeper learning or extension.',
        source: 'LESSON_CBT' as const,
        preserveLessonContext: true,
        lessonContext: assessment.lessonContext,
        subject: assessment.subject,
        module: assessment.module,
      };
    }

    const weakest = this.weakestDimension(dimensionScores);

    return {
      eligible: true,
      mode:
        outcome === AatAcademicPowerOutcome.NEEDS_REMEDIATION
          ? AatPtdmMode.MASTERY
          : AatPtdmMode.DRILL,
      reason:
        outcome === AatAcademicPowerOutcome.NEEDS_REMEDIATION
          ? `Continue mastery work from the lesson CBT, concentrating on ${weakest}.`
          : `Strengthen the learner's developing understanding, concentrating on ${weakest}.`,
      source: 'LESSON_CBT' as const,
      preserveLessonContext: true,
      lessonContext: assessment.lessonContext,
      subject: assessment.subject,
      module: assessment.module,
      recommendedFocus: weakest,
    };
  }

  /**
   * Universal PTDM entry contract.
   *
   * PTDM itself is not restricted to the 15-question CBT.
   * Once inside PTDM, the learner can continue learning according
   * to the learner's needs and direction.
   */
  getPtdmMasteryContract(
    learnerId: string,
    subject?: string,
    topic?: string,
    lessonContext?: string,
  ) {
    return {
      learnerId,

      mode: AatPtdmMode.MASTERY,

      scope: {
        subjectRestricted: false,
        topicRestricted: false,
        lessonTimeRestricted: false,
        sessionDurationRestricted: false,
      },

      continuity: {
        lessonContext: lessonContext || null,
        continueFromLesson: Boolean(lessonContext),
        continueFromCbt: Boolean(lessonContext),
      },

      capabilities: [
        'teach',
        'explain',
        're-explain',
        'drill',
        'practice',
        'question',
        'correct',
        'diagnose',
        'deepen',
        'extend',
        'master',
      ],

      learnerDirection: true,

      subject: subject || null,
      topic: topic || null,

      universalAatBehaviour: true,
    };
  }

  private weakestDimension(scores: {
    concept: number;
    purpose: number;
    application: number;
  }) {
    const entries = Object.entries(scores);
    return entries.sort((a, b) => a[1] - b[1])[0][0];
  }

  private percent(value: { total: number; correct: number }) {
    if (!value.total) return 0;
    return Math.round((value.correct / value.total) * 100);
  }

  private normalise(value: string) {
    return value.trim().toLowerCase();
  }

  private requireLessonContext(context: string) {
    if (!context || !context.trim()) {
      throw new BadRequestException(
        'Academic-power CBT must be anchored to the lesson just concluded.',
      );
    }
  }
}
