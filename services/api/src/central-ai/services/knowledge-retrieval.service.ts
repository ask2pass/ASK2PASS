import { Injectable } from '@nestjs/common';

import {
  CentralAIContext,
  CentralAIRequest,
} from '../interfaces/central-ai.types';
import { KnowledgeRetrievalService } from '../interfaces/knowledge-retrieval.interface';
import { WAECKnowledgeService } from './waec-knowledge.service';

@Injectable()
export class CentralKnowledgeRetrievalService
  implements KnowledgeRetrievalService
{
  constructor(
    private readonly waecKnowledge: WAECKnowledgeService,
  ) {}

  async retrieve(
    request: CentralAIRequest,
  ): Promise<CentralAIContext> {
    const retrievedKnowledge =
      await this.waecKnowledge.search(request);

    return {
      module: request.module,
      classLevel: request.classLevel,
      subject: request.subject,
      topic: request.topic,
      lessonId: request.lessonId,
      retrievedKnowledge,
    };
  }
}
