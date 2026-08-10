import { Injectable } from '@nestjs/common';
import type {
  LearningRuntimeDirective,
  LearningRuntimeDirectiveInput,
} from '../interfaces/learning-runtime-directive.interface';

@Injectable()
export class LearningRuntimeDirectiveService {
  create(
    input: LearningRuntimeDirectiveInput,
  ): LearningRuntimeDirective {
    const { learningPath } = input;

    return {
      learnerId: learningPath.learnerId,
      examinationType: learningPath.examinationType,
      subjectId: learningPath.currentSubjectId,
      topicId: learningPath.currentTopicId,
      action: learningPath.nextAction,
      pathVersion: learningPath.version,
      generatedAt: new Date().toISOString(),
    };
  }
}
