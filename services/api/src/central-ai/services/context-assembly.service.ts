import { Injectable } from '@nestjs/common';

import {
  CentralAIContext,
  CentralAIRequest,
} from '../interfaces/central-ai.types';

@Injectable()
export class CentralAIContextAssemblyService {
  assemble(
    request: CentralAIRequest,
    retrievedContext: CentralAIContext,
  ): CentralAIContext {
    return {
      ...retrievedContext,
      module: request.module ?? retrievedContext.module,
      classLevel: request.classLevel ?? retrievedContext.classLevel,
      subject: request.subject ?? retrievedContext.subject,
      topic: request.topic ?? retrievedContext.topic,
      lessonId: request.lessonId ?? retrievedContext.lessonId,
    };
  }
}
