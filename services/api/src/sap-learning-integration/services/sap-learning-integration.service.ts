import { Injectable } from '@nestjs/common';

import { LearningCrossBindingService } from '../../learning-cross-binding/services/learning-cross-binding.service';
import { LearningEngineService } from '../../learning-engine/services/learning-engine.service';
import { AssessmentType } from '../../sap/enums/assessment-type.enum';
import { SAPService } from '../../sap/services/sap.service';
import { SAPContext } from '../../sap/interfaces/sap-context.interface';
import { LearningEngineContext } from '../../learning-engine/interfaces/learning-engine-context.interface';
import { SAPLearningContext } from '../interfaces/sap-learning-context.interface';

@Injectable()
export class SAPLearningIntegrationService {
  constructor(
    private readonly sap: SAPService,
    private readonly learning: LearningEngineService,
    private readonly binding: LearningCrossBindingService,
  ) {}

  getPolicy() {
    return {
      integration: 'SAP_LEARNING_ENGINE',
      sap: this.sap.getPolicy(),
      learningEngine: this.learning.getPolicy(),
      crossBinding: this.binding.getPolicy(),
      enforcement: {
        sapBeforeAssessment: true,
        learningSessionRequired: true,
        crossBindingRequired: true,
        persistenceRequired: true,
        offlineFirst: true,
        masteryFeedsPersonalization: true,
        interventionFeedsLearningPath: true,
        cbtFeedsCompletion: true,
        starsEligibilityFeedsCompletion: true,
      },
    };
  }

  initialize(data: any): SAPLearningContext {
    const sapContext = this.sap.initialize({
      learnerId: data.learnerId,
      sessionId: data.sessionId ?? null,
      lessonId: data.lessonId ?? null,
      classLevel: data.classLevel,
      subject: data.subject,
      topic: data.topic,
      offlineAvailable: data.offlineAvailable ?? true,
      persistenceReady: data.persistenceReady ?? false,
    });

    const learningContext = this.learning.initialize({
      learnerId: data.learnerId,
      sessionId: data.sessionId,
      lessonId: data.lessonId,
      classLevel: data.classLevel,
      subject: data.subject,
      topic: data.topic,
      offlineAvailable: data.offlineAvailable ?? true,
    });

    return this.enforceBinding(sapContext, learningContext);
  }

  activate(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    const learning = this.learning.activate(current.learning);

    const sap = {
      ...current.sap,
      learningEngineBound: true,
      sessionBound: true,
      updatedAt: new Date(),
    };

    return this.enforceBinding(sap, learning);
  }

  beginAssessment(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    const sap = this.sap.startAssessment(current.sap);

    return this.enforceBinding(sap, current.learning);
  }

  recordAssessment(data: any) {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    const recorded = this.sap.recordAssessment(
      current.sap,
      data.score,
      data.maxScore,
      data.assessmentType ?? AssessmentType.FORMATIVE,
    );

    const learning = this.learning.updatePosition(
      current.learning,
      data.position ?? current.learning.lessonPosition,
    );

    return {
      ...this.enforceBinding(recorded.context, learning),
      assessment: recorded.assessment,
    };
  }

  completeLesson(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    return this.enforceBinding(
      this.sap.completeAssessment(current.sap),
      this.learning.completeLesson(current.learning),
    );
  }

  evaluateMastery(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    return this.enforceBinding(
      this.sap.evaluateMastery(current.sap),
      current.learning,
    );
  }

  beginCBT(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    return this.enforceBinding(
      current.sap,
      this.learning.beginCBT(current.learning),
    );
  }

  completeCBT(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    return this.enforceBinding(
      current.sap,
      this.learning.completeCBT(current.learning),
    );
  }

  complete(data: any): SAPLearningContext {
    const current = this.enforceBinding(
      data.context.sap,
      data.context.learning,
    );

    if (!current.bindingValid) {
      return current;
    }

    return this.enforceBinding(
      current.sap,
      this.learning.complete(current.learning),
    );
  }

  private enforceBinding(
    sap: SAPContext,
    learning: LearningEngineContext,
  ): SAPLearningContext {
    const bindingContext = this.binding.createContext({
      learnerId: learning.learnerId,
      sessionId: learning.sessionId,
      lessonId: learning.lessonId,
      classLevel: learning.classLevel,
      subject: learning.subject,
      topic: learning.topic,
      deliveryReady: learning.deliveryReady,
      orchestrationReady: learning.orchestrationReady,
      sessionReady: learning.sessionReady,
      persistenceReady:
        learning.persistenceReady || sap.persistenceReady,
      runtimeReady: learning.runtimeReady,
      offlineAvailable:
        learning.offlineAvailable && sap.offlineAvailable,
      lessonPosition: learning.lessonPosition,
      questionModeActive: learning.questionModeActive,
      lessonCompleted: learning.lessonCompleted,
      cbtCompleted: learning.cbtCompleted,
      starsEligible:
        learning.starsEligible || sap.masteryScore >= 70,
      snapshotId: learning.snapshotId,
    });

    const result = this.binding.evaluate(bindingContext);

    if (!result.valid) {
      return {
        sap: {
          ...sap,
          learningEngineBound: false,
          sessionBound: false,
          updatedAt: new Date(),
        },
        learning: {
          ...learning,
          fullyBound: false,
          updatedAt: new Date(),
        },
        bindingValid: false,
        blockedAt: result.blockedAt,
        reason: result.reason,
      };
    }

    return {
      sap: {
        ...sap,
        learningEngineBound: true,
        sessionBound: true,
        updatedAt: new Date(),
      },
      learning: {
        ...learning,
        fullyBound: true,
        updatedAt: new Date(),
      },
      bindingValid: true,
      blockedAt: null,
      reason: null,
    };
  }
}
