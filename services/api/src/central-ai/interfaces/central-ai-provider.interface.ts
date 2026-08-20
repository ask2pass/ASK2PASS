import {
  CentralAIContext,
  CentralAIRequest,
  CentralAIResponse,
  AIProviderStatus,
} from './central-ai.types';

export abstract class CentralAIProvider {
  abstract readonly name: string;
  abstract readonly status: AIProviderStatus;
  abstract readonly capabilities: readonly string[];

  abstract generate(
    request: CentralAIRequest,
    context: CentralAIContext,
  ): Promise<CentralAIResponse>;
}
