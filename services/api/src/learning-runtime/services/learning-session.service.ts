import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningSession } from '../entities/learning-session.entity';
import { LearningSessionStatus } from '../enums/learning-session-status.enum';

@Injectable()
export class LearningSessionService {
  constructor(
    @InjectRepository(LearningSession)
    private readonly repository: Repository<LearningSession>,
  ) {}

  async createSession(request: {
    walletId: string;
    learnerId: string;
    lessonId: string;
    coins: number;
    reference: string;
    description: string;
    offline?: boolean;
  }): Promise<LearningSession> {
    const existing = await this.repository.findOne({
      where: { reference: request.reference },
    });

    if (existing) {
      return existing;
    }

    const session = this.repository.create({
      ...request,
      status: LearningSessionStatus.CREATED,
    });

    return this.repository.save(session);
  }

  async getSession(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.repository.findOne({
      where: { id: sessionId, learnerId },
    });

    if (!session) {
      throw new NotFoundException('Learning session not found');
    }

    return session;
  }

  classifyLessonQuestion(
    question: string,
    lessonContext?: string,
  ): {
    classification: 'LESSON_CRITICAL' | 'EXTENDED' | 'UNRELATED';
    recommendation: 'ANSWER_AND_CONTINUE' | 'ANSWER_AND_OFFER_PTDM';
  } {
    const normalized = question.trim().toLowerCase();
    const context = (lessonContext || '').trim().toLowerCase();

    if (!normalized) {
      return {
        classification: 'LESSON_CRITICAL',
        recommendation: 'ANSWER_AND_CONTINUE',
      };
    }

    const extendedSignals = [
      'teach me everything',
      'give me more examples',
      'more examples',
      'practice this',
      'drill me',
      'deeply explain',
      'explain in detail',
      'go deeper',
      'advanced',
      'quiz me',
    ];

    if (extendedSignals.some((signal) => normalized.includes(signal))) {
      return {
        classification: 'EXTENDED',
        recommendation: 'ANSWER_AND_OFFER_PTDM',
      };
    }

    if (context && normalized.includes(context)) {
      return {
        classification: 'LESSON_CRITICAL',
        recommendation: 'ANSWER_AND_CONTINUE',
      };
    }

    const lessonSignals = [
      'why',
      'how',
      'what does',
      'what is',
      'mean',
      'explain',
      'answer',
      'step',
      'understand',
      'this question',
      'this part',
    ];

    if (lessonSignals.some((signal) => normalized.includes(signal))) {
      return {
        classification: 'LESSON_CRITICAL',
        recommendation: 'ANSWER_AND_CONTINUE',
      };
    }

    return {
      classification: 'UNRELATED',
      recommendation: 'ANSWER_AND_OFFER_PTDM',
    };
  }

  getAatFamiliarityContext(
    learnerId: string,
    subject?: string,
    module?: string,
    origin?: 'LESSON' | 'PTDM',
  ) {
    return {
      learnerId,
      subject: subject || null,
      module: module || null,
      origin: origin || 'LESSON',
      familiarity: true,
      greetingMode: 'BRIEF',
      continuity: true,
    };
  }

  async enterPtdm(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    if (session.status !== LearningSessionStatus.IN_PROGRESS) {
      throw new NotFoundException(
        'Only an in-progress learning session can enter PTDM',
      );
    }

    session.status = LearningSessionStatus.PAUSED;
    return this.repository.save(session);
  }


  async returnFromPtdm(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    if (session.status !== LearningSessionStatus.PAUSED) {
      throw new NotFoundException(
        'Only a paused learning session can return from PTDM',
      );
    }

    session.status = LearningSessionStatus.IN_PROGRESS;

    return this.repository.save(session);
  }

  getSessionContinuityContext(
    learnerId: string,
    sessionId: string,
    subject?: string,
    module?: string,
    lessonContext?: string,
    origin: 'LESSON' | 'PTDM' = 'LESSON',
  ) {
    return {
      learnerId,
      sessionId,
      subject: subject || null,
      module: module || null,
      lessonContext: lessonContext || null,
      origin,
      familiarity: true,
      continuity: true,
      preserveSession: true,
      preserveLessonContext: true,
    };
  }

  getFortyMinuteLearningCycle(
    learnerId: string,
    sessionId: string,
    subject?: string,
    module?: string,
    lessonContext?: string,
  ) {
    return {
      learnerId,
      sessionId,
      subject: subject || null,
      module: module || null,
      lessonContext: lessonContext || null,

      totalDurationMinutes: 40,

      stages: [
        {
          stage: 'LESSON',
          durationMinutes: 25,
          purpose: 'CORE_LESSON',
          protected: true,
        },
        {
          stage: 'REVISION_RECAP',
          durationMinutes: 5,
          purpose: 'BASICS_REVISION_AND_RECAP',
          protected: true,
        },
        {
          stage: 'CBT_QUIZ',
          durationMinutes: 10,
          purpose: 'LESSON_ASSESSMENT',
          questionCount: 15,
          protected: true,
        },
      ],

      quiz: {
        questionCount: 15,
        durationMinutes: 10,
        oneLessonAssessment: true,
      },

      familiarity: true,
      continuity: true,
      preserveSession: true,
      preserveLessonContext: true,
      ptdmCompatible: true,
    };
  }

  getLearningCycleStage(stage: string) {
    const normalized = (stage || '').trim().toUpperCase();

    const stages = {
      LESSON: {
        stage: 'LESSON',
        durationMinutes: 25,
        nextStage: 'REVISION_RECAP',
      },
      REVISION_RECAP: {
        stage: 'REVISION_RECAP',
        durationMinutes: 5,
        nextStage: 'CBT_QUIZ',
      },
      CBT_QUIZ: {
        stage: 'CBT_QUIZ',
        durationMinutes: 10,
        questionCount: 15,
        nextStage: 'COMPLETED',
      },
      COMPLETED: {
        stage: 'COMPLETED',
        durationMinutes: 0,
        nextStage: null,
      },
    };

    return (
      stages[normalized as keyof typeof stages] || {
        stage: 'LESSON',
        durationMinutes: 25,
        nextStage: 'REVISION_RECAP',
      }
    );
  }

  validateCbtQuestionCount(questionCount: number) {
    if (questionCount !== 15) {
      throw new BadRequestException(
        'Each lesson CBT assessment must contain exactly 15 questions',
      );
    }

    return {
      valid: true,
      questionCount: 15,
      durationMinutes: 10,
    };
  }


  getAcademicPowerCbtContract(
    learnerId: string,
    sessionId: string,
    subject: string,
    module: string,
    lessonContext: string,
  ) {
    return {
      learnerId,
      sessionId,
      subject,
      module,
      lessonContext,

      questionCount: 15,
      durationMinutes: 10,

      purpose: 'ACADEMIC_POWER_BUILDING',

      source: {
        type: 'JUST_CONCLUDED_LESSON',
        subject,
        module,
        lessonContext,
        mandatory: true,
      },

      dimensions: [
        {
          dimension: 'CONCEPT',
          purpose: 'Confirm understanding of the basic concepts taught.',
        },
        {
          dimension: 'PURPOSE',
          purpose: 'Confirm understanding of why the concepts matter and what they are used for.',
        },
        {
          dimension: 'APPLICATION',
          purpose: 'Confirm the learner can apply the lesson concepts to appropriate situations or problems.',
        },
      ],

      assessmentRules: {
        exactlyFifteenQuestions: true,
        lessonAnchored: true,
        assessConcepts: true,
        assessPurpose: true,
        assessApplication: true,
        buildAcademicPower: true,
        generateLearningDiagnosis: true,
        supportPtdmContinuation: true,
      },

      continuity: {
        preserveSession: true,
        preserveLessonContext: true,
        ptdmCompatible: true,
        universalAatBehaviour: true,
      },
    };
  }

  getAcademicPowerCbtQuestionContract(
    questionNumber: number,
    lessonContext: string,
    dimension: string,
  ) {
    if (questionNumber < 1 || questionNumber > 15) {
      throw new BadRequestException(
        'CBT question number must be between 1 and 15',
      );
    }

    const allowedDimensions = ['CONCEPT', 'PURPOSE', 'APPLICATION'];

    if (!allowedDimensions.includes(dimension.toUpperCase())) {
      throw new BadRequestException(
        'CBT dimension must be CONCEPT, PURPOSE, or APPLICATION',
      );
    }

    if (!lessonContext || !lessonContext.trim()) {
      throw new BadRequestException(
        'CBT questions must be anchored to the lesson just concluded',
      );
    }

    return {
      questionNumber,
      totalQuestions: 15,
      lessonContext,
      dimension: dimension.toUpperCase(),
      academicPowerTarget: true,
      lessonAnchored: true,
      ptdmEligible: true,
    };
  }

  getPtdmContinuationFromCbt(
    learnerId: string,
    sessionId: string,
    subject: string,
    module: string,
    lessonContext: string,
    questionNumber: number,
    outcome: string,
  ) {
    const normalizedOutcome = (outcome || '').trim().toUpperCase();

    if (!['MASTERED', 'DEVELOPING', 'NEEDS_REMEDIATION'].includes(normalizedOutcome)) {
      throw new BadRequestException(
        'Invalid CBT learning outcome',
      );
    }

    return {
      learnerId,
      sessionId,
      origin: 'CBT',
      destination: 'PTDM',
      subject,
      module,
      lessonContext,
      questionNumber,
      outcome: normalizedOutcome,

      purpose: 'MASTERY',

      continuity: {
        continueFromLesson: true,
        continueFromCbt: true,
        preserveLessonContext: true,
        preserveSession: true,
        universalAatBehaviour: true,
      },

      drillTarget: {
        source: 'CBT_RESULT',
        questionNumber,
        lessonContext,
        adaptive: true,
      },

      ptdm: {
        unlimitedLessonTime: true,
        unrestrictedSubjectScope: true,
        unrestrictedTopicScope: true,
        masteryOriented: true,
        learnerDirected: true,
      },
    };
  }


  async resumeSession(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    if (
      session.status !== LearningSessionStatus.IN_PROGRESS &&
      session.status !== LearningSessionStatus.PAUSED
    ) {
      throw new NotFoundException(
        'Learning session is not resumable from its current state',
      );
    }

    session.status = LearningSessionStatus.IN_PROGRESS;
    return this.repository.save(session);
  }

  async pauseSession(
    sessionId: string,
    learnerId: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    if (session.status !== LearningSessionStatus.IN_PROGRESS) {
      throw new NotFoundException(
        'Only an in-progress learning session can be paused',
      );
    }

    session.status = LearningSessionStatus.PAUSED;
    return this.repository.save(session);
  }


  async transition(
    sessionId: string,
    learnerId: string,
    status: LearningSessionStatus,
    description?: string,
  ): Promise<LearningSession> {
    const session = await this.getSession(sessionId, learnerId);

    session.status = status;

    if (description !== undefined) {
      session.description = description;
    }

    return this.repository.save(session);
  }
}
