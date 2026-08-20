import { Injectable } from '@nestjs/common';

import {
  AIProviderStatus,
  CentralAIContext,
  CentralAIRequest,
  CentralAIResponse,
} from '../interfaces/central-ai.types';
import { CentralAIProvider } from '../interfaces/central-ai-provider.interface';

@Injectable()
export class CentralAIProviderService extends CentralAIProvider {
  readonly name = 'ASK2PASS-BASE-PROVIDER';
  readonly status: AIProviderStatus = 'AVAILABLE';

  readonly capabilities = [
    'QUESTION',
    'EXPLAIN',
    'PRACTICE',
    'DRILL',
    'ASSESS',
    'REVIEW',
    'LESSON_SUPPORT',
    'GENERAL',
  ] as const;

  async generate(
    request: CentralAIRequest,
    context: CentralAIContext,
  ): Promise<CentralAIResponse> {
    const subject = request.subject
      ? ` for ${request.subject}`
      : '';

    const topic = request.topic
      ? ` on ${request.topic}`
      : '';

    const answer =
      context.retrievedKnowledge.length > 0
        ? `Central AI received a grounded request${subject}${topic}.`
        : `Central AI received a request${subject}${topic}, but no knowledge source has been retrieved yet.`;

    return {
      answer,
      grounded: context.retrievedKnowledge.length > 0,
      provider: this.name,
      context: {
        module: request.module,
        subject: request.subject,
        topic: request.topic,
      },
      sources: context.retrievedKnowledge,
    };
  }
}
